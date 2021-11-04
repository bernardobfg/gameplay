import React from 'react';

import {
  Image
} from 'react-native';

import { styles } from './styles';

export function GuildIcon() {
  const uri = "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fgetdrawings.com%2Ffree-icon%2Fgreen-discord-icon-60.png&f=1&nofb=1"
  return (
    <Image
      source={{ uri }}
      style={styles.image}
      resizeMode="cover"
      
    />
  );
}