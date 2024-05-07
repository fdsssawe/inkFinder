import React, { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import FormField from '../components/FormField';
import preview from "../media/preview.svg"
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import api from "../http/index.js"
import TagSellector from '../components/TagSellector';

const DesignGenerator = () => {

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

    const generateImage = async () => {
        if (form.prompt) {
          try {
            setGeneratingImg(true);
            const response = await api.post('/dalle',{
              prompt: `Generate a unique , colorful , centered with paddings and visually appealing tattoo design incorporating ${form.prompt} tatoo , `,
            },
             {
              headers: {
                'Content-Type': 'application/json',
              },
              // body: JSON.stringify({
              //   prompt: `${form.prompt} , tattoo , tattoo style , 50mm`,
              // }),
            });
            const data = await response.data;
            setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
          } catch (err) {
            console.log(err);
            alert("Author runed out of DALL-E credits");
          } finally {
            setGeneratingImg(false);
          }
        } else {
          alert('Please provide proper prompt');
        }
      };

    return (
        <div>
            <section class="text-gray-400 bg-gray-900 body-font overflow-hidden min-h-screen pb-[150px]">
                <div class="container pt-24 mx-auto">
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
                        <p class="leading-relaxed mt-4">
                            Add one tag from our list.
                        </p>
                        <TagSellector selected={selected} setSelected={setSelected} />
                        <div class="flex mt-6 items-center pb-5 border-b-2 border-gray-800 mb-5"></div>
                        <div class="flex justify-center lg:justify-start">
                        <button
                                type="button"
                                onClick={generateImage}
                                className="flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded"
                            >
                                {generatingImg ? 'Generating...' : 'Generate'}
                        </button>
                        <button 
                            type="submit"
                            className="flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded ml-5"
                        >
                            {loading ? 'Sharing...' : 'Share with the Community'}
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

export default DesignGenerator;