import PawCard from '../PawCard.jsx/PawCard';
import '../FundingPage.css'

const PawListContainer = ( {pets} ) => {
  return (
    <div className ="cards">
      {pets.map(petObj => <PawCard key={petObj.id} petData = {petObj}/>)}
    </div>
  )
}

export default PawListContainer;