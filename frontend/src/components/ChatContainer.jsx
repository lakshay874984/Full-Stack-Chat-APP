import { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore.js";
import { useAuthStore } from "../store/useAuthStore.js";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";

const ChatContainer = () => {
  const { messages, isMessagesLoading, selectedUser, subscribeToNewMessages, unsubscribeFromMessages, getMessages } = useChatStore();
  const { authUser } = useAuthStore();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (selectedUser?._id) {
      subscribeToNewMessages();
    }

    return () => unsubscribeFromMessages();
  }, [selectedUser?._id, subscribeToNewMessages, unsubscribeFromMessages]);

  const getProfilePic = (msg) => {
    // Check if senderId is populated (object with profilepic)
    if (typeof msg.senderId === 'object' && msg.senderId?.profilepic) {
      return msg.senderId.profilepic;
    }
    // If senderId is a string ID, check who sent it
    if (msg.senderId === authUser?._id && authUser?.profilepic) {
      return authUser.profilepic;
    }
    if (msg.senderId === selectedUser?._id && selectedUser?.profilepic) {
      return selectedUser.profilepic;
    }
    return "/avatar.png";
  };

  if (isMessagesLoading) {
    return (
      <div className="flex-1 overflow-auto p-4 space-y-4">
        <MessageSkeleton />
        <MessageSkeleton />
        <MessageSkeleton />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gradient-to-b from-base-100 to-base-200">
      <ChatHeader />

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-base-300 scrollbar-track-base-100">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-zinc-500">
            <p className="text-center\">No messages yet. Start a conversation!</p>
          </div>
        ) : (
          messages.map((msg) => {
            const isSent = msg.senderId === authUser?._id || 
                          (typeof msg.senderId === 'object' && msg.senderId._id === authUser?._id);
            
            return (
              <div key={msg._id} className={`flex ${isSent ? 'justify-end' : 'justify-start'} animate-slideInUp`}>
                <div className={`flex gap-2 max-w-xs lg:max-w-md ${isSent ? 'flex-row-reverse' : 'flex-row'}`}>
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-base-300 hover:ring-primary transition-all duration-200">
                      <img
                        alt="avatar"
                        src={getProfilePic(msg)}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Message Bubble */}
                  <div className="flex flex-col gap-1">
                    <div
                      className={`px-4 py-2 rounded-2xl break-words shadow-md hover:shadow-lg transition-all duration-200 ${
                        isSent
                          ? 'bg-gradient-to-br from-primary to-primary-focus text-primary-content rounded-br-none'
                          : 'bg-gradient-to-br from-base-300 to-base-200 text-base-content rounded-bl-none'
                      }`}
                    >
                      {msg.image && (
                        <img
                          src={msg.image}
                          alt="Attachment"
                          className="w-full sm:max-w-[200px] rounded-lg mb-2 object-cover hover:scale-105 transition-transform duration-200"
                        />
                      )}
                      <p className="text-sm sm:text-base">{msg.text}</p>
                    </div>
                    <span className={`text-xs text-zinc-500 px-2 ${isSent ? 'text-right' : 'text-left'}`}>
                      {new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
