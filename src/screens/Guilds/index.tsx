import React, { useEffect, useState } from 'react';

import {
  View,
  FlatList
} from 'react-native';
import { Guild, GuildProps } from '../../components/Guild';
import { ListDivider } from '../../components/ListDivider';
import { Loading } from '../../components/Loading';
import { api } from '../../services/api';

import { styles } from './styles';

type Props = {
  handleGuildSelect: (guild: GuildProps) => void;
}

export function Guilds({ handleGuildSelect }: Props) {
  const [guilds, setGuilds] = useState<GuildProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGuild();
  },[])

  async function fetchGuild() {
    const response = await api.get("/users/@me/guilds")
    setGuilds(response.data);
    setLoading(false);
  }



  return (
    <View style={styles.container}>
      {
        loading ?
          <Loading />
          : <FlatList
            style={styles.guilds}
            data={guilds}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Guild
                data={item}
                onPress={() => handleGuildSelect(item)}
              />)}
            ItemSeparatorComponent={() => <ListDivider isCentered />}
            contentContainerStyle={{ paddingBottom: 30, paddingTop: 30 }}
            showsVerticalScrollIndicator={false}

          />
      }
    </View>
  );
}