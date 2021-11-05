import React from 'react';

import {
  Text,
  View
} from 'react-native';
import { useAuth } from '../../hooks/auth';
import { Avatar } from '../Avatar';

import { styles } from './styles';

export function Profile() {
  const {user} = useAuth()
  return (
    <View style={styles.container}>
      <Avatar urlImage={user.avatar ?? "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fgetdrawings.com%2Ffree-icon%2Fgreen-discord-icon-60.png&f=1&nofb=1"} />
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