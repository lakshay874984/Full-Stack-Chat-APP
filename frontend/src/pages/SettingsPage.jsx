import { THEMES } from "../constants/index.js";
import { useThemeStore } from "../store/useThemeStore";
import { Send } from "lucide-react";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  { id: 2, content: "I'm doing great! Just working on some new features.", isSent: true },
];

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="h-screen container mx-auto px-4 pt-20 pb-8 max-w-5xl bg-gradient-to-br from-base-100 via-base-200 to-base-300">
      <div className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Appearance</h2>
          <p className="text-base-content/60">Customize your chat interface theme</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-primary mb-4">Available Themes</h3>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
            {THEMES.map((t) => (
              <button
                key={t}
                className={`
                  group flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-200
                  ${theme === t 
                    ? "bg-gradient-to-br from-primary/30 to-secondary/30 ring-2 ring-primary shadow-lg scale-105" 
                    : "hover:bg-base-300/50 hover:scale-105"}
                `}
                onClick={() => setTheme(t)}
              >
                <div className="relative h-10 w-full rounded-lg overflow-hidden shadow-sm" data-theme={t}>
                  <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                    <div className="rounded bg-primary"></div>
                    <div className="rounded bg-secondary"></div>
                    <div className="rounded bg-accent"></div>
                    <div className="rounded bg-neutral"></div>
                  </div>
                </div>
                <span className="text-xs font-semibold truncate w-full text-center group-hover:text-primary transition-colors">
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Preview Section */}
        <div>
          <h3 className="text-sm font-semibold text-primary mb-4">Live Preview</h3>
          <div className="rounded-2xl border border-base-300/50 overflow-hidden bg-base-100 shadow-2xl">
            <div className="p-6 bg-gradient-to-br from-base-200 to-base-300">
              <div className="max-w-lg mx-auto">
                {/* Mock Chat UI */}
                <div className="bg-gradient-to-b from-base-100 to-base-200 rounded-2xl shadow-xl overflow-hidden border border-base-300/50">
                  {/* Chat Header */}
                  <div className="px-5 py-4 border-b border-base-300/50 bg-gradient-to-r from-base-100 to-base-100/50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-semibold shadow-md">
                        J
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm">John Doe</h3>
                        <p className="text-xs text-success font-medium">🟢 Online</p>
                      </div>
                    </div>
                  </div>

                  {/* Chat Messages */}
                  <div className="p-5 space-y-4 min-h-[200px] max-h-[200px] overflow-y-auto bg-base-100">
                    {PREVIEW_MESSAGES.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isSent ? "justify-end" : "justify-start"} animate-slideInUp`}
                      >
                        <div
                          className={`
                            max-w-[80%] rounded-2xl px-4 py-3 shadow-md
                            ${message.isSent 
                              ? "bg-gradient-to-br from-primary to-primary-focus text-primary-content rounded-br-none" 
                              : "bg-gradient-to-br from-base-300 to-base-200 text-base-content rounded-bl-none"}
                          `}
                        >
                          <p className="text-sm font-medium">{message.content}</p>
                          <p
                            className={`
                              text-xs mt-2 font-medium
                              ${message.isSent ? "text-primary-content/70" : "text-base-content/60"}
                            `}
                          >
                            12:00 PM
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Chat Input */}
                  <div className="p-4 border-t border-base-300/50 bg-base-100">
                    <div className="flex gap-3">
                      <input
                        type="text"
                        className="input input-bordered flex-1 text-sm h-11 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Type a message..."
                        value="This is a preview"
                        readOnly
                      />
                      <button className="btn btn-primary h-11 min-h-0 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-primary/50">
                        <Send size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SettingsPage;