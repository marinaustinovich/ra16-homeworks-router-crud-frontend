import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { faker } from '@faker-js/faker';
import UserContext from './context/UserContext';
import PostForm from './components/PostForm/PostForm';
import HomePage from './components/HomePage/HomePage';
import PostDetails from './components/PostDetails/PostDetails';
import ChangeCard from './components/ChangeCard/ChangeCard';

const user = {
  name: faker.internet.userName(),
  avatar: faker.image.avatar(),
};

function App() {
  return (
    <UserContext.Provider value={user}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/posts/new" element={<PostForm />} />
            <Route path="/posts/change" element={<ChangeCard />} />
            <Route path="/posts/:id" element={<PostDetails />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
