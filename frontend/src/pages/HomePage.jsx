import { useChatStore } from "../store/useChatStore.js";

import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen bg-gradient-to-br from-base-100 via-base-200 to-base-300 overflow-hidden">
      <div className="flex items-center justify-center pt-20 px-4 h-screen pb-4">
        <div className="bg-gradient-to-br from-base-100 to-base-200 rounded-2xl shadow-2xl w-full max-w-7xl h-[calc(100vh-8rem)] border border-base-300/30 overflow-hidden backdrop-blur-sm">
          <div className="flex h-full rounded-2xl overflow-hidden\">
            <Sidebar />

            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;