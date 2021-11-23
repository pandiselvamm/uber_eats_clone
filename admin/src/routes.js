import Index from "views/Index.js";
import Login from "views/pages/Login.js";
import UsersTable from "views/pages/users/UsersTable";
import RestaurantTable from "views/pages/restaurants/RestaurantTable";
import Profile from "views/pages/Profile.js";
import UserForm from "views/pages/users/UserForm";
import RestaurantForm from "views/pages/restaurants/RestaurantForm";


var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/admin",
    isSidebar: true,
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: <Profile />,
    layout: "/admin",
    isSidebar: false,
  }, {
    path: "/user/create",
    name: "User Create",
    icon: "ni ni-single-02 text-yellow",
    component: <UserForm />,
    layout: "/admin",
    isSidebar: false,
  },
  {
    path: "/user/edit/:id",
    name: "User Edit",
    icon: "ni ni-single-02 text-yellow",
    component: <UserForm />,
    layout: "/admin",
    isSidebar: false,
  },
  {
    path: "/users",
    name: "Users",
    icon: "fas fa-users text-red",
    component: <UsersTable />,
    layout: "/admin",
    isSidebar: true,
  },
  {
    path: "/restaurants",
    name: "Restaurants",
    icon: "fas fa-utensils text-yellow",
    component: <RestaurantTable />,
    layout: "/admin",
    isSidebar: true,
  },
  {
    path: "/restaurant/create",
    name: "Restaurant Create",
    icon: "fas fa-utensils text-yellow",
    component: <RestaurantForm />,
    layout: "/admin",
    isSidebar: false,
  },
  {
    path: "/login",
    name: "Login",
    icon: "fas fa-stream text-orange",
    component: <Login />,
    layout: "/auth",
    isSidebar: false,
  },
];
export default routes;
