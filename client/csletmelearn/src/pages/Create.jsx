import React, { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import FormField from '../components/FormField';
import preview from "../media/preview.svg"
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import api from "../http/index.js"
import TagSellector from '../components/TagSellector';


const Create = () => {

    const navigate = useNavigate()

    const [form, setForm] = useState({
        author: '',
        name: '',
        prompt: '',
        photo: '',
      });
    
      const user = useSelector(state => state.prodAuth.user);
    
      useEffect(() => {
        if (user) {
          setForm(prevState => ({
            ...prevState,
            author: user.id,
            name: user.email,
          }));
        }
      }, [user]);
    
    const [generatingImg , setGeneratingImg] = useState(false)
    const [loading , setLoading] = useState(false)
    const [selected, setSelected] = useState("None")


    const handleSubmit = async (e) => {
        e.preventDefault()
        if(form.prompt && form.photo){
            setLoading(true);
            if(selected){
                // setForm({...form , prompt : `${form.prompt} , ${selected}`})
                const confirmedForm = {
                    author : form.author,
                    name : form.name,
                    prompt : `${form.prompt} , ${selected}`,
                    photo : form.photo,
                }

                try{  
                    const response = await api.post('/newposts', confirmedForm , {
                        headers: {
                          'Content-Type': 'application/json'
                        }
                      })
                    navigate(`/post/${response.data.data._id}`)
                }catch(e){
                    console.log(e)
                }finally{
                    setLoading(false)
                }
            }
            else{
                try{  
                    const response = await api.post('/newposts', form , {
                        headers: {
                        'Content-Type': 'application/json'
                        }
                    })
                    navigate(`/post/${response.data.data._id}`)
                }catch(e){
                    console.log(e)
                }finally{
                    setLoading(false)
                }
            } 
        }
        else {
            alert("Please enter a prompt and generate an image")
        }
    }

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const reader = new FileReader()


    return (
        <div>
            <section class="text-gray-400 bg-gray-900 body-font overflow-hidden pb-[200px] lg:pb-0">
                <div class="container pt-24 mx-auto min-h-screen">
                    <div class="lg:w-4/5 mx-auto flex flex-wrap md:justify-start justify-center">
                    <div className="relative bg-gray-900 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 lg:w-[500px] p-0.5 lg:h-[500px] h-[320px] w-[320px] flex justify-center items-center">
                        { form.photo ? (
                        <img
                            src={form.photo}
                            alt={form.prompt}
                            className="lg:w-full lg:h-full h-[250px] w-[250px] object-contain"
                        />
                        ) : (
                        <img
                            src={preview}   
                            alt="preview"
                            className="lg:w-9/12 lg:h-9/12 h-[250px] w-[250px] object-contain opacity-70"
                        />
                        )}

                        {generatingImg && (
                        <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                            <Loader/>
                        </div>
                        )}
                    </div>
                    <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                        <h1 class="text-white text-3xl title-font font-medium mb-1">Upload your tattoo design</h1>
                        <div class="flex mb-4">
                        </div>
                        {/* <p class="leading-relaxed">
                            Enter the name of your post. It will be visible for othe users.
                        </p>
                        <FormField
                        labelName="Name"
                        type="name"
                        name="prompt"
                        placeholder="Example : heart-shaped crab"
                        value={form.name}
                        handleChange = {handleChange}
                        /> */}
                        <div class="flex mt-1 items-center pb-5 border-b-2 border-gray-800 mb-5"></div>
                        <form className=" max-w-3xl" onSubmit={handleSubmit}>
                        <h1 class="text-white text-xl title-font font-medium mb-1">Tags</h1>
                        <p class="leading-relaxed mb-2">
                            Add tags to the design , so it will be easier for users to find your post!
                        </p>
                        <FormField 
                        type="text"
                        name="prompt"
                        placeholder="Example : Blackwork , Japanese , Tribal , Watercolor "
                        value={form.prompt}
                        handleChange = {handleChange}
                        />
                        <p class="leading-relaxed mt-4">
                            Add one tag from our list.
                        </p>
                        <TagSellector selected={selected} setSelected={setSelected} />
                        <div class="flex mt-1 items-center pb-5 border-b-2 border-gray-800 mb-5"></div>
                        <div class="flex justify-center lg:justify-start">
                        <label className="flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded ml-5">
                            Upload
                        <input
                        type="file"
                        id="file"
                        accept=".jpg, .jpeg, .png"
                        onChange={(e) => {
                            reader.onloadend = () => {
                                const base64String = btoa(reader.result);
                                setForm({...form , photo : `data:image/jpeg;base64,${base64String}`})
                              };
                              
                            reader.readAsBinaryString(e.target.files[0]);
                        }}
                        required
                        />
                        </label>
                        <button 
                            type="submit"
                            className="flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded ml-5"
                        >
                            {loading ? 'Sharing...' : 'Share'}
                        </button>
                        </div>
                        </form>
                    </div>
                    </div>
                </div>
            </section>
        </div>
    )
};

export default Create;