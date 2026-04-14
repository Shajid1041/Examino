import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Pages/Home/Home/Home";
import SignUp from "../Pages/SignUp/SignUp";
import SignIn from "../Pages/SignIn/SignIn"; // নিশ্চিত করুন এই ফাইলটি আছে
import StudentDashboard from "../Pages/Dashboard/StudentDashboard/StudentDashboard";
import AuthLayout from "../Layout/AuthLayout";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <Home />
            }
            
        ]
    },
    {
        path: "/",
        Component: AuthLayout,
        children: [
            {
                path: "sign-up",
                element: <SignUp />
            },
            {
                path: "sign-in",
                element: <SignIn />
            }
        ]
    },


    {
        path: "/dashboard",
        element: (
            
                <StudentDashboard/>
            
        )
    }
]);