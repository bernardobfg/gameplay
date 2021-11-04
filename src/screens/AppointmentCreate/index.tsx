import React, { useState } from 'react';
import { Feather } from "@expo/vector-icons";
import {
  Text,
  View,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';

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


export function AppointmentCreate() {
  const [category, setCategory] = useState('');
  const [openGuildsModal, setOpenGuildsModal] = useState(false);
  const [guild, setGuild] = useState<GuildProps>({} as GuildProps);
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
                  <GuildIcon /> :
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
              <Text style={[styles.label,{ marginBottom: 10}]}>
                Dia e mês
              </Text>
              <View style={styles.column}>
                <SmallInput maxLength={2} />
                <Text style={styles.divider}>
                  /
                </Text>
                <SmallInput maxLength={2} />
              </View>
            </View>
            <View>
              <Text style={[styles.label,{ marginBottom: 10}]}>
                Hora e minuto
              </Text>
              <View style={styles.column}>
                <SmallInput maxLength={2} />
                <Text style={styles.divider}>
                  :
                </Text>
                <SmallInput maxLength={2} />
              </View>
            </View>


          </View>
          <View style={[styles.fields, { marginBottom: 12 }]}>
            <Text style={styles.label}>
              Descrição
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
          />
          <View style={styles.footer}>
            <Button title="Agendar" />
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