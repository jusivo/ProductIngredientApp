import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Main from './frontend/Main/Main';
import Header from './frontend/Header/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <Router>
      <div className="App">
      <Header/>
      <Main/>

        <main>
          <Routes>
          <Route path="/main" element ={<Main/>}/>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
