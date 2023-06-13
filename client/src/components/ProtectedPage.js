import { Avatar, Badge, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetAllNotifications } from "../apicalls/notifications";
import { GetLoggedInUser } from "../apicalls/users";
import { SetLoading } from "../redux/loadersSlice";
import { SetNotifications, SetUser } from "../redux/usersSlice";
import Notifications from "./Notifications";

function ProtectedPage({ children }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, notifications } = useSelector((state) => state.users);
  const getUser = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await GetLoggedInUser();
      dispatch(SetLoading(false));
      if (response.success) {
        dispatch(SetUser(response.data));
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  const getNotifications = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await GetAllNotifications();
      dispatch(SetLoading(false));
      if (response.success) {
        dispatch(SetNotifications(response.data));
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getUser();
    } else {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    if (user) {
      getNotifications();
    }
  }, [user]);

  return (
    user && (
      <div>
      <div className="bg-primary text-white">
        <div className="flex justify-between items-center px-5 py-4">
          <h1 className="text-2xl cursor-pointer" onClick={() => navigate("/")}>
            TASK MANAGER
          </h1>
  
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 cursor-pointer" onClick={() => navigate("/profile")}>
              <i className="ri-shield-user-line"></i>
              <span className="text-md">{(user?.firstName).toUpperCase()} {(user?.lastName).toUpperCase()}</span>
            </div>
  
            <div className="flex items-center gap-1 cursor-pointer">
              <Badge
                count={notifications.filter((notification) => !notification.read).length}
              >
                <Avatar
                  shape="square"
                  size="large"
                  icon={<i className="ri-notification-line text-white rounded-full"></i>}
                  onClick={() => setShowNotifications(true)}
                />
              </Badge>
            </div>
  
            <div className="flex items-center gap-1 cursor-pointer" onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}>
              <i className="ri-logout-box-r-line"></i>
              <span className="text-md">LOGOUT</span>
            </div>
          </div>
        </div>
        </div>
  
        <div className="px-5 py-3">{children}</div>
  
        {showNotifications && (
          <Notifications
            showNotifications={showNotifications}
            setShowNotifications={setShowNotifications}
            reloadNotifications={getNotifications}
          />
        )}
      </div>
    )
  );
}

export default ProtectedPage;