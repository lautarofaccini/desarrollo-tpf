import { Route, Routes } from "react-router-dom";
import EventosPage from "./pages/EventosPage";
import HomePage from "./pages/HomePage";
import EventosForm from "./pages/EventosForm";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import ObrasPage from "./pages/ObrasPage";
import ObraCard from "./components/ObraCard";
import { EventoProvider } from "./context/EventoProvider";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./ProtectedRoute";
import EventoPage from "./pages/EventoPage";
import ObraQRPage from "./pages/ObraQRPage";
import ObraVotacionPage from "./pages/ObraVotacionPage";

function App() {
  return (
    <div>
      <EventoProvider>
        <Navbar />
        <main className="pt-20">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<NotFound />} />

            <Route path="/eventos" element={<EventosPage />} />
            <Route path="/eventos/:id" element={<EventoPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/eventos/new" element={<EventosForm />} />
              <Route path="/eventos/edit/:id" element={<EventosForm />} />
              <Route path="/obras/votar/:id" element={<ObraVotacionPage />} />
            </Route>

            <Route path="/obras" element={<ObrasPage />} />
            <Route path="/obras/:id" element={<ObraCard />} />
            <Route path="/obras/qr/:id" element={<ObraQRPage />} />
          </Routes>
        </main>
      </EventoProvider>
    </div>
  );
}

export default App;
