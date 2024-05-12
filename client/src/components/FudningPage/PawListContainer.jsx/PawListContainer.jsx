import PawCard from '../PawCard.jsx/PawCard';
import '../FundingPage.css'
import { useSelector } from "react-redux";

const PawListContainer = () => {
  const pets = useSelector(state => state.paw.pet);

  return (
    <div className ="cards">
      {pets.map(petObj => <PawCard key={petObj.id} petData = {petObj}/>)}
    </div>
  )
}

export default PawListContainer;