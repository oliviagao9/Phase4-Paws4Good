import { useEffect, useState } from "react";
import PawListContainer from "./PawListContainer.jsx/PawListContainer";

const FundingPage = ({user}) => {

  const [pets, setPets] = useState([])

  useEffect(() => {
    fetch('/api/pets')
      .then(r => r.json())
      .then(petData => setPets(petData))
  }, [])

  return (
    <div style={{textAlign:"center"}}>
      <div className="header">
        <h1>Fur-ever Love: Fundraising for Pets in Need</h1>
      </div>
      <PawListContainer pets = {pets} user = { user }/>
    </div>
  )
}

export default FundingPage