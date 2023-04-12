import React, { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import FormField from '../components/FormField';
import preview from "../media/preview.svg"
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import api from "../http/index.js"

const Create = () => {

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
            author: user.email,
            name: user.email,
          }));
        }
      }, [user]);


    const [generatingImg , setGeneratingImg] = useState(false)
    const [loading , setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(form.prompt && form.photo){
            setLoading(true);
            try{    
                console.log("fdd")
                const response = await api.post('https://inkfinder2.azurewebsites.net/api/newposts', form, {
                    headers: {
                      'Content-Type': 'application/json'
                    }
                  })
                // navigate()
            }catch(e){
                console.log(e)
            }finally{
                setLoading(false)
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
            <section class="text-gray-400 bg-gray-900 body-font overflow-hidden">
                <div class="container pt-24 mx-auto lg:min-h-screen">
                    <div class="lg:w-4/5 mx-auto flex flex-wrap">
                    <div className="relative bg-gray-900 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-[500px] p-0.5 h-[500px] flex justify-center items-center">
                        { form.photo ? (
                        <img
                            src={form.photo}
                            alt={form.prompt}
                            className="w-full h-full object-contain"
                        />
                        ) : (
                        <img
                            src={preview}   
                            alt="preview"
                            className="w-9/12 h-9/12 object-contain opacity-70"
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
                        <p class="leading-relaxed">
                            Add tags to the design , so it will be easier for users to find your post!
                        </p>
                        <FormField
                        labelName="Prompt"
                        type="text"
                        name="prompt"
                        placeholder="Example : Blackwork , Japanese , Tribal , Watercolor "
                        value={form.prompt}
                        handleChange = {handleChange}
                        />
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