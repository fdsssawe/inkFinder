import React from 'react';
import { useState , useEffect } from 'react';
import FormField from '../components/FormField';
import Card from '../components/Card';
import Loader from '../components/Loader';
import api from '../http';
import RenderCards from "../components/RenderCards"
import { useSelector } from 'react-redux';
import PostService from '../services/PostService';


const Catalog = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);
  const [sortedPosts, setSortedPosts] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState(null);
  const isAuth = useSelector(state => state.prodAuth.isAuth);
  const user = useSelector(state => state.prodAuth.user);


  
  useEffect(() => {

    PostService.fetchPosts(setLoading, setAllPosts, setSortedPosts, isAuth, user);

  }, []);

  useEffect(() => {

    PostService.fetchPosts(setLoading, setAllPosts, setSortedPosts, isAuth, user)

  }, [user , isAuth]);


  const handleSearchChange = (e) => {
    const searchTextValue = e.target.value;
    setSearchText(searchTextValue);
  
    clearTimeout(searchTimeout);
  
    setSearchTimeout(
      setTimeout(() => {
        if(isAuth){
        const searchResult = sortedPosts.filter(
          (item) =>
            item.name.toLowerCase().includes(searchTextValue.toLowerCase()) ||
            item.prompt.toLowerCase().includes(searchTextValue.toLowerCase())
        );
        setSearchedResults(searchResult);
        }
        else{
          const searchResult = allPosts.filter(
            (item) =>
              item.name.toLowerCase().includes(searchTextValue.toLowerCase()) ||
              item.prompt.toLowerCase().includes(searchTextValue.toLowerCase())
          );
          setSearchedResults(searchResult);
        }
      }, 500)
    );
  };
  

  return (
    <div className=' flex-col items-center lg:pt-46 md:pt-20  bg-gray-900 min-h-screen pb-[150px]'>
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-white md:text-[2rem] text-[1.2rem] text-center lg:text-start pt-4 lg:pt-0">Community Showcase</h1>
        <p className="mt-2 text-[#b6c4cf] md:text-[14px] lg:max-w-[500px] w-full text-[1rem] text-center lg:text-start">Сollection of imaginative and stunning designs made by other users or generate by DALL-E</p>
      </div>

      <div className="mt-10 px-2">
        <FormField
          type="text"
          name="text"
          placeholder="Search something..."
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>

      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="font-medium text-[#ffffff] text-xl mb-3">
                Showing Resuls for <span className="text-green-400 font-bolds">{searchText}</span>:
              </h2>
            )}
            <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-3 px-2">
              {searchText ? (
                <RenderCards
                  
                  data={searchedResults}
                  title="No Search Results Found"
                />
              ) : (
                <RenderCards
                  data={isAuth==true ? sortedPosts : allPosts}
                  title=" "
                />
              )}
            </div>
          </>
        )}
      </div>
    </section>
    </div>
  );
};

export default Catalog;