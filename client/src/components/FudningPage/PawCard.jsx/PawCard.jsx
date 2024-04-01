import {useState} from 'react';
import { ProgressBar } from 'react-bootstrap';
import '../FundingPage.css'

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
    <div className = "card">
      <div className= "image-icon">
      <img src={image} alt={name}/>
      </div>
      <div className = "cardContainer">
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
      <div style={{ padding: "15px" }}>
      {!toggle? (<button onClick = {handleToggle} className="button">Donate Now</button>):<button onClick = {handleToggle} lassName="button">Close Donation Form</button>}
      </div>
      </div>
    </div>
  );
};

export default PawCard; 