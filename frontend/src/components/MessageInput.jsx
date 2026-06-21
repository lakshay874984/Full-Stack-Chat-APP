import { useRef , useState } from "react"
import { useChatStore } from "../store/useChatStore";
import { Image , Send , X } from "lucide-react";

const MessageInput = () => {
    const [text , setText] = useState("");
    const [imagePreview , setImagePreview] = useState(null);
    const fileInputRef = useRef(null);
    const {sendMessage , selectedUser} = useChatStore();
    const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log("file.type :",file.type); 
    if (!file.type.startsWith("image/")) {
      
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      console.log("reader result :",reader.result);
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      // Clear form
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };
  return (
    <div className="border-t border-base-300 bg-base-100 p-4 w-full">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative inline-block">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-24 h-24 object-cover rounded-xl border-2 border-primary shadow-lg"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-error text-error-content
              flex items-center justify-center shadow-md hover:scale-110 transition-transform"
              type="button"
              title="Remove image"
            >
              <X className="size-4" />
            </button>
          </div>
          <span className="text-xs text-zinc-500">Image selected</span>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-end gap-3">
        <div className="flex-1 flex gap-2 items-end">
          <button
            type="button"
            className={`btn btn-ghost btn-circle transition-colors duration-200
                     ${imagePreview ? "text-success" : "text-base-content/50 hover:text-base-content"}`}
            onClick={() => fileInputRef.current?.click()}
            title="Attach image"
          >
            <Image size={20} />
          </button>
          
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          <input
            type="text"
            className="w-full input input-bordered rounded-full input-sm sm:input-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        
        <button
          type="submit"
          className="btn btn-primary btn-circle btn-sm sm:btn-md transition-all duration-200 hover:scale-105"
          disabled={!text.trim() && !imagePreview}
          title="Send message"
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  )
}

export default MessageInput