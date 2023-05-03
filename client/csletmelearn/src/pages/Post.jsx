import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../http';
import Loader from '../components/Loader';
import RenderCards from "../components/RenderCards"
import { useSelector } from 'react-redux';




const Post = () => {
    
    const user = useSelector(state => state.prodAuth.user);
    const {id} = useParams()
    const [postInfo , setPostInfo] = useState('')
    const [userPosts , setUserPosts] = useState('')
    const [loading , setLoading] = useState(false)
    const [saving , setSaving] = useState(false)
    const [isSaved , setIsSaved] = useState(false)

    const navigate = useNavigate()

    const fetchPostInfo = async () => {
        setLoading(true)
        try {
            
            const response = await api.get(`/post/${id}`)
            setPostInfo(response.data)
            if (response) {
                const responseUserPosts = await api.get(`/user/${response.data.author}`)
                setUserPosts(responseUserPosts)
            }
        }
        catch (e) {
            console.log(e)
        }
        finally {
            setLoading(false)
        }
    }

    // /post/:id/save

    const savePost = async () =>{
        setSaving(true)
        try{
           // https://inkfinder2.azurewebsites.net/
           const response = await api.post(`/post/${id}/save`,{user : user.id})
           console.log(response)
        }
        catch (e) {
            console.log(e)
        }
        finally {
            setSaving(false)
        }
    }

    useEffect(()=>{
        fetchPostInfo() 
    },[id])

    useEffect(()=>{
        if(userPosts)
        if(user.postsSaved.includes(postInfo._id)){
            setIsSaved(true)
        }
        else{
            setIsSaved(false)
        }

    }, [userPosts, id, saving])


    return (
        <section class="text-white bg-gray-900 dark:[color-scheme:dark] min-h-screen">
            <div className='flex w-full justify-center pt-24'>
                <div className='grid  h-[32rem] w-[62.438rem] rounded-[2.5rem] mb-4 grid-rows-1 grid-cols-2'>
                    {loading ? <div className='flex items-center justify-center'><Loader /></div> :
                        <img src={postInfo.photo} className='rounded-l-[2.5rem] h-[31.75rem]'></img>}
                    <div className='border-green-500 border-2 rounded-r-[2.5rem] h-[31.75rem]'>
                        {loading ? <div className='flex items-center justify-center h-full'><Loader /></div> :
                            <div className='flex flex-col h-full'>
                                <div className='w-full px-5 flex items-center text-center text-xl h-20'>
                                    <div className="w-[3rem] h-[3rem] rounded-full object-cover bg-green-500 flex justify-center items-center text-white text-xs font-bold mr-5" onClick={() => navigate(`/account/${userPosts?.data?.profileOwner._id}`)}>
                                        <svg width="20" height="24" viewBox="0 0 50 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M23.0625 0.671878C16.1406 1.40625 10.1719 6.4375 8.20312 13.2188C6.29688 19.8281 8.65625 27.375 13.9375 31.5156C14.5938 32.0313 15.1406 32.5 15.1406 32.5469C15.1562 32.5938 14.7812 32.7969 14.3438 33C12.8906 33.6563 10.75 35.0313 9.25 36.25C5.17188 39.5469 2.15625 44.2031 0.84375 49.2344C0.453125 50.7344 0 53.7813 0 54.8906V55.5H2.46875H4.9375L5.14062 53.6719C5.625 48.9375 7.375 45.0781 10.5469 41.7656C16.2031 35.8438 24.5938 33.9688 32.2969 36.9063C37.8125 39.0156 42.2031 43.7031 44.0469 49.4688C44.5469 51 44.9844 53.5625 45 54.8281V55.5H47.5H50V54.6719C50 53.4531 49.5781 50.7813 49.1406 49.125C47.3125 42.2656 42.2812 36.125 36.0625 33.1875C35.3906 32.8594 34.8594 32.5781 34.8594 32.5313C34.8594 32.4844 35.2812 32.1406 35.8125 31.75C37.7969 30.2813 40.0156 27.3906 41.0625 24.9531C45.6562 14.1406 38.5469 1.9375 26.9062 0.671878C25.1406 0.484378 24.8594 0.484378 23.0625 0.671878ZM26.8438 5.65625C33.3594 6.71875 37.8594 12.2813 37.4531 18.7813C37.1094 24.1875 33.5781 28.5469 28.3281 30.0625C26.7188 30.5313 23.4375 30.5625 21.875 30.1406C14.8125 28.1875 10.9062 20.9375 13.2031 13.9844C15.0625 8.35938 21.0312 4.71875 26.8438 5.65625Z" fill="#111827" />
                                        </svg>
                                    </div>
                                    {userPosts?.data?.profileOwner.email}
                                    {isSaved ?

                                        <button
                                            onClick={() => savePost()}
                                            type="submit"
                                            className="flex text-white bg-gray-400 border-0 py-2 px-6 focus:outline-none hover:bg-gray-600 rounded-[2rem] ml-auto text-center"
                                        >
                                            Saved
                                        </button>

                                        : <button
                                            onClick={() => savePost()}
                                            type="submit"
                                            className="flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded-[2rem] ml-auto"
                                        >
                                            {saving ? "Saving..." : "Save"}
                                        </button>}
                                </div>
                                <div className='w-full px-6 flex items-center text-center text-xl h-10 text-white '>
                                    {postInfo.prompt}
                                </div>
                                <div className='w-full flex items-center justify-center text-center text-xl h-full text-gray-400 '>
                                    Soon...
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <p className='flex justify-center text-white text-xl title-font font-medium mb-4'>More from the author</p>
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3 lg:mx-48 md:mx-12 sm:mx-12">
                {loading ? <div className='flex items-center justify-center'><Loader /></div> :
                    <RenderCards data={userPosts?.data?.posts} title={"No posts yet"} exception={postInfo._id} />}
            </div>


        </section>
    );
};

export default Post;
