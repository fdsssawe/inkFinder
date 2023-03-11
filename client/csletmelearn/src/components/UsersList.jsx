import React from 'react';
import { useEffect , useState } from 'react';
import UserService from '../services/UserService';

const UsersList = () => {
    const [users, setUsers] = useState([])
    useEffect(()=>{
        if(localStorage.getItem('token')){
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
    return (
        <div className=' flex-col items-center lg:pt-46 md:pt-20  bg-gray-900 h-screen'>
            <section class="text-gray-400 bg-gray-900 body-font">
                <div class="container px-5  mx-auto">
                    <div class="flex flex-col text-center w-full mb-20">
                    <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">User list</h1>
                    </div>
                    {users.map((user,id)=>{
                        return(
                        <div class="p-2 lg:w-1/3 md:w-1/2 w-full">
                            <div class="h-full flex items-center border-gray-800 border p-4 rounded-lg">
                            <div class="flex-grow">
                                <h2 class="text-white title-font font-medium">{user.email}</h2>
                                <p class="text-gray-600">Id of the user : {id+1}</p>
                            </div>
                            </div>
                        </div>
                        )
                    })}
                </div>
            </section>
        </div>
    );
};

export default UsersList;