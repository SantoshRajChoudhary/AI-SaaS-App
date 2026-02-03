import { useNavigate, Link } from "react-router-dom";
import { assets } from "../assets/assets";

function Hero() {
  const navigate = useNavigate();

  return (
    <header
      className="px-4 sm:px-20 w-full xl:px-32 inline-flex flex-col gap-6 justify-center
      bg-[url(/gradientBackground.png)] bg-cover bg-no-repeat min-h-screen
      transition-all duration-1000 ease-in-out"
    >
      <div className="max-w-[1240px] mx-auto text-center gap-4">
        {/* ✅ SINGLE, SEO-FOCUSED H1 */}
        <h1 className="mx-auto lg:text-7xl md:text-5xl sm:text-4xl text-3xl font-bold leading-[1.2]">
          Create Amazing Content <br />
          with <span className="text-primary">AI Tools</span>
        </h1>

        <p className="mt-4 max-w-xs md:max-w-md lg:max-w-xl m-auto max-sm:text-xs max-md:text-sm max-lg:text-md text-gray-600">
          Transform your content creation with our suite of premium AI tools.
          Write articles, generate images, and enhance your workflow.
        </p>
      </div>

      {/* ✅ CTA LINKS (NOT JS BUTTONS) */}
      <div className="flex flex-wrap justify-center gap-4 text-sm max-sm:text-xs">
        <Link
          to="/ai"
          className="rounded-lg bg-primary text-white px-2 py-1 sm:px-7 sm:py-2.5 md:px-9
          cursor-pointer hover:scale-102 active:scale-95 transition"
        >
          Start Creating with AI
        </Link>

        <button
          type="button"
          className="rounded-lg bg-white text-black px-2 sm:px-7 sm:py-2.5 md:px-9
          cursor-pointer hover:scale-102 active:scale-95 transition"
        >
          Watch Demo
        </button>
      </div>

      {/* ✅ TRUST SIGNAL */}
      <div className="flex items-center gap-4 mx-auto text-gray-600 mt-2">
        <img
          src={assets.user_group}
          alt="Trusted by over 10,000 creators worldwide"
          className="sm:h-8 md:h-10 h-5"
          loading="lazy"
        />
        <span>Trusted by 10,000+ creators worldwide</span>
      </div>
    </header>
  );
}

export default Hero;
