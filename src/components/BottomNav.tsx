import React from 'react';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { usePartner } from '@/context/PartnerContext';

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();
  const { activeTicket } = usePartner();

  const isJobs = pathname === '/' || pathname === '/index';
  const isActive = pathname === '/active';
  const isEarnings = pathname === '/earnings';
  const isProfile = pathname === '/profile';

  return (
    <View style={styles.container}>
      {/* Jobs Tab */}
      <Pressable
        onPress={() => router.replace('/')}
        style={styles.tabItem}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name={isJobs ? 'radar' : 'radar'}
            size={24}
            color={isJobs ? '#EA580C' : '#64748B'}
          />
        </View>
        <Text style={[styles.tabLabel, isJobs && styles.activeTabLabel]}>Jobs</Text>
      </Pressable>

      {/* My Active Tab */}
      <Pressable
        onPress={() => router.replace('/active')}
        style={styles.tabItem}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name={isActive ? 'account-hard-hat' : 'account-hard-hat-outline'}
            size={24}
            color={isActive ? '#EA580C' : '#64748B'}
          />
          {activeTicket.status === 'IN_PROGRESS' && (
            <View style={styles.activePillBadge} />
          )}
        </View>
        <Text style={[styles.tabLabel, isActive && styles.activeTabLabel]}>My Active</Text>
      </Pressable>

      {/* Earnings Tab */}
      <Pressable
        onPress={() => router.replace('/earnings')}
        style={styles.tabItem}>
        <View style={styles.iconContainer}>
          <Ionicons
            name={isEarnings ? 'wallet' : 'wallet-outline'}
            size={24}
            color={isEarnings ? '#EA580C' : '#64748B'}
          />
        </View>
        <Text style={[styles.tabLabel, isEarnings && styles.activeTabLabel]}>Earnings</Text>
      </Pressable>

      {/* Profile Tab */}
      <Pressable
        onPress={() => router.replace('/profile')}
        style={styles.tabItem}>
        <View style={styles.iconContainer}>
          <Ionicons
            name={isProfile ? 'shield-checkmark' : 'shield-checkmark-outline'}
            size={24}
            color={isProfile ? '#EA580C' : '#64748B'}
          />
        </View>
        <Text style={[styles.tabLabel, isProfile && styles.activeTabLabel]}>Profile</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: Platform.OS === 'ios' ? 78 : 64,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingBottom: Platform.OS === 'ios' ? 20 : 6,
    paddingTop: 6,
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 2,
  },
  iconContainer: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  activePillBadge: {
    position: 'absolute',
    top: 0,
    right: -2,
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#F59E0B',
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: '#64748B',
    marginTop: 2,
  },
  activeTabLabel: {
    color: '#EA580C',
    fontWeight: '700',
  },
});
