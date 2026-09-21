import { Routes, Route } from "react-router-dom";
import Landing from "./pages/marketing/Landing";
import About from "./pages/marketing/About";
import Features from "./pages/marketing/Features";
import Developer from "./pages/marketing/Developer";
import NotImplementedModal from "./components/common/NotImplementedModal";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/developer" element={<Developer />} />
      </Routes>
      <NotImplementedModal />
    </>
  );
}
