import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

const RootStack = createNativeStackNavigator();

export default function RootLayout() {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <RootStack.Navigator>
          <RootStack.Screen name="Home" component={require('../src/screens/Home').HomeScreen} />
          <RootStack.Screen name="Booking" component={require('../src/screens/Booking').BookingScreen} />
          <RootStack.Screen name="Washer" component={require('../src/screens/Washer').WasherScreen} />
          <RootStack.Screen name="Auth" component={require('../src/screens/Auth').AuthScreen} />
        </RootStack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

