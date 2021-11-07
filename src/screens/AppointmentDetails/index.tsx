import React, { useEffect, useState } from 'react';
import *  as Linking from 'expo-linking';
import {
  Alert,
  FlatList,
  ImageBackground,
  Text,
  Share,
  View,
  Platform
} from 'react-native';
import { useRoute } from "@react-navigation/native"
import { AppointmentProps } from '../../components/Appointment';
import { Fontisto } from "@expo/vector-icons"
import { BorderlessButton } from 'react-native-gesture-handler';
import { Background } from '../../components/Background';
import { Header } from '../../components/Header';
import BannerImg from "../../assets/banner.png"
import { styles } from './styles';
import { theme } from '../../global/styles/theme';
import { ListHeader } from '../../components/ListHeader';
import { Member, MemberProps } from '../../components/Member';
import { ListDivider } from '../../components/ListDivider';
import { ButtonIcon } from '../../components/ButtonIcon';
import { api } from "../../services/api"
import { Loading } from '../../components/Loading';
type Params = {
  guildSelected: AppointmentProps
}

type GuildWidget = {
  id: string;
  name: string;
  instant_invite: string;
  members: MemberProps[];
}

export function AppointmentDetails() {
  const [widget, setWidget] = useState<GuildWidget>({} as GuildWidget)
  const [loading, setLoading] = useState(true)
  const route = useRoute()
  const { guildSelected } = route.params as Params;

  useEffect(() => {
    fetchGuildWidget();
  }, [])

  async function fetchGuildWidget() {
    try {
      const response = await api.get(`/guilds/${guildSelected.guild.id}/widget.json`)
      setWidget(response.data)
    }
    catch (error) {
      Alert.alert("Verifque as configurações do servidor. Seá que o Widget está habilitado?")
    }
    finally {
      setLoading(false)
    }
  }

  function handleShareInvite() {
    const message = Platform.OS === 'ios' ?
      `Junte-se a ${guildSelected.guild.name}` :
      widget.instant_invite

    Share.share({
      message: message ?? "https://discord.com",
      url: widget.instant_invite ?? "https://discord.com",
    })
  }

  function handleOpenGuild() {
    Linking.openURL(widget.instant_invite ?? "https://discord.com'")
  }

  return (
    <Background>
      <Header
        title="Detalhes"
        action={
          guildSelected.guild.owner &&
          <BorderlessButton onPress={handleShareInvite}>
            <Fontisto
              name="share"
              size={24}
              color={theme.colors.primary}
            />
          </BorderlessButton>
        }
      />
      <ImageBackground
        source={BannerImg}
        style={styles.banner}
      >
        <View style={styles.bannerContent}>
          <Text style={styles.title}>
            {guildSelected.guild.name}
          </Text>
          <Text style={styles.subtitle}>
            {guildSelected.description}
          </Text>
        </View>

      </ImageBackground>
      {
        loading ?
          <Loading /> :
          <>
            <ListHeader
              title="Jogadores"
              subtitle={`Total ${widget?.members?.length ?? "0"}`}
            />
            <FlatList
              style={styles.members}
              data={widget?.members}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Member data={item} />
              )}
              ItemSeparatorComponent={() => <ListDivider isCentered />}
            />
          </>
      }
      {
        guildSelected.guild.owner &&
        <View style={styles.footer}>
          <ButtonIcon
            onPress={handleOpenGuild}
            title="Entrar na partida" />
        </View>
      }

    </Background>
  );
}