import {useState} from 'react';
import styled from 'styled-components'
import { ProgressBar } from 'react-bootstrap';

const PawCard = ({petData}) => {
  const {name, cause, goal, image, age,  id, donations} = petData
  const donationRaised = donations.reduce((accum,donation) => {return accum + donation.amount},0)

  return (
    <Card>
      <ImageIcon>
        <img src={image} alt={name}/>
      </ImageIcon>
      <CardContainer>
        <h4>Name: {name}</h4>
        <p><strong>Age: </strong> {age}</p>
        <p><strong>Cause: </strong> {cause}</p>
        <p><strong>Raised: </strong> {donationRaised}</p>
        <p><strong>Target: </strong>{goal}</p>
        <ProgressBar 
          striped
          variant="info"
          now={(donationRaised/goal) * 100} 
          style={{ width: "50%", margin: "auto" }}
        />    
      </CardContainer>
    </Card>
  );
};

export default PawCard; 

const Card = styled.div`
  margin: 1rem;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  width: 25%;
  background-color: white;
  &img {
    width:  100px;
    height: 100px;
    text-align:center;
    background-position:center;
    background-size: cover;
  }
  & hoever {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  }
`;

const ImageIcon = styled.div`
  padding: 15px;
`

const CardContainer = styled.div`
  padding: 3px 20px;
`