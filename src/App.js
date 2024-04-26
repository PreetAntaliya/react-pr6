import ViewData from './pages/ViewData';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UpdateData from './pages/UpdateData';


function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ViewData/>}></Route>
        <Route path='/update/:editid' element={<UpdateData/>}></Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
