import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Home from "./pages/Home";
import { AuthContextProvider } from "./contexts/AuthContext";
import Login from "./pages/Login";
import ThemeProvider from "./contexts/ThemeContext/ThemeContext";
import Multiplayer from "./pages/Multiplayer";
import Singleplayer from "./pages/Singleplayer";
import BoardConfigProvider from "./contexts/BoardConfig";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute element={<Home />} />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/multiplayer/:gameSessionId",
    element: <ProtectedRoute element={<Multiplayer />} />
  },
  {
    path: "/singleplayer",
    element: <ProtectedRoute element={<Singleplayer />} />
  },
])

function App() {
  return (
    <AuthContextProvider>
      <ThemeProvider>
        <BoardConfigProvider>
          <div className="bg-background h-full">
            <RouterProvider router={router} />
          </div>
        </BoardConfigProvider>
      </ThemeProvider>
    </AuthContextProvider>
  )
}

export default App;