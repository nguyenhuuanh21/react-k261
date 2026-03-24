import React, { useEffect, useRef, useState } from "react";
import {
  Link,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { getCategoryDetails, getProductsByCategory } from "../../services/Api";
import ProductItem from "../../shared/components/product-item";
import pagination from "../../shared/ultils/pagination";
import { buildUrlPagination } from "../../shared/ultils";
import Loading from "../../shared/components/Loading";
import Popup from "../../shared/components/Popup";

const Category = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});
  const [productLoading, setProductLoading] = useState(false);
  const [totalProducts, setTotalProducts] = useState(0);
  const [pages, setPages] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const page = Number(searchParams.get("page")) || 1;
  const dialog = useRef();
  const checkPageNumber = (e, item) => {
    if (!Number.isInteger(item)) {
      return e.preventDefault();
    }
  };
  useEffect(() => {
    setProductLoading(false);
    getProductsByCategory(id, { params: { limit: 9, page: page } })
      .then((res) => {
        setProducts(res.data.data);
        setProductLoading(true);
        setTotalProducts(res.data.pages.totalItems);
        setPages({ ...res.data.pages, delta: 2 });
        const popupShown = sessionStorage.getItem("popupCategoryShown");

        if (!popupShown) {
          setTimeout(() => {
            dialog.current?.showModal();
            sessionStorage.setItem("popupCategoryShown", "true");
          }, 3000);
        }
      })
      .catch((error) => console.log(error));
    getCategoryDetails(id)
      .then((res) => setCategory(res.data.data))
      .catch((error) => console.log(error));
  }, [id, page]);
  return (
    <>
      <Popup ref={dialog} image="/images/img.jpg" />
      <div>
        <div className="products">
          <h3>
            {category.name} (hiện có {totalProducts} sản phẩm)
          </h3>
          {!productLoading ? (
            <Loading />
          ) : (
            <div className="product-list card-deck">
              {products.map((product) => (
                <ProductItem key={product._id} item={product} />
              ))}
            </div>
          )}
        </div>
        {/*	End List Product	*/}
        <div id="pagination">
          <ul className="pagination">
            {pages.hasPrevPage && (
              <li className="page-item">
                <Link
                  className="page-link"
                  to={buildUrlPagination(
                    location.pathname,
                    searchParams,
                    pages.prevPage,
                  )}
                >
                  Trang trước
                </Link>
              </li>
            )}

            {pagination(pages).map((item, index) => (
              <li
                className={`page-item ${item === page ? "active" : ""}`}
                key={index}
              >
                <Link
                  className="page-link"
                  to={buildUrlPagination(location.pathname, searchParams, item)}
                  onClick={(e) => checkPageNumber(e, item)}
                >
                  {item}
                </Link>
              </li>
            ))}
            {pages.hasNextPage && (
              <li className="page-item">
                <Link
                  className="page-link"
                  to={buildUrlPagination(
                    location.pathname,
                    searchParams,
                    pages.nextPage,
                  )}
                >
                  Trang sau
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Category;
