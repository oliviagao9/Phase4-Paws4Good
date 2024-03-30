import {useState} from 'react';
import styled from 'styled-components'
import { ProgressBar } from 'react-bootstrap';

const PawCard = ({petData , user}) => {

  const [amount, setAmount] = useState(0);
  const [toggle, setToggle] = useState(false);
  const {name, cause, goal, image, age,  id, donations} = petData
  const donationRaised = donations.reduce((accum,donation) => {return accum + donation.amount},0)
  const [newTotalFund, setNewTotalFund] = useState(donationRaised)

  const handleToggle = (e) => {
    e.preventDefault();
    setToggle(!toggle);
  }

  const handleDonation = (e) => {
    e.preventDefault();

    const donationData = {
        amount: amount,
        pet_id: id,
        donor_id: user.user_id
    }

    return fetch("/api/donations", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(donationData)
    })
    .then( r=> r.json())
    .then(updatedDonation => {
      console.log(updatedDonation);
      console.log(newTotalFund);
      setNewTotalFund(newTotalFund +updatedDonation.amount)
      setAmount(0)
      setToggle(!toggle)
      console.log(newTotalFund);
    }
    )
  }

  return (
    <Card>
      <ImageIcon>
        <img src={image} alt={name}/>
      </ImageIcon>
      <CardContainer>
        <h4>Name: {name}</h4>
        <p><strong>Age: </strong> {age}</p>
        <p><strong>Cause: </strong> {cause}</p>
        <p><strong>Raised: </strong> {newTotalFund}</p>
        <p><strong>Target: </strong>{goal}</p>
        <ProgressBar 
          striped
          variant="info"
          now={(newTotalFund/goal) * 100} 
          style={{ width: "50%", margin: "auto" }}
        />
        {toggle?( 
        <form on onSubmit={handleDonation}> 
          <input             
            type="number"
            name="amount"
            min="0"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}>
          </input>
        <button>Donate</button>
        </form>) :null
      }
      <div className="footer">
      {!toggle? (<button onClick = {handleToggle} className="button">Donate Now</button>):<button onClick = {handleToggle} lassName="button">Close Donation Form</button>}
      </div>
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