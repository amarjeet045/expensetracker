import "./App.css";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Transactions } from "./components/Transactions";
import AuthProvider from "./contexts/AuthProvider";
import History from "./components/History";
import Signup from "./components/Signup";
import Login from "./components/Login";

function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
     
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/transaction" element={<Transactions />} />
          <Route path="/history" element={<History />} />

        </Routes>
      
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
