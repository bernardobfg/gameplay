import React, { createContext, ReactNode, useContext, useState } from 'react';

import * as AuthSession from "expo-auth-session"
import {
  REDIRECT_URI,
  SCOPE,
  RESPONSE_TYPE,
  CLIENT_ID,
  CDN_IMAGE
} from "../configs"
import { api } from '../services/api';

type User = {
  id: string;
  userName: string;
  firstName: string;
  avatar: string;
  email: string;
  token: string;
}

type AuthorizationResponse = AuthSession.AuthSessionResult & {
  params: {
    access_token: string;
  }
}


type AuthContextData = {
  user: User;
  signIn: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext({} as AuthContextData);

type AuthProviderProps = {
  children: ReactNode;
}

export function AuthProvider({children}: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  const [loading, setLoading] = useState(false);

  async function signIn() {
    try {
      setLoading(true);
      const authUrl = `${api.defaults.baseURL}/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`
      const {type, params,} = await AuthSession.startAsync({
        authUrl
      }) as AuthorizationResponse
      if (type === 'success') {
        
        const { access_token } = params;
        api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`
        const userInfo = await api.get('/users/@me');
        const firstName = userInfo.data.username.split(" ")[0]

        userInfo.data.avatar = userInfo.data.avatar && `${CDN_IMAGE}/avatars/${userInfo.data.id}/${userInfo.data.avatar}.png`
        setUser({
          ...userInfo.data,
          firstName,
          token: access_token
        })
        setLoading(false)
      }
      else {
        setLoading(false)
      }

    }
    catch (error) {
      console.log(error)
      setLoading(false)
      throw new Error("Não foi possível autenticar")
    }
  }


  return (
    <AuthContext.Provider value={{ user, signIn, loading }}>
      { children }
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}