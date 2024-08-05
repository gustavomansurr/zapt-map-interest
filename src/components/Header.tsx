import styled from 'styled-components';
import logo from '../assets/logo-zapt.png';

const HeaderContainer = styled.div`
  padding: 20px 30px; 
  background-color: #ffffff; 
  border-bottom: 2px solid #e0e0e0; 
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
`;

const Logo = styled.img`
  height: 70px; 
  width: auto;
  max-width: 100%;
  object-fit: contain;
  margin-right: 15px; 
  transition: transform 0.3s ease; 

  &:hover {
    transform: scale(1.05); 
  }
`;

export const Header: React.FC = () => {
    return (
      <HeaderContainer>
        <Logo src={logo} alt="Logo Zapt-Tech" />
      </HeaderContainer>
    );
};
