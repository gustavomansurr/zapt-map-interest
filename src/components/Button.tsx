import styled from 'styled-components';

export const Button = styled.button<{ selected: boolean }>`
  flex: 1;
  padding: 15px 25px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  background-color: ${({ selected }) => (selected ? '#007BFF' : '#f5f5f5')};
  color: ${({ selected }) => (selected ? '#ffffff' : '#333333')};
  border-radius: 12px;
  transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease, color 0.3s ease;

  @media (max-width: 600px) {
    padding: 12px 20px;
    font-size: 15px;
  }

  @media (max-width: 400px) {
    padding: 10px 15px;
    font-size: 14px;
  }

  &:hover {
    background-color: ${({ selected }) => (selected ? '#0056b3' : '#e0e0e0')};
    transform: scale(1.03);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    color: ${({ selected }) => (selected ? '#e0e0e0' : '#333333')};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.5);
  }
`;
