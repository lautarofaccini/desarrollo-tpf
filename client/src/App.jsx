import { Route, Routes } from "react-router-dom";
import EventosPage from "./pages/EventosPage";
import HomePage from "./pages/HomePage";
import EventosForm from "./pages/EventosForm";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import EsculturasPage from "./pages/EsculturasPage";
import EsculturaCard from "./pages/EsculturaCard";
import { EventoContextProvider } from "./context/EventoProvider";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <div>
      <Navbar />
      <div className="pt-20">
        <EventoContextProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<NotFound />} />

            <Route path="/eventos" element={<EventosPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/eventos/new" element={<EventosForm />} />
              <Route path="/eventos/edit/:id" element={<EventosForm />} />
            </Route>

            <Route path="/esculturas" element={<EsculturasPage />} />
            <Route path="/escultura/:id" element={<EsculturaCard />} />
          </Routes>
        </EventoContextProvider>
      </div>
    </div>
  );
}

export default App;
