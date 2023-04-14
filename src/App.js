import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import AddUser from './pages/AddUser';
import EditUser from './pages/EditUser';

function App() {
  return (
    <div className="App">
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/addUser' element={<AddUser/>}/>
    <Route path='/editUser/:id' element={<EditUser/>}/>
  </Routes>
  </BrowserRouter>
    </div>
  );
}

export default App;
