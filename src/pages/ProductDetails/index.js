import React, { useEffect, useRef, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import {
  createComment,
  getCommentsByProduct,
  getProductDetails,
} from "../../services/Api";
import {
  buildUrlPagination,
  formatDate,
  getImageProduct,
} from "../../shared/ultils";
import moment from "moment";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux-setup/reducers/cart";
import LoadingCart from "../../shared/components/LoadingCart";
import Loading from "../../shared/components/Loading";
import Popup from "../../shared/components/Popup";
const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [comments, setComments] = useState([]);
  const [inputComment, setInputComment] = useState({});
  const [loading, setLoading] = useState(false);
  const [commentId, setCommentId] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const loadMoreRef = useRef(null);
  const [pages, setPages] = useState({});
  const [loadingComments, setLoadingComments] = useState(false);
  const [isFetchingNext, setIsFetchingNext] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dialog = useRef();
  const changeInput = (e) => {
    const { name, value } = e.target;
    setInputComment({ ...inputComment, [name]: value });
    // setInputComment({ ...inputComment, [e.target.name]: e.target.value })
    console.log(inputComment);
  };
  const clickAddToCart = (type) => {
    setLoading(true);
    dispatch(
      addToCart({
        prd_id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        qty: 1,
      }),
    );
    setTimeout(() => {
      setLoading(false);
      if (type === "buy-now") {
        navigate("/cart");
      }
    }, 150);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    createComment(id, inputComment)
      .then((res) => {
        if (res.data.status === "success") {
          setCommentId(res.data.data._id);
          setInputComment({});
        }
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    setLoadingComments(true);
    getProductDetails(id)
      .then((res) => {
        setProduct(res.data.data);
        const popupShown = sessionStorage.getItem("popupDetailShown");
        if (!popupShown) {
          setTimeout(() => {
            dialog.current?.showModal();
            sessionStorage.setItem("popupDetailShown", "true");
          }, 3000);
        }
      })
      .catch((err) => console.log(err));
    getCommentsByProduct(id, { params: { sort: 1, page: page, limit: 5 } })
      .then((res) => {
        setComments((prev) => {
          if (page === 1) return res.data.data;

          const newItems = res.data.data.filter(
            (item) => !prev.some((p) => p._id === item._id),
          );

          return [...prev, ...newItems];
        });
        setPages({ ...res.data.pages, delta: 2 });
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoadingComments(false);
        setIsFetchingNext(false);
      });
  }, [id, commentId, page]);
  useEffect(() => {
    if (!pages.hasNextPage || loadingComments || isFetchingNext) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          observer.disconnect();
          setIsFetchingNext(true);
          const newPage = page + 1;
          setSearchParams({ page: newPage });
        }
      },
      { threshold: 1 },
    );
    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }
    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [pages.hasNextPage, loadingComments, isFetchingNext, page]);
  return (
    <>
      <Popup ref={dialog} image="/images/img.jpg" />
      <div>
        {loading && <LoadingCart />}
        <div id="product">
          <div id="product-head" className="row">
            <div id="product-img" className="col-lg-6 col-md-6 col-sm-12">
              <img src={getImageProduct(product.image)} />
            </div>
            <div id="product-details" className="col-lg-6 col-md-6 col-sm-12">
              <h1>{product.name}</h1>
              <ul>
                <li>
                  <span>Bảo hành:</span> 12 Tháng
                </li>
                <li>
                  <span>Đi kèm:</span> {product.accessories}
                </li>
                <li>
                  <span>Tình trạng:</span>
                  {product.status}
                </li>
                <li>
                  <span>Khuyến Mại:</span>
                  {product.promotion}
                </li>
                <li id="price">Giá Bán (chưa bao gồm VAT)</li>
                <li id="price-number">{product.price}đ</li>
                <li
                  id="status"
                  className={`${product.is_stock ? "" : "text-danger"}`}
                >
                  {product.is_stock ? "Còn hàng" : "Hết hàng"}
                </li>
              </ul>

              {product.is_stock && (
                <div id="add-cart">
                  <button
                    onClick={() => clickAddToCart("buy-now")}
                    className="btn btn-warning mr-2"
                  >
                    Mua ngay
                  </button>

                  <button onClick={clickAddToCart} className="btn btn-info">
                    Thêm vào giỏ hàng
                  </button>
                </div>
              )}
            </div>
          </div>
          <div id="product-body" className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <h3>Đánh giá về {product.name}</h3>
              <p>{product.details}</p>
            </div>
          </div>
          {/*	Comment	*/}
          <div id="comment" className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <h3>Bình luận sản phẩm</h3>
              <form method="post">
                <div className="form-group">
                  <label>Tên:</label>
                  <input
                    name="name"
                    required
                    type="text"
                    className="form-control"
                    onChange={changeInput}
                    value={inputComment?.name || ""}
                  />
                </div>
                <div className="form-group">
                  <label>Email:</label>
                  <input
                    name="email"
                    required
                    type="email"
                    className="form-control"
                    id="pwd"
                    onChange={changeInput}
                    value={inputComment?.email || ""}
                  />
                </div>
                <div className="form-group">
                  <label>Nội dung:</label>
                  <textarea
                    name="content"
                    required
                    rows={8}
                    className="form-control"
                    defaultValue={""}
                    onChange={changeInput}
                    value={inputComment?.content || ""}
                  />
                </div>
                <button
                  type="button"
                  name="sbm"
                  className="btn btn-primary"
                  onClick={handleSubmit}
                >
                  Gửi
                </button>
              </form>
            </div>
          </div>
          {/*	End Comment	*/}
          {/*	Comments List	*/}
          <div id="comments-list" className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              {comments.map((comment) => (
                <div className="comment-item" key={comment._id}>
                  <ul>
                    <li>
                      <b>{comment.name}</b>
                    </li>
                    <li>{moment(comment.createdAt).fromNow()}</li>
                    <li>{formatDate(comment.createdAt)}</li>

                    <li>
                      <p>{comment.content}</p>
                    </li>
                  </ul>
                </div>
              ))}
              {/* loading khi lazy load */}
              {loadingComments && page > 1 && <Loading />}

              {/* sentinel */}
              {pages.hasNextPage && !loadingComments && (
                <div ref={loadMoreRef} style={{ height: 1 }} />
              )}
            </div>
          </div>

          {/*	End Comments List	*/}
        </div>
        {/*	End Product	*/}
      </div>
    </>
  );
};

export default ProductDetails;
