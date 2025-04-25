import { useRef, useState } from "react";
import { Header } from "../components/Header";
import { useAuthStore } from "../store/useAuthStore";
import { useUserStore } from "../store/useUserStore";
import { Camera, User, Edit3, Save } from "lucide-react";

const ProfilePage = () => {
  const { authUser } = useAuthStore();
  const [name, setName] = useState(authUser.name || "");
  const [bio, setBio] = useState(authUser.bio || "");
  const [age, setAge] = useState(authUser.age || "");
  const [gender, setGender] = useState(authUser.gender || "");
  const [genderPreference, setGenderPreference] = useState(authUser.genderPreference || []);
  const [image, setImage] = useState(authUser.image || null);

  const fileInputRef = useRef(null);
  const { loading, updateProfile } = useUserStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile({ name, bio, age, gender, genderPreference, image });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col">
      <Header />

      <div className="flex-grow flex flex-col justify-center py-8 px-4 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
              <User className="text-blue-500" size={28} />
              Edit Your Profile
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Update your information to improve your matches
            </p>
          </div>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
          <div className="bg-white py-8 px-6 shadow-xl rounded-2xl sm:px-10 border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Profile Picture */}
              <div className="flex flex-col items-center">
                <div className="relative group">
                  <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden border-4 border-white shadow-md">
                    {image ? (
                      <img src={image} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-r from-blue-100 to-indigo-100 flex items-center justify-center">
                        <User className="text-gray-400" size={40} />
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                    className="absolute -bottom-2 -right-2 bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600 transition-all"
                  >
                    <Camera size={16} />
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </div>
              </div>

              {/* NAME */}
              <div className="space-y-1">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Display Name
                </label>
                <div className="relative">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all"
                  />
                  <Edit3 className="absolute right-3 top-3.5 text-gray-400" size={16} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* AGE */}
                <div className="space-y-1">
                  <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                    Age
                  </label>
                  <input
                    id="age"
                    name="age"
                    type="number"
                    required
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="block w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                  />
                </div>

                {/* GENDER */}
                <div className="space-y-2">
                  <span className="block text-sm font-medium text-gray-700">Gender</span>
                  <div className="flex space-x-4">
                    {["Male", "Female"].map((option) => (
                      <label key={option} className="flex items-center space-x-2">
                        <div className="relative">
                          <input
                            type="radio"
                            className="sr-only peer"
                            name="gender"
                            value={option.toLowerCase()}
                            checked={gender === option.toLowerCase()}
                            onChange={() => setGender(option.toLowerCase())}
                          />
                          <div className="w-5 h-5 rounded-full border-2 border-gray-300 peer-checked:border-blue-500 flex items-center justify-center">
                            <div className={`w-3 h-3 rounded-full ${gender === option.toLowerCase() ? 'bg-blue-500' : 'bg-transparent'}`}></div>
                          </div>
                        </div>
                        <span className="text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* GENDER PREFERENCE */}
              <div className="space-y-2">
                <span className="block text-sm font-medium text-gray-700">Seeking Friends With</span>
                <div className="flex flex-wrap gap-3">
                  {["Male", "Female", "Both"].map((option) => (
                    <label key={option} className="flex items-center space-x-2">
                      <div className="relative">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={genderPreference.toLowerCase() === option.toLowerCase()}
                          onChange={() => setGenderPreference(option.toLowerCase())}
                        />
                        <div className="w-5 h-5 rounded border-2 border-gray-300 peer-checked:border-blue-500 peer-checked:bg-blue-50 flex items-center justify-center">
                          <svg className={`w-3 h-3 text-blue-500 ${genderPreference.toLowerCase() === option.toLowerCase() ? 'block' : 'hidden'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                      <span className="text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* BIO */}
              <div className="space-y-1">
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                  About You
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  rows={4}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="block w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                  placeholder="Tell others about yourself..."
                />
              </div>

              <button
                type="submit"
                className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    Save Profile
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;