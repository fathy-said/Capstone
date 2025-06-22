import { NavLink } from "react-router-dom";
import { useUtils } from "../../store/utils";
import { SvgIcon } from "../SvgIcon/Index";
import { useState, useEffect, useRef } from "react";

import { Bot } from "lucide-react";
import { useNotifications } from "../../hooks/useNotifications";
import "./main.css";

// Type definition for notification data

export default () => {
  const { sideMenuToggle } = useUtils();
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const { value, loading } = useNotifications();
  // On close side menu
  const closeMenu = () => {
    sideMenuToggle();
  };

  // Handle notification icon click
  // Handle notification icon click
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };
  // Close notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="top-bar-header bg-white border-gray-200 border-b">
      <div className="flex   items-center justify-between px-6 py-6 gap-x-5">
        <div className="header-right flex gap-x-5">
          <SvgIcon
            name="menu"
            className="fill-current w-10 h-10 cursor-pointer"
            onClick={closeMenu}
          />
        </div>
        <div className="header-left flex gap-x-5">
          <NavLink to={"/chat"}>
            <Bot className="text-gray-400" />
          </NavLink>
          <div className="relative" ref={notificationRef}>
            <SvgIcon
              name="bell"
              className="header-icon cursor-pointer"
              onClick={toggleNotifications}
            />
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                <div className="px-4 py-2 border-b border-gray-200">
                  <h3 className="text-lg font-medium">Notifications</h3>
                </div>
                {loading ? (
                  <div className="px-4 py-3 text-center text-gray-500">
                    Loading...
                  </div>
                ) : value && value?.all_notifications?.length > 0 ? (
                  <div className="max-h-96 overflow-y-auto">
                    {value?.all_notifications?.map((notification) => (
                      <div
                        key={notification.id}
                        className="px-4 py-3 hover:bg-gray-50 border-b border-gray-100"
                      >
                        <p className="font-medium text-gray-800">
                          {notification.data.title}
                        </p>
                        <p className="text-sm text-gray-600">
                          {notification.data.description}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {notification.due_date}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="px-4 py-3 text-center text-gray-500">
                    No notifications
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
