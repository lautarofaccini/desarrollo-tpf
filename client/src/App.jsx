import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";

import EventosPage from "./pages/eventos/EventosPage";
import EventoPage from "./pages/eventos/EventoPage";
import EventosForm from "./pages/eventos/EventosForm";

import { EventoProvider } from "./context/EventoProvider";

import ObrasPage from "./pages/obras/ObrasPage";
import ObraPage from "./pages/obras/ObraPage";
import ObrasForm from "./pages/obras/ObrasForm";
import ObraQRPage from "./pages/obras/ObraQRPage";
import ObraVotacionPage from "./pages/obras/ObraVotacionPage";

import { ObraProvider } from "./context/ObraProvider";

import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";

function App() {
  return (
    <div>
      <EventoProvider>
        <ObraProvider>
          <Navbar />
          <main className="pt-20">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="*" element={<NotFound />} />

              <Route path="/eventos" element={<EventosPage />} />
              <Route path="/eventos/:id" element={<EventoPage />} />

              <Route path="/obras" element={<ObrasPage />} />
              <Route path="/obras/:id" element={<ObraPage />} />
              <Route path="/obras/qr/:id" element={<ObraQRPage />} />

              <Route element={<ProtectedRoute />}>
                <Route path="/eventos/new" element={<EventosForm />} />
                <Route path="/eventos/edit/:id" element={<EventosForm />} />

                <Route path="/obras/new" element={<ObrasForm />} />
                <Route path="/obras/edit/:id" element={<ObrasForm />} />

                <Route path="/obras/votar/:id" element={<ObraVotacionPage />} />
              </Route>

              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </main>
        </ObraProvider>
      </EventoProvider>
    </div>
  );
}

export default App;
