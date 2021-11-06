import React from 'react';

import {
  Image,
  View
} from 'react-native';

import { styles } from './styles';
import DiscordSvg from "../../assets/discord.svg"
const { CDN_IMAGE } = process.env;

type Props = {
  guildId: string,
  iconId: string | null;
}

export function GuildIcon({ guildId, iconId }: Props) {
  const uri = `${CDN_IMAGE}/icons/${guildId}/${iconId}`
  //"https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fgetdrawings.com%2Ffree-icon%2Fgreen-discord-icon-60.png&f=1&nofb=1"
  return (
    <View style={styles.container}>
      {
        iconId ?
          <Image
            source={{ uri }}
            style={styles.image}
            resizeMode="cover"

          /> :
          <DiscordSvg width={40} height={40} />

      }
    </View>
  );

}