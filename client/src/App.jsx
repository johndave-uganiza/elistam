import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import AppRouter from "./routes/AppRouter";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="d-flex flex-column flex-fill">
        <AppRouter />
      </main>
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        // transition={Bounce}
      />
    </div>
  );
}

export default App;
