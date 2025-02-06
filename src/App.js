import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/navigation';
import Accordion from './components/accordion';
import ImageSlider from './components/image-slider';
import LoadMoreData from './components/load-more-data';
import RandomColor from './components/random-colour';
import StarRating from './components/star-rating';
import Home from './components/home';

function App() {
  return (
    <Router>
      {/* Navigation will show on all pages */}
      <Navigation />

      {/* Define the page routes */}
      <Routes>
        {/* Home route - HomeComponent will only show on the home page */}
        <Route path="/" element={<Home />} />

        {/* Other routes */}
        <Route path="/accordion" element={<Accordion />} />
        <Route path="/random-color" element={<RandomColor />} />
        <Route path="/star-rating" element={<StarRating noOfStar={10} />} />
        <Route path="/image-slider" element={<ImageSlider url={'https://picsum.photos/v2/list'} page={'1'} limit={'10'} />} />
        <Route path="/load-more-data" element={<LoadMoreData />} />
       { /* <Route path="/feature-flag" element={<FeatureFlagGlobalState><FeatureFlags /></FeatureFlagGlobalState>} /> */}
      </Routes>
    </Router>
  );
}

export default App;
