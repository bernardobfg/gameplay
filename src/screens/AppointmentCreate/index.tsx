import React, { useState } from 'react';
import { Feather } from "@expo/vector-icons";
import {
  Text,
  View,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import uuid from 'react-native-uuid'
import { Header } from '../../components/Header';

import { styles } from './styles';
import { theme } from '../../global/styles/theme';
import { CategorySelect } from '../../components/CategorySelect';
import { RectButton } from 'react-native-gesture-handler';
import { GuildIcon } from '../../components/GuildIcon';
import { SmallInput } from '../../components/SmallInput';
import { TextArea } from '../../components/TextArea';
import { Button } from '../../components/Button';
import { ModalView } from '../../components/ModalView';
import { Guilds } from '../Guilds';
import { GuildProps } from '../../components/Guild';
import { Background } from '../../components/Background';
import { COLLECTION_APPOINTMENTS } from '../../configs/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


export function AppointmentCreate() {

  const navigation = useNavigation();
  
  const [category, setCategory] = useState('');
  const [openGuildsModal, setOpenGuildsModal] = useState(false);
  const [guild, setGuild] = useState<GuildProps>({} as GuildProps);


  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [description, setDescription] = useState("");

  function handleOpenGuilds() {
    setOpenGuildsModal(true);
  }
  function handleCloseGuilds() {
    setOpenGuildsModal(false);
  }
  function handleGuildSelect(guildSelected: GuildProps) {
    setGuild(guildSelected);
    setOpenGuildsModal(false);
  }

  function handleCategorySelect(categoryId: string) {
    setCategory(categoryId);
  }

  async function handleSave() {
    const newAppointment = {
      id: uuid.v4(),
      guild: guild,
      category: category,
      date: `${day}/${month} ??s ${hour}:${minute}h`,
      description,
    };
    const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
    const appointments = storage ? JSON.parse(storage) : [];
    appointments.push(newAppointment);
    await AsyncStorage.setItem(COLLECTION_APPOINTMENTS, JSON.stringify(appointments));

    navigation.navigate('Home');
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Background >
        <ScrollView>
          <Header
            title="Agendar Partidas"
          />
          <Text style={[styles.label, {
            marginLeft: 24,
            marginTop: 38,
            marginBottom: 18
          }]}>
            Categoria
          </Text>
          <CategorySelect
            categorySelected={category}
            setCategory={handleCategorySelect}
            hasCheckBox
          />
          <View style={styles.form}>
            <RectButton onPress={handleOpenGuilds}>
              <View style={styles.select}>
                {
                  guild?.icon ?
                    <GuildIcon guildId={guild.id} iconId={guild.icon} /> :
                    <View style={styles.image} />

                }

                <View style={styles.selectBody}>
                  <Text style={styles.label}>
                    {guild?.name ?? "Selecione o servidor"}
                  </Text>

                </View>
                <Feather
                  name="chevron-right"
                  size={18}
                  color={theme.colors.heading} />
              </View>
            </RectButton>
            <View style={styles.fields}>
              <View>
                <Text style={[styles.label, { marginBottom: 10 }]}>
                  Dia e m??s
                </Text>
                <View style={styles.column}>
                  <SmallInput
                    value={day}
                    onChangeText={setDay}
                    maxLength={2}
                  />
                  <Text style={styles.divider}>
                    /
                  </Text>
                  <SmallInput
                    value={month}
                    onChangeText={setMonth}
                    maxLength={2}
                  />
                </View>
              </View>
              <View>
                <Text style={[styles.label, { marginBottom: 10 }]}>
                  Hora e minuto
                </Text>
                <View style={styles.column}>
                  <SmallInput
                    value={hour}
                    onChangeText={setHour}
                    maxLength={2}
                  />
                  <Text style={styles.divider}>
                    :
                  </Text>
                  <SmallInput
                    value={minute}
                    onChangeText={setMinute}
                    maxLength={2}
                  />
                </View>
              </View>


            </View>
            <View style={[styles.fields, { marginBottom: 12 }]}>
              <Text style={styles.label}>
                Descri????o
              </Text>
              <Text style={styles.caracteresLimit}>
                Max 100 caracteres
              </Text>

            </View>
            <TextArea
              multiline
              maxLength={100}
              numberOfLines={5}
              autoCorrect={false}
              value={description}
              onChangeText={setDescription}
            />
            <View style={styles.footer}>
              <Button
                title="Agendar"
                onPress={handleSave}
              />
            </View>

          </View>
        </ScrollView>

      </Background>
      <ModalView visible={openGuildsModal} closeModal={handleCloseGuilds}>
        <Guilds handleGuildSelect={handleGuildSelect} />
      </ModalView>
    </KeyboardAvoidingView>
  );
}