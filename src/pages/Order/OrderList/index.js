import React, { useEffect, useState } from "react";
import { CancelOrder, getOrderList } from "../../../services/Api";
import { buildUrlPagination, formatDate, formatPrice } from "../../../shared/ultils";
import { Link, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import pagination from "../../../shared/ultils/pagination";

const OrderList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [orderId, setOrderId] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useParams();
  const page = Number(searchParams.get("page")) || 1;
  const [pages, setPages] = useState({});
  useEffect(() => {
    getOrderList({ params: { page: page, limit: 1 } })
      .then((res) => {
        setOrders(res.data.data);
        setPages({ ...res.data.pages, delta: 1 });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [orderId, page]);
  const cancelOrder = (id) => {
    CancelOrder(id)
      .then((res) => {
        console.log(res.data);
        if (res.data.status === "success") {
          setOrderId(id);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const clickDetail = (id) => {
    navigate(`/order-details/${id}`);
  };
  const checkPageNumber=(e, item) => {
     if(!Number.isInteger(item)){
      return e.preventDefault();
    }
  }
  return (
    <div id="my-cart">
      <div className="row">
        <div className="cart-nav-item col-lg-7 col-md-7 col-sm-12">
          Đơn hàng của bạn
        </div>
        <div className="cart-nav-item col-lg-5 col-md-5 col-sm-12">
          Tổng tiền
        </div>
      </div>
      <form method="post">
        {orders.map((order) => (
          <div
            className={`cart-item row ${order.status === "delivered" ? "alert-success" : order.status === "cancel" ? "alert-danger" : ""}`}
            key={order._id}
          >
            <div className="cart-thumb col-lg-7 col-md-7 col-sm-12">
              <h4>
                Đơn hàng đã mua vào ngày:{" "}
                <span className="text-secondary">
                  {formatDate(order.createdAt)}
                </span>
              </h4>
              <p>Mã Đơn (MĐ): {order._id}</p>
            </div>
            <div className="cart-price col-lg-2 col-md-2 col-sm-12">
              <b>{formatPrice(order.totalPrice)}</b>
            </div>
            <div className="cart-quantity col-lg-3 col-md-3 col-sm-12">
              <button
                type="button"
                className="btn btn-outline-dark mb-1"
                onClick={() => clickDetail(order._id)}
              >
                Chi tiết đơn hàng
              </button>
              {order.status === "pending" ? (
                <>
                  {" "}
                  <button
                    type="button"
                    className="btn btn-outline-danger mb-1"
                    onClick={() => cancelOrder(order._id)}
                  >
                    Huỷ đơn
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-success mb-1"
                  >
                    Đơn đang giao
                  </button>
                </>
              ) : order.status === "delivered" ? (
                <button type="button" className="btn btn-success mb-1">
                  Đơn đã giao
                </button>
              ) : (
                <button type="button" className="btn btn-danger mb-1">
                  Đơn đã huỷ
                </button>
              )}
            </div>
          </div>
        ))}

        <div className="row">
          <div className="cart-thumb col-lg-7 col-md-7 col-sm-12">
            <button
              id="update-cart"
              className="btn btn-success"
              type="submit"
              name="sbm"
              onClick={()=>navigate('/')}
            >
              Quay về trang chủ
            </button>
          </div>
          <div className="col-lg-5 col-md-5 col-sm-12">
            <ul className="pagination mt-4">
              {pages.hasPrevPage && (
                <li className="page-item">
                  <Link className="page-link" to={buildUrlPagination(location.pathname,searchParams,pages.prevPage)}>
                    Trang trước
                  </Link>
                </li>
              )}
              {pagination(pages).map((item, index) => (
                <li className={`page-item ${item===page ? "active" : ""}`} key={index}>
                  <Link className="page-link" to={buildUrlPagination(location.pathname,searchParams,item)} onClick={(e)=>checkPageNumber(e,item)}>
                    {item}
                  </Link>
                </li>
              ))}
              {pages.hasNextPage && (
                <li className="page-item">
                  <Link className="page-link" to={buildUrlPagination(location.pathname,searchParams,pages.nextPage)} >
                    Trang sau
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </form>
    </div>
  );
};

export default OrderList;
