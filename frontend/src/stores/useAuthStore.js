import axios from 'axios';
import {axiosInstance} from '../lib/axios.js';
import {create} from 'zustand';
import { toast } from 'react-hot-toast';

// Make sure your backend server is running and axiosInstance has the correct baseURL.

export const useAuthStore = create((set, get) => ({
    authUser: null, // Use null for unauthenticated state
    // setAuthUser: (user) => set({ authUser: user }),
    isCheckingAuth: true,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get('/auth/check'); // add leading slash for consistency
            set({ authUser: res.data });
        } catch (error) {
            console.error('Error checking auth:', error);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    signUp : async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post('auth/signup', data);
            toast.success('Account created successfully! Please log in.');
            set({ authUser: res.data });
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error signing up');
        }
        finally{
            set({ isSigningUp: false });
        }
    },
    login: async (data) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({ authUser: res.data });
            toast.success("Logged in successfully");
            get().connectSocket?.();
        } catch (error) {
            toast.error(error.response?.data?.message || "Error logging in");
            console.error("Login error:", error);
        } finally {
            set({ isLoggingIn: false });
        }
    },logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null });
            toast.success("Logged out successfully");
            get().disconnectSocket?.();
        } catch (error) {
            toast.error(error.response?.data?.message || "Error logging out");
        }
    }, updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
            const res = await axiosInstance.put("/auth/update-profile", data);
            set({ authUser: res.data });
            toast.success("Profile updated successfully");
        } catch (error) {
            console.log("error in update profile:", error);
            toast.error(error.response?.data?.message || "Error updating profile");
        } finally {
            set({ isUpdatingProfile: false });
        }
    },

}));