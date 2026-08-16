import { Route, Routes } from "react-router-dom";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Pricing } from "./pages/Pricing";
import { Security } from "./pages/Security";
import { Auth } from "./pages/Auth";
import { BookDemo } from "./pages/BookDemo";

export default function App() {
  return (
    <div className="min-h-[100dvh] bg-paper text-ink">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/security" element={<Security />} />
        <Route path="/sign-in" element={<Auth mode="in" />} />
        <Route path="/get-started" element={<Auth mode="up" />} />
        <Route path="/book-demo" element={<BookDemo />} />
      </Routes>
      <Footer />
    </div>
  );
}
