import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { $api } from "../client";
import { useAuth } from "../store/auth";

export const useAuthHook = () => {
  const [loading, setLoading] = useState(false);

  const { setToken, setUser, setPermissions } = useAuth();
  const navigate = useNavigate();

  /**
   * On login action
   */
  const login = async (inputs) => {
    try {
      setLoading(true);

      const { data } = await $api.post(`/login`, inputs);
      console.log("login", data);
      if (!data?.status) {
        toast.error(data?.msg);
        return;
      }

      localStorage.setItem("token", data?.user?.access_token);
      localStorage.setItem("user_type", data?.user?.user?.user_type);
      // Set user , token for store
      setUser(data?.user);
      setToken(data?.user?.user_type);
      navigate("/");
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * On verify action
   */
  const verify = async (code) => {
    try {
      const {
        data: { status, msg, data },
      } = await $api.post(`/auth/checkCode`, {
        code,
      });

      if (!status) {
        toast.error(msg);
        throw new Error(msg);
      }

      localStorage.setItem("token", data?.token);
      setToken(data?.token);
      setUser(data?.user);
      setPermissions([
        ...data?.user?.permissions,
        ...(data?.user?.roles?.[0]?.permissions || []),
      ]);

      navigate("/login");
      ["", ""];
      toast.success("success");
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * On resend otp action
   */
  const resendOtp = async (phoneValue = "") => {
    try {
      setLoading(true);

      const {
        data: { status, msg },
      } = await $api.post(`/auth/resendCode`, {
        phone: phoneValue,
      });

      if (!status) {
        toast.error(msg);
        throw new Error(msg);
      }

      toast.success("success");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * On get user by token
   */

  const me = async () => {
    try {
      setLoading(true);
      const user = await fetchUser();
      return user;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Reset password with token
   */
  const resetPassword = async ({
    token,
    newPassword,
  }: {
    token: string;
    newPassword: string;
  }) => {
    try {
      setLoading(true);

      const { data } = await $api.post(`/reset-password`, {
        token,
        password: newPassword,
      });

      if (!data?.status) {
        toast.error(data?.msg || "Password reset failed");
        return;
      }

      toast.success("Password reset successfully");
      return data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Password reset failed");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Send password reset code
   */
  const sendPasswordResetCode = async ({
    academicMail,
    academicId,
  }: {
    academicMail: string;
    academicId: string;
  }) => {
    try {
      setLoading(true);

      const { data } = await $api.post(`/forgot-password`, {
        email: academicMail,
        academic_id: academicId,
      });

      if (!data?.status) {
        toast.error(data?.msg || "Failed to send reset code");
        return;
      }

      return data;
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to send reset code"
      );
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    login,
    verify,
    resendOtp,
    me,
    resetPassword,
    sendPasswordResetCode,
  };
};

/**
 * Use logout hook
 */
export const useLogout = () => {
  const { setToken, setUser, setPermissions } = useAuth();
  const navigate = useNavigate();
  const logout = async () => {
    try {
      setToken(null);
      setUser(null);
      setPermissions([]);
      await $api.post("logout");
      localStorage.removeItem("token");
      navigate("/");
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  return {
    logout,
  };
};

/**
 * On get user by token
 */
export const fetchUser = async () => {
  try {
    const { data } = await $api.get(`/profile`);
    return data?.user;
  } catch (error) {
    throw error;
  }
};
