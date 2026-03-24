import React, { useState } from "react";
import { loginCustomer } from "../../services/Api";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux-setup/reducers/auth";

const Login = () => {
    const navigate=useNavigate();
  const [inputLogin, setInputLogin] = useState({});
  const [txtAlert, setTxtAlert] = useState(null);
  const dispatch = useDispatch();
  const changeInput = (e) => {
    setInputLogin({ ...inputLogin, [e.target.name]: e.target.value });
  };
  const clickLogin=()=>{
    loginCustomer(inputLogin)
    .then((res)=>{
        console.log(res);
        
        if(res.data.status==="success"){
            dispatch(loginSuccess({
                accessToken:res.data.accessToken,
                customer:res.data.customer
            }))
            navigate("/");
        }
    })
    .catch((err)=>{
        if(err.response.data.message==="Invalid email"){
            setTxtAlert("Email không tồn tại!");
        }
        if(err.response.data.message==="Invalid password"){
            setTxtAlert("Mật khẩu không đúng!");
        }
    })
  }
  return (
    <>
      <div id="customer">
        {txtAlert&&(<div className="alert alert-danger text-center">
          {txtAlert}
        </div>)}
        
        <h3 className="text-center">Đăng nhập</h3>
        <form method="post">
          <div className="row">
            <div id="customer-mail" className="col-lg-6 col-md-6 col-sm-12">
              <input
                onChange={changeInput}
                placeholder="Email (bắt buộc)"
                type="text"
                name="email"
                className="form-control"
                required
              />
            </div>
            <div id="customer-pass" className="col-lg-6 col-md-6 col-sm-12">
              <input
                onChange={changeInput}
                type="text"
                name="password"
                className="form-control"
                required
              />
            </div>
          </div>
        </form>
        <div className="row">
          <div className="by-now col-lg-6 col-md-6 col-sm-12">
            <a href="#" 
            onClick={clickLogin}>
              <b>Đăng nhập ngay</b>
            </a>
          </div>
          <div className="by-now col-lg-6 col-md-6 col-sm-12">
            <Link to="/">
              <b>Quay về trang chủ</b>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
