import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  Switch,
  Alert,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { usePartner } from '@/context/PartnerContext';

export default function ProfileScreen() {
  const { partner, toggleOnline, toggleSos, setIsRegisterModalOpen } = usePartner();

  const handleDownloadIdCard = () => {
    Alert.alert(
      'Partner ID Card',
      `Downloading digitally signed partner credentials for ${partner.name}...\nID: ${partner.cryptographicId}`
    );
  };

  const handleCallSupport = () => {
    Alert.alert(
      'Muzaffarpur Partner Desk',
      'Connecting to 1800-LOCALFIX (24x7 Priority Trade Helpline)...'
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* PROFILE HEADER CARD */}
      <View style={styles.profileCard}>
        <View style={styles.profileTopRow}>
          <View style={styles.photoContainer}>
            <Image
              source={{ uri: partner.avatarUrl }}
              style={styles.profilePhoto}
            />
            <View style={styles.photoVerifiedCheck}>
              <Ionicons name="checkmark-circle" size={16} color="#10B981" />
            </View>
          </View>

          <View style={styles.profileDetails}>
            <View style={styles.profileNameRow}>
              <Text style={styles.profileName}>{partner.name}</Text>
              <View style={[styles.activePill, !partner.isOnline && styles.inactivePill]}>
                <View style={[styles.activeDot, !partner.isOnline && styles.inactiveDot]} />
                <Text style={[styles.activePillText, !partner.isOnline && styles.inactivePillText]}>
                  {partner.isOnline ? 'Active' : 'Offline'}
                </Text>
              </View>
            </View>

            <View style={styles.verifiedPartnerBadge}>
              <Ionicons name="shield-checkmark" size={13} color="#D97706" />
              <Text style={styles.verifiedPartnerText}>
                Verified {partner.city} Partner
              </Text>
            </View>

            <View style={styles.ratingStatsRow}>
              <Ionicons name="star" size={13} color="#F59E0B" />
              <Text style={styles.ratingNumber}>{partner.rating}</Text>
              <Text style={styles.dotSeparator}>•</Text>
              <Text style={styles.jobsCountText}>{partner.totalJobs} Jobs</Text>
              <Text style={styles.dotSeparator}>•</Text>
              <Text style={styles.onTimeText}>{partner.onTimeRate}% On-Time</Text>
            </View>
          </View>
        </View>

        {/* Accepting Jobs Toggle Row */}
        <View style={styles.toggleRow}>
          <View style={styles.toggleLeft}>
            <View style={[styles.greenToggleDot, !partner.isOnline && styles.grayToggleDot]} />
            <View>
              <Text style={styles.toggleTitle}>Accepting Jobs</Text>
              <Text style={styles.toggleSub}>Live in {partner.city} Hub</Text>
            </View>
          </View>
          <Switch
            value={partner.isOnline}
            onValueChange={toggleOnline}
            trackColor={{ false: '#CBD5E1', true: '#10B981' }}
            thumbColor="#FFFFFF"
          />
        </View>
      </View>

      {/* DISTRICT GEOFENCE CARD */}
      <View style={styles.geofenceCard}>
        <View style={styles.cardHeaderRow}>
          <View style={styles.headerLeft}>
            <Ionicons name="compass-outline" size={18} color="#D97706" />
            <View>
              <Text style={styles.cardHeaderTitle}>District Geofence</Text>
              <Text style={styles.cardHeaderSub}>Authorized Operation Zone</Text>
            </View>
          </View>
          <View style={styles.municipalLockBadge}>
            <Ionicons name="lock-closed-outline" size={12} color="#2563EB" />
            <Text style={styles.municipalLockText}>Municipal Lock</Text>
          </View>
        </View>

        {/* Visual Map Illustration Box */}
        <View style={styles.mapIllustrationBox}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=700&q=80',
            }}
            style={styles.mapBackdropImg}
          />
          <View style={styles.mapOverlayGradient}>
            <View style={styles.mapPinRow}>
              <Ionicons name="location" size={16} color="#F59E0B" />
              <Text style={styles.mapCityText}>{partner.city}, Bihar</Text>
            </View>
            <View style={styles.radiusBadge}>
              <Text style={styles.radiusBadgeText}>Radius {partner.radiusKm + 0.5} km</Text>
            </View>
          </View>
        </View>

        {/* Assigned Sectors */}
        <View style={styles.sectorsBox}>
          <MaterialCommunityIcons name="office-building" size={16} color="#475569" />
          <View style={styles.sectorsTexts}>
            <Text style={styles.sectorsLabel}>ASSIGNED SECTORS</Text>
            <Text style={styles.sectorsVal}>Ward 12, 14 & Surrounding Sectors</Text>
          </View>
        </View>

        {/* Security / Cryptographic lock note */}
        <View style={styles.geofenceNotice}>
          <Ionicons name="shield-outline" size={16} color="#D97706" />
          <Text style={styles.geofenceNoticeText}>
            Your account is cryptographically tied to {partner.city}. Changing districts requires official municipal document re-verification.
          </Text>
        </View>
      </View>

      {/* KYC & CREDENTIALS CARD */}
      <View style={styles.kycCard}>
        <View style={styles.cardHeaderRow}>
          <View style={styles.headerLeft}>
            <MaterialCommunityIcons name="clipboard-check-outline" size={18} color="#059669" />
            <View>
              <Text style={styles.cardHeaderTitle}>KYC & Credentials</Text>
              <Text style={styles.kycSubGreen}>100% Certified Partner</Text>
            </View>
          </View>
          <View style={styles.kycCountBadge}>
            <Text style={styles.kycCountText}>4/4</Text>
          </View>
        </View>

        {/* KYC Item 1: Aadhaar */}
        <View style={styles.kycItemRow}>
          <View style={styles.kycIconBox}>
            <Ionicons name="id-card-outline" size={18} color="#1E293B" />
          </View>
          <View style={styles.kycItemTexts}>
            <View style={styles.kycItemTitleRow}>
              <Text style={styles.kycItemTitle}>Aadhaar KYC</Text>
              <Ionicons name="checkmark-circle" size={13} color="#10B981" />
            </View>
            <Text style={styles.kycItemSub}>UIDAI Biometric Verified</Text>
          </View>
          <View style={styles.statusVerifiedTag}>
            <Text style={styles.statusVerifiedText}>VERIFIED</Text>
          </View>
        </View>

        {/* KYC Item 2: Police Background Check */}
        <View style={styles.kycItemRow}>
          <View style={styles.kycIconBox}>
            <Ionicons name="shield-outline" size={18} color="#1E293B" />
          </View>
          <View style={styles.kycItemTexts}>
            <View style={styles.kycItemTitleRow}>
              <Text style={styles.kycItemTitle}>Police Background Check</Text>
              <Ionicons name="checkmark-circle" size={13} color="#10B981" />
            </View>
            <Text style={styles.kycItemSub}>Cleared on 14 Jan 2025</Text>
          </View>
          <View style={styles.statusVerifiedTag}>
            <Text style={styles.statusVerifiedText}>CLEARED</Text>
          </View>
        </View>

        {/* KYC Item 3: Trade Skill Certification */}
        <View style={styles.kycItemRow}>
          <View style={styles.kycIconBox}>
            <MaterialCommunityIcons name="tools" size={18} color="#1E293B" />
          </View>
          <View style={styles.kycItemTexts}>
            <View style={styles.kycItemTitleRow}>
              <Text style={styles.kycItemTitle}>Trade Skill Certification</Text>
              <Ionicons name="checkmark-circle" size={13} color="#10B981" />
            </View>
            <Text style={styles.kycItemSub}>NSDC Level 4 Plumber</Text>
          </View>
          <View style={styles.statusVerifiedTag}>
            <Text style={styles.statusVerifiedText}>ACTIVE</Text>
          </View>
        </View>

        {/* KYC Item 4: Bank Account & PAN */}
        <View style={[styles.kycItemRow, { borderBottomWidth: 0 }]}>
          <View style={styles.kycIconBox}>
            <MaterialCommunityIcons name="bank" size={18} color="#1E293B" />
          </View>
          <View style={styles.kycItemTexts}>
            <View style={styles.kycItemTitleRow}>
              <Text style={styles.kycItemTitle}>Bank Account & PAN</Text>
              <Ionicons name="checkmark-circle" size={13} color="#10B981" />
            </View>
            <Text style={styles.kycItemSub}>Verified for Fast UPI Payouts</Text>
          </View>
          <View style={styles.statusVerifiedTag}>
            <Text style={styles.statusVerifiedText}>LINKED</Text>
          </View>
        </View>
      </View>

      {/* SERVICE PREFERENCES CARD */}
      <View style={styles.preferencesCard}>
        <View style={styles.cardHeaderRow}>
          <View style={styles.headerLeft}>
            <Ionicons name="options-outline" size={18} color="#2563EB" />
            <View>
              <Text style={styles.cardHeaderTitle}>Service Preferences</Text>
              <Text style={styles.cardHeaderSub}>Daily Schedule & Skills</Text>
            </View>
          </View>
        </View>

        {/* Active Skill Categories */}
        <View style={styles.skillsSection}>
          <View style={styles.skillsHeader}>
            <Text style={styles.skillsLabel}>Active Skill Categories</Text>
            <Pressable
              onPress={() => setIsRegisterModalOpen(true)}
              style={styles.editSkillsBtn}>
              <Text style={styles.editSkillsText}>Edit Skills</Text>
              <Ionicons name="pencil" size={12} color="#92400E" />
            </Pressable>
          </View>

          <View style={styles.skillsChipsRow}>
            {partner.skills.map((skill, idx) => (
              <View key={idx} style={styles.skillChip}>
                <Text style={styles.skillChipText}>• {skill}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Operating Shift */}
        <Pressable
          onPress={() =>
            Alert.alert(
              'Operating Shift',
              `Current: ${partner.operatingHours}\nWard 12 auto-dispatch window.`
            )
          }
          style={styles.shiftRow}>
          <Ionicons name="time-outline" size={18} color="#475569" />
          <View style={styles.shiftTexts}>
            <Text style={styles.shiftTitle}>Operating Shift</Text>
            <Text style={styles.shiftHours}>{partner.operatingHours}</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
        </Pressable>

        {/* 15-Min SOS Dispatch */}
        <View style={styles.sosCard}>
          <View style={styles.sosIconBox}>
            <Ionicons name="flash" size={18} color="#FFFFFF" />
          </View>
          <View style={styles.sosTexts}>
            <View style={styles.sosTitleRow}>
              <Text style={styles.sosTitle}>15-Min SOS Dispatch</Text>
              <View style={styles.sosExtraBadge}>
                <Text style={styles.sosExtraText}>+₹100/job</Text>
              </View>
            </View>
            <Text style={styles.sosSub}>
              Opted-in for priority burst pipes and drainage overflow alerts.
            </Text>
          </View>
          <Switch
            value={partner.sosDispatchEnabled}
            onValueChange={toggleSos}
            trackColor={{ false: '#CBD5E1', true: '#F59E0B' }}
            thumbColor="#FFFFFF"
          />
        </View>
      </View>

      {/* PARTNER SUPPORT SECTION */}
      <View style={styles.supportSection}>
        <Text style={styles.supportHeading}>Partner Support</Text>

        {/* Support 1: Muzaffarpur Partner Desk */}
        <Pressable onPress={handleCallSupport} style={styles.supportCardDesk}>
          <View style={styles.deskIconCircle}>
            <MaterialCommunityIcons name="headset" size={20} color="#059669" />
          </View>
          <View style={styles.supportDeskTexts}>
            <Text style={styles.deskTitle}>Muzaffarpur Partner Desk</Text>
            <Text style={styles.deskNumber}>Toll-Free: 1800-LOCALFIX (24x7)</Text>
          </View>
          <View style={styles.phoneCallCircle}>
            <Ionicons name="call" size={16} color="#059669" />
          </View>
        </Pressable>

        {/* Support 2: Official Partner ID Card */}
        <Pressable onPress={handleDownloadIdCard} style={styles.supportCardId}>
          <View style={styles.idCardIconCircle}>
            <Ionicons name="card-outline" size={20} color="#F59E0B" />
          </View>
          <View style={styles.idCardTexts}>
            <Text style={styles.idCardTitle}>Official Partner ID Card</Text>
            <Text style={styles.idCardSub}>Download digitally signed PDF</Text>
          </View>
          <View style={styles.downloadIconCircle}>
            <Ionicons name="download-outline" size={18} color="#FFFFFF" />
          </View>
        </Pressable>
      </View>

      {/* FOOTER */}
      <View style={styles.footerRow}>
        <Ionicons name="lock-closed-outline" size={12} color="#64748B" />
        <Text style={styles.footerText}>
          Cryptographic ID: {partner.cryptographicId}
        </Text>
      </View>

      <View style={{ height: 20 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  contentContainer: {
    padding: 16,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  profileTopRow: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 14,
  },
  photoContainer: {
    position: 'relative',
  },
  profilePhoto: {
    width: 64,
    height: 64,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#E2E8F0',
  },
  photoVerifiedCheck: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
  },
  profileDetails: {
    flex: 1,
  },
  profileNameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  activePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  inactivePill: {
    backgroundColor: '#F1F5F9',
  },
  activeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
  },
  inactiveDot: {
    backgroundColor: '#94A3B8',
  },
  activePillText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#059669',
  },
  inactivePillText: {
    color: '#64748B',
  },
  verifiedPartnerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FEF3C7',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginBottom: 6,
  },
  verifiedPartnerText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#92400E',
  },
  ratingStatsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingNumber: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
  },
  dotSeparator: {
    color: '#94A3B8',
    marginHorizontal: 2,
  },
  jobsCountText: {
    fontSize: 12,
    color: '#475569',
  },
  onTimeText: {
    fontSize: 12,
    color: '#059669',
    fontWeight: '600',
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
  },
  toggleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  greenToggleDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
  },
  grayToggleDot: {
    backgroundColor: '#94A3B8',
  },
  toggleTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1E293B',
  },
  toggleSub: {
    fontSize: 11,
    color: '#64748B',
  },
  geofenceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 14,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cardHeaderTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  cardHeaderSub: {
    fontSize: 11,
    color: '#64748B',
  },
  municipalLockBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  municipalLockText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#2563EB',
  },
  mapIllustrationBox: {
    height: 110,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 12,
    backgroundColor: '#E2E8F0',
  },
  mapBackdropImg: {
    width: '100%',
    height: '100%',
  },
  mapOverlayGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mapPinRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  mapCityText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  radiusBadge: {
    backgroundColor: '#334155',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  radiusBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  sectorsBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#F8FAFC',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 10,
  },
  sectorsTexts: {
    flex: 1,
  },
  sectorsLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748B',
    letterSpacing: 0.4,
  },
  sectorsVal: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1E293B',
    marginTop: 1,
  },
  geofenceNotice: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: '#FFFBEB',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FEF3C7',
  },
  geofenceNoticeText: {
    fontSize: 11,
    color: '#92400E',
    flex: 1,
    lineHeight: 15,
  },
  kycCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 14,
  },
  kycSubGreen: {
    fontSize: 11,
    color: '#059669',
    fontWeight: '600',
  },
  kycCountBadge: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  kycCountText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#059669',
  },
  kycItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  kycIconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  kycItemTexts: {
    flex: 1,
  },
  kycItemTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  kycItemTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1E293B',
  },
  kycItemSub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 1,
  },
  statusVerifiedTag: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  statusVerifiedText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#059669',
    letterSpacing: 0.3,
  },
  preferencesCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 14,
  },
  skillsSection: {
    marginBottom: 14,
  },
  skillsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  skillsLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1E293B',
  },
  editSkillsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  editSkillsText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#B45309',
  },
  skillsChipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  skillChip: {
    backgroundColor: '#FFFBEB',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FEF3C7',
  },
  skillChipText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#92400E',
  },
  shiftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#F8FAFC',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 10,
  },
  shiftTexts: {
    flex: 1,
  },
  shiftTitle: {
    fontSize: 11,
    color: '#64748B',
  },
  shiftHours: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1E293B',
    marginTop: 1,
  },
  sosCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#FFFBEB',
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: '#FEF3C7',
  },
  sosIconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#EA580C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sosTexts: {
    flex: 1,
  },
  sosTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  sosTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#92400E',
  },
  sosExtraBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4,
  },
  sosExtraText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#B45309',
  },
  sosSub: {
    fontSize: 10,
    color: '#78350F',
    lineHeight: 14,
  },
  supportSection: {
    marginBottom: 14,
  },
  supportHeading: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 10,
  },
  supportCardDesk: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#DBEAFE',
    marginBottom: 10,
  },
  deskIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#ECFDF5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  supportDeskTexts: {
    flex: 1,
  },
  deskTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E293B',
  },
  deskNumber: {
    fontSize: 11,
    color: '#059669',
    fontWeight: '600',
    marginTop: 1,
  },
  phoneCallCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#ECFDF5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  supportCardId: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#0F172A',
    borderRadius: 12,
    padding: 12,
  },
  idCardIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#1E293B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  idCardTexts: {
    flex: 1,
  },
  idCardTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  idCardSub: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 1,
  },
  downloadIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1E293B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
  },
  footerText: {
    fontSize: 10,
    color: '#64748B',
    fontFamily: 'monospace',
  },
});
