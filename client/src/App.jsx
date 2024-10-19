import { Route, Routes } from "react-router-dom";
import EventosPage from "./pages/EventosPage";
import HomePage from "./pages/HomePage";
import EventosForm from "./pages/EventosForm";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import EsculturasPage from "./pages/EsculturasPage";
import EsculturaDetail from "./pages/Escultura_deta";
import { EventoContextProvider } from "./context/EventoProvider";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <div className=" ">
      <Navbar />
      <div className="">
        <EventoContextProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/eventos" element={<EventosPage />} />
            <Route path="/eventos/new" element={<EventosForm />} />
            <Route path="/eventos/edit/:id" element={<EventosForm />} />
            <Route path="/esculturas" element={<EsculturasPage />} />
            <Route path="/escultura/:id" element={<EsculturaDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </EventoContextProvider>
      </div>
    </div>
  );
}

export default App;
