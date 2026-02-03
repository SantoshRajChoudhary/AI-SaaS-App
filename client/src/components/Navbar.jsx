import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";

function Navbar() {
  const { user } = useUser();
  const { openSignIn } = useClerk();

  return (
    <nav
      className="absolute z-5 w-full py-3 px-4 sm:px-20 md:px-30 flex justify-between bg-transparent"
      aria-label="Primary navigation"
    >
      {/* ✅ LOGO AS LINK (SEO + ACCESSIBILITY) */}
      <Link to="/" aria-label="Go to homepage">
        <img
          src={assets.logo1}
          alt="OneSolution.ai logo"
          className="w-32 sm:w-50 h-8 cursor-pointer"
        />
      </Link>

      {/* Right side */}
      {user ? (
        <UserButton />
      ) : (
        <button
          onClick={openSignIn}
          className="flex items-center gap-3 rounded-full bg-primary text-white px-5 py-1 sm:px-10 sm:py-2.5 cursor-pointer text-sm hover:opacity-95"
          aria-label="Sign in to get started"
        >
          Get Started
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </button>
      )}
    </nav>
  );
}

export default Navbar;
