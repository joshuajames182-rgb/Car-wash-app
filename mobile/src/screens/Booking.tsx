import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, Alert } from 'react-native';
import * as Location from 'expo-location';
import { api } from '../api/client';
import * as SecureStore from 'expo-secure-store';

export const BookingScreen: React.FC = () => {
  const [vehicleMake, setVehicleMake] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [serviceTypeId, setServiceTypeId] = useState<string | null>(null);
  const [serviceTypes, setServiceTypes] = useState<{ id: string; name: string }[]>([]);
  const [coords, setCoords] = useState<{ latitude: number; longitude: number } | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }
      const loc = await Location.getCurrentPositionAsync({});
      setCoords({ latitude: loc.coords.latitude, longitude: loc.coords.longitude });
    })();
  }, []);

  useEffect(() => {
    api.get('/service-types').then((r) => setServiceTypes(r.data)).catch(() => {});
  }, []);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: '600' }}>New Booking</Text>
      <Text style={{ marginTop: 12 }}>Vehicle make</Text>
      <TextInput value={vehicleMake} onChangeText={setVehicleMake} placeholder="e.g., Toyota" style={{ borderWidth: 1, padding: 8, borderRadius: 8 }} />
      <Text style={{ marginTop: 12 }}>Vehicle model</Text>
      <TextInput value={vehicleModel} onChangeText={setVehicleModel} placeholder="e.g., Camry" style={{ borderWidth: 1, padding: 8, borderRadius: 8 }} />
      <Text style={{ marginTop: 12 }}>Service</Text>
      {serviceTypes.map((s) => (
        <Button key={s.id} title={`${serviceTypeId === s.id ? '✓ ' : ''}${s.name}`} onPress={() => setServiceTypeId(s.id)} />
      ))}
      <View style={{ height: 12 }} />
      <Text>Location: {coords ? `${coords.latitude.toFixed(4)}, ${coords.longitude.toFixed(4)}` : 'Fetching...'}</Text>
      <View style={{ height: 24 }} />
      <Button
        title="Request Washer"
        onPress={async () => {
          try {
            const token = await SecureStore.getItemAsync('token');
            if (!token) return Alert.alert('Please log in first');
            if (!serviceTypeId || !coords || !vehicleMake || !vehicleModel) return Alert.alert('Fill all fields');
            await api.post(
              '/bookings',
              {
                serviceTypeId,
                vehicleMake,
                vehicleModel,
                vehicleSize: 'MEDIUM',
                scheduledFor: new Date().toISOString(),
                locationLat: coords.latitude,
                locationLng: coords.longitude,
                priceCents: 2500,
              },
              { headers: { Authorization: `Bearer ${token}` } }
            );
            Alert.alert('Booking created');
          } catch (e: any) {
            Alert.alert('Error', e?.response?.data?.error || 'Failed to create booking');
          }
        }}
      />
    </View>
  );
};

