import React, { useEffect, useState, useCallback } from 'react';
import { Interest } from '../service/api';
import { Container, List, ListItem, Image, Title } from './InterestList.styles';
import Modal from './Modal';


const PIXELS_PER_METER = 25; 

interface InterestListProps {
  interests: Interest[];
  loadMoreInterests: () => void;
}

const InterestList: React.FC<InterestListProps> = ({ interests, loadMoreInterests }) => {
  const [displayedInterests, setDisplayedInterests] = useState<Interest[]>([]);
  const [selectedInterest, setSelectedInterest] = useState<Interest | null>(null);

  useEffect(() => {
    setDisplayedInterests(interests.slice(0, 10)); 
  }, [interests]);

  const handleScroll = useCallback((e: Event) => {
    const target = e.currentTarget as HTMLDivElement;
    const bottom = target.scrollHeight - target.scrollTop === target.clientHeight;
    if (bottom && displayedInterests.length < interests.length) {
      loadMoreInterests();
    }
  }, [loadMoreInterests, displayedInterests.length, interests.length]);

  useEffect(() => {
    const listElement = document.getElementById('interest-list');
    if (listElement) {
      listElement.addEventListener('scroll', handleScroll);
      return () => listElement.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  useEffect(() => {
    if (interests.length > displayedInterests.length) {
      setDisplayedInterests(interests.slice(0, displayedInterests.length + 10)); 
    }
  }, [interests, displayedInterests.length]);

  const handleClick = (id: string) => {
    const selected = interests.find(interest => interest.id === id);
    if (selected) {
      console.log('Loja selecionada:', selected);
      setSelectedInterest(selected);
    }
  };

  const handleCloseModal = () => {
    setSelectedInterest(null);
  };

  const getNearbyStores = (selected: Interest) => {
    if (!selected) return [];

    return interests
      .filter(i => i.id !== selected.id)
      .map(store => {
        if (!store.coords || !selected.coords) return { ...store, distance: Infinity };
        
        const [x1, y1, z1] = selected.coords;
        const [x2, y2, z2] = store.coords;
        
        const dx = x2 - x1;
        const dy = y2 - y1;
        const dz = z2 - z1;

        const distanceInPixels = Math.sqrt(dx * dx + dy * dy + dz * dz);
        const distanceInMeters = distanceInPixels / PIXELS_PER_METER;
        
        return { ...store, distance: distanceInMeters };
      })
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 2);
  };

  return (
    <Container>
      <List id="interest-list">
        {displayedInterests.map(interest => {
          const imageUrl = interest.mediaIcon || interest.media || interest.mediaMini;
          return (
            <ListItem key={interest.id} onClick={() => handleClick(interest.id)}>
              {imageUrl && (
                <Image
                  src={imageUrl}
                  alt={interest.title}
                  onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => { e.currentTarget.src = 'placeholder.png'; }}
                />
              )}
              <Title>{interest.title || 'Sem Nome'}</Title>
            </ListItem>
          );
        })}
      </List>
      {selectedInterest && ( 
        <Modal
          interest={selectedInterest}
          nearbyStores={getNearbyStores(selectedInterest)}
          onClose={handleCloseModal}
        />
      )}
    </Container>
  );
};

export default InterestList;
