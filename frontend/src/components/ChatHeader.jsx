import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="p-3 border-b border-base-300 bg-base-100 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="w-10 h-10 rounded-full ring-2 ring-primary overflow-hidden">
              <img src={selectedUser.profilepic || "/avatar.png"} alt={selectedUser.fullName} />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-semibold text-base">{selectedUser.fullName}</h3>
            <p className={`text-xs font-medium ${
              onlineUsers.includes(selectedUser._id) 
                ? 'text-success' 
                : 'text-base-content/60'
            }`}>
              {onlineUsers.includes(selectedUser._id) ? '🟢 Online' : '🔴 Offline'}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button 
          onClick={() => setSelectedUser(null)}
          className="btn btn-ghost btn-circle btn-sm hover:bg-base-200 transition-colors"
          title="Close chat"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;