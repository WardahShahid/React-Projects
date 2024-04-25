import './App.css';
import {BrowserRouter as Router,Routes,Route, Link} from "react-router-dom";
import { Home } from './Pages/main/Main';
import { LogIn } from './Pages/login';
import { CreatePost } from './Pages/create post/CreatePost';
import {Navbar} from './Components/Navbar';
function App() {
  return (
    
    <div className="App">
      
    <Router>

      <Navbar />
    
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<LogIn/>}/>
        <Route path="/createpost" element={<CreatePost/>}/>
       
      </Routes>
    </Router>
    </div>
    
  );
  
}

export default App;
