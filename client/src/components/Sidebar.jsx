import { Protect, useClerk, useUser } from "@clerk/clerk-react";
import {
  Eraser,
  FileText,
  Hash,
  House,
  Scissors,
  SquarePen,
  Users,
  Image,
  LogOut,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/ai", label: "Dashboard", Icon: House },
  { to: "/ai/write-article", label: "Write Article", Icon: SquarePen },
  { to: "/ai/blog-titles", label: "Blog Titles", Icon: Hash },
  { to: "/ai/generate-images", label: "Generate Images", Icon: Image },
  { to: "/ai/remove-background", label: "Remove Background", Icon: Eraser },
  { to: "/ai/remove-object", label: "Remove Object", Icon: Scissors },
  { to: "/ai/review-resume", label: "Review Resume", Icon: FileText },
  { to: "/ai/community", label: "Community", Icon: Users },
];

const Sidebar = ({ sidebar, setSidebar }) => {
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();

  return (
    <aside
      className={`z-[100] w-50 sm:w-60 border-r border-gray-200 flex flex-col justify-between
      max-sm:fixed top-16 bottom-0 ${
        sidebar ? "translate-x-0" : "max-sm:-translate-x-full"
      } transition-transform duration-300 ease-in-out bg-white`}
      aria-label="Sidebar navigation"
    >
      {/* User info */}
      <div className="my-7 w-full">
        <img
          src={user.imageUrl}
          alt={`${user.fullName} profile picture`}
          className="w-13 h-13 rounded-full mx-auto"
        />

        <h2 className="text-center mt-1 font-medium text-sm">
          {user.fullName}
        </h2>

        {/* Navigation */}
        <nav className="px-6 mt-5 text-sm font-medium text-gray-600">
          {navItems.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/ai"}
              onClick={() => setSidebar(false)}
              className={({ isActive }) =>
                `px-3.5 py-3 flex gap-3 rounded items-center focus:outline-none ${
                  isActive
                    ? "bg-gradient-to-r from-[#3C81F6] to-[#9234EA] text-white"
                    : ""
                }`
              }
            >
              <Icon className="w-4 h-4" aria-hidden="true" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Bottom section */}
      <div className="border-t border-gray-200 w-full flex items-center justify-between p-3 px-7">
        <button
          onClick={openUserProfile}
          className="flex gap-3 items-center text-left focus:outline-none"
          aria-label="Open user profile"
        >
          <img
            src={user.imageUrl}
            alt={`${user.fullName} avatar`}
            className="w-8 h-8 rounded-full"
          />
          <div>
            <p className="font-medium text-sm">{user.fullName}</p>
            <p className="text-xs text-gray-500">
              <Protect plan="premium" fallback="Free">
                Premium
              </Protect>{" "}
              Plan
            </p>
          </div>
        </button>

        <button
          onClick={signOut}
          aria-label="Sign out"
          className="text-gray-400 hover:text-gray-600 transition"
        >
          <LogOut className="w-5" />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
