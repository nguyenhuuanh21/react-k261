import React, { useEffect, useState } from "react";
import { getBanners } from "../../../services/Api";
import { getBannerImage } from "../../ultils";

const Sidebar = () => {
  const [banners,setBanners]=useState([])
  useEffect(() => {
    getBanners({params:{sort:-1,limit:10}})
    .then((res)=>setBanners(res.data.data))
    .catch((err)=>console.log(err))
  },[])
  return (
    <>
      <div id="sidebar" className="col-lg-4 col-md-12 col-sm-12">
        <div id="banner">
          {banners.map((item,index)=>(
          <div className="banner-item" key={index}>
            <a href={item.url}>
              <img className="img-fluid" src={getBannerImage(item.image)} />
            </a>
          </div>
          ))}

        </div>
      </div>
    </>
  );
};

export default Sidebar;
