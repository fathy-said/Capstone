import { useAuth as useAuthStore } from "../store/auth";

export const useAuth = () => {
  const { user, token, permissions } = useAuthStore();
  
  // Determine if the user is authenticated
  const isAuthenticated = !!token;
  
  // Check if the user has a specific role
  const hasRole = (roleName: string): boolean => {
    if (!user || !user.roles) return false;
    return user.roles.some((role: any) => role.name === roleName);
  };
  
  // Check if the user has a specific permission
  const hasPermission = (permissionName: string): boolean => {
    if (!permissions) return false;
    return permissions.some((permission: any) => permission.name === permissionName);
  };
  
  return {
    user,
    token,
    permissions,
    isAuthenticated,
    hasRole,
    hasPermission
  };
};

export default useAuth; 