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
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = allPosts.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase()));
        setSearchedResults(searchResult);
      }, 500),
    );
  };

  return (
    <div className=' flex-col items-center lg:pt-46 md:pt-20  bg-gray-900 min-h-screen pb-[150px]'>
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-white text-[32px]">Community Showcase</h1>
        <p className="mt-2 text-[#b6c4cf] text-[14px] max-w-[500px]">Сollection of imaginative and stunning designs made by other users or generate by DALL-E</p>
      </div>

      <div className="mt-10">
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
              <h2 className="font-medium text-[#666e75] text-xl mb-3">
                Showing Resuls for <span className="text-[#222328]">{searchText}</span>:
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
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