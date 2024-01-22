import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { faker } from "@faker-js/faker";
import UserContext from "./context/UserContext";
import { ChangeCard, HomePage, PostDetails, PostForm } from "./components";


const user = {
  name: faker.internet.userName(),
  avatar: faker.image.avatar(),
};

const App = () =>  (
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


export default App;
