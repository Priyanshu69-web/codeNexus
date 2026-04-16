import { BrowserRouter, Routes, Route, useParams, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import CodeEditor from "./pages/CodeEditor";
import HomePage from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

function Room() {
  const { roomId } = useParams();
  return <CodeEditor roomId={roomId} />;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/:roomId" element={<Room />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
