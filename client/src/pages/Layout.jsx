import { useUser, SignIn } from "@clerk/clerk-react";
import { useState } from "react";
import { assets } from "../assets/assets";
import { Outlet, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Sidebar } from "../components";
import { Helmet } from "react-helmet-async";

function Layout() {
  const [sidebar, setSidebar] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate();

  return user ? (
    <>
      {/* ✅ DEFAULT / FALLBACK SEO */}
      <Helmet>
        <title>OneSolution.ai – AI Tools for Content & Image Processing</title>
        <meta
          name="description"
          content="OneSolution.ai offers AI tools for article writing, resume review, image background removal, and object removal."
        />
      </Helmet>

      <div className="flex flex-col items-start justify-start h-screen transition-all duration-900 ease-in-out">
        {/* ✅ NAVIGATION */}
        <nav className="px-8 w-full h-16 flex items-center justify-between border-b border-gray-200">
          <img
            src={assets.logo1}
            alt="OneSolution.ai logo"
            className="w-32 sm:w-38 h-7 cursor-pointer"
            onClick={() => navigate("/")}
          />

          {sidebar ? (
            <X
              onClick={() => setSidebar(false)}
              className="w-6 h-6 text-gray-600 sm:hidden"
            />
          ) : (
            <Menu
              onClick={() => setSidebar(true)}
              className="w-6 h-6 text-gray-600 sm:hidden"
            />
          )}
        </nav>

        <main className="flex-1 w-full flex h-[calc(100vh-64px)] overflow-y-scroll">
          <Sidebar sidebar={sidebar} setSidebar={setSidebar} />

          {/* ✅ MAIN CONTENT */}
          <section className="flex-1 bg-[#F4F7FB]">
            <Outlet />
          </section>
        </main>
      </div>
    </>
  ) : (
    <div className="flex justify-center items-center min-h-screen">
      <SignIn />
    </div>
  );
}

export default Layout;
