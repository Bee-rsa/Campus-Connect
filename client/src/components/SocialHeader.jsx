import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useMatchStore } from "../store/useMatchStore";
import { Link } from "react-router-dom";
import { Flame, User, LogOut, Menu, MessageCircle } from "lucide-react";

export const Header = () => {
  const { authUser, logout } = useAuthStore();
  const { matches } = useMatchStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const renderMobileMenuContent = () => {
    if (!authUser) return null;

    return (
      <>
        <div className="flex items-center p-4 border-b border-white/20">
          <img
            src={authUser.image || "/avatar.png"}
            className="h-12 w-12 rounded-full border-2 border-white"
            alt="Profile"
          />
          <div className="ml-3">
            <h3 className="text-white font-medium">{authUser.name}</h3>
            <p className="text-blue-100 text-sm">
              {matches.length} {matches.length === 1 ? "match" : "matches"}
            </p>
          </div>
        </div>

        <div className="p-4 border-b border-white/20">
          <h4 className="text-white font-medium mb-2">Recent Matches</h4>
          <div className="grid grid-cols-2 gap-2">
            {matches.slice(0, 6).map((match) => (
              <div key={match._id} className="flex items-center justify-between p-2 hover:bg-blue-700/20 rounded-lg">
                <div className="flex items-center">
                  <img
                    src={match.image || "/avatar.png"}
                    className="h-8 w-8 rounded-full border border-white mr-2"
                    alt={match.name}
                  />
                  <span className="text-white text-sm truncate max-w-[80px]">{match.name}</span>
                </div>
                <Link 
                  to="/chat" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-blue-200 hover:text-white"
                >
                  <MessageCircle size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  };

  return (
    <header className="bg-gradient-to-r from-turq via-blue-600 to-blue-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Flame className="w-8 h-8 text-white" />
              <span className="text-xl sm:text-2xl font-bold font-poppins text-white">
                Hey Mate
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {authUser ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <img
                    src={authUser.image || "/avatar.png"}
                    className="h-10 w-10 object-cover rounded-full border-2 border-white"
                    alt="User"
                  />
                  <span className="text-white font-medium">{authUser.name}</span>
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <Link
                      to="/profile"
                      className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <User className="mr-2" size={16} />
                      Profile
                    </Link>
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <LogOut className="mr-2" size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/auth"
                  className="text-white hover:text-blue-200 transition duration-150 ease-in-out"
                >
                  Login
                </Link>
                <Link
                  to="/auth"
                  className="bg-white text-blue-600 px-4 py-2 rounded-full font-medium hover:bg-blue-100 transition duration-150 ease-in-out"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white focus:outline-none"
            >
              <Menu className="size-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gradient-to-r from-turq via-blue-600 to-blue-900 shadow-lg">
          <div className="max-h-[80vh] overflow-y-auto">
            {authUser ? (
              <>
                {renderMobileMenuContent()}
                <div className="p-4">
                  <Link
                    to="/profile"
                    className="flex items-center px-3 py-2 text-white hover:bg-blue-700 rounded-md"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <User className="mr-2" size={18} />
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center w-full px-3 py-2 text-white hover:bg-blue-700 rounded-md"
                  >
                    <LogOut className="mr-2" size={18} />
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="p-4">
                <Link
                  to="/auth"
                  className="block px-3 py-2 text-white hover:bg-blue-700 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/auth"
                  className="block px-3 py-2 text-white hover:bg-blue-700 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;