import {createBrowserRouter} from "react-router-dom"
import Login from "./pages/Login";
import Register from "./pages/Register";
import App from "./App.jsx"
import LandingAdmin from "./pages/LandingAdmin.jsx";
import Profile from "./pages/Profile.jsx";

export const router = createBrowserRouter([
    {path: "/login",
     element: <Login/>},
     {path: "/signup",
     element: <Register/>},
     {path: "/landingadmin",
     element: <LandingAdmin/>},
     {path: "/home",
     element: <App/>},
     {path: "/profile",
     element: <Profile/>},
]);