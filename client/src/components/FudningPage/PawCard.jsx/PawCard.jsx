import {useState} from 'react';
import { useFormik } from 'formik'
import * as yup from 'yup'
import { ProgressBar } from 'react-bootstrap';
import '../FundingPage.css'

const PawCard = ({petData , user}) => {

  const [errors, setErrors] = useState([]);
  const [toggle, setToggle] = useState(false);
  const {name, cause, goal, image, age,  id, donations} = petData
  const donationRaised = donations.reduce((accum,donation) => {return accum + donation.amount},0)
  const [newTotalFund, setNewTotalFund] = useState(donationRaised)

  const handleToggle = (e) => {
    e.preventDefault();
    setToggle(!toggle);
  }

  const formSchema = yup.object().shape({
    amount: yup.number().required().positive().integer() 
  })

  const formik = useFormik({

    initialValues: {
      amount:'',
      pet_id: id,
      donor_id: user.user_id
    },

    validationSchema: formSchema,

    onSubmit: (values) => {
      fetch("/api/donations", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
      })
      .then( r=> r.json())
      .then(donation => {
        console.log(donation)
        setNewTotalFund(newTotalFund +donation.amount)
        setToggle(!toggle)
      }
      )
    }
  })

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
        { toggle ?( 
          <>
            <p style={{color:'red'}}> {formik.errors.amount}</p>
            <form onSubmit={formik.handleSubmit}> 
              <input             
                type="number"
                name="amount"
                placeholder="Amount"
                value={formik.values.amount}
                onChange={formik.handleChange}/>
            <button type="submit">Donate</button>
            </form>
          </>)
        : null
      }
      <div style={{ padding: "15px" }}>
      {!toggle? (<button onClick = {handleToggle} className="button">Donate Now</button>):<button onClick = {handleToggle} className="button">Close Donation Form</button>}
      </div>
      </div>
    </div>
  );
};

export default PawCard; 