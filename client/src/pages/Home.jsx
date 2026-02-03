import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import AiTools from "../components/AiTools";
import Testimonial from "../components/Testimonial";
import Plan from "../components/Plan";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";

function Home() {
  return (
    <>
      {/* ✅ HOMEPAGE SEO */}
      <Helmet>
        <title>All-in-One AI Tools for Content & Image Creation | OneSolution.ai</title>
        <meta
          name="description"
          content="OneSolution.ai is an all-in-one AI tools platform for writing articles, reviewing resumes, removing image backgrounds, and object removal."
        />
      </Helmet>

      <Navbar />
      <Hero />
      <AiTools />
      <Testimonial />
      <Plan />
      <Footer />
    </>
  );
}

export default Home;
