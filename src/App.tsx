import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MultiPlayer from "./pages/MultiPlayer";
import SinglePlayer from "./pages/SinglePlayer";
import BoardConfigProvider from "./contexts/BoardConfig";
import NormalRoute from "./components/NormalRoute/NormalRoute";
import ThemeProvider from "./contexts/ThemeContext/ThemeContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { AuthContextProvider } from "./contexts/AuthContext";
import PlayerContextProvider from "./contexts/PlayerContext";
import { SocketContextProvider } from "./contexts/Socket";
import MultiPlayerGameContextProvider from "./contexts/MultiPlayerGameContext";
import { VerificationContextProvider } from "./contexts/VerificationContext";
import ForgotPassword from "./pages/ForgotPassword";
import SignupVerification from "./pages/SignupVerification";
import ForgotPasswordVerification from "./pages/ForgotPasswordVerification";
import CreateNewPassword from "./pages/CreateNewPassword";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute element={<Home />} />
  },
  {
    path: "/login",
    element: <NormalRoute  element={<Login />} />
  },
  {
    path: "/forgot-password",
    element: <NormalRoute  element={<ForgotPassword />} />
  },
  {
    path: "/forgot-password/verification/:sessionId",
    element: <NormalRoute  element={<ForgotPasswordVerification />} />
  },
  {
    path: "/forgot-password/create-password/:updateToken",
    element: <NormalRoute  element={<CreateNewPassword />} />
  },
  {
    path: "/signup",
    element: <NormalRoute  element={<Signup />} />
  },
  {
    path: "/signup/:sessionId",
    element: <NormalRoute  element={<SignupVerification />} />
  },
  {
    path: "/multiplayer/:gameSessionId",
    element: <ProtectedRoute element={<MultiPlayer />} />
  },
  {
    path: "/singleplayer",
    element: <ProtectedRoute element={<SinglePlayer />} />
  },
  {
    path: "/*",
    element: <NormalRoute element={<ErrorPage />} />
  },
])

function App() {
  return (
    <AuthContextProvider>
      <ThemeProvider>
        <BoardConfigProvider>
          <PlayerContextProvider>
            <SocketContextProvider>
              <MultiPlayerGameContextProvider>
                <VerificationContextProvider>
                  <div className="flex flex-col bg-background h-full">
                    <RouterProvider router={router} />
                  </div>
                </VerificationContextProvider>
              </MultiPlayerGameContextProvider>
            </SocketContextProvider>
          </PlayerContextProvider>
        </BoardConfigProvider>
      </ThemeProvider>
    </AuthContextProvider>
  )
}

export default App;