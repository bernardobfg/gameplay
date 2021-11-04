import React, { useState } from 'react';

import {
  View,
  Text,
  FlatList
} from 'react-native';
import { Appointment } from '../../components/Appointment';
import { ButtonAdd } from '../../components/ButtonAdd';
import { CategorySelect } from '../../components/CategorySelect';
import { ListDivider } from '../../components/ListDivider';
import { ListHeader } from '../../components/ListHeader';
import { Profile } from '../../components/Profile';
import { Background } from '../../components/Background';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';

export function Home() {
  const navigation = useNavigation()
  const [category, setCategory] = useState('');

  function handleCategorySelect(categoryId: string) {
    categoryId === category ? setCategory('') : setCategory(categoryId);
  }

  const appointments = [
    {
      id: '1',
      guild: {
        id: '1',
        name: "Lendarios",
        icon: null,
        owner: true
      },
      category: '1',
      date: '22/06 às 20:40h',
      description: "É Hoje que vamos chegar ap challenger sem perder uma partida da md10"
    },
    {
      id: '2',
      guild: {
        id: '1',
        name: "Lendarios",
        icon: null,
        owner: true
      },
      category: '1',
      date: '22/06 às 20:40h',
      description: "É Hoje que vamos chegar ap challenger sem perder uma partida da md10"
    },
    {
      id: '3',
      guild: {
        id: '1',
        name: "Lendarios",
        icon: null,
        owner: true
      },
      category: '1',
      date: '22/06 às 20:40h',
      description: "É Hoje que vamos chegar ap challenger sem perder uma partida da md10"
    },
    {
      id: '4',
      guild: {
        id: '1',
        name: "Lendarios",
        icon: null,
        owner: true
      },
      category: '1',
      date: '22/06 às 20:40h',
      description: "É Hoje que vamos chegar ap challenger sem perder uma partida da md10"
    },
    {
      id: '5',
      guild: {
        id: '1',
        name: "Lendarios",
        icon: null,
        owner: true
      },
      category: '1',
      date: '22/06 às 20:40h',
      description: "É Hoje que vamos chegar ap challenger sem perder uma partida da md10"
    },
    {
      id: '6',
      guild: {
        id: '1',
        name: "Lendarios",
        icon: null,
        owner: true
      },
      category: '1',
      date: '22/06 às 20:40h',
      description: "É Hoje que vamos chegar ap challenger sem perder uma partida da md10"
    },
  ];
  function handleAppointmentDetails() {
    navigation.navigate('AppointmentDetails');
  }
  function handleAppointmentCreate() {
    navigation.navigate('AppointmentCreate');
  }
  return (
    <Background>
      <View style={styles.header}>
        <Profile />
        <ButtonAdd onPress={handleAppointmentCreate} />
      </View>
      <CategorySelect
        categorySelected={category}
        setCategory={handleCategorySelect}

      />
        <ListHeader title={"Partidas Agendadas"} subtitle={"Total 6"} />

      <FlatList
        data={appointments}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Appointment
            data={item}
            onPress={handleAppointmentDetails}
          />
        )}
        ItemSeparatorComponent={() => <ListDivider />}
        style={styles.matches}
        contentContainerStyle={{paddingBottom: 30}}
        showsVerticalScrollIndicator={false}

      />
    </Background>
  );
}