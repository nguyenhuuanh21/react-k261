import Cart from "../pages/Cart";
import Category from "../pages/Category";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import ProductDetails from "../pages/ProductDetails";
import Register from "../pages/Register";
import Search from "../pages/Search";
import Success from "../pages/Success";
import AccessDenied from "../pages/AccessDenied";
import { withAuth,withoutAuth } from "../hocs";
import Profile from "../pages/Profile";
import OrderList from "../pages/Order/OrderList";
import OrderDetail from "../pages/Order/OrderDetails";
export default [
  {
    path: "/",
    element: Home ,
  },
  {
    path: "/category/:id",
    element: Category ,
  },
  {
    path: "/search",
    element: Search ,
  },
  {
    path: "/product-details/:id",
    element: ProductDetails ,
  },
  {
    path: "/cart",
    element: Cart ,
  },
  {
    path: "/success",
    element: Success ,
  },
  {
    path: "/register",
    element: withoutAuth(Register),
  },
  {
    path: "/login",
    element: withoutAuth(Login),
  },
  {
    path: "*",
    element: NotFound ,
  },
  {
    path:"/access-denied",
    element: AccessDenied
  },
  {
    path:"/profile",
    element:withAuth(Profile)
  },
  {
    path:"/order-list",
    element: withAuth(OrderList)
  },
  {
    path:"/order-details/:id",
    element:withAuth(OrderDetail)
  }
];
