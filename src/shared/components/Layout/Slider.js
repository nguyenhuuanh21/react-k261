import React, { useEffect, useState } from "react";
import { getSliders } from "../../../services/Api";
import { getSlidersImage } from "../../ultils";

const Slider = () => {
  const [sliders,setSliders]=useState([])
  useEffect(()=>{
    getSliders({params:{sort:-1,limit:10}})
    .then((res)=>setSliders(res.data.data))
    .catch((err)=>console.log(err))
  },[])
  return (
    <>
      <div id="slide" className="carousel slide" data-ride="carousel">
        {/* Indicators */}
        <ul className="carousel-indicators">
          {sliders.map((item,index)=>(
          <li data-target="#slide" data-slide-to={index} className={index === 0 ? "active" : ""} key={index} />
          ))}
        </ul>
        {/* The slideshow */}
        <div className="carousel-inner">
          {sliders.map((item,index)=>(
          <div className={`carousel-item ${index === 0 ? "active" : ""}`} key={index}>
            <img src={getSlidersImage(item.image)} alt="Vietpro Academy" />
          </div>
          ))}

        </div>
        {/* Left and right controls */}
        <a className="carousel-control-prev" href="#slide" data-slide="prev">
          <span className="carousel-control-prev-icon" />
        </a>
        <a className="carousel-control-next" href="#slide" data-slide="next">
          <span className="carousel-control-next-icon" />
        </a>
      </div>
    </>
  );
};

export default Slider;
