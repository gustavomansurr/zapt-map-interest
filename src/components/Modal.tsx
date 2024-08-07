import React from 'react';
import { Interest } from '../service/Api';
import { PIXELS_PER_METER } from './constants'; 
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

//Funçao para calcular a distancia das 2 lojas com coordenadas da api e transforma medida pixel para metros
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
 
  //Funçao para formatar a distancia, se for uma distancia menor que 1metro vai informar em cm e também no singular se for 1 metro
  const formatDistance = (distanceInMeters: number): string => {
    if (distanceInMeters < 1) {
      const distanceInCentimeters = Math.round(distanceInMeters * 100);
      return `${distanceInCentimeters} cm`;
    }
    const roundedDistance = Math.round(distanceInMeters);
    return `${roundedDistance} ${roundedDistance === 1 ? 'metro' : 'metros'}`;
  };
  
//Funçao para componente modal, a loja selecionada, as lojas proximas e fechar o modal
  interface ModalProps {
  interest: Interest;
  nearbyStores: Interest[];
  onClose: () => void;
}

//Funçao calcular a distancia das lojas mais proximas da loja selecionada
const Modal: React.FC<ModalProps> = ({ interest, nearbyStores, onClose }) => {
  const sortedStores = nearbyStores
    .map((store: Interest) => ({
      ...store,
      distance: calculateDistance(interest, store)
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 2); 

//Funçao para retornar as lojas mais proximas exibindo a informaçao dela e distancia
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

  //Retorna as informaçoes da loja selecionada e as lojas proximas, e fechamento do modal
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
