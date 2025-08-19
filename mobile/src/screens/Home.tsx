import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 22, marginBottom: 16 }}>WashOnDemand</Text>
      <Button title="Book a wash" onPress={() => navigation.navigate('Booking')} />
      <View style={{ height: 12 }} />
      <Button title="Washer portal" onPress={() => navigation.navigate('Washer')} />
    </View>
  );
};

