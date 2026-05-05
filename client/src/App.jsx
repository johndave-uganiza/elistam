import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="d-flex flex-column flex-fill">
        <AppRouter />
      </main>
      <Footer />
    </div>
  );
}

export default App;
