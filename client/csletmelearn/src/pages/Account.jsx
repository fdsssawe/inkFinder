import React from 'react';
import Card from '../components/Card';
import Loader from '../components/Loader';
import api from "../http/index.js"
import { useEffect , useState} from 'react';
import { Tab} from '@headlessui/react'
import {useParams} from 'react-router-dom'
import RenderCards from '../components/RenderCards';
import { useSelector } from 'react-redux';

const Account = () => {

    const {id} = useParams()
    const [isLoading, setLoading] = useState(false);
    const [allPosts, setAllPosts] = useState(null);
    const [savedPosts, setSavedPosts] = useState(null);
    const [user , setUser] = useState(null)

    const fetchPosts = async () => {
        setLoading(true);
    
        try {
           // https://inkfinder2.azurewebsites.net/
            const response = await api.get(`https://inkfinder2.azurewebsites.net/api/user/${id}`)
            const fetchedSavedPosts = await api.get(`https://inkfinder2.azurewebsites.net/api/user/${id}/saved`)
          if (response) {
            const result = await response;
            setAllPosts(result.data.posts.reverse());
            setUser(result.data.profileOwner)
          }
          if(fetchedSavedPosts){
            setSavedPosts(fetchedSavedPosts.data)
          }
        } catch (err) {
          alert(err);
        } finally {
          setLoading(false);
        }
      };

      useEffect(() => {
        fetchPosts();
    },[]);
    


    return (
        <div className=' flex-col items-center lg:pt-46 md:pt-20  bg-gray-900 min-h-screen'>
        <section className="max-w-7xl mx-auto">
        <div className='flex justify-center mb-6'>
          <div className="w-[120px] h-[120px] rounded-full object-cover bg-green-500 flex justify-center items-center text-white text-5xl font-bold">
          <svg width="50" height="56" viewBox="0 0 50 56" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M23.0625 0.671878C16.1406 1.40625 10.1719 6.4375 8.20312 13.2188C6.29688 19.8281 8.65625 27.375 13.9375 31.5156C14.5938 32.0313 15.1406 32.5 15.1406 32.5469C15.1562 32.5938 14.7812 32.7969 14.3438 33C12.8906 33.6563 10.75 35.0313 9.25 36.25C5.17188 39.5469 2.15625 44.2031 0.84375 49.2344C0.453125 50.7344 0 53.7813 0 54.8906V55.5H2.46875H4.9375L5.14062 53.6719C5.625 48.9375 7.375 45.0781 10.5469 41.7656C16.2031 35.8438 24.5938 33.9688 32.2969 36.9063C37.8125 39.0156 42.2031 43.7031 44.0469 49.4688C44.5469 51 44.9844 53.5625 45 54.8281V55.5H47.5H50V54.6719C50 53.4531 49.5781 50.7813 49.1406 49.125C47.3125 42.2656 42.2812 36.125 36.0625 33.1875C35.3906 32.8594 34.8594 32.5781 34.8594 32.5313C34.8594 32.4844 35.2812 32.1406 35.8125 31.75C37.7969 30.2813 40.0156 27.3906 41.0625 24.9531C45.6562 14.1406 38.5469 1.9375 26.9062 0.671878C25.1406 0.484378 24.8594 0.484378 23.0625 0.671878ZM26.8438 5.65625C33.3594 6.71875 37.8594 12.2813 37.4531 18.7813C37.1094 24.1875 33.5781 28.5469 28.3281 30.0625C26.7188 30.5313 23.4375 30.5625 21.875 30.1406C14.8125 28.1875 10.9062 20.9375 13.2031 13.9844C15.0625 8.35938 21.0312 4.71875 26.8438 5.65625Z" fill="#111827"/>
          </svg>
          </div>
        </div>
          <div>
            <h1 className=" text-white text-[32px] flex justify-center">{user?.email}</h1>
            <Tab.Group>
              <Tab.List className="flex justify-center item-center gap-5 pt-6">
                <Tab className="text-white"> Created </Tab>
                <Tab className="text-white"> Saved </Tab>
              </Tab.List>
              <Tab.Panels>
                <Tab.Panel>
                {!isLoading ? <div className="mt-10">
                  <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
                      <RenderCards data={allPosts} title={"No saved created yet"}/>
                  </div>
                </div>
                :
                  <div className='w-full h-full flex justify-center mt-20'><Loader></Loader></div>
                }
                </Tab.Panel>
                <Tab.Panel>
                  {!isLoading ? 
                  <div className="mt-10">
                  <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
                        <RenderCards data={savedPosts} title={"No saved posts yet"}/>
                    </div>
                  </div>
                  : <Loader></Loader>
                  }
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
    
        </section>
        </div>
      );
};

export default Account;