import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutCustomer } from "../../../services/Api";
import { logout } from "../../../redux-setup/reducers/auth";
const Header = () => {
  const [keyword, setKeyword] = useState(null);
  const dispatch=useDispatch();
  const auth = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const ChangeInput = (e) => {
    setKeyword(e.target.value);
  };
  const clickSearch = () => navigate(`/search?keyword=${keyword}`);
  const totalItem = useSelector((store) =>
    store.cart.items.reduce((total, item) => total + item.qty, 0)
  );
  const clickLogout=()=>{
    logoutCustomer()
    .then((res)=>{
      if(res.data.status==="success"){
        console.log(res.data);
        
        dispatch(logout());
        return navigate('/login');
      }
    })
    .catch((err)=>{
      console.log(err);
    });
  }
  return (
    <>
      <div id="header">
        <div className="container">
          <div className="row">
            <div id="logo" className="col-lg-3 col-md-12 col-sm-12">
              <h1>
                <Link to="/">
                  <img className="img-fluid" src="images/logo.png" />
                </Link>
              </h1>
            </div>
            <div id="search" className="col-lg-4 col-md-12 col-sm-12">
              <form className="form-inline">
                <input
                  className="form-control mt-3"
                  type="search"
                  placeholder="Tìm kiếm"
                  aria-label="Search"
                  onChange={ChangeInput}
                />
                <button
                  className="btn btn-danger mt-3"
                  type="button"
                  onClick={clickSearch}
                >
                  Tìm kiếm
                </button>
              </form>
            </div>
            <div id="cart" className="col-lg-5 col-md-12 col-sm-12">
              <i className="fa-solid fa-user mr-1" />
              {auth.auth.isAuthenticated ? (
                <>
                  <Link className="mr-2" to="/profile">
                    {auth.customer.current.fullName}
                  </Link>
                  |
                  <Link onClick={clickLogout} className="mr-2 ml-2" >
                    đăng xuất
                  </Link>
                  |
                </>
              ) : (
                <>
                  <Link className="mr-2" to="/login">
                    đăng nhập
                  </Link>
                  |
                  <Link className="mr-2 ml-2" to="/register">
                    đăng ký
                  </Link>
                  |
                </>
              )}
              
              <a className="mt-4 mr-2 ml-2" href="#">
                giỏ hàng
                <ul>
                  <li>
                    <Link to="/cart">
                      <i className="fas fa-shopping-cart" /> Giỏ hàng của bạn
                      </Link>
                    </li>
                  <li>
                    <Link to="/order-list" >
                    <i className="fas fa-file-alt" /> Đơn hàng đã mua
                    </Link>
                  </li>
                </ul>
              </a>
              <span className="mt-3">{totalItem}</span>
            </div>
          </div>
        </div>
        {/* Toggler/collapsibe Button */}
        <button
          className="navbar-toggler navbar-light"
          type="button"
          data-toggle="collapse"
          data-target="#menu"
        >
          <span className="navbar-toggler-icon" />
        </button>
      </div>
    </>
  );
};

export default Header;
