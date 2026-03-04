import CarForm from "./components/CarForm.jsx";
import CarList from "./components/CarList.jsx";
import CarSearch from "./components/CarSearch.jsx";
import CarValue from "./components/CarValue.jsx";


function App() {
  return (
    <div className="container is-fluid">
      <h1 className="title is-2">Zealand Car Collections</h1>
      <CarForm />
      <CarSearch />
      <CarList />
      <CarValue />    
    </div>
    
  );
}
export default App;