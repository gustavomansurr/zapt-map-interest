import styled from 'styled-components';

export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7); 
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 30px;
  border-radius: 16px; 
  width: 80%;
  max-width: 800px; 
  position: relative;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); 
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: #e0e0e0; 
  border: none;
  border-radius: 50%; 
  width: 35px;
  height: 35px;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease;

  &:hover {
    background: #ccc; 
  }
`;

export const StoreInfo = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
`;

export const StoreImage = styled.img`
  max-width: 250px; 
  height: auto;
  border-radius: 12px; 
  margin-right: 20px;
`;

export const StoreDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StoreName = styled.h2`
  margin-top: 0;
  font-size: 1.5rem; 
  color: #333; 
`;

export const StoreDescription = styled.div`
  margin-top: 10px;
  font-size: 1rem; 
  color: #666; 
`;

export const NearbyStoresContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const NearbyStoresTitle = styled.h3`
  margin-top: 0;
  font-size: 1.5rem; 
  color: #007BFF; 
  font-weight: bold; 
  text-align: center; 
  padding: 10px; 
  border-bottom: 2px solid #007BFF; 
  background: #f1f1f1; 
  border-radius: 8px; 
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
  margin-bottom: 20px; 
`;


export const NearbyStores = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
`;

export const StoreCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ddd; 
  padding: 15px;
  border-radius: 12px; 
  width: 220px; 
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
  background: #f9f9f9; 
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); 
  }
`;

export const StoreCardImage = styled.img`
  width: 120px; 
  height: 120px; 
  object-fit: cover; 
  border-radius: 8px; 
  margin-bottom: 10px; 
`;

export const StoreCardTitle = styled.h4`
  margin: 10px 0 5px 0; 
`;

export const StoreCardDistance = styled.p`
  margin-top: 5px; 
  font-size: 0.9rem; 
  color: #666; 
`;