import "../styles/Home.css";
import Navbar from "../components/Navbar";
import TopTracksWidget from "../components/TopTracksWidget";
import Footer from "../components/Footer";

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <Navbar />
      <main className="main-content">
        <section className="content-left">
          <div className="welcome-text">
            <h1 className="headline">Welcome!</h1>
            <h2 className="name-gradient">I'm Matheus.</h2>
            <p className="subtitle">Feel free to scroll through the music that fuels my focus.</p>
          </div>         
        </section>
        <TopTracksWidget />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
