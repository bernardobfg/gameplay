import React from 'react';

import {
  Text,
  View,
  Alert
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useAuth } from '../../hooks/auth';
import { Avatar } from '../Avatar';

import { styles } from './styles';

export function Profile() {

  const { user, signOut } = useAuth()
  function handleSignOut() {
    Alert.alert('Logout', 'Deseja sair do GamePlay?', [
      {
        text: "Não",
        style: 'cancel'
      },
      {
        text: "Sim",
        onPress: () => signOut()
      }
    ])
  }

  return (
    <View style={styles.container}>
      <RectButton onPress={handleSignOut}>
        <Avatar urlImage={user.avatar ?? "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fgetdrawings.com%2Ffree-icon%2Fgreen-discord-icon-60.png&f=1&nofb=1"} />
      </RectButton>
      <View>
        <View style={styles.user}>
          <Text style={styles.greeting}>
            Olá
          </Text>
          <Text style={styles.userName}>
            {user.firstName}
          </Text>
        </View>
        <Text style={styles.message}>
          Hoje é dia de vitória
        </Text>
      </View>
    </View>
  );
}