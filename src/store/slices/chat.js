export const createChatSlice = (set) => ({
   currentChat: null,
   setCurrentChat: (data) => set((state) => ({ ...state, currentChat: data })),

   newMessages: [],
   setNewMessages: (data) => set((state) => ({ ...state, newMessages: data })),
   addNewMessage: (data) =>
      set((state) => ({ ...state, newMessages: [...state.newMessages, data] })),
   removeChatNewMessages: (chatId) =>
      set((state) => ({
         ...state,
         newMessages: state.newMessages.filter(
            (message) => message.chatId !== chatId,
         ),
      })),

   upcomingMessages: [],
   setUpcomingMessages: (data) =>
      set((state) => ({ ...state, upcomingMessages: data })),
   addUpcomingMessage: (data) =>
      set((state) => ({
         ...state,
         upcomingMessages: [...state.upcomingMessages, data],
      })),
   removeUpcomingMessage: (chatId) =>
      set((state) => ({
         ...state,
         upcomingMessages: state.upcomingMessages.filter(
            (message) => message.chatId !== chatId,
         ),
      })),

   chatSearchQuery: "",
   setChatSearchQuery: (data) =>
      set((state) => ({ ...state, chatSearchQuery: data })),

   onlineUsers: [],
   setOnlineUsers: (data) => set((state) => ({ ...state, onlineUsers: data })),
});
