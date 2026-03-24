import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getOrderDetails } from "../../../services/Api";
import { formatPrice, getImageProduct } from "../../../shared/ultils";

const OrderDetail = () => {
  const params = useParams();
  const [orderDetails, setOrderDetails] = useState({});
  const orderId = params.id;
  useEffect(() => {
    getOrderDetails(orderId)
      .then((res) => {
        console.log(res.data.data);
        setOrderDetails(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <div id="my-cart">
        <div className="row">
          <div className="cart-nav-item col-lg-7 col-md-7 col-sm-12">
            Thông tin sản phẩm
          </div>
          <div className="cart-nav-item col-lg-2 col-md-2 col-sm-12">
            Số lượng
          </div>
          <div className="cart-nav-item col-lg-3 col-md-3 col-sm-12">Giá</div>
        </div>
        <form method="post">
          {orderDetails.items?.map((item) => (
            <div className="cart-item row">
              <div className="cart-thumb col-lg-7 col-md-7 col-sm-12">
                <img src={getImageProduct(item.prd_id.image)} />
                <h4>{item.prd_id.name}</h4>
              </div>
              <div className="cart-quantity col-lg-2 col-md-2 col-sm-12">
                <p>{item.qty}</p>
              </div>
              <div className="cart-price col-lg-3 col-md-3 col-sm-12">
                <b>{formatPrice(item.prd_id.price)}</b>
              </div>
            </div>
          ))}

          <div className="row">
            <div className="cart-thumb col-lg-7 col-md-7 col-sm-12"></div>
            <div className="cart-total col-lg-2 col-md-2 col-sm-12">
              <b>Tổng cộng:</b>
            </div>
            <div className="cart-price col-lg-3 col-md-3 col-sm-12">
              <b>{formatPrice(orderDetails.totalPrice)}</b>
            </div>
          </div>
        </form>
      </div>
      <div id="customer">
        <div className="row">
          <div className="by-now col-lg-6 col-md-6 col-sm-12">
            <Link to="/order-list">
              <b>Về danh sách đơn hàng</b>
            </Link>
          </div>
          <div className="by-now col-lg-6 col-md-6 col-sm-12">
            <Link to="/">
              <b>Về trang chủ</b>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetail;
