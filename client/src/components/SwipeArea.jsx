import TinderCard from "react-tinder-card";
import { useMatchStore } from "../store/useMatchStore";
import { useRef } from "react";
import { MapPin } from "lucide-react";

const SwipeArea = () => {
  const { userProfiles, swipeRight, swipeLeft } = useMatchStore();
  const cardRefs = useRef([]);

  const handleSwipe = (dir, user) => {
    if (dir === "right") swipeRight(user);
    else if (dir === "left") swipeLeft(user);
  };

  return (
    <div className="relative w-full font-poppins max-w-sm h-[32rem] mx-auto">
      {userProfiles.map((user, index) => (
        <TinderCard
          ref={(el) => (cardRefs.current[index] = el)}
          className="absolute"
          key={user._id}
          onSwipe={(dir) => handleSwipe(dir, user)}
          swipeRequirementType="position"
          swipeThreshold={100}
          preventSwipe={["up", "down"]}
          outputRotationRange={["-15deg", "0deg", "15deg"]}
        >
          <div className="card bg-gradient-to-b from-white to-blue-50 w-96 h-[32rem] select-none rounded-xl overflow-hidden border-2 border-blue-200 shadow-xl">
            {/* University Banner */}
            <div className="bg-gradient-to-r from-turq via-blue-600 to-blue-900 text-white py-2 px-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin size={20} />
                <span className="font-bold">{user.university || "State University"}</span>
              </div>
              <div className="flex items-center gap-1 text-sm">
              </div>
            </div>
	

            {/* Main Image */}
            <figure className="px-6 pt-2 h-3/5 relative">
              <img
                src={user.image || "/avatar.png"}
                alt={user.name}
                className="rounded-xl object-covers h-full w-full pointer-events-none border-2 border-white"
              />
        
            </figure>

            {/* Profile Info */}
            <div className="card-body p-6 pt-2">
              <div className="flex justify-between items-start">
                <h2 className="card-title text-xl text-gray-800 font-bold">
                  {user.name}, {user.age}
                </h2>
              </div>

			  <p className="text-gray-600 line-clamp-2">
                {user.bio || "Focused on studies but always down for campus events!"}
              </p>

			  {/* Course */}
			  <div className="text-gray-800 pt-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-bold">{user.course || "State University"}</span>
              </div>
              <div className="flex items-center gap-1 text-sm">
              </div>
            </div>
              
              
              
              {/* Interests Tags */}
              <div className="flex flex-wrap gap-2 mt-2">
                {(user.interests || ["Basketball", "Debate", "Music", "Camping"]).slice(0, 4).map((interest, i) => (
                  <span key={i} className="badge font-semibold text-blue-900 rounded-full text-s">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </TinderCard>
      ))}
    </div>
  );
};

export default SwipeArea;