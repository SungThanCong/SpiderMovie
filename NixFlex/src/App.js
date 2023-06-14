import './App.css';
import React, { useState } from "react";
import { BrowserRouter, Route, Routes ,Navigate} from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import Home from './components/Pages/Home';
import Search from './components/Pages/Search';
import Footer from './components/Footer';
import Collection from './components/Pages/Collection';
import Product from './components/Pages/Product';
import Watch from './components/Pages/Watch';
import Checkout from './components/Pages/Checkout';
import Login from './components/Pages/Login';
import Register from './components/Pages/Register';
import NotFound from './components/Pages/NotFound';
import Explore from './components/Pages/Explore';
import Profile from './components/Pages/Profile';
import AdminLogin from './components/Admin/Login';
import AdminDashboard from './components/Admin/Dashboard';
import AdminUsers from './components/Admin/Users';




import { PaymentReturn } from './components/Pages/PaymentReturn';
import AdminPage from './components/Admin/AdminPage';

function App(props) {
  const [showNavbar, setShowNavbar] = useState(true);
  const [showFooter, setShowFooter] = useState(true);

  const handleShowNavbar = (show) => {
    setShowNavbar(show);
  };
  const handleShowFooter = (show) => {
    setShowFooter(show);
  };


  return (
    <div className="App">
      <BrowserRouter>
        {showNavbar && <Navbar onShowNavbar={handleShowNavbar} />}
        <Routes>
      
          <Route exact path='/' element={<Home onShowNavbar={handleShowNavbar} onShowFooter={handleShowFooter} />} />
          <Route path='/search' element={<Search onShowNavbar={handleShowNavbar} onShowFooter={handleShowFooter}/>} />
          <Route path='/cart' element={<Collection onShowNavbar={handleShowNavbar} onShowFooter={handleShowFooter}/>} />
          <Route path='/product' element={<Product onShowNavbar={handleShowNavbar} onShowFooter={handleShowFooter}/>} />
          <Route path='/watch' element={<Watch onShowNavbar={handleShowNavbar} onShowFooter={handleShowFooter}/>} />
          <Route path='/checkout' element={<Checkout onShowNavbar={handleShowNavbar} onShowFooter={handleShowFooter}/>} />
          <Route path='/explore' element={<Explore onShowNavbar={handleShowNavbar} onShowFooter={handleShowFooter}/>} />
          <Route path='/profile' element={<Profile onShowNavbar={handleShowNavbar} onShowFooter={handleShowFooter}/>} />
          <Route path='/payment_return' element={<PaymentReturn onShowNavbar={handleShowNavbar} onShowFooter={handleShowFooter}/>} />

          <Route
            path='/login'
            element={<Login onShowNavbar={handleShowNavbar} onShowFooter={handleShowFooter} />}
          />
           <Route
            path='/register'
            element={<Register onShowNavbar={handleShowNavbar} onShowFooter={handleShowFooter} />}
          />
          {/* <Route path='/admin/dashboard' element={<AdminDashboard />} /> */}

          <Route path="*" element={<NotFound onShowNavbar={handleShowNavbar} onShowFooter={handleShowFooter} />}/> 
          <Route exact path='/admin' element={isAdmin() ? ( <AdminPage onShowNavbar={handleShowNavbar} onShowFooter={handleShowFooter} /> ) : ( <Navigate to='/admin/login' /> )} />
          <Route path='/admin/index' element={isAdmin() ? ( <AdminPage onShowNavbar={handleShowNavbar} onShowFooter={handleShowFooter} /> ) : ( <Navigate to='/admin/login' /> )} />

          <Route path='/admin/login' element={<AdminLogin onShowNavbar={handleShowNavbar} onShowFooter={handleShowFooter} />} />
         

        </Routes>

        {showFooter && <Footer onShowFooter={handleShowFooter} />}

        
      </BrowserRouter>
    </div>
  );
}
const isAdmin = () => {
  const role = JSON.parse(localStorage.getItem('role'));
  return role && role === 1;
};

// const AdminRoute = ({ element: Component, ...rest }) => (
//   <Route {...rest} element={
//     isAdmin() ? (
//       <Component />
//     ) : (
//       <Navigate to='/admin/login' />
//     )
//   } />
// );


export default App;