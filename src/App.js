import './App.css';
import Slider from './components/Slider/Slider';
import IMAGES from './data/images.json';

const App = () => {
  return <Slider images={IMAGES} />;
};

export default App;

