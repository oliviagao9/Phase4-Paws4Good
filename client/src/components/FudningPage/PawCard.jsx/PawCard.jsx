import {useState} from 'react';
import { useFormik } from 'formik'
import * as yup from 'yup'
import { ProgressBar } from 'react-bootstrap';
import '../FundingPage.css'
import { setPaw } from "../../Redux/Paw";
import { useSelector, useDispatch } from "react-redux";

const PawCard = ({petData}) => {
  const user = useSelector(state => state.session.user);
  const pets = useSelector(state => state.paw.pet);
  const [toggle, setToggle] = useState(false);
  const {name, cause, goal, image, age,  id, donations, favorites} = petData
  const donationRaised = donations.reduce((accum,donation) => {return accum + donation.amount},0)
  const [newTotalFund, setNewTotalFund] = useState(donationRaised);
  const dispatch = useDispatch();
  const [favorInfo, setFavorInfo] = useState(favorites);

  const checkFavorite = (favoriteObj, userId, petId) => {
    return favoriteObj.find(favorite => (favorite.user_id == userId && favorite.pet_id == petId));
  }
  const favorObject = checkFavorite(favorites, user.user_id, id);
  console.log(favorObject);
  // let favoriteBoolean = false ;
  // if (favorites != null)
  //   favoriteBoolean = favorites.find(favorite => favorite.user_id == user.user_id && favorite.pet_id == id);
  const isFavorite = favorObject ? true : false;
  const [favoritePet, setFavoritePet] = useState(isFavorite);
  console.log(isFavorite);
  const handleToggle = (e) => {
    e.preventDefault();
    setToggle(!toggle);
    console.log(toggle);
  }

  const favObj = {
    pet_id: id,
    user_id: user.user_id
  }
  const handleFav = (e, favObj) => {
    e.preventDefault();
    console.log(favorites)
    if (!favoritePet) {
      fetch("/api/favorites", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          pet_id: id,
          user_id: user.user_id
        })
      }).then(response => {
        if (response.ok) {
          response.json().then( data => {
              setFavoritePet(!favoritePet);
              setFavorInfo([data]);
            const newFavorites = [...favorites, data]
            const newPets = []
            pets.forEach((pet) => {
              if (pet.id === id) {
                pet = {...pet};
                pet.favorites = newFavorites;
                newPets.push(pet);
              } else {
                newPets.push(pet)
              }
            })
            dispatch(setPaw(newPets));
            }
        )}
      })
    } else {
      fetch(`/api/favorites/${favorObject.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        }
      })
          .then(r => {
            if (r.ok) {
              setFavoritePet(!favoritePet);
              const newFavorites = favorites.filter(favorite => favorite.id != favorObject.id)
              const newPets = []
              pets.forEach((pet) => {
                if (pet.id === id) {
                  pet = {...pet};
                  pet.favorites = newFavorites;
                  newPets.push(pet);
                } else {
                  newPets.push(pet)
                }
              })
              dispatch(setPaw(newPets));
            }
          })
    }
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
        setNewTotalFund(newTotalFund +donation.amount)
        setToggle(!toggle)
        const newDonations = [...donations, donation]
        const newPets = []
        pets.forEach((pet) => {
          if (pet.id === id) {
            pet = {...pet};
            pet.donations = newDonations;
            newPets.push(pet);
          } else {
            newPets.push(pet)
          }
        })
        dispatch(setPaw(newPets));
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
        {/*{!isFavorite ? (<button onClick = {handleFav} className="fav_button"> Favorited </button>) : (<button onClick = {handleFav} className="fav_button"> Favorite </button>)}*/}
        {!favoritePet? (<button onClick = {handleFav} className="fav-button">🤍</button>):<button onClick = {handleFav} className="fav-button">❤️</button>}

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