import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, loading } = useAuthStore();

  return (
    <form
      className="space-y-4 md:space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        login({ email, password });
      }}
    >
      <div>
        <label htmlFor="email" className="block text-sm md:text-base font-medium text-gray-700">
          Email address
        </label>
        <div className="mt-1">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="appearance-none block w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-turq focus:border-turq text-sm md:text-base"
          />
        </div>
      </div>

      <div>
        <label htmlFor="password" className="block text-sm md:text-base font-medium text-gray-700">
          Password
        </label>
        <div className="mt-1">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="appearance-none block w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-turq focus:border-turq text-sm md:text-base"
          />
        </div>
      </div>

      <button
        type="submit"
        className={`w-full flex justify-center py-2 md:py-3 px-4 border border-transparent 
          rounded-md shadow-sm text-sm md:text-base font-medium text-white ${
            loading
              ? "bg-teal-400 cursor-not-allowed"
              : "bg-turq hover:bg-turq-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-turq"
          }`}
        disabled={loading}
      >
        {loading ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
};

export default LoginForm;