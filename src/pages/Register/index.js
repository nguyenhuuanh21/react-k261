import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerCustomer } from "../../services/Api";

const Register = () => {
  const navigate = useNavigate();
  const [inputRegister, setInputRegister] = useState({});
  const [txtAlert,setTxtAlert]=useState(null);
  const[sttAlert,setSttAlert]=useState(false);
  const changeInput = (e) => {
    return setInputRegister({ ...inputRegister, [e.target.name]: e.target.value });
  };
  const clickRegister = () => {
    registerCustomer(inputRegister)
        .then((res)=>{
            if(res.data.status==="success"){
                setInputRegister({})
                setTxtAlert("Đăng ký thành công");
                setSttAlert(true);

            }
        })
        .catch((err)=>{
            if(err.response.data.message==="Email already exists"){
                setTxtAlert("Email đã tồn tại");
                setSttAlert(false);
            }
            if(err.response.data.message==="Phone already exists"){
                setTxtAlert("Số điện thoại đã tồn tại");
                setSttAlert(false);
            }
            console.log(err.response.data.message);
            
        })
  }  
  return (
    <>
      <div id="customer">
        {txtAlert && (<div className={`alert ${sttAlert ? "alert-success" : "alert-danger"} text-center`}>
          {txtAlert}
        </div>)}
        <h3 className="text-center">Đăng ký</h3>
        <form method="post">
          <div className="row">
            <div id="customer-name" className="col-lg-6 col-md-6 col-sm-12">
              <input
                placeholder="Họ và tên (bắt buộc)"
                type="text"
                name="fullName"
                className="form-control"
                required
                onChange={changeInput}
                value={inputRegister.fullName || ""}
              />
            </div>
            <div id="customer-pass" className="col-lg-6 col-md-6 col-sm-12">
              <input
                placeholder="Mật khẩu (bắt buộc)"
                type="text"
                name="password"
                className="form-control"
                required
                onChange={changeInput}
                value={inputRegister.password || ""}
              />
            </div>
            <div id="customer-mail" className="col-lg-6 col-md-6 col-sm-12">
              <input
                placeholder="Email (bắt buộc)"
                type="text"
                name="email"
                className="form-control"
                required
                onChange={changeInput}
                value={inputRegister.email || ""}
              />
            </div>
            <div id="customer-phone" className="col-lg-6 col-md-6 col-sm-12">
              <input
                placeholder="Số điện thoại (bắt buộc)"
                type="text"
                name="phone"
                className="form-control"
                required
                onChange={changeInput}
                value={inputRegister.phone || ""}
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
                value={inputRegister.address || ""}
              />
            </div>
          </div>
        </form>
        <div className="row">
          <div className="by-now col-lg-6 col-md-6 col-sm-12">
            <a href="#" onClick={clickRegister}>
              <b>Đăng ký ngay</b>
            </a>
          </div>
          <div className="by-now col-lg-6 col-md-6 col-sm-12">
            <a href="#">
              <b>Quay về trang chủ</b>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
