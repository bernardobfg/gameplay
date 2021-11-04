import React, { useState } from 'react';
import { Feather } from "@expo/vector-icons";
import {
  Text,
  View
} from 'react-native';

import { Background } from '../../components/Background';
import { Header } from '../../components/Header';

import { styles } from './styles';
import { theme } from '../../global/styles/theme';
import { CategorySelect } from '../../components/CategorySelect';
import { RectButton } from 'react-native-gesture-handler';
import { GuildIcon } from '../../components/GuildIcon';


export function AppointmentCreate() {
  const [category, setCategory] = useState('');

  return (
    <Background>
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
              <GuildIcon/>
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
      </View>



    </Background>
  );
}