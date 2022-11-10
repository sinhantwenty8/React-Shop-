import 'bootstrap/dist/css/bootstrap.min.css';
import SignInForm from './AccountActivity/SignIn/SignInForm';
import SignUpForm from './AccountActivity/SignUp/SignUpForm';
import {Route,Routes} from 'react-router-dom'
import Header from './Header/Header';
import Dashboard from './dashboard/Dashboard'
import { Navigate } from 'react-router';
import ItemDetail from './Shop/ItemDetail/ItemDetail';
import style from'./App.module.css'
import Cart from './Cart/Cart';
import Notification from './Notification/Notification';
import { useNotification } from './Notification/NotificationContext';
import SearchBar from './Search Bar/SearchBar';
import { useAuth } from './Context/AuthContext';


function App() {
  const {currentUser} = useAuth()
  const {activeNotification} = useNotification()
  
  return (
      <div className={style.App}>
        <Header className ={style.header}></Header>
        {currentUser && <SearchBar></SearchBar>}
        <Routes>
            {!currentUser&&
            <Route path ='/sign-in' element = {<SignInForm></SignInForm>} exact></Route>}
            {!currentUser &&
            <Route path ='/sign-up' element = {<SignUpForm></SignUpForm>} exact></Route>} 
            {!currentUser && 
            <Route path ='*' element = {<Navigate to = "/sign-in"> </Navigate>} exact></Route>}   
            {currentUser && <Route path ='/dashboard' element={<Dashboard></Dashboard>} exact></Route>}
            {currentUser && <Route path = {'/item/:productId'} element={<ItemDetail></ItemDetail>} exact></Route>}
            {currentUser && <Route path = '/cart' element={<Cart></Cart>} exact></Route>}
            {currentUser && <Route path = '*' element = {<Navigate to = "/dashboard"> </Navigate>}></Route>}
        </Routes>
        <Notification message = {activeNotification}></Notification>
      </div>
  );
}

export default App;
