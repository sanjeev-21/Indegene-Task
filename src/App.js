import "antd/dist/antd.css";
import { GlobalProvider } from "./Context/GlobalState";
import NavBar from "./Components/NavBar";
function App() {
  return (
    <GlobalProvider>
        <NavBar/>
    </GlobalProvider>
  );
}

export default App;
