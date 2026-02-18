import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateFormPage from "./pages/CreateFormPage";
import FillFormPage from "./pages/FillFormPage";
import HomePage from "./pages/HomePage";
import ResponsesPage from "./pages/ResponsesPage";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/forms/new" element={<CreateFormPage />} />
        <Route path="/forms/:id/fill" element={<FillFormPage />} />
        <Route path="/forms/:id/responses" element={<ResponsesPage />} />
      </Routes>
    </BrowserRouter>
  );
}
