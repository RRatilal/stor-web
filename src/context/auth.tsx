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

interface AuthState {
  token: string;
  user: IUser;
}

interface LoginCredentials {
  number: string;
  password: string;
}

interface LoginResponse {
  user: IUser;
  token: string;
  refreshToken: string;
}

interface IAuthContextData {
  user: IUser | null;
  signed: boolean;
  loading: boolean;
  logIn(credentials: LoginCredentials): Promise<void>;
  logOut(): void;
  updateUser(user: IUser): void;
}

interface AuthError extends Error {
  response?: {
    data: {
      error: string;
    };
  };
}

// Constants
const AUTH_STORAGE_KEY = '@Proffy:auth';
const TOKEN_STORAGE_KEY = '@Proffy:token';
const REFRESH_TOKEN_STORAGE_KEY = '@Proffy:refreshToken';

// Create context
const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem(TOKEN_STORAGE_KEY);
    const user = localStorage.getItem(AUTH_STORAGE_KEY);

    if (token && user) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStorageData = async () => {
      const token = localStorage.getItem(TOKEN_STORAGE_KEY);
      const user = localStorage.getItem(AUTH_STORAGE_KEY);

      if (token && user) {
        try {
          api.defaults.headers.Authorization = `Bearer ${token}`;
          setData({ token, user: JSON.parse(user) });
        } catch (error) {
          console.error("Invalid token:", error)
          logOut()
        }
      }

      setLoading(false);
    };

    loadStorageData();
  });

  const logIn = useCallback(async ({ number, password }: LoginCredentials) => {
    try {
      const response = await api.post<LoginResponse>('/login', {
        number,
        password,
      });

      const { token, user, refreshToken } = response.data;

      localStorage.setItem(TOKEN_STORAGE_KEY, token);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
      localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, refreshToken);

      api.defaults.headers.Authorization = `Bearer ${token}`;

      setData({ token, user });
    } catch (error) {
      const authError = error as AuthError;
      const errorMessage = authError.response?.data.error || 'Authentication failed';
      throw new Error(errorMessage);
    }
  }, []);

  const logOut = useCallback(() => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);

    setData({} as AuthState);

    // Remove Authorization header
    delete api.defaults.headers.Authorization;
  }, []);

  const updateUser = useCallback((user: IUser) => {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));

    setData(prevState => ({
      token: prevState.token,
      user,
    }));
  }, []);

  // Setup refresh token interceptor
  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      response => response,
      async error => {
        if (error.response?.status === 401) {
          const refreshToken = localStorage.getItem(REFRESH_TOKEN_STORAGE_KEY);
          
          if (refreshToken) {
            try {
              const response = await api.post<{ token: string }>('/refresh-token', {
                refreshToken,
              });

              const { token } = response.data;
              localStorage.setItem(TOKEN_STORAGE_KEY, token);
              api.defaults.headers.Authorization = `Bearer ${token}`;

              // Retry the original request
              return api(error.config);
            } catch (refreshError) {
              // If refresh token fails, log out user
              logOut();
            }
          } else {
            logOut();
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(interceptor);
    };
  }, [logOut]);

  return (
    <AuthContext.Provider 
      value={{ 
        user: data.user,
        signed: !!data.user,
        loading,
        logIn,
        logOut,
        updateUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook
export function useAuth(): IAuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}