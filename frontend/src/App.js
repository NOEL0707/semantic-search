import './App.css';
import NavBar from './components/NavBar';
import "./input.css";
import {Routes,Route} from "react-router-dom"
import Footer from './components/Footer';
import Edit from './components/Edit';
import Search from './components/Search';
import Header from './components/Header';
import Insert from './components/Insert';
function App() {
  return (
    <div className="App flex-col gap-14 h-full">
    <NavBar/>
      <Header></Header>
      <div className='min-h-[100vh] mt-5'>
        <Routes>
          <Route path='/' element={<Search/>}></Route>
          <Route path="/edit/:id" element={<Edit/>}></Route>
          <Route path="/insert" element={<Insert/>}></Route>
        </Routes>
      </div>
      <Footer></Footer>
    </div>
  );
}
// <Footer/>
export default App;
