import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Text,
  View,
  Image,
} from 'react-native';

import illustrationImage from '../../assets/illustration.png'
import { ButtonIcon } from '../../components/ButtonIcon';
import { styles } from "./styles"
import { Background } from '../../components/Background';
import {  useAuth } from '../../hooks/auth';
export function SignIn() {
  const context = useAuth()
  const navigation = useNavigation();
  function handleSignIn() {
    navigation.navigate('Home');
  }

  return (
    <Background>
      <View style={styles.container}>

        <Image
          source={illustrationImage}
          style={styles.image}
          resizeMode="stretch"
        />
        <View style={styles.content}>
          <Text style={styles.title}>
            Conecte-se {"\n"}
            e organize suas{"\n"}
            jogatinas {"\n"}
          </Text>
          <Text style={styles.subtitle}>
            Crie grupos para jogar seus games {"\n"}
            favoritos com seus amigos
          </Text>
          <ButtonIcon
            title="Entrar com Discord"
            onPress={handleSignIn}
          />
        </View>
      </View>
    </Background>
  );
}