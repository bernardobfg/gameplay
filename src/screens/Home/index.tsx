import React, { useState, useCallback } from 'react';

import {
  View,
  FlatList
} from 'react-native';
import { Appointment, AppointmentProps } from '../../components/Appointment';
import { ButtonAdd } from '../../components/ButtonAdd';
import { CategorySelect } from '../../components/CategorySelect';
import { ListDivider } from '../../components/ListDivider';
import { ListHeader } from '../../components/ListHeader';
import { Profile } from '../../components/Profile';
import { Background } from '../../components/Background';
import { styles } from './styles';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { COLLECTION_APPOINTMENTS } from '../../configs/database';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Loading } from '../../components/Loading';

export function Home() {
  const navigation = useNavigation()
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState<AppointmentProps[]>([]);


  async function loadAppointment() {
    setLoading(true)
    const response = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
    const storage: AppointmentProps[] = response ? JSON.parse(response) : [];
    
    if (category) {
      setAppointments(storage.filter(appointment => appointment.category === category));
    } else {
      setAppointments(storage);
    }
    setLoading(false)
  }
  useFocusEffect(
    useCallback(() => {
      loadAppointment();
    }, [category])
  )
  function handleCategorySelect(categoryId: string) {
    categoryId === category ? setCategory('') : setCategory(categoryId);
  }


  function handleAppointmentDetails(guildSelected: AppointmentProps) {
    navigation.navigate('AppointmentDetails', { guildSelected });
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
      {
        loading ?
          <Loading /> :
          <>
            <ListHeader title={"Partidas Agendadas"} subtitle={`Total ${appointments.length}`} />

            <FlatList
              data={appointments}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <Appointment
                  data={item}
                  onPress={()=>handleAppointmentDetails(item)}
                />
              )}
              ItemSeparatorComponent={() => <ListDivider />}
              style={styles.matches}
              contentContainerStyle={{ paddingBottom: 30 }}
              showsVerticalScrollIndicator={false}

            />
          </>
      }
    </Background>
  );
}