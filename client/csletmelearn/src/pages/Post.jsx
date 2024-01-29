import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../http';
import Loader from '../components/Loader';
import RenderCards from "../components/RenderCards"
import { useSelector } from 'react-redux';




const Post = () => {
    
    const user = useSelector(state => state.prodAuth.user);
    const isAuth = useSelector(state => state.prodAuth.isAuth);
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
        if(user.postsSaved){
        if(user.postsSaved.includes(postInfo._id)){
            setIsSaved(true)
        }
        else{
            setIsSaved(false)
        }
        }

    }, [userPosts, id, saving])


    return (
        <section class="text-white bg-gray-900 dark:[color-scheme:dark] min-h-screen pb-[150px]">
            <div className='flex w-full justify-center lg:pt-24 md:pt-12'>
                <div className='lg:grid lg:h-[32rem] lg:w-[62.438rem] lg:rounded-[2.5rem] mb-4 lg:grid-rows-1 lg:grid-cols-2 flex flex-col '>
                    {loading ? <div className='flex items-center justify-center'><Loader /></div> :
                        <div className='flex justify-center lg:justify-start mt-12 md:mt-0 mb-2 md:mb-0'><img src={postInfo.photo} className='lg:rounded-l-[2.5rem] md:rounded-l-[1.5rem] lg:h-[31.75rem] md:h-[35rem]'></img></div>}
                    <div className='lg:border-green-500 lg:border-2 lg:rounded-r-[2.5rem] lg:h-[31.75rem]'>
                        {loading ? <div className='flex items-center justify-center h-full'><Loader /></div> :
                            <div className='flex flex-col lg:h-full h-fit '>
                                <div className='w-full lg:px-5 px-2 flex items-center text-center lg:text-xl text-[1.2rem] h-20'>
                                    <svg className='mr-2' width="38" height="38" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => navigate(`/account/${userPosts?.data?.profileOwner._id}`)}>
                                    <circle cx="50" cy="50" r="50" fill="#22C55E"/>
                                    <path d="M48.0625 23.1407C41.1406 23.8755 35.1719 28.9096 33.2031 35.6947C31.2969 42.3078 33.6562 49.859 38.9375 54.002C39.5938 54.5179 40.1406 54.9869 40.1406 55.0338C40.1562 55.0807 39.7812 55.284 39.3438 55.4872C37.8906 56.1438 35.75 57.5196 34.25 58.7391C30.1719 62.0378 27.1562 66.6967 25.8438 71.7308C25.4531 73.2317 25 76.2803 25 77.3903V78H27.4688H29.9375L30.1406 76.1708C30.625 71.4338 32.375 67.5722 35.5469 64.2578C41.2031 58.3326 49.5938 56.4565 57.2969 59.3957C62.8125 61.5063 67.2031 66.1964 69.0469 71.9653C69.5469 73.4974 69.9844 76.0614 70 77.3277V78H72.5H75V77.1714C75 75.952 74.5781 73.2786 74.1406 71.6214C72.3125 64.7581 67.2812 58.614 61.0625 55.6748C60.3906 55.3465 59.8594 55.0651 59.8594 55.0182C59.8594 54.9713 60.2812 54.6273 60.8125 54.2365C62.7969 52.7669 65.0156 49.8746 66.0625 47.4358C70.6562 36.6171 63.5469 24.407 51.9062 23.1407C50.1406 22.9531 49.8594 22.9531 48.0625 23.1407ZM51.8438 28.1279C58.3594 29.191 62.8594 34.7567 62.4531 41.2604C62.1094 46.6697 58.5781 51.0316 53.3281 52.548C51.7188 53.0171 48.4375 53.0483 46.875 52.6262C39.8125 50.672 35.9062 43.4179 38.2031 36.4608C40.0625 30.8326 46.0312 27.1899 51.8438 28.1279Z" fill="#111827"/>
                                    </svg>

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
                                            onClick={isAuth ? () => savePost() : () => 0}
                                            type="submit"
                                            className={
                                                isAuth ? "flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded-[2rem] ml-auto" : "flex text-white bg-gray-500 border-0 py-2 px-6 focus:outline-none hover:bg-gray-600 rounded-[2rem] ml-auto"
                                            }
                                        >
                                            {saving ? "Saving..." : "Save"}
                                        </button>}
                                </div>
                                <div className='w-full lg:mt-6 px-6 flex items-center text-center lg:text-xl text-lg lg:h-10 h-6 text-white '>
                                    {postInfo.prompt}
                                </div>
                                <div className='w-full flex items-center justify-center text-center text-xl lg:h-full text-gray-400 h-0 scale-0'>
                                    Soon...
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <p className='flex justify-center text-white text-xl title-font font-medium mb-4 mt-6'>More from the author</p>
            <div className="lg:columns-5 md:columns-3 columns-2 gap-y-40 px-2 lg:px-4">
                {loading ? <div className='flex items-center justify-center'><Loader /></div> :
                    <RenderCards data={userPosts?.data?.posts} title={"No posts yet"} exception={postInfo._id} />}
            </div>


        </section>
    );
};

export default Post;
