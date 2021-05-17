import Login from "../views/Login";
import SignUp from "../views/SignUp";
import AdminView from "../views/AdminView";
import Home from "../views/Home";
import Dashboard from "../components/Dashboard";
import Country from "../components/Country"

const routes = [
  {
    path: "/login",
    component: Login,
    isPrivate: false,
  },
  {
    path: "/signup",
    component: SignUp,
    isPrivate: false,
  },
  {
    path: "/admin",
    component: AdminView,
    isPrivate: true,
  },
  {
    path: "/dashboard",
    component: Dashboard,
    isPrivate: true,
  },
  {
    path: "/country/:id",
    component: Country,
    isPrivate: true,
  },
  {
    path: "/",
    component: Home,
    isPrivate: false,
  },
];

export default routes;
