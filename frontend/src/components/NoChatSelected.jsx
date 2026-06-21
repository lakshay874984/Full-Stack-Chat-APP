import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-gradient-to-br from-base-100 to-base-200">
      <div className="max-w-md text-center space-y-6">
        {/* Icon Display */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-primary to-secondary rounded-3xl blur opacity-30 group-hover:opacity-100 transition duration-500"></div>
            <div
              className="relative w-20 h-20 rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:scale-110 transition-all duration-300"
            >
              <MessageSquare className="w-10 h-10 text-primary animate-bounce" />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <div className="space-y-3">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Welcome to Chatty! 👋</h2>
          <p className="text-base-content/70 text-lg leading-relaxed">
            Select a conversation from the sidebar to start chatting with your friends
          </p>
        </div>

        {/* Decorative elements */}
        <div className="pt-6 flex justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
          <div className="w-2 h-2 rounded-full bg-secondary animate-pulse delay-100"></div>
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-200"></div>
        </div>
      </div>
    </div>
  );
};

export default NoChatSelected;