import {createBrowserRouter} from "react-router-dom"
import Login from "./pages/Login";
import Register from "./pages/Register";
import App from "./App.jsx"
import LandingAdmin from "./pages/LandingAdmin.jsx";
import Profile from "./pages/Profile.jsx";
import ClubProfile from "./pages/ClubProfile.jsx";
import Search from "./pages/Search.jsx";

export const router = createBrowserRouter([
    {path: "/login",
     element: <Login/>},
     {path: "/signup",
     element: <Register/>},
     {path: "/landingadmin",
     element: <LandingAdmin/>},
     {path: "",
     element: <App/>},
     {path: "/profile",
     element: <Profile/>},
     {path: "/landingadmin/:name",
     element: <ClubProfile  />},
     {path: "/buscador",
     element: <Search  />}
]);
