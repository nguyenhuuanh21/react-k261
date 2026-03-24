import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatPrice, getImageProduct } from "../../shared/ultils";
import { deleteItemCart, updateCart ,clearCart} from "../../redux-setup/reducers/cart";
import { createOrder } from "../../services/Api";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const [customerInfo, setCustomerInfo] = useState({});
  const changeInput = (e) => {
    setCustomerInfo({...customerInfo, [e.target.name]: e.target.value });
  }
  const items = useSelector((state) => state.cart.items);
  const auth = useSelector((state) => state.auth);
  const newItems = items.map((item) => ({
    prd_id: item.prd_id,
    qty: item.qty
  }))
  const totalPrice=items.reduce((total,item)=>total + item.price * item.qty, 0);
  const dispatch = useDispatch ();
  const changeQty = (e, prd_id) => { 
    if (Number(e.target.value) <= 0) {
      const isConfirm = window.confirm("Bạn có muốn xóa sản phẩm khỏi giỏ hàng không?");
      if (isConfirm) { 
        dispatch(deleteItemCart({prd_id: prd_id}))
      }
    } else {
      dispatch(updateCart({prd_id: prd_id, qty: Number(e.target.value)}))
    }
  }
  const deleteItem = (prd_id) => { 
    const isConfirm = window.confirm("Bạn có muốn xóa sản phẩm khỏi giỏ hàng không?");
    if (isConfirm)
      dispatch(deleteItemCart({prd_id: prd_id}));
  }
  useEffect(()=>{
    const isAuthenticated=auth.auth.isAuthenticated;
    const customer=auth.customer.current;
    if(isAuthenticated && customer){
      setCustomerInfo({
        fullName: customer.fullName,
        phone: customer.phone,
        email: customer.email,
        address: customer.address
      })
    }
  },[auth.auth.isAuthenticated, auth.customer.current])
  const clickOrder =async () => {
    createOrder({
      items: newItems,
      totalPrice: totalPrice,
      ...customerInfo
    })
      .then((res) => {
      console.log(res.data);
        if (res.data.status === 'success') { 
        dispatch(clearCart());
        navigate('/success');
      }
    })
    .catch((error) => {
      console.log(error);
      
      alert("Đặt hàng thất bại!");
    });
  }
  return (
    <>
      <div>
        {/*	Cart	*/}
        <div id="my-cart">
          <div className="row">
            <div className="cart-nav-item col-lg-7 col-md-7 col-sm-12">
              Thông tin sản phẩm
            </div>
            <div className="cart-nav-item col-lg-2 col-md-2 col-sm-12">
              Tùy chọn
            </div>
            <div className="cart-nav-item col-lg-3 col-md-3 col-sm-12">Giá</div>
          </div>
          <form method="post">
            {items.map((item, index) => (
              <div className="cart-item row" key={item}>
                <div className="cart-thumb col-lg-7 col-md-7 col-sm-12">
                  <img src={getImageProduct(item.image)} />
                  <h4>{item.name }</h4>
                </div>
                <div className="cart-quantity col-lg-2 col-md-2 col-sm-12">
                  <input
                    type="number"
                    id="quantity"
                    className="form-control form-blue quantity"
                    value={item.qty}
                    onChange={(e)=>changeQty(e,item.prd_id)}
                  />
                </div>
                <div className="cart-price col-lg-3 col-md-3 col-sm-12">
                  <b>{formatPrice(item.price*item.qty) }</b>
                  <a href="#" onClick={()=>deleteItem(item.prd_id)}>Xóa</a>
                </div>
              </div>
            ))}

            <div className="row">
              <div className="cart-thumb col-lg-7 col-md-7 col-sm-12" />
              <div className="cart-total col-lg-2 col-md-2 col-sm-12">
                <b>Tổng cộng:</b>
              </div>
              <div className="cart-price col-lg-3 col-md-3 col-sm-12">
                <b>{formatPrice(totalPrice) }</b>
              </div>
            </div>
          </form>
        </div>
        {/*	End Cart	*/}
        {/*	Customer Info	*/}
        <div id="customer">
          {!auth.auth.isAuthenticated&&(  <form method="post">
            <div className="row">
              <div id="customer-name" className="col-lg-4 col-md-4 col-sm-12">
                <input
                  placeholder="Họ và tên (bắt buộc)"
                  type="text"
                  name="fullName"
                  className="form-control"
                  required
                  onChange={changeInput}
                />
              </div>
              <div id="customer-phone" className="col-lg-4 col-md-4 col-sm-12">
                <input
                  placeholder="Số điện thoại (bắt buộc)"
                  type="text"
                  name="phone"
                  className="form-control"
                  required
                  onChange={changeInput}
                />
              </div>
              <div id="customer-mail" className="col-lg-4 col-md-4 col-sm-12">
                <input
                  placeholder="Email (bắt buộc)"
                  type="text"
                  name="email"
                  className="form-control"
                  required
                  onChange={changeInput}
                />
              </div>
              <div id="customer-add" className="col-lg-12 col-md-12 col-sm-12">
                <input
                  placeholder="Địa chỉ nhà riêng hoặc cơ quan (bắt buộc)"
                  type="text"
                  name="address"
                  className="form-control"
                  required
                  onChange={changeInput}
                />
              </div>
            </div>
          </form>)}
        
          <div className="row">
            <div className="by-now col-lg-6 col-md-6 col-sm-12">
              <Link to="#" onClick={clickOrder}>
                <b>Mua ngay</b>
                <span>Giao hàng tận nơi siêu tốc</span>
              </Link>
            </div>
            <div className="by-now col-lg-6 col-md-6 col-sm-12">
            {auth.auth.isAuthenticated?(   <Link to="/">
                <b>Trang chủ</b>
                <span>quay về trang chủ</span>
              </Link>):(       <a href="#">
                <b>Đăng nhập</b>
                <span>Thành viên mua hàng sẽ có nhiều ưu đãi</span>
              </a>)}
       
            </div>
          </div>
        </div>
        {/*	End Customer Info	*/}
      </div>
    </>
  );
};

export default Cart;
