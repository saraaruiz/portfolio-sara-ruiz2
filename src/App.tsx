import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import FlowiCaseStudy from "./pages/FlowiCaseStudy";
import NotFound from "./pages/NotFound";
import FloatingWhatsApp from "./components/FloatingWhatsApp";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/proyectos/flowi" element={<FlowiCaseStudy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <FloatingWhatsApp />
    </BrowserRouter>
  );
}
