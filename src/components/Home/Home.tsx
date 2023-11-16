import SearchBarComponent from "../SearchBar/SearchBarComponent";
import BackgroundSlideshow from './BGSlideshow';
const Home = () => {
  return (
    <div>
       <BackgroundSlideshow />
    <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <SearchBarComponent></SearchBarComponent>
    </div>
    </div>
  );
  
};

export default Home;
