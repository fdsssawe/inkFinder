import SignUpForm from "../components/SignUpForm"
import LoginForm from "../components/LoginForm"
import UsersList from "../components/UsersList"
import AboutUs from "../pages/AboutUs"
import Home from "../pages/Home/Home"
import DesignGenerator from "../pages/DesignGenerator"
import Catalog from "../pages/Catalog"
import Create from "../pages/Create"
import Account from "../pages/Account"
import Post from "../pages/Post"



export const pageRoutes = [
    {path : '' , element : Home, exact : true},
    {path : '/signup' , element : SignUpForm, exact : true},
    {path : '/login' , element : LoginForm, exact : true},
    {path : '/about' , element : AboutUs, exact : true},
    {path : '/users' , element : UsersList, exact : true},
    {path : '/dalle' , element : DesignGenerator, exact : true},
    {path : '/catalog' , element : Catalog, exact : true},
    {path : '/create' , element : Create, exact : true},
    {path : '/account/:id' , element : Account, exact : true},
    {path : '/post/:id' , element : Post, exact : true},
]