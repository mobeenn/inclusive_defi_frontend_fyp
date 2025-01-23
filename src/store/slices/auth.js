import { getCurrentUser } from "@/api/auth";

export const createAuthSlice = (set) => ({
   user: null,
   setUser: (user) => set({ user }),
   fetchCurrentUser: async () => {
      try {
         const data = await getCurrentUser();
         set((state) => ({ ...state, user: data }));
      } catch (error) {
         console.error(error);
      }
   },
});
