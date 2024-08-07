import styled from 'styled-components';

//Estelização para deixar o mapa responsivo 
export const Content = styled.div`
  flex: 1;
  width: 100%;
  overflow-y: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 80px; 

  iframe {
    width: 100%;
    height: calc(100vh - 140px);
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease;

    &:hover {
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    }
  }
`;
