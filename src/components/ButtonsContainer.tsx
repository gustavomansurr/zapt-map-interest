import styled from 'styled-components';

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  border-top: 1px solid #e0e0e0;
  position: sticky;
  bottom: 0;
  background: linear-gradient(to top, #ffffff, #f9f9f9);
  padding: 12px 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  height: 70px;
  border-radius: 8px;
  transition: box-shadow 0.4s ease, background-color 0.3s ease;

  &:hover {
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.2);
    background-color: #f0f0f0;
  }
`;
