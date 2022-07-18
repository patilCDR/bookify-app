import { Routes, Route } from "react-router-dom";
//Components
import MyNavbar from "./components/Navbar";
//Pages
import HomePage from "./pages/Home";
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import ListingPage from "./pages/List";
import BookDetailPage from "./pages/Detail";
//css
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <div>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/Register" element={<RegisterPage />} />
        <Route path="/book/list" element={<ListingPage />} />
        <Route path="/book/view/:bookId" element={<BookDetailPage />} />
      </Routes>
    </div>
  );
}

export default App;
