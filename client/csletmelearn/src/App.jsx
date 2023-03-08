import { useEffect, useState } from 'react'
import Header from './components/Header'
import LoginForm from './components/LoginForm'
import { useDispatch } from 'react-redux'
import { checkAuth } from './store'
import { useSelector } from 'react-redux'
import UserService from './services/UserService'
import UsersList from './components/UsersList'


function App() {
  const [users, setUsers] = useState([])
  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.prodAuth.isAuth)
  const isLoading = useSelector(state => state.prodAuth.isLoading)

  useEffect(()=>{
    getUsers()
    if(localStorage.getItem('token')){
      dispatch(checkAuth())
    }
  },[])

  async function getUsers(){
    try{
      const response = await UserService.fetchUsers()
      setUsers(response.data)
    }
    catch(e){
       console.log(e)
    }
  }

  /*if(isLoading){
    return <div>Loading ...</div>
  }*/

  if(!isAuth){
    return(
      <div>
      <Header/>
      <LoginForm/>
      </div>
    )
  }

  /*<h1>{isAuth ? "User logined in" : "dsdsd"}</h1>*/

  /*
            <button onClick={getUsers}>
            Show users
          </button>
  */

  return (
    <div className="App">
        <div>
          <Header/>
          <div className=' flex-col items-center lg:pt-46 md:pt-20  bg-gray-900 h-screen'>
          {isLoading ? [] : <UsersList users={users}/>}
          </div>
        </div>
    </div>
  )
}

export default App
