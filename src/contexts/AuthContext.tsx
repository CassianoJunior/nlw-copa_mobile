import { GOOGLE_AUTH_CLIENT_ID } from '@env';
import * as AuthSession from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { createContext, ReactNode, useEffect, useState } from 'react';

WebBrowser.maybeCompleteAuthSession();

interface UserProps {
  name: string;
  avatarUrl: string;
}

export interface AuthContextDataProps {
  user: UserProps;
  isUserLoading: boolean;
  signIn: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextDataProps);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [user, setUser] = useState<UserProps>({} as UserProps);

  const [req, res, promptAsync] = Google.useAuthRequest({
    clientId: GOOGLE_AUTH_CLIENT_ID,
    redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
    scopes: ['profile', 'email'],
  });

  const signIn = async () => {
    try {
      setIsUserLoading(true);
      await promptAsync();
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      setIsUserLoading(false);
    }
  };

  const signInWithGoogle = async (accessToken: string) => {
    console.log('Auth token ->', accessToken);
  };

  useEffect(() => {
    const responseWithSuccess = res?.type === 'success';
    const hasAccessToken =
      responseWithSuccess && res.authentication?.accessToken;
    if (hasAccessToken) {
      const accessToken = res.authentication.accessToken;
      signInWithGoogle(accessToken);
    }
  }, [res]);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        isUserLoading,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
