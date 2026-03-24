import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { getProducts } from "../../services/Api";
import ProductItem from "../../shared/components/product-item";
import pagination from "../../shared/ultils/pagination";
import Loading from "../../shared/components/Loading";
import { buildUrlPagination } from "../../shared/ultils";
import Popup from "../../shared/components/Popup";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [productLoading, setProductLoading] = useState(false);
  const keyword = searchParams.get("keyword");
  const page = Number(searchParams.get("page")) || 1;
  const [pages, setPages] = useState({});
  const location = useLocation();
  const dialog = useRef();
  const checkPageNumber = (e, item) => {
    if (!Number.isInteger(item)) {
      return e.preventDefault();
    }
  };
  useEffect(() => {
    setProductLoading(false);
    getProducts({ params: { keyword: keyword, limit: 12, page: page } })
      .then((response) => {
        console.log(response);
        setPages({ ...response.data.pages, delta: 2 });
        setProducts(response.data.data);
        setProductLoading(true);
        const popupShown = sessionStorage.getItem("popupSearchShown");

        if (!popupShown) {
          setTimeout(() => {
            dialog.current?.showModal();
            sessionStorage.setItem("popupSearchShown", "true");
          }, 3000);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [keyword, page]);
  return (
    <>
      <Popup ref={dialog} image="/images/img.jpg" />
      <div>
        {/*	List Product	*/}
        <div className="products">
          <div id="search-result">
            Kết quả tìm kiếm với sản phẩm <span>{keyword}</span>
          </div>
          {!productLoading ? (
            <Loading />
          ) : (
            <div className="product-list card-deck">
              {products.map((product) => (
                <ProductItem key={product.id} item={product} />
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
                  onClick={(e) => checkPageNumber(e, item)}
                  className="page-link"
                  to={buildUrlPagination(location.pathname, searchParams, item)}
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

export default Search;
