import axios from 'axios';
import {axiosInstance} from '../lib/axios';
import {create} from 'zustand';

export const useAuthStore = create((set) => ({
    authUser: true,
    // setAuthUser: (user) => set({ authUser: user }),
    isCheckingAuth: true,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get('auth/check');
           
            set({ authUser: res.data});
        } catch (error) {
            console.error('Error checking auth:', error);
            set({ isCheckingAuth: false });
        }
    },

    signUp : async (formData) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post('auth/signup', formData);
            set({ authUser: res.data, isSigningUp: false });
        } catch (error) {
            console.error('Error signing up:', error);
            set({ isSigningUp: false });
        }
    },

}));