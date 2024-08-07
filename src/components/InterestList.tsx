import React, { useEffect, useState, useCallback } from 'react';
import { Interest } from '../service/Api';
import { Container, List, ListItem, Image, Title } from './InterestList.styles';
import { PIXELS_PER_METER } from './constants';
import Modal from './Modal';


// Funçao para mostrar as lojas e carregar mais lojas a medida que  descer com skrol mouse
interface InterestListProps {
  interests: Interest[];
  loadMoreInterests: () => void;
}

//Funçao para saber quais lojas estao sendo mostradas e qual que o usuario clicou
const InterestList: React.FC<InterestListProps> = ({ interests, loadMoreInterests }) => {
  const [displayedInterests, setDisplayedInterests] = useState<Interest[]>([]);
  const [selectedInterest, setSelectedInterest] = useState<Interest | null>(null);

  //Hook para exibir 10 lojas, e a medida que a barra de rolagem descer, vai atualizando para mais 10
  useEffect(() => {
    setDisplayedInterests(interests.slice(0, 10)); 
  }, [interests]);

  // Funçao para verificar se a barra de rolagem já chegou no final, se nao vai carregar as lojas que falta
  const handleScroll = useCallback((e: Event) => {
    const target = e.currentTarget as HTMLDivElement;
    const bottom = target.scrollHeight - target.scrollTop === target.clientHeight;
    if (bottom && displayedInterests.length < interests.length) {
      loadMoreInterests();
    }
  }, [loadMoreInterests, displayedInterests.length, interests.length]);

//Toda vez que descer a barra de rolagem vai chamar handlescroll para carregar mais lojas e verifica se ja foi carregado aquela loja
  useEffect(() => {
    const listElement = document.getElementById('interest-list');
    if (listElement) {
      listElement.addEventListener('scroll', handleScroll);
      return () => listElement.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  //Se tiver mais lojas para mostrar, vai mostrar mais 10 se nao nao fara nada
  useEffect(() => {
    if (interests.length > displayedInterests.length) {
      setDisplayedInterests(interests.slice(0, displayedInterests.length + 10)); 
    }
  }, [interests, displayedInterests.length]);

  //Funçao quando clicar em uma loja ela irá  puxar pelo id da loja
  const handleClick = (id: string) => {
    const selected = interests.find(interest => interest.id === id);
    if (selected) {
      console.log('Loja selecionada:', selected);
      setSelectedInterest(selected);
    }
  };

  //Funçao para fechar o modal, quando tiver aberto
  const handleCloseModal = () => {
    setSelectedInterest(null);
  };

  //Funçao que encontra as duas lojas mais proximas, e retorna as lojas por coordenadas
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

  // Retorno de uma loja com descriçao abrindo o modal com informaçoes da loja selecionada e as duas lojas mais proximas
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
