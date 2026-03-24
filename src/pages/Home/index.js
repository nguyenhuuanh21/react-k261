import React, { useEffect, useRef, useState } from "react";
import { getProducts } from "../../services/Api";
import Loading from "../../shared/components/Loading";
import ProductItem from "../../shared/components/product-item";
import Popup from "../../shared/components/Popup";

const Home = () => {
  const [latestProductLoading, setLatestProductLoading] = useState(true);
  const [latestProduct, setLatestProduct] = useState([]);
  const [featuredProductLoading, setFeaturedProductLoading] = useState(true);
  const [featuredProduct, setFeaturedProduct] = useState([]);
  const dialog = useRef();
  useEffect(() => {
    getProducts({ params: { limit: 6 } })
      .then((res) => {
        setLatestProduct(res.data.data);
        setLatestProductLoading(false);
        const popupShown = sessionStorage.getItem("popupHomeShown");

        if (!popupShown) {
          setTimeout(() => {
            dialog.current?.showModal();
            sessionStorage.setItem("popupHomeShown", "true");
          }, 3000);
        }
      })
      .catch((err) => console.log(err));
    getProducts({ params: { limit: 6, is_featured: true } })
      .then((res) => {
        setFeaturedProduct(res.data.data);
        setFeaturedProductLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <Popup ref={dialog} image="images/image.png" />
      {/*	Feature Product	*/}
      <div className="products">
        <h3>Sản phẩm nổi bật</h3>
        <div className="section-body">
          {featuredProductLoading ? (
            <Loading />
          ) : (
            <div className="product-list card-deck">
              {featuredProduct.map((product) => (
                <ProductItem item={product} key={product._id} />
              ))}
            </div>
          )}
        </div>
      </div>
      {/*	End Feature Product	*/}
      {/*	Latest Product	*/}
      <div className="products">
        <h3>Sản phẩm mới</h3>
        <div className="section-body">
          {latestProductLoading ? (
            <Loading />
          ) : (
            <div className="product-list card-deck">
              {latestProduct.map((product) => (
                <ProductItem item={product} key={product._id} />
              ))}
            </div>
          )}
        </div>
      </div>
      {/*	End Latest Product	*/}
    </>
  );
};

export default Home;
