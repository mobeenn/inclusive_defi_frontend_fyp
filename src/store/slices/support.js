export const createSupportSlice = (set) => ({
   currentTicket: null,
   setCurrentTicket: (data) => set((state) => ({ ...state, currentTicket: data })),

   tickets: [],
   setTickets: (data) => set((state) => ({ ...state, tickets: data })),

   newTicketMessages: [],
   emptyNewTicketMessages: () => set((state) => ({ ...state, newTicketMessages: [] })),
   addNewTicketMessage: (data) => set((state) => ({ ...state, newTicketMessages: [...state.newTicketMessages, data] })),
});
