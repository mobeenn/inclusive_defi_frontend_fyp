import { create } from "zustand";
import { createSupportSlice } from "./slices/support";
import { createChatSlice } from "./slices/chat";
import { createNotificationSlice } from "./slices/notification";
import { createAuthSlice } from "./slices/auth";

export const useStore = create((...a) => ({
   ...createSupportSlice(...a),
   ...createChatSlice(...a),
   ...createNotificationSlice(...a),
   ...createAuthSlice(...a),
}));
