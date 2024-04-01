import PawListContainer from "./PawListContainer.jsx/PawListContainer";

const FundingPage = ({user, pets}) => {

  return (
    <div style={{textAlign:"center",
                 paddingTop: "20px"}}>
      <h1>Fur-ever Love: Fundraising for Paws in Need</h1>
      <PawListContainer pets = {pets} user = { user }/>
    </div>
  )
}

export default FundingPage