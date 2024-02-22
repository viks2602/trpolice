import { useSelector } from "react-redux"
import AllRoutes from "./utils/allroutes/AllRoutes"

const App = () => {

  const token = useSelector((state:{testSlice:{token:''}})=>state.testSlice.token);
  console.log(token);
  
  return (
    <AllRoutes/>
  )
}

export default App