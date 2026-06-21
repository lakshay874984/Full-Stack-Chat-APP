import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilepic: base64Image });
    };
  };

  return (
    <div className="h-screen pt-20 bg-gradient-to-br from-base-100 via-base-200 to-base-300">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-gradient-to-br from-base-100 to-base-200 rounded-2xl p-8 space-y-8 shadow-xl border border-base-300/50">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Profile</h1>
            <p className="text-base-content/60 text-lg">Manage your account settings</p>
          </div>

          {/* avatar upload section */}

          <div className="flex flex-col items-center gap-4">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-full blur opacity-25 group-hover:opacity-100 transition duration-500"></div>
              <img
                src={selectedImg || authUser.profilepic || "/avatar.png"}
                alt="Profile"
                className="relative size-32 rounded-full object-cover border-4 border-base-100 shadow-lg group-hover:scale-105 transition-transform duration-300"
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-gradient-to-br from-primary to-secondary hover:shadow-lg hover:shadow-primary/50
                  p-3 rounded-full cursor-pointer 
                  transition-all duration-200 shadow-md
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : "hover:scale-110"}
                `}
              >
                <Camera className="w-5 h-5 text-white" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-base-content/60 font-medium">
              {isUpdatingProfile ? "⏳ Uploading..." : "📸 Click the camera to update your photo"}
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="text-sm font-semibold text-primary flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className="px-4 py-3 bg-gradient-to-r from-base-300/50 to-base-300/30 rounded-lg border border-base-300 font-medium text-base-content hover:border-primary/50 transition-colors">{authUser?.fullName}</p>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-semibold text-primary flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-3 bg-gradient-to-r from-base-300/50 to-base-300/30 rounded-lg border border-base-300 font-medium text-base-content hover:border-primary/50 transition-colors break-all">{authUser?.email}</p>
            </div>
          </div>

          <div className="mt-8 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl p-6 border border-primary/20">
            <h2 className="text-lg font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-3 px-2 border-b border-base-300/50 hover:bg-base-300/20 rounded transition-colors">
                <span className="text-base-content/70 font-medium">Member Since</span>
                <span className="font-semibold text-primary">{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-3 px-2 hover:bg-base-300/20 rounded transition-colors">
                <span className="text-base-content/70 font-medium">Account Status</span>
                <span className="badge badge-success gap-1">
                  <span className="animate-pulse">●</span>
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;