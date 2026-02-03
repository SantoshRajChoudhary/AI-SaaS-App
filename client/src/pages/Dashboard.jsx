import { useEffect, useState } from "react";
import { Sparkles, Gem } from "lucide-react";
import { Protect, useAuth } from "@clerk/clerk-react";
import { CreationItem } from "../components/index";
import axios from "axios";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

function Dashboard() {
  const [creations, setCreations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getToken } = useAuth();

  const getDashboardData = async () => {
    try {
      const { data } = await axios.get("/api/user/get-user-creations", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });

      if (data.success && Array.isArray(data.creations)) {
        setCreations(data.creations);
      } else {
        setCreations([]);
        toast.error(data.message || "No creations found");
      }
    } catch (error) {
      setCreations([]);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <>
      {/* 🚫 DO NOT INDEX DASHBOARD */}
      <Helmet>
        <title>User Dashboard | OneSolution.ai</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="h-full overflow-y-scroll p-6">
        {/* ✅ SINGLE H1 */}
        <h1 className="text-xl font-semibold mb-4">
          Dashboard
        </h1>

        <div className="flex justify-start gap-4 flex-wrap">
          {/* Total creation card */}
          <div className="bg-white flex justify-between items-center w-70 p-6 px-10 rounded-xl border border-gray-200">
            <div className="text-slate-600">
              <h2 className="text-sm">Total Creations</h2>
              <p className="text-xl font-semibold">{creations.length}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#3588F2] to-[#0BB0D7] text-white flex justify-center items-center">
              <Sparkles className="w-4" />
            </div>
          </div>

          {/* Active plan card */}
          <div className="bg-white flex justify-between items-center w-70 p-6 px-10 rounded-xl border border-gray-200">
            <div className="text-slate-600">
              <h2 className="text-sm">Active Plan</h2>
              <p className="text-xl font-semibold">
                <Protect plan="premium" fallback="Free">
                  Premium
                </Protect>
              </p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF61C5] to-[#9E53EE] text-white flex justify-center items-center">
              <Gem className="w-4" />
            </div>
          </div>
        </div>

        {!loading ? (
          <section className="space-y-4">
            <h2 className="mt-6 font-semibold">
              Recent Creations
            </h2>
            {creations.map((item) => (
              <CreationItem key={item.id} item={item} />
            ))}
          </section>
        ) : (
          <div className="flex justify-center items-center h-3/4">
            <span className="w-10 h-10 my-1 rounded-full border-3 border-primary border-t-transparent animate-spin"></span>
          </div>
        )}
      </div>
    </>
  );
}

export default Dashboard;
