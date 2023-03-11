import SignUpForm from "../components/SignUpForm"
import LoginForm from "../components/LoginForm"
import UsersList from "../components/UsersList"
import AboutUs from "../pages/AboutUs"

export const pageRoutes = [
    {path : '' , element : SignUpForm, exact : true},
    {path : '/signup' , element : SignUpForm, exact : true},
    {path : '/login' , element : LoginForm, exact : true},
    {path : '/about' , element : AboutUs, exact : true},
    {path : '/users' , element : UsersList, exact : true},
]