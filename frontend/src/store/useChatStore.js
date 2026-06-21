import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios.js";
import { useAuthStore } from "./useAuthStore.js";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  smartReplies: [],
  isSmartReplyLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/message/user");
      set({ users: res.data });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch users");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/message/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    try {
      const res = await axiosInstance.post(
        `/message/send/${selectedUser._id}`,
        messageData
      );

      set((state) => ({
        messages: [...state.messages, res.data],
        smartReplies: [], // clear after sending
      }));
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to send message");
    }
  },

  generateSmartReplies: async (messageText) => {
    if (!messageText) return;

    set({ isSmartReplyLoading: true });

    try {
      const res = await axiosInstance.post("/ai/smart-replies", {
        lastMessage: messageText, // ⚠️ IMPORTANT (see next bug)
      });

      set({ smartReplies: res.data.replies || [] });
    } catch (error) {
      console.error("Smart reply failed", error);
    } finally {
      set({ isSmartReplyLoading: false });
    }
  },

  subscribeToNewMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    socket.on("newMessage", (newMessage) => {
      const { selectedUser } = get();

      if (!selectedUser) return;
      
      // Handle both string ID and populated object
      const senderId = typeof newMessage.senderId === 'object' 
        ? newMessage.senderId._id 
        : newMessage.senderId;
      
      if (senderId !== selectedUser._id) return;

      set((state) => ({
        messages: [...state.messages, newMessage],
      }));

      // ✅ CALL AI
      get().generateSmartReplies(newMessage.text);
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    socket.off("newMessage");
  },

  setSelectedUser: (selectedUser) => {
    if (selectedUser) {
      get().getMessages(selectedUser._id);
    }
    set({ selectedUser });
  },
}));
