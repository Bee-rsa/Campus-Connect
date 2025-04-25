import { useEffect, useState } from "react";
import { Star, Loader, MessageCircle, Users, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { useMatchStore } from "../store/useMatchStore";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("matches"); // Default to matches tab
  const toggleSidebar = () => setIsOpen(!isOpen);

  const { getMyMatches, matches, isLoadingMyMatches } = useMatchStore();

  useEffect(() => {
    if (activeTab === "matches") {
      getMyMatches();
    }
  }, [getMyMatches, activeTab]);

  return (
    <>
      <div
        className={`
          fixed inset-y-0 left-0 z-10 w-64 bg-white shadow-md overflow-hidden transition-transform duration-300
          ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:w-1/4
        `}
      >
        <div className="flex flex-col mt-5 font-poppins h-full">
          {/* Navigation Tabs - Updated for mobile responsiveness */}
          <div className="flex border-b border-teal-200 overflow-x-auto">
            <button
              className={`flex-none w-1/3 py-3 px-2 text-center text-sm font-small flex flex-col items-center justify-center gap-1 ${activeTab === "matches" ? "text-teal-600 border-b-2 border-teal-600" : "text-gray-600"}`}
              onClick={() => setActiveTab("matches")}
            >
              <Star size={16} />
              <span className="whitespace-nowrap">Matches</span>
            </button>
            <button
              className={`flex-none w-1/3 py-3 px-2 text-center text-sm font-small flex flex-col items-center justify-center gap-1 ${activeTab === "socials" ? "text-teal-600 border-b-2 border-teal-600" : "text-gray-600"}`}
              onClick={() => setActiveTab("socials")}
            >
              <Users size={16} />
              <span className="whitespace-nowrap">Socials</span>
            </button>
            <button
              className={`flex-none w-1/3 py-3 px-2 text-center text-sm font-small flex flex-col items-center justify-center gap-1 ${activeTab === "rewards" ? "text-teal-600 border-b-2 border-teal-600" : "text-gray-600"}`}
              onClick={() => setActiveTab("rewards")}
            >
              <Award size={16} />
              <span className="whitespace-nowrap">Rewards</span>
            </button>
          </div>

          {/* Content Area - Made more responsive */}
          <div className="flex-grow overflow-y-auto p-4 z-10 relative">
            {activeTab === "matches" && (
              <>
                {isLoadingMyMatches ? (
                  <LoadingState />
                ) : matches.length === 0 ? (
                  <NoMatchesFound />
                ) : (
                  matches.map((match) => (
                    <Link key={match._id} to={`/chat/${match._id}`}>
                      <div className="flex items-center mb-4 cursor-pointer hover:bg-teal-50 p-2 rounded-lg transition-colors duration-300">
                        <img
                          src={match.image || "/avatar.png"}
                          alt="User avatar"
                          className="size-12 object-cover rounded-full mr-3 border-2 border-teal-300"
                        />
                        <h3 className="font-semibold text-gray-800 text-sm sm:text-base">{match.name}</h3>
                      </div>
                    </Link>
                  ))
                )}
              </>
            )}

            {activeTab === "socials" && (
              <div className="flex flex-col items-center justify-center h-full text-center p-4">
                <Users className="text-teal-400 mb-4" size={40} />
                <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">Campus Socials</h3>
                <p className="text-gray-500 text-sm sm:text-base max-w-xs">
                  Connect with fellow students at upcoming campus events and social gatherings.
                </p>
                <Link 
                  to="/social-home" 
                  className="mt-4 px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors text-sm sm:text-base"
                >
                  View Events
                </Link>
              </div>
            )}

            {activeTab === "rewards" && (
              <div className="flex flex-col items-center justify-center h-full text-center p-4">
                <Award className="text-teal-400 mb-4" size={40} />
                <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">Student Rewards</h3>
                <p className="text-gray-500 text-sm sm:text-base max-w-xs">
                  Earn points for your campus engagement and redeem exciting rewards.
                </p>
                <Link 
                  to="/rewards" 
                  className="mt-4 px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors text-sm sm:text-base"
                >
                  View Rewards
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <button
        className="lg:hidden fixed top-3 right-10 p-2 text-white rounded-md z-0"
        onClick={toggleSidebar}
      >
        <MessageCircle size={24} />
      </button>
    </>
  );
};

export default Sidebar;

const NoMatchesFound = () => (
  <div className="flex flex-col items-center justify-center h-full text-center p-4">
    <Star className="text-teal-400 mb-4" size={40} />
    <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">No Matches Yet</h3>
    <p className="text-gray-500 text-sm sm:text-base max-w-xs">
      Don&apos;t worry! Your perfect match is just around the corner. Keep swiping!
    </p>
  </div>
);

const LoadingState = () => (
  <div className="flex flex-col items-center justify-center h-full text-center p-4">
    <Loader className="text-teal-500 mb-4 animate-spin" size={40} />
    <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">Loading Matches</h3>
    <p className="text-gray-500 text-sm sm:text-base max-w-xs">
      We&apos;re finding your perfect matches. This might take a moment...
    </p>
  </div>
);