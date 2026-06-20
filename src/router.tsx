import { createBrowserRouter } from "react-router"; // or "react-router-dom"
import ForgetPasswordPage from "./features/auth/pages/ForgetPasswordPage";
import LoginPage from "./features/auth/pages/LoginPage";
import ResetPasswordPage from "./features/auth/pages/ResetPasswordPage";
import SignupPage from "./features/auth/pages/SignupPage";
import HomePage from "./features/home/HomePage";
import Layout from "./layouts/Layout";
import EventsPage from "./features/events/EventPage";
import EventDetailPage from "./features/events/EventDetailPage";
import { GlobalProvider } from "./context/GlobalContext";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <GlobalProvider>
        <Layout />
      </GlobalProvider>
    ),
    children: [
      { index: true, element: <HomePage /> },
      { path: "events", element: <EventsPage /> },
      { path: "events/:eventId", element: <EventDetailPage /> },

      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
      { path: "forget-password", element: <ForgetPasswordPage /> },
      { path: "reset-password/:token", element: <ResetPasswordPage /> },
    ],
  },
]);

export default router;
