import { createContext, ReactNode } from 'react';

interface UserProps {
  name: string;
  avatarUrl: string;
}

export interface AuthContextDataProps {
  user: UserProps;
  signIn: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextDataProps);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const signIn = async () => {
    console.log('entrou');
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        user: {
          name: 'Cassiano Junior',
          avatarUrl: 'https://github.com/CassianoJunior',
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
