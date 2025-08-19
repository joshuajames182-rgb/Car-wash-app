import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { api } from '../api/client';

export const AuthScreen: React.FC = () => {
  const [email, setEmail] = useState('user@example.com');
  const [password, setPassword] = useState('password');

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: '600' }}>Login</Text>
      <TextInput value={email} onChangeText={setEmail} placeholder="Email" autoCapitalize="none" style={{ borderWidth: 1, padding: 8, borderRadius: 8, marginTop: 12 }} />
      <TextInput value={password} onChangeText={setPassword} placeholder="Password" secureTextEntry style={{ borderWidth: 1, padding: 8, borderRadius: 8, marginTop: 12 }} />
      <Button
        title="Login"
        onPress={async () => {
          try {
            const resp = await api.post('/auth/login', { email, password });
            await SecureStore.setItemAsync('token', resp.data.token);
            Alert.alert('Logged in');
          } catch (e: any) {
            Alert.alert('Error', e?.response?.data?.error || 'Login failed');
          }
        }}
      />
    </View>
  );
};

