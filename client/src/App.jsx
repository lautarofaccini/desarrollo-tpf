import { Route, Routes } from "react-router-dom";
import EventosPage from "./pages/EventosPage";
import HomePage from "./pages/HomePage";
import EventosForm from "./pages/EventosForm";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import { EventoContextProvider } from "./context/EventoProvider";

function App() {
  return (
    <div className="bg-zinc-900 h-screen text-white">
      <div className="container mx-auto">
        <EventoContextProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/eventos" element={<EventosPage />} />
            <Route path="/eventos/new" element={<EventosForm />} />
            <Route path="/eventos/edit/:id" element={<EventosForm />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </EventoContextProvider>
      </div>
    </div>
  );
}

export default App;
