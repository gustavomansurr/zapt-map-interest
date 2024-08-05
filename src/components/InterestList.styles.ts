import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  padding: 10px;  /* Adiciona um pouco de espaçamento ao redor */
`;

export const List = styled.ul`
  padding: 0;
  width: 100%;
  margin: 0;  /* Remove a margem padrão */
  list-style: none; /* Remove os marcadores padrão da lista */
`;

export const ListItem = styled.li`
  display: flex;
  align-items: center;
  padding: 15px;  /* Aumenta o padding para mais conforto */
  cursor: pointer;
  width: 100%;
  transition: transform 0.2s, box-shadow 0.2s;
  border-radius: 8px; /* Adiciona bordas arredondadas */
  border: 1px solid #e0e0e0; /* Adiciona uma borda mais suave */
  background-color: #fff; /* Adiciona um fundo branco para maior contraste */

  &:hover {
    transform: scale(0.98); /* Ajusta o efeito de escala para um toque mais sutil */
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15); /* Melhora o efeito de sombra */
  }

  user-select: none;
`;

export const Image = styled.img`
  width: 60px; /* Aumenta o tamanho da imagem para um visual mais impactante */
  height: 60px;
  margin-right: 15px; /* Aumenta o espaçamento entre a imagem e o título */
  border-radius: 50%; /* Mantém a imagem redonda */
  object-fit: cover; /* Garante que a imagem se ajuste bem ao tamanho */
`;

export const Title = styled.div`
  font-weight: 600; /* Torna o texto um pouco mais forte */
  font-size: 18px; /* Aumenta o tamanho da fonte para melhor legibilidade */
  text-align: left;
  flex: 1;
  font-family: 'Roboto', sans-serif; /* Usa uma fonte mais moderna e legível */
  color: #333; /* Define uma cor de texto mais escura e legível */
`;
