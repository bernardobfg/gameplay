import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import * as AuthSession from "expo-auth-session"

import AsyncStorage from "@react-native-async-storage/async-storage"

import { api } from '../services/api';
import { COLLECTION_USER } from '../configs/database';

const { REDIRECT_URI } = process.env
const { SCOPE } = process.env
const { RESPONSE_TYPE } = process.env
const { CLIENT_ID } = process.env
const { CDN_IMAGE } = process.env

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
    access_token?: string;
    error?: string;
  }
}


type AuthContextData = {
  user: User;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext({} as AuthContextData);

type AuthProviderProps = {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  const [loading, setLoading] = useState(false);

  async function loadUserStorageData() {
    const storage = await AsyncStorage.getItem(COLLECTION_USER);

    if (storage) {

      const userLogged = JSON.parse(storage) as User;
      api.defaults.headers.common['Authorization'] = `Bearer ${userLogged.token}`
      setUser(userLogged);
    }
  }

  useEffect(() => {
    loadUserStorageData();
  }, []);

  async function signIn() {
    try {
      setLoading(true);
      const authUrl = `${api.defaults.baseURL}/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`
      const { type, params, } = await AuthSession.startAsync({
        authUrl
      }) as AuthorizationResponse
      if (type === 'success' && !params.error) {

        const { access_token } = params;
        api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`
        const userInfo = await api.get('/users/@me');
        const firstName = userInfo.data.username.split(" ")[0]

        userInfo.data.avatar = userInfo.data.avatar && `${CDN_IMAGE}/avatars/${userInfo.data.id}/${userInfo.data.avatar}.png`


        const userData = {
          ...userInfo.data,
          firstName,
          token: access_token
        }

        await AsyncStorage.setItem(COLLECTION_USER, JSON.stringify(userData))
        setUser(userData)
      }
    }
    catch (error) {
      console.log(error)
      throw new Error("Não foi possível autenticar")
    }
    finally {
      setLoading(false)
    }

  }
  async function signOut() {
    await AsyncStorage.removeItem(COLLECTION_USER);
    setUser({} as User);
  }


  return (
    <AuthContext.Provider value={{ user, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}