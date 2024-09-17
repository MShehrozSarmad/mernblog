import "./App.css";
import { Routes, Route } from 'react-router-dom'
import { UserContextProvider } from "./UserContext";
import Layout from './Layout';
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from './pages/Home';
import CreatePost from "./pages/CreatePost";
import Post from './pages/Post';
import Edit from './pages/Edit';

function App() {
  return (
    <>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/createpost" element={<CreatePost />} />
            <Route path="/post/:id" element={<Post/>}/>
            <Route path="/edit/:id" element={<Edit/>}/>
          </Route>
        </Routes>
      </UserContextProvider>
    </>
  );
}

export default App;