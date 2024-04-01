import PawCard from '../PawCard.jsx/PawCard';
import '../FundingPage.css'

const PawListContainer = ( {pets, user} ) => {
  return (
    <div className ="cardContainers">
      {pets.map(petObj => <PawCard key={petObj.id} petData = {petObj} user = {user}/>)}
    </div>
  )
}

export default PawListContainer;