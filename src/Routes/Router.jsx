import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Pages/Home/Home/Home";
import SignUp from "../Pages/SignUp/SignUp";
import SignIn from "../Pages/SignIn/SignIn"; // নিশ্চিত করুন এই ফাইলটি আছে
import StudentDashboard from "../Pages/Dashboard/StudentDashboard/StudentDashboard";
import AuthLayout from "../Layout/AuthLayout";
import BecomeTeacher from "../Pages/BecomeTeacher/BecomeTeacher";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Pages/Dashboard/Dashboard";
import ExamHall from "../Pages/Dashboard/StudentDashboard/ExamHall";
import MyResultsSection from "../Pages/Dashboard/StudentDashboard/MyResultsSection";
import { JoinQuizSection } from "../Pages/Dashboard/StudentDashboard/JoinQuizSection";
import AvailableExams from "../Pages/Dashboard/StudentDashboard/AvailableExams";
import UserProfile from "../Pages/Dashboard/StudentDashboard/UserProfile";
import CreateQuiz from "../Pages/Dashboard/teacherDashboard/CreateQuiz";
import MyQuizzes from "../Pages/Dashboard/teacherDashboard/MyQuizzes";
import QuestionBank from "../Pages/Dashboard/teacherDashboard/QuestionBank";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: '/become-teacher',
                element: <PrivateRoute>
                    <BecomeTeacher></BecomeTeacher>
                </PrivateRoute>
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
        element: <Dashboard />,
        children: [
            {
                path: '/dashboard/create-quiz',
                element: <CreateQuiz></CreateQuiz>
            },
            {
                path: '/dashboard/ques-bank',
                element: <QuestionBank></QuestionBank>
            },
            {
                path: '/dashboard/my-quizzes',
                element: <MyQuizzes></MyQuizzes>
            },
            {
                path: "/dashboard/join-quiz",
                element: <JoinQuizSection></JoinQuizSection>

            },
            {
                // শুরুতে / বাদ দিন
                path: "exam-hall/:id",
                element: <ExamHall />
            },
            {
                path: '/dashboard/student-results',
                element: <MyResultsSection></MyResultsSection>
            },
            {
                path: '/dashboard/available-exams',
                element: <AvailableExams></AvailableExams>
            },
            {
                path: '/dashboard/profile',
                element: <UserProfile></UserProfile>
            }

        ]
    }
]);