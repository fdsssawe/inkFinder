import React from "react";
import Card from "./Card";
import { useNavigate } from "react-router-dom";

const RenderCards = ({ data, title , exception}) => {

    const navigate = useNavigate()
    if (data?.length > 0) {
      return (
        data.map((post) => {
          if(post._id != exception){
          return (
          <Card key={post._id} {...post} onClick={()=>navigate(`/post/${post._id}`)}/>
          )
          }
        }
        )
      );
    }
  
    return (
      <div className='h-full lg:w-calc-screen-88 w-[98vw] flex justify-center mt-2 '>
      <h2 className="mt-5 font-bold text-[#ffffff] text-xl uppercase">{title}</h2>
      </div>
    );
  };

export default RenderCards