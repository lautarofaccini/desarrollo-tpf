import { Route, Routes } from "react-router-dom";
import EventosPage from "./pages/EventosPage";
import HomePage from "./pages/HomePage";
import EventosForm from "./pages/EventosForm";
import NotFound from "./pages/NotFound";
import NavbarDois from "./components/NavbarDois";
import EsculturasPage from "./pages/EsculturasPage";
import EsculturaCard from "./pages/EsculturaCard";
import { EventoContextProvider } from "./context/EventoProvider";
import LoginPrueba from "./pages/LoginPrueba";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./ProtectedRoute";
import AboutPage from "./pages/AboutPage";
import ItemsPage from './pages/ItemsPage'
import ItemsForm from './pages/ItemsForm'


function App() {
  return (
    <div>
      <NavbarDois />
      <div className="  ">
        <EventoContextProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/items" element={<ItemsPage />} />
            <Route path="/items/new" element={<ItemsForm />} />
            <Route path="/items/:id/edit" element={<ItemsForm />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPrueba />} />
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
