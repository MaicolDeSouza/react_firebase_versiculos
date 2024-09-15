import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//Pages
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import CreatePost from "./pages/CreatePost/CreatePost";
import Edit from "./pages/Edit/Edit";

//Context api para salvar e carregar auth e usuario
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";



function App() {
  //Context API para pegar valor salvo de auth
  const { user } = useContext(AuthContext);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/cadastrar"
            element={!user ? <Register /> : <Navigate to="/" />}
          />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/edit/:id" element={<Edit/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
