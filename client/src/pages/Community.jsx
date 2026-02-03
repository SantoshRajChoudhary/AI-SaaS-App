import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

function Community() {
  const [creations, setCreations] = useState([]);
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const { getToken } = useAuth();

  const fetchCreations = async () => {
    try {
      const { data } = await axios.get(
        "/api/user/get-published-creations",
        {
          headers: { Authorization: `Bearer ${await getToken()}` },
        }
      );

      if (data.success) {
        setCreations(data.creations);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }

    setLoading(false);
  };

  const imageLikeToggle = async (id) => {
    const isLiked = creations.find((c) => c.id === id)?.likes?.includes(user?.id);

    setCreations((prevCreations) =>
      prevCreations.map((creation) => {
        if (creation.id === id) {
          const updatedLikes = isLiked
            ? creation.likes.filter((userId) => userId !== user?.id)
            : [...creation.likes, user.id];
          return { ...creation, likes: updatedLikes };
        }
        return creation;
      })
    );

    try {
      const { data } = await axios.post(
        "/api/user/toggle-like-creation",
        { id },
        {
          headers: { Authorization: `Bearer ${await getToken()}` },
        }
      );

      if (!data.success) {
        toast.error(data.message);
        await fetchCreations();
      }
    } catch (error) {
      toast.error(error.message);
      await fetchCreations();
    }
  };

  useEffect(() => {
    if (user) {
      fetchCreations();
    }
  }, [user]);

  return !loading ? (
    <>
      {/* ✅ SEO METADATA */}
      <Helmet>
        <title>AI Community Creations | OneSolution.ai</title>
        <meta
          name="description"
          content="Explore AI-generated images created by the OneSolution.ai community. Like, share, and discover creative AI artworks."
        />
      </Helmet>

      <div className="h-full flex flex-col gap-4 p-6">
        {/* ✅ SINGLE H1 */}
        <h1 className="text-xl font-semibold">
          Community Creations
        </h1>

        <div className="h-full w-full bg-white rounded-md overflow-y-scroll">
          {creations.map((creation, index) => (
            <div
              key={index}
              className="relative group inline-block pl-3 pt-3 w-full max-w-1/2 lg:max-w-1/3"
            >
              {/* ✅ DESCRIPTIVE ALT */}
              <img
                src={creation.content}
                alt={`AI generated image: ${creation.prompt}`}
                className="w-full h-full object-cover rounded-lg"
              />

              <div className="absolute bottom-0 top-0 right-0 left-3 flex gap-2 items-end justify-end group-hover:justify-between p-3 group-hover:bg-gradient-to-b from-transparent to-black/80 text-white rounded-lg">
                <p className="text-sm hidden group-hover:block">
                  {creation.prompt}
                </p>

                <div className="flex gap-1 items-center">
                  <p>{creation.likes.length}</p>
                  <Heart
                    onClick={() => imageLikeToggle(creation.id)}
                    className={`min-w-5 h-5 hover:scale-110 cursor-pointer ${
                      creation.likes.includes(user.id)
                        ? "fill-red-500 text-red-500"
                        : "text-white"
                    }`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  ) : (
    <div className="flex justify-center items-center h-full">
      <span className="w-10 h-10 my-1 rounded-full border-3 border-primary border-t-transparent animate-spin"></span>
    </div>
  );
}

export default Community;
