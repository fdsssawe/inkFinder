import SignUpForm from "../components/SignUpForm"
import LoginForm from "../components/LoginForm"
import UsersList from "../components/UsersList"
import AboutUs from "../pages/AboutUs"
import Home from "../pages/Home/Home"


export const pageRoutes = [
    {path : '' , element : Home, exact : true},
    {path : '/signup' , element : SignUpForm, exact : true},
    {path : '/login' , element : LoginForm, exact : true},
    {path : '/about' , element : AboutUs, exact : true},
    {path : '/users' , element : UsersList, exact : true},
]