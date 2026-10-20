import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';
import { usePartner } from '@/context/PartnerContext';

export default function AppHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const { partner, toggleOnline, setIsRegisterModalOpen } = usePartner();
  const [showNotifications, setShowNotifications] = useState(false);

  // Determine page title based on current route
  let subtitle = 'Jobs Feed';
  if (pathname === '/active') {
    subtitle = 'My Active';
  } else if (pathname === '/earnings') {
    subtitle = 'Earnings';
  } else if (pathname === '/profile') {
    subtitle = 'Profile Credentials';
  }

  const notifications = [
    { id: '1', title: 'New Urgent Leak Nearby!', desc: 'Kitchen Sink Pipe Burst in Ward 12 (2.8 km away)', time: '12m ago', unread: true },
    { id: '2', title: 'Weekly Bonus Credited', desc: '₹300 District Top-Performer bonus added to payout cycle', time: '2h ago', unread: false },
    { id: '3', title: 'OTP Verified', desc: 'Society gate entry confirmed for Ticket #LF-8492', time: '3h ago', unread: false },
  ];

  return (
    <View style={styles.headerContainer}>
      <View style={styles.leftSection}>
        {/* Worker Avatar / Logo with Online Status Dot */}
        <Pressable onPress={() => router.push('/profile')} style={styles.logoWrapper}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=120&q=80' }}
            style={styles.logoImage}
          />
          <View style={[styles.statusDot, !partner.isOnline && styles.statusDotOffline]} />
        </Pressable>

        <View style={styles.titleColumn}>
          <Pressable onPress={toggleOnline} style={styles.onlineBadgeRow}>
            <View style={[styles.onlineIndicator, !partner.isOnline && styles.indicatorOffline]} />
            <Text style={styles.onlineText}>
              {partner.isOnline ? `Online in ${partner.city}` : `Offline (${partner.city})`}
            </Text>
          </Pressable>
          <Text style={styles.pageTitle}>{subtitle}</Text>
        </View>
      </View>

      <View style={styles.rightSection}>
        {/* Bell Notifications */}
        <Pressable
          onPress={() => setShowNotifications(true)}
          style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}>
          <Ionicons name="notifications-outline" size={22} color="#1E293B" />
          <View style={styles.notifBadge} />
        </Pressable>

        {/* Profile Avatar / Quick Action */}
        <Pressable
          onPress={() => router.push('/profile')}
          style={({ pressed }) => [styles.avatarButton, pressed && styles.pressed]}>
          <Ionicons name="person-circle" size={32} color="#0F172A" />
        </Pressable>
      </View>

      {/* Notifications Modal */}
      <Modal visible={showNotifications} transparent animationType="fade">
        <Pressable style={styles.modalBackdrop} onPress={() => setShowNotifications(false)}>
          <View style={styles.notifCard}>
            <View style={styles.notifHeader}>
              <Text style={styles.notifTitle}>Notifications & Broadcasts</Text>
              <Pressable onPress={() => setShowNotifications(false)}>
                <Ionicons name="close" size={20} color="#64748B" />
              </Pressable>
            </View>

            {notifications.map((n) => (
              <View key={n.id} style={[styles.notifItem, n.unread && styles.notifItemUnread]}>
                <View style={styles.notifItemTop}>
                  <Text style={styles.notifItemTitle}>{n.title}</Text>
                  <Text style={styles.notifTime}>{n.time}</Text>
                </View>
                <Text style={styles.notifDesc}>{n.desc}</Text>
              </View>
            ))}

            <Pressable
              style={styles.createAccountBtn}
              onPress={() => {
                setShowNotifications(false);
                setIsRegisterModalOpen(true);
              }}>
              <Ionicons name="person-add-outline" size={16} color="#B45309" />
              <Text style={styles.createAccountBtnText}>Worker Registration / Account Hub</Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoWrapper: {
    position: 'relative',
  },
  logoImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E2E8F0',
  },
  statusDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  statusDotOffline: {
    backgroundColor: '#94A3B8',
  },
  titleColumn: {
    justifyContent: 'center',
  },
  onlineBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  onlineIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
  },
  indicatorOffline: {
    backgroundColor: '#94A3B8',
  },
  onlineText: {
    fontSize: 11,
    color: '#059669',
    fontWeight: '600',
  },
  pageTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: -0.2,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notifBadge: {
    position: 'absolute',
    top: 7,
    right: 8,
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#EF4444',
  },
  avatarButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-start',
    paddingTop: 65,
    paddingHorizontal: 16,
  },
  notifCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },
  notifHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    paddingBottom: 8,
  },
  notifTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  notifItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  notifItemUnread: {
    backgroundColor: '#FFFBEB',
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  notifItemTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  notifItemTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1E293B',
  },
  notifTime: {
    fontSize: 11,
    color: '#94A3B8',
  },
  notifDesc: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 16,
  },
  createAccountBtn: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 10,
    backgroundColor: '#FEF3C7',
    borderRadius: 8,
  },
  createAccountBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#92400E',
  },
});
