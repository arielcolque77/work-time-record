import React from "react";
import { Routes, Route } from "react-router-dom";
import { Start } from "../pages/Start";
import { End } from "../pages/End";
import { CodeVerification } from "../components/CodeVerification";
import { Summary } from "../pages/Summary";

const routes = () => {
  return (
    <Routes>
      <Route path="/entrada" element={<Start />} />
      <Route path="/salida" element={<End />} />
      <Route path="/resumen" element={<Summary />} />
      <Route path="/verificacion" element={<CodeVerification />} />
      <Route path="/" element={<h1>Inicio</h1>} />

    </Routes>
  );
};

export default routes;
