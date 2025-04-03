import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { $api } from "../client";
import { useAuth } from "../store/auth";

// User related interfaces
interface User {
  id: string;
  name: string;
  email: string;
  academicId?: string;
  permissions: string[];
  roles?: Array<{
    id: string;
    name: string;
    permissions: string[];
  }>;
}

interface LoginInputs {
  email: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
  user: User;
}

interface ApiResponse<T> {
  status: boolean;
  msg?: string;
  data?: T;
}

interface ApiError {
  response?: {
    data?: {
      message: string;
      errors?: Record<string, string[]>;
    };
  };
  message: string;
}

interface SendPasswordResetCodeParams {
  academicMail: string;
  academicId: string;
}

interface ResetPasswordParams {
  token: string;
  newPassword: string;
}

interface VerifyResponse {
  token: string;
  user: User;
}

interface ResetCodeResponse {
  token: string;
}

export const useAuthHook = () => {
  const [loading, setLoading] = useState(false);

  const { setToken, setUser, setPermissions } = useAuth();
  const navigate = useNavigate();

  /**
   * On login action
   */
  const login = async (inputs: LoginInputs): Promise<void> => {
    try {
      setLoading(true);

      const {
        data: { access_token: token, user },
      } = await $api.post<LoginResponse>(`/login`, inputs);

      localStorage.setItem("token", token);

      // Set user , token for store
      setUser(user);
      setPermissions([
        ...user?.permissions,
        ...(user?.roles?.[0]?.permissions || []),
      ]);
      setToken(token);

      navigate("/");
    } catch (error) {
      const apiError = error as ApiError;
      toast.error(apiError.response?.data?.message || 'Login failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * On verify action
   */
  const verify = async (code: string): Promise<void> => {
    try {
      const {
        data: { status, msg, data },
      } = await $api.post<ApiResponse<VerifyResponse>>(`/auth/checkCode`, {
        code,
      });

      if (!status) {
        toast.error(msg || 'Verification failed');
        throw new Error(msg);
      }

      if (data) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        setUser(data.user);
        setPermissions([
          ...data.user.permissions,
          ...(data.user.roles?.[0]?.permissions || []),
        ]);
      }

      navigate("/login");
      toast.success("success");
    } catch (error) {
      const apiError = error as ApiError;
      toast.error(apiError.response?.data?.message || 'Verification failed');
      throw error;
    }
  };

  /**
   * On resend otp action
   */
  const resendOtp = async (phoneValue: string = ""): Promise<void> => {
    try {
      setLoading(true);

      const {
        data: { status, msg },
      } = await $api.post<ApiResponse<null>>(`/auth/resendCode`, {
        phone: phoneValue,
      });

      if (!status) {
        toast.error(msg || 'Failed to resend code');
        throw new Error(msg);
      }

      toast.success("success");
    } catch (error) {
      const apiError = error as ApiError;
      toast.error(apiError.response?.data?.message || 'Failed to resend code');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * On get user by token
   */
  const me = async (): Promise<User | null> => {
    try {
      setLoading(true);
      const user = await fetchUser();
      return user;
    } catch (error) {
      const apiError = error as ApiError;
      toast.error(apiError.response?.data?.message || 'Failed to fetch user');
      return null;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Send password reset code
   */
  const sendPasswordResetCode = async ({ academicMail, academicId }: SendPasswordResetCodeParams): Promise<ApiResponse<ResetCodeResponse>> => {
    setLoading(true);
    try {
      const { data } = await $api.post<ApiResponse<ResetCodeResponse>>('/api/auth/forgot-password', {
        academicMail,
        academicId
      });
      
      // Show success notification
      toast.success('Password reset code has been sent to your email');
      return data;
    } catch (error) {
      const apiError = error as ApiError;
      const errorMessage = apiError.response?.data?.message || 'Failed to send password reset code';
      toast.error(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Reset password
   */
  const resetPassword = async ({ token, newPassword }: ResetPasswordParams): Promise<void> => {
    setLoading(true);
    try {
      await $api.post<ApiResponse<null>>('/api/auth/reset-password', {
        token,
        newPassword
      });
      
      // Show success notification
      toast.success('Password reset successfully');
    } catch (error) {
      const apiError = error as ApiError;
      const errorMessage = apiError.response?.data?.message || 'Failed to reset password';
      toast.error(errorMessage);
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
    sendPasswordResetCode,
    resetPassword
  };
};

/**
 * Use logout hook
 */
export const useLogout = () => {
  const { setToken, setUser, setPermissions } = useAuth();
  const navigate = useNavigate();
  const logout = async (): Promise<void> => {
    try {
      setToken(null);
      setUser(null);
      setPermissions([]);
      await $api.post<ApiResponse<null>>("/logout");
      localStorage.removeItem("token");
      navigate("/");
    } catch (error) {
      const apiError = error as ApiError;
      toast.error(apiError.response?.data?.message || 'Logout failed');
      throw error;
    }
  };
  return {
    logout,
  };
};

/**
 * On get user by token
 */
export const fetchUser = async (): Promise<User> => {
  try {
    const { data } = await $api.get<{ data: { record: User } }>(`/me`);
    return data.data.record;
  } catch (error) {
    const apiError = error as ApiError;
    toast.error(apiError.response?.data?.message || 'Failed to fetch user');
    throw error;
  }
};