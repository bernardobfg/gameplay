import React, { useState } from 'react';
import { Feather } from "@expo/vector-icons";
import {
  Text,
  View,
  ScrollView,
  Platform,
  KeyboardAvoidingView
} from 'react-native';

import { Background } from '../../components/Background';
import { Header } from '../../components/Header';

import { styles } from './styles';
import { theme } from '../../global/styles/theme';
import { CategorySelect } from '../../components/CategorySelect';
import { RectButton } from 'react-native-gesture-handler';
import { GuildIcon } from '../../components/GuildIcon';
import { SmallInput } from '../../components/SmallInput';
import { TextArea } from '../../components/TextArea';
import { Button } from '../../components/Button';


export function AppointmentCreate() {
  const [category, setCategory] = useState('');

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView>
        <Header
          title="Detalhes"
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
          setCategory={setCategory}
          hasCheckBox
        />
        <View style={styles.form}>
          <RectButton>
            <View style={styles.select}>
              {
                <GuildIcon />
                //<View style={styles.image} />
              }

              <View style={styles.selectBody}>
                <Text style={styles.label}>
                  Selecione um servidor
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
              <Text style={styles.label}>
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
              <Text style={styles.label}>
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
              <Button title="Agendar"/>
          </View>

        </View>



      </ScrollView>
    </KeyboardAvoidingView>
  );
}