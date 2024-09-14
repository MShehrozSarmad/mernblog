import "./App.css";
import { Routes, Route } from 'react-router-dom'
import Layout from './Layout';
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from './pages/Home';
import { UserContextProvider } from "./UserContext";

function App() {
  return (
    <>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </UserContextProvider>
    </>
  );
}

export default App;