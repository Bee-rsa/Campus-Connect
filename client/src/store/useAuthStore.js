import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { disconnectSocket, initializeSocket } from "../socket/socket.client";

export const useAuthStore = create((set) => ({
  authUser: null,
  checkingAuth: true,
  loading: false,

  // Unified error handler
  handleError: (error) => {
    const message = error.response?.data?.message || 
                  error.message || 
                  "Something went wrong";
    toast.error(message);
    return message;
  },

  signup: async (signupData) => {
    try {
      set({ loading: true });
      const { data } = await axiosInstance.post("/auth/signup", signupData);
      
      set({ 
        authUser: data.user,
        checkingAuth: false 
      });
      
      initializeSocket(data.token); // Pass token instead of user._id
      toast.success("Account created successfully");
      return data;
    } catch (error) {
      throw useAuthStore.getState().handleError(error);
    } finally {
      set({ loading: false });
    }
  },

  login: async ({ email, password }) => {
    try {
      set({ loading: true });
      const { data } = await axiosInstance.post("/auth/login", { email, password });
      
      set({ 
        authUser: data.user,
        checkingAuth: false 
      });
      
      initializeSocket(data.token);
      toast.success("Logged in successfully");
      return data;
    } catch (error) {
      throw useAuthStore.getState().handleError(error);
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      disconnectSocket();
      set({ authUser: null });
      toast.success("Logged out successfully");
    } catch (error) {
      throw useAuthStore.getState().handleError(error);
    }
  },

  checkAuth: async () => {
    try {
      const { data } = await axiosInstance.get("/auth/me");
      set({ 
        authUser: data.user,
        checkingAuth: false 
      });
      initializeSocket(data.token);
      return data;
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      set({ 
        authUser: null,
        checkingAuth: false 
      });
      return null;
    }
  },

  setAuthUser: (user) => set({ authUser: user }),
}));