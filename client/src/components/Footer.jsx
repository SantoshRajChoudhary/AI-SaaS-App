import { assets } from "../assets/assets";
import { useLocation, useNavigate, Link } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  function handleClick() {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  }

  return (
    <footer className="bg-white">
      <div className="grid sm:grid-cols-5 md:grid-cols-9 gap-4 sm:mx-15 mx-10 py-5 border-b border-gray-300">

        {/* Brand section */}
        <div className="sm:col-span-4 md:col-span-3 lg:col-span-4 sm:mr-8 max-w-sm">
          <button onClick={handleClick} aria-label="Go to homepage">
            <img
              src={assets.logo1}
              alt="OneSolution.ai logo"
              className="w-40 h-7 cursor-pointer"
            />
          </button>

          <p className="text-gray-500 text-sm my-5">
            Experience the power of AI with <strong>OneSolution.ai</strong>.
            Transform your content creation with our suite of premium AI tools.
            Write articles, generate images, and enhance your workflow.
          </p>
        </div>

        {/* Company links */}
        <nav className="sm:col-span-1 md:col-span-2" aria-label="Footer navigation">
          <h3 className="font-medium">Company</h3>
          <ul className="my-5 space-y-2">
            <li>
              <Link to="/" className="text-gray-500 text-sm hover:text-blue-600">
                Home
              </Link>
            </li>
            <li>
              <Link to="/" className="text-gray-500 text-sm hover:text-blue-600">
                About us
              </Link>
            </li>
            <li>
              <Link to="/" className="text-gray-500 text-sm hover:text-blue-600">
                Contact us
              </Link>
            </li>
            <li>
              <Link to="/" className="text-gray-500 text-sm hover:text-blue-600">
                Privacy policy
              </Link>
            </li>
          </ul>
        </nav>

        {/* Newsletter */}
        <div className="sm:col-span-6 md:col-span-4 lg:col-span-3 sm:text-center">
          <h3 className="font-medium md:text-justify">
            Subscribe to our newsletter
          </h3>
          <p className="text-gray-500 text-sm my-5 md:text-justify">
            The latest news, articles, and resources, sent to your inbox weekly.
          </p>

          <form
            className="flex md:justify-start sm:justify-center"
            onSubmit={(e) => e.preventDefault()}
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              className="w-3/5 sm:w-2/3 text-gray-500 rounded-md border border-gray-300 p-1 mr-1 text-sm outline-neutral-300"
              placeholder="Enter your email"
              required
            />
            <button
              type="submit"
              className="text-white rounded-md py-1 px-3 bg-blue-500 cursor-pointer text-sm hover:bg-blue-600"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <p className="text-gray-500 text-center text-xs m-3">
        © 2025 OneSolution.ai. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
