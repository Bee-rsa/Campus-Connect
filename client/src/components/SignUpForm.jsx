import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import campusImage from "../../public/male/2.jpg";

const universities = [
  "Durban University of Technology",
  "University of Kwa-Zulu Natal", 
  "Varsity College",
];

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    age: "",
    genderPreference: "",
    university: "",
    course: ""
  });

  const { signup, loading } = useAuthStore();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (checked ? value : "") : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 p-8 overflow-y-auto">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Create Your Account</h2>
            <p className="text-gray-600 mt-2">Join our campus community</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-1 col-span-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="John Doe"
                />
              </div>

              {/* Email */}
              <div className="space-y-1 col-span-2 md:col-span-1">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="you@example.com"
                />
              </div>

              {/* Password */}
              <div className="space-y-1 col-span-2 md:col-span-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="••••••••"
                />
              </div>

              {/* Age */}
              <div className="space-y-1 col-span-2 md:col-span-1">
                <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                  Age
                </label>
                <input
                  id="age"
                  name="age"
                  type="number"
                  min="18"
                  max="120"
                  required
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>

              {/* Course */}
              <div className="space-y-1 col-span-2 md:col-span-1">
                <label htmlFor="course" className="block text-sm font-medium text-gray-700">
                  Course
                </label>
                <input
                  id="course"
                  name="course"
                  type="text"
                  required
                  value={formData.course}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="Diploma in Mechanical Engineering"
                />
              </div>
            </div>

            {/* University */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                University
              </label>
              <div className="space-y-2">
                {universities.map((uni) => (
                  <div key={uni} className="flex items-center">
                    <input
                      id={`uni-${uni}`}
                      name="university"
                      type="radio"
                      value={uni}
                      checked={formData.university === uni}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor={`uni-${uni}`} className="ml-3 flex items-center">
                      <span className="text-sm text-gray-700">{uni}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Gender and Gender Preference */}
<div className="grid grid-cols-2 gap-4">
  {/* Gender */}
  <div className="space-y-1">
    <label className="block text-sm font-medium text-gray-700">
      Gender
    </label>
    <div className="space-y-2">
      {["Male", "Female", "Other"].map((gender) => (
        <div key={gender} className="flex items-center">
          <input
            id={`gender-${gender}`}
            name="gender"
            type="radio"
            value={gender.toLowerCase()}
            checked={formData.gender === gender.toLowerCase()}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor={`gender-${gender}`} className="ml-2 block text-sm text-gray-700">
            {gender}
          </label>
        </div>
      ))}
    </div>
  </div>

  {/* Gender Preference */}
  <div className="space-y-1">
    <label className="block text-sm font-medium text-gray-700">
      Seek Friendships with
    </label>
    <div className="space-y-2">
      {["Male", "Female", "Both"].map((pref) => (
        <div key={pref} className="flex items-center">
          <input
            id={`pref-${pref}`}
            name="genderPreference"
            type="radio"
            value={pref.toLowerCase()}
            checked={formData.genderPreference === pref.toLowerCase()}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor={`pref-${pref}`} className="ml-2 block text-sm text-gray-700">
            {pref}
          </label>
        </div>
      ))}
    </div>
  </div>
</div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-colors ${
                loading 
                  ? "bg-blue-400 cursor-not-allowed" 
                  : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </span>
              ) : (
                "Sign Up Now"
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Right Side - Image with padding */}
      <div className="hidden md:block w-1/2 relative">
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <img 
            src={campusImage} 
            alt="Campus Life"
            className="w-full h-full object-cover rounded-xl shadow-lg"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-12">
          <div className="text-white">
            <h3 className="text-4xl font-bold mb-4">Connect With Your Campus</h3>
            <p className="text-xl">Find your perfect match at university</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;