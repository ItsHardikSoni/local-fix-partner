import React, { useEffect, useState } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { Slot } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';

import { PartnerProvider } from '@/context/PartnerContext';
import { Palette } from '@/constants/theme';
import AppHeader from '@/components/AppHeader';
import BottomNav from '@/components/BottomNav';
import PartnerSplashScreen from '@/components/PartnerSplashScreen';
import CallCustomerModal from '@/components/modals/CallCustomerModal';
import RegisterWorkerModal from '@/components/modals/RegisterWorkerModal';

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    SplashScreen.hideAsync().catch(() => {});
  }, []);

  return (
    <SafeAreaProvider>
      <PartnerProvider>
        <SafeAreaView style={styles.safeContainer} edges={['top', 'left', 'right', 'bottom']}>
          <StatusBar
            barStyle={showSplash ? 'light-content' : 'dark-content'}
            backgroundColor={showSplash ? Palette.primary : Palette.surface}
          />
          <AppHeader />
          <View style={styles.contentArea}>
            <Slot />
          </View>
          <BottomNav />
          <CallCustomerModal />
          <RegisterWorkerModal />

          {/* 3-Second First-Time Partner Splash Screen */}
          {showSplash && (
            <PartnerSplashScreen onFinish={() => setShowSplash(false)} />
          )}
        </SafeAreaView>
      </PartnerProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: Palette.surface,
  },
  contentArea: {
    flex: 1,
    backgroundColor: Palette.background,
  },
});
