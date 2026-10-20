import React, { useEffect } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { Slot } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';

import { PartnerProvider } from '@/context/PartnerContext';
import AppHeader from '@/components/AppHeader';
import BottomNav from '@/components/BottomNav';
import CallCustomerModal from '@/components/modals/CallCustomerModal';
import RegisterWorkerModal from '@/components/modals/RegisterWorkerModal';

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync().catch(() => {});
  }, []);

  return (
    <SafeAreaProvider>
      <PartnerProvider>
        <SafeAreaView style={styles.safeContainer} edges={['top', 'left', 'right', 'bottom']}>
          <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
          <AppHeader />
          <View style={styles.contentArea}>
            <Slot />
          </View>
          <BottomNav />
          <CallCustomerModal />
          <RegisterWorkerModal />
        </SafeAreaView>
      </PartnerProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  contentArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
});
