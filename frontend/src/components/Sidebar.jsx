import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore.js";

import { Users } from "lucide-react";
import React from "react";


import SidebarSkeleton from "./skeletons/SidebarSkeleton.jsx";
import { useAuthStore } from "../store/useAuthStore.js";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();

  const {onlineUsers} =  useAuthStore();
  const [showOnlineOnly , setShowOnlineOnly]= useState(false);

  useEffect(() => {
    getUsers();
  }, []);
   // no need to add getUsers in dependency
   const filteredUsers = showOnlineOnly ? users.filter(user => onlineUsers.includes(user._id)) : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 bg-gradient-to-b from-base-100 to-base-200 border-r border-base-300 flex flex-col transition-all duration-200 shadow-lg">
      <div className="border-b border-base-300/50 w-full p-4 bg-base-100/50 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/20 hidden lg:flex">
            <Users className="size-5 text-primary" />
          </div>
          <Users className="size-6 lg:hidden" />
          <span className="font-bold text-lg hidden lg:block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Contacts</span>
        </div>
        
         <div className="mt-4 hidden lg:flex items-center justify-between px-2 py-2 bg-base-200 rounded-lg">
          <label className="cursor-pointer flex items-center gap-2 text-sm font-medium">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm checkbox-primary"
            />
            <span>Online only</span>
          </label>
          <span className="text-xs text-primary font-bold">{onlineUsers.length - 1}</span>
        </div>
      
      </div>

      <div className="overflow-y-auto w-full py-2 px-2 lg:px-0 space-y-1 scrollbar-thin scrollbar-thumb-base-300 scrollbar-track-transparent">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-full p-3 lg:p-4 flex items-center gap-3
              rounded-lg transition-all duration-200
              ${
                selectedUser?._id === user._id
                  ? "bg-gradient-to-r from-primary/30 to-secondary/30 ring-2 ring-primary shadow-lg"
                  : "hover:bg-base-300/50 active:scale-95"
              }
            `}
          >
            <div className="relative flex-shrink-0">
              <img
                src={user.profilepic || "/avatar.png"}
                alt={user.fullName}
                className="w-12 h-12 object-cover rounded-full ring-2 ring-base-300 transition-all duration-200 hover:ring-primary"
              />
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full ring-2 ring-base-100 animate-pulse" />
              )}
            </div>

            <div className="hidden lg:block text-left min-w-0 flex-1">
              <div className="font-semibold truncate text-base">{user.fullName}</div>
              <div className={`text-xs font-medium ${
                onlineUsers.includes(user._id) 
                  ? 'text-success' 
                  : 'text-base-content/50'
              }`}>
                {onlineUsers.includes(user._id) ? '🟢 Online' : '🔴 Offline'}
              </div>
            </div>
          </button>
          
        ))}
        {filteredUsers.length === 0 && (
            <div className="p-8 text-center">
              <div className="text-4xl mb-2">😴</div>
              <p className="text-base-content/60 text-sm">No users found</p>
            </div>
          )
            
          }
      </div>
    </aside>
  );
};

export default Sidebar;
