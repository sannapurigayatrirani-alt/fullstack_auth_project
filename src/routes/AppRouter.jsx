import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Signin from "../components/Signin";
import Signup from "../components/Signup";
import Home from "../pages/Home";
import ProtectedRoute from "./ProtectedRoute";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Default route */}
        <Route
          path="/"
          element={<Navigate to="/signin" replace />}
        />

        {/* Public routes */}
        <Route
          path="/signin"
          element={<Signin />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        {/* Protected route */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;