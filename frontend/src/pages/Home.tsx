import "../styles/Home.css";
import Navbar from "../components/Navbar";
import TopTracksWidget from "../components/TopTracksWidget";
import Footer from "../components/Footer";
import { useTranslationSync } from "../hooks/useTranslationSync";

const Home: React.FC = () => {
  const { t } = useTranslationSync("home");

  return (
    <div className="home-container">
      <Navbar />
      <main className="main-content">
        <section className="content-left">
          <div className="welcome-text">
            <h1 className="headline">{t("home-main.headline")}</h1>
            <h2 className="name-gradient">{t("home-main.name")}</h2>
            <p className="subtitle">{t("home-main.subtitle")}</p>
          </div>
        </section>
        <TopTracksWidget />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
