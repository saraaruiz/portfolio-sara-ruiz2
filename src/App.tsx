import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Index from "./pages/Index";
import FlowiCaseStudy from "./pages/FlowiCaseStudy";
import SelectoCaseStudy from "./pages/SelectoCaseStudy";
import NotFound from "./pages/NotFound";
import FloatingWhatsApp from "./components/FloatingWhatsApp";

function Shell() {
  const { search } = useLocation();
  // ?embed=1 se usa cuando la página se muestra dentro de la ventana de proyectos del portafolio
  const embedded = new URLSearchParams(search).get("embed") === "1";

  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/proyectos/flowi" element={<FlowiCaseStudy />} />
        <Route path="/proyectos/selecto" element={<SelectoCaseStudy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!embedded && <FloatingWhatsApp />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Shell />
    </BrowserRouter>
  );
}
