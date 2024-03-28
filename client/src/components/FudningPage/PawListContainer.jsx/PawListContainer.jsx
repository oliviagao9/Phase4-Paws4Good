import React from 'react';
import styled from 'styled-components'
import PawCard from '../PawCard.jsx/PawCard';

const PawListContainer = ( {pets, user} ) => {
  return (
    <CardContainers>
      {pets.map(petObj => <PawCard key={petObj.id} petData = {petObj} user = {user}/>)}
    </CardContainers>
  )
}

export default PawListContainer;

const CardContainers = styled.div`
  list-style: none;
  margin-top: 20px;
`;