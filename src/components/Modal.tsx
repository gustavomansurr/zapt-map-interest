import React from 'react';
import { Interest } from '../service/Api';
import { 
  ModalContainer, 
  ModalContent, 
  CloseButton, 
  StoreInfo, 
  StoreImage, 
  StoreDetails, 
  StoreName, 
  StoreDescription, 
  NearbyStoresContainer, 
  NearbyStoresTitle, 
  NearbyStores, 
  StoreCard, 
  StoreCardImage 
} from './Modal.styles';

const PIXELS_PER_METER = 25; 

const calculateDistance = (store1: Interest, store2: Interest): number => {
    if (!store1 || !store2 || !store1.coords || !store2.coords) {
      console.error('Store data is missing or invalid:', store1, store2);
      return Infinity;
    }
  
    const [x1, y1, z1] = store1.coords;
    const [x2, y2, z2] = store2.coords;
  
    const dx = x2 - x1;
    const dy = y2 - y1;
    const dz = z2 - z1;
  
    const distanceInPixels = Math.sqrt(dx * dx + dy * dy + dz * dz);
    const distanceInMeters = distanceInPixels / PIXELS_PER_METER;
  
    return distanceInMeters;
  };

  const formatDistance = (distanceInMeters: number): string => {
    if (distanceInMeters < 1) {
      const distanceInCentimeters = Math.round(distanceInMeters * 100);
      return `${distanceInCentimeters} cm`;
    }
    const roundedDistance = Math.round(distanceInMeters);
    return `${roundedDistance} ${roundedDistance === 1 ? 'metro' : 'metros'}`;
  };
  
interface ModalProps {
  interest: Interest;
  nearbyStores: Interest[];
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ interest, nearbyStores, onClose }) => {
  // Typing store explicitly
  const sortedStores = nearbyStores
    .map((store: Interest) => ({
      ...store,
      distance: calculateDistance(interest, store)
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 2); 

  const renderNearbyStores = () => {
    return sortedStores.map((store: Interest, index: number) => {
      const distance = calculateDistance(interest, store); 
      return (
        <StoreCard key={index}>
          <StoreCardImage src={store.mediaMini || store.media} alt={store.title} />
          <h4>{store.title}</h4>
          <p>{formatDistance(distance)}</p>
        </StoreCard>
      );
    });
  };

  return (
    <ModalContainer>
      <ModalContent>
        <CloseButton onClick={onClose}>X</CloseButton>
        <StoreInfo>
          <StoreImage src={interest.media} alt={interest.title} />
          <StoreDetails>
            <StoreName>{interest.title}</StoreName>
            <StoreDescription dangerouslySetInnerHTML={{ __html: interest.description }} />
          </StoreDetails>
        </StoreInfo>
        <NearbyStoresContainer>
          <NearbyStoresTitle>Lojas mais próximas:</NearbyStoresTitle>
          <NearbyStores>
            {sortedStores.length > 0 ? renderNearbyStores() : <p>Nenhuma loja próxima encontrada.</p>}
          </NearbyStores>
        </NearbyStoresContainer>
      </ModalContent>
    </ModalContainer>
  );
};

export default Modal;
