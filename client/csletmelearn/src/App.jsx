import { useEffect, useState } from 'react'
import Header from './components/Header'
import { useDispatch } from 'react-redux'
import { checkAuth } from './store'
import { useSelector } from 'react-redux'
import UserService from './services/UserService'
import UsersList from './components/UsersList'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './components/AppRouter'


function App() {
  const [users, setUsers] = useState([])
  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.prodAuth.isAuth)
  const isLoading = useSelector(state => state.prodAuth.isLoading)

  useEffect(()=>{
    if(localStorage.getItem('token')){
      dispatch(checkAuth())
      getUsers()
    }
  },[])

  async function getUsers(){
    try{
      const response = await UserService.fetchUsers()
      setUsers(response.data)
    }
    catch(e){
    }
  }

  /*if(isLoading){
    return <div>Loading ...</div>
  }*/

  if(!isAuth){
    return(
      <BrowserRouter>
      <Header/>
      <AppRouter/>
      </BrowserRouter>
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
