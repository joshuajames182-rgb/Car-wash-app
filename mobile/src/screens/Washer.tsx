import React, { useState } from 'react';
import { View, Text, Switch } from 'react-native';

export const WasherScreen: React.FC = () => {
  const [online, setOnline] = useState(false);
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: '600' }}>Washer Portal</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
        <Text style={{ marginRight: 8 }}>Online</Text>
        <Switch value={online} onValueChange={setOnline} />
      </View>
      <Text style={{ marginTop: 12 }}>Jobs and earnings views to be implemented</Text>
    </View>
  );
};

