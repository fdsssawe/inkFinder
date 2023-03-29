import React, { useState } from 'react';
import axios from 'axios';
import UserService from '../services/UserService';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import FormField from '../components/FormField';
import preview from "../media/preview.svg"

const DesignGenerator = () => {

    const [form, setForm] = useState({
        name: '',
        prompt: '',
        photo: '',
      });

    const [generatingImg , setGeneratingImg] = useState(false)

    const handleSubmit = () => {
        
    }

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const generateImage = async () => {
        if (form.prompt) {
          try {
            setGeneratingImg(true);
            const response = await fetch('https://inkfinder2.azurewebsites.net/api/dalle', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                prompt: `${form.prompt} , tattoo , tattoo style , 50mm`,
              }),
            });
    
            const data = await response.json();
            setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
          } catch (err) {
            alert(err);
          } finally {
            setGeneratingImg(false);
          }
        } else {
          alert('Please provide proper prompt');
        }
      };

    return (
        <div>
            {/* <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
                <FormField
                labelName="Prompt"
                type="text"
                name="prompt"
                placeholder="Example of the prompt : unicorn with a burger on its horn and fries in his mouth"
                value={form.prompt}
                handleChange = {handleChange}
                />
    
            <div className="relative bg-gray-900 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-0.5 h-64 flex justify-center items-center">
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
            <div className="mt-5 flex gap-5">
                <button
                    type="button"
                    onClick={generateImage}
                    className=" text-white bg-green-500 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                >
                    {generatingImg ? 'Generating...' : 'Generate'}
                </button>
            </div>

            </form> */}
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
                        <h1 class="text-white text-3xl title-font font-medium mb-1">Dall-e 2 design generator</h1>
                        <div class="flex mb-4">
                        </div>
                        <p class="leading-relaxed">
                            Use Dall-e 2 features to create uniqe tattoo design for yourself. We took care about prompt that will provide good quality and format , so you will get sketch that
                            you can use as reference or even make a stencil with it. 
                        </p>
                        <div class="flex mt-6 items-center pb-5 border-b-2 border-gray-800 mb-5"></div>
                        <form className=" max-w-3xl" onSubmit={handleSubmit}>
                        <h1 class="text-white text-xl title-font font-medium mb-1">Prompts</h1>
                        <p class="leading-relaxed">
                            Use your imagination to describe tattoo you want  , and look what dall-e will draw for you!
                        </p>
                        <FormField
                        labelName="Prompt"
                        type="text"
                        name="prompt"
                        placeholder="Example of the prompt : unicorn with a burger on its horn and fries in his mouth"
                        value={form.prompt}
                        handleChange = {handleChange}
                        />
                        </form>
                        <div class="flex mt-6 items-center pb-5 border-b-2 border-gray-800 mb-5"></div>
                        <div class="flex justify-center lg:justify-start">
                        <button
                                type="button"
                                onClick={generateImage}
                                className="flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded"
                            >
                                {generatingImg ? 'Generating...' : 'Generate'}
                        </button>
                        </div>
                    </div>
                    </div>
                </div>
            </section>
        </div>
    )
};

export default DesignGenerator;