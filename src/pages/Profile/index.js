import React, { useEffect, useState } from "react";
import { getCustomerProfile, updateCustomer } from "../../services/Api";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../redux-setup/reducers/auth";

const Profile = () => {
  const dispatch = useDispatch();
  const [profile, setProfile] = useState({});
  const [status, setStatus] = useState(null);
  const [alert, setAlert] = useState(null);
  const changeData = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };
  useEffect(() => {
    getCustomerProfile()
      .then((res) => {
        setProfile(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const clickUpdate = () => {
    updateCustomer(profile)
      .then((res) => {
        if (res.data.status === "success") {
          setStatus(true);
          setAlert("Cập nhật thông tin thành công!");
          dispatch(updateProfile({ updatedProfile: profile }));
        }
      })
      .catch((err) => {
        console.log(err);
        setStatus(false);
        if (err.response.data.message === "phone already exists") {
          return setAlert("Số điện thoại đã tồn tại!");
        }
        setAlert("Cập nhật thông tin thất bại!");
      });
  };
  return (
    <div id="customer">
      {alert && (
        <div
          className={`alert alert-${status ? "success" : "danger"}  text-center`}
        >
          {alert}
        </div>
      )}
      <h3 className="text-center">Thông tin tài khoản</h3>
      <form method="post">
        <div className="row">
          <div id="customer-name" className="col-lg-6 col-md-6 col-sm-12">
            <input
              placeholder="Họ và tên (bắt buộc)"
              type="text"
              name="fullName"
              className="form-control"
              value={profile?.fullName}
              required
              onChange={changeData}
            />
          </div>
          <div id="customer-pass" className="col-lg-6 col-md-6 col-sm-12">
            <input
              disabled
              placeholder="Mật khẩu (bắt buộc)"
              type="password"
              name="password"
              className="form-control"
              defaultValue={123456}
              required
            />
          </div>
          <div id="customer-mail" className="col-lg-6 col-md-6 col-sm-12">
            <input
              disabled
              placeholder="Email (bắt buộc)"
              type="text"
              name="email"
              className="form-control"
              value={profile.email}
              required
            />
          </div>
          <div id="customer-phone" className="col-lg-6 col-md-6 col-sm-12">
            <input
              placeholder="Số điện thoại (bắt buộc)"
              type="text"
              name="phone"
              className="form-control"
              value={profile.phone}
              required
              onChange={changeData}
            />
          </div>
          <div id="customer-add" className="col-lg-12 col-md-12 col-sm-12">
            <input
              placeholder="Địa chỉ nhà riêng hoặc cơ quan (bắt buộc)"
              type="text"
              name="address"
              className="form-control"
              value={profile.address}
              required
              onChange={changeData}
            />
          </div>
        </div>
      </form>
      <div className="row">
        <div className="by-now col-lg-6 col-md-6 col-sm-12">
          <a href="#" onClick={() => clickUpdate()}>
            <b>Cập nhật ngay</b>
          </a>
        </div>
        <div className="by-now col-lg-6 col-md-6 col-sm-12">
          <Link to="/">
            <b>Quay về trang chủ</b>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
