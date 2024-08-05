import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  padding: 10px;  
`;

export const List = styled.ul`
  padding: 0;
  width: 100%;
  margin: 0;  
  list-style: none; 
`;

export const ListItem = styled.li`
  display: flex;
  align-items: center;
  padding: 15px;  
  cursor: pointer;
  width: 100%;
  transition: transform 0.2s, box-shadow 0.2s;
  border-radius: 8px; 
  border: 1px solid #e0e0e0; 
  background-color: #fff; 

  &:hover {
    transform: scale(0.98); 
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15); 
  }

  user-select: none;
`;

export const Image = styled.img`
  width: 60px; 
  height: 60px;
  margin-right: 15px; 
  border-radius: 50%; 
  object-fit: cover; 
`;

export const Title = styled.div`
  font-weight: 600; 
  font-size: 18px; 
  text-align: left;
  flex: 1;
  font-family: 'Roboto', sans-serif; 
  color: #333; 
`;
