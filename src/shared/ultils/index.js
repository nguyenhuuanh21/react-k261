import { BASE_URL } from "../constants/app";
import moment from "moment";
export const getImageProduct = (imageName) => {
  return `${BASE_URL}/assets/uploads/products/${imageName}`;
};
export const getBannerImage = (imageName) => {
  return `${BASE_URL}/assets/uploads/banners/${imageName}`;
}
export const getSlidersImage = (imageName) => {
  return `${BASE_URL}/assets/uploads/sliders/${imageName}`;
}

export const formatPrice = (price) => {
  if (price === null) return null;
  return Number(price).toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
};
export const formatDate = (date) => {
  if (date === null) return null;
  return moment(date).format("DD/MM/YYYY HH:mm:ss");
};
export const buildUrlPagination = (pathName,searchParams, page) => { 
  const params = new URLSearchParams(searchParams)
  params.set("page", page);
  return `${pathName}?${params.toString()}`;
}