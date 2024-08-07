import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import { Header } from './components/Header';
import { Content } from './components/Content';
import { Button } from './components/Button';
import { ButtonsContainer } from './components/ButtonsContainer';
import InterestList from './components/InterestList';
import { fetchInterests, Interest } from './service/Api';


// Mostra o tipo de visualizaçao de mapa ou lista
const App: React.FC = () => {
  const [selected, setSelected] = useState<'mapa' | 'lista'>('mapa');
  const [interests, setInterests] = useState<Interest[]>([]);

  //Quando o botão lista é clicado é buscado as lojas da api
  useEffect(() => {
    if (selected === 'lista') {
      const loadInterests = async () => {
        try {
          const data = await fetchInterests();
          setInterests(data);
        } catch (error) {
          console.error('Error fetching interests:', error);
        }
      };
      loadInterests();
    }
  }, [selected]);

  //Funçao que vai carregando mais interesses a medida que vou descendo com a barra de rolagem
  const loadMoreInterests = async () => {
    try {
      const newInterests = await fetchInterests();
      setInterests(prevInterests => [...prevInterests, ...newInterests]);
    } catch (error) {
      console.error('Error loading more interests:', error);
    }
  };

  //Apenas para definiir qual opçao esta selecionada se é o mapa ou lista (loja). Alem dos botoes
  const isMapSelected = selected === 'mapa';
  const isListSelected = selected === 'lista';

  //Retorna o mapa ou lista dependendo do botao que esta selecionado
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Content>
        {isMapSelected ? (
          <iframe
            src="https://app.zapt.tech/#/map?placeId=-ltvysf4acgzdxdhf81y&embed=true&bottomNavigation=false&poiDetails=false"
            allow="accelerometer"
          />
        ) : (
          <InterestList interests={interests} loadMoreInterests={loadMoreInterests} />
        )}
      </Content>
      <ButtonsContainer>
        <Button selected={isMapSelected} onClick={() => setSelected('mapa')}>
          Mapa
        </Button>
        <Button selected={isListSelected} onClick={() => setSelected('lista')}>
          Lojas
        </Button>
      </ButtonsContainer>
    </ThemeProvider>
  );
};

export default App;
