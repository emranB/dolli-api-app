import "./App.scss";
import ToursSearch from "./components/ToursSearch.jsx";
import ToursDisplay from "./components/ToursDisplay.jsx";
import LoadingScreen from "./utils/LoadingScreen.jsx";
import { ToursProvider } from "./components/ToursProvider.jsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  return (
    <ToursProvider>
        <div className="app">
            <LoadingScreen />
            <ToursSearch />
            <ToursDisplay />
            <ToastContainer position="bottom-center" autoClose={1500} />
        </div>
    </ToursProvider> 
  );

}

export default App;
