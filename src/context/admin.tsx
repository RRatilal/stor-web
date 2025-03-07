import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import api from '../services/api';

// Types
interface IImage {
  url: string;
  name: string;
}

interface IUser {
  id: string;
  name: string;
  surname: string;
  email: string;
  image: IImage;
  bio: string;
  number: string;
}

interface AdminState {
  updatedUser: IUser | null;
}

interface IAdminContextData {
  updatedUser: IUser | null;
  loading: boolean;
  error: string | null;
  logOut(): void;
  getUpdatedUserData(): Promise<void>;
  updateLocalUserData(user: IUser): void;
}

interface AdminError extends Error {
  response?: {
    data: {
      error: string;
    };
  };
}

// Constants
const ADMIN_USER_STORAGE_KEY = '@Proffy:user';

// Create context
const AdminContext = createContext<IAdminContextData>({} as IAdminContextData);

// Provider component
export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<AdminState>(() => {
    try {
      const storedUser = localStorage.getItem(ADMIN_USER_STORAGE_KEY);
      
      return {
        updatedUser: storedUser ? JSON.parse(storedUser) : null
      }
    } catch (error) {
      console.error('Error parsing stored user data:', error);
      return { updatedUser: null }
    }
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getUpdatedUserData = useCallback(async () => {
    if (!data.updatedUser?.id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await api.get<IUser[]>(`update-user/${data.updatedUser.id}`);
      
      if (response.data && response.data.length > 0) {
        const newUser = response.data[0];
        localStorage.setItem(ADMIN_USER_STORAGE_KEY, JSON.stringify(newUser));
        setData({ updatedUser: newUser });
      } else {
        throw new Error('No user data received');
      }
    } catch (err) {
      const adminError = err as AdminError;
      const errorMessage = adminError.response?.data.error || 'Failed to fetch user data';
      setError(errorMessage);
      console.error('Error fetching user data:', errorMessage);
    } finally {
      setLoading(false);
    }
  }, [data.updatedUser?.id]);

  const updateLocalUserData = useCallback((user: IUser) => {
    if (user) {
      try {
        localStorage.setItem(ADMIN_USER_STORAGE_KEY, JSON.stringify(user));
        setData({ updatedUser: user });
      } catch (error) {
        console.error('Error updating user data:', error);
      }
    }
  }, []);

  const logOut = useCallback(() => {
    try {
      localStorage.clear();
      setData({ updatedUser: null });
      setError(null);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }, []);

  useEffect(() => {
    if (data.updatedUser?.id) {
      getUpdatedUserData()
    } else {
      setLoading(false)
    }
  }, [getUpdatedUserData, data.updatedUser?.id]);

  // Setup API error interceptor
  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      response => response,
      error => {
        if (error.response?.status === 401 || error.response?.status === 403) {
          logOut();
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(interceptor);
    };
  }, [logOut]);

  return (
    <AdminContext.Provider
      value={{
        updatedUser: data.updatedUser,
        loading,
        error,
        logOut,
        getUpdatedUserData,
        updateLocalUserData
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

// Hook
export function useAdmin(): IAdminContextData {
  const context = useContext(AdminContext);

  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }

  return context;
}