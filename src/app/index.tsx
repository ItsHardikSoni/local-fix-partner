import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { usePartner } from '@/context/PartnerContext';
import { Palette } from '@/constants/theme';

export default function JobsScreen() {
  const router = useRouter();
  const {
    partner,
    toggleOnline,
    jobs,
    acceptJob,
    activeFilter,
    setActiveFilter,
    setIsRegisterModalOpen,
  } = usePartner();

  // Quote input state for job 1
  const [quoteAmount, setQuoteAmount] = useState<number>(350);

  const handleAcceptInstantDispatch = (jobId: string) => {
    acceptJob(jobId, quoteAmount);
    router.push('/active');
  };

  const handleAcceptScheduled = (jobId: string) => {
    acceptJob(jobId, 250);
    router.push('/active');
  };

  const handleSendCustomQuote = (jobId: string) => {
    acceptJob(jobId, 450);
    Alert.alert(
      'Custom Quote Sent',
      'Your quote for ₹450 with 1-hr guaranteed clearance was dispatched to Green View Society!'
    );
    router.push('/active');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Partner Profile Mini-Card */}
      <View style={styles.partnerCard}>
        <View style={styles.partnerTopRow}>
          {/* Avatar initials with verified check */}
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarInitials}>RK</Text>
            <View style={styles.avatarCheck}>
              <Ionicons name="checkmark-circle" size={14} color={Palette.success} />
            </View>
          </View>

          {/* Name & Badges */}
          <View style={styles.partnerDetails}>
            <View style={styles.nameRow}>
              <Text style={styles.partnerName}>{partner.name}</Text>
              <View style={styles.proBadge}>
                <Text style={styles.proText}>{partner.badge}</Text>
              </View>
              <Pressable
                onPress={toggleOnline}
                style={[styles.onlinePill, !partner.isOnline && styles.offlinePill]}>
                <View style={[styles.onlineDot, !partner.isOnline && styles.offlineDot]} />
                <Text style={[styles.onlinePillText, !partner.isOnline && styles.offlinePillText]}>
                  {partner.isOnline ? 'Online' : 'Offline'}
                </Text>
              </Pressable>
            </View>
            <Text style={styles.tradeSub}>
              {partner.trade} • {partner.ward}
            </Text>
          </View>
        </View>

        {/* District Geofence Banner */}
        <View style={styles.districtBanner}>
          <Ionicons name="shield-outline" size={14} color={Palette.warningText} />
          <Text style={styles.districtBannerText} numberOfLines={1}>
            Active District: {partner.city} Only ({partner.radiusKm} km radius)
          </Text>
        </View>

        {/* 3 Metric Columns */}
        <View style={styles.metricsRow}>
          <View style={styles.metricItem}>
            <Text style={styles.metricLabel}>Today's Jobs</Text>
            <Text style={styles.metricVal}>{partner.todayJobsCount}</Text>
          </View>
          <View style={styles.metricDivider} />
          <View style={styles.metricItem}>
            <Text style={styles.metricLabel}>Earnings</Text>
            <Text style={styles.metricVal}>₹{partner.todayEarnings}</Text>
          </View>
          <View style={styles.metricDivider} />
          <View style={styles.metricItem}>
            <Text style={styles.metricLabel}>Rating</Text>
            <View style={styles.ratingRow}>
              <Text style={styles.metricVal}>{partner.rating}</Text>
              <Ionicons name="star" size={14} color={Palette.secondary} />
            </View>
          </View>
        </View>
      </View>

      {/* Filter Horizontal Pills */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
        <Pressable
          onPress={() => setActiveFilter('all')}
          style={[styles.filterChip, activeFilter === 'all' && styles.filterChipActive]}>
          <Text style={[styles.filterText, activeFilter === 'all' && styles.filterTextActive]}>
            All Broadcasts
          </Text>
          <View style={[styles.countBadge, activeFilter === 'all' && styles.countBadgeActive]}>
            <Text style={[styles.countText, activeFilter === 'all' && styles.countTextActive]}>4</Text>
          </View>
        </Pressable>

        <Pressable
          onPress={() => setActiveFilter('urgent')}
          style={[styles.filterChip, styles.filterChipUrgent, activeFilter === 'urgent' && styles.filterChipActive]}>
          <Ionicons name="alert-circle" size={14} color={Palette.danger} />
          <Text style={styles.urgentFilterText}>Urgent</Text>
          <View style={styles.urgentCountBadge}>
            <Text style={styles.urgentCountText}>1</Text>
          </View>
        </Pressable>

        <Pressable
          onPress={() => setActiveFilter('near')}
          style={[styles.filterChip, activeFilter === 'near' && styles.filterChipActive]}>
          <Ionicons name="navigate-outline" size={13} color={Palette.textSecondary} />
          <Text style={styles.filterText}>Near Me (&lt;3km)</Text>
        </Pressable>
      </ScrollView>

      {/* Section Header: Live Dispatches */}
      <View style={styles.sectionHeader}>
        <View style={styles.sectionTitleRow}>
          <MaterialCommunityIcons name="broadcast" size={18} color={Palette.secondary} />
          <Text style={styles.sectionTitle}>Live Dispatches</Text>
        </View>
        <View style={styles.liveAutoRow}>
          <View style={styles.pulseDot} />
          <Text style={styles.liveAutoText}>Auto-refreshing</Text>
        </View>
      </View>

      {/* JOB CARD 1: URGENT SINK PIPE BURST */}
      {(activeFilter === 'all' || activeFilter === 'urgent') && (
        <View style={[styles.jobCard, styles.urgentCardBorder]}>
          <View style={styles.cardHeaderRow}>
            <View style={styles.urgentTag}>
              <Ionicons name="flash" size={12} color={Palette.danger} />
              <Text style={styles.urgentTagText}>URGENT • 12m ago</Text>
            </View>
            <Text style={styles.urgentPriceText}>₹350 – ₹500</Text>
          </View>

          <Text style={styles.jobTitle}>Kitchen Sink Pipe Burst & Valve Seep</Text>

          <View style={styles.customerRow}>
            <Ionicons name="person-circle-outline" size={16} color={Palette.textSecondary} />
            <Text style={styles.customerText}>
              Ayush (Flat A-204, ABC Heights, Mithanpura)
            </Text>
            <Ionicons name="checkmark-circle" size={14} color={Palette.success} />
          </View>

          <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={15} color={Palette.textSecondary} />
            <Text style={styles.locationText}>2.8 km away • Ward 12 Inner Circle</Text>
          </View>

          {/* Photos attachments */}
          <View style={styles.photosRow}>
            <View style={styles.photoBox}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=400&q=80',
                }}
                style={styles.photoImg}
              />
              <View style={styles.photoLabelBox}>
                <Text style={styles.photoLabelText}>Main Joint Crack</Text>
              </View>
            </View>

            <View style={styles.photoBox}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80',
                }}
                style={styles.photoImg}
              />
              <View style={styles.photoLabelBox}>
                <Text style={styles.photoLabelText}>Valve Thread</Text>
              </View>
            </View>
          </View>

          {/* Direct Quote Offer row */}
          <View style={styles.quoteOfferBox}>
            <View style={styles.quoteOfferHeader}>
              <Text style={styles.quoteOfferTitle}>Direct Quote Offer</Text>
              <Text style={styles.quoteOfferSub}>Standard fee guaranteed</Text>
            </View>

            <View style={styles.quoteInputsRow}>
              <View style={styles.quoteInputContainer}>
                <Text style={styles.quoteCurrency}>₹</Text>
                <TextInput
                  style={styles.quoteTextInput}
                  value={quoteAmount.toString()}
                  onChangeText={(val) => setQuoteAmount(parseInt(val) || 0)}
                  keyboardType="numeric"
                />
              </View>

              <Pressable
                onPress={() => setQuoteAmount((prev) => prev + 50)}
                style={styles.quickAddChip}>
                <Text style={styles.quickAddText}>+ ₹50</Text>
              </Pressable>

              <Pressable
                onPress={() => setQuoteAmount((prev) => prev + 100)}
                style={styles.quickAddChip}>
                <Text style={styles.quickAddText}>+ ₹100</Text>
              </Pressable>
            </View>
          </View>

          {/* Action button */}
          <Pressable
            onPress={() => handleAcceptInstantDispatch('LF-8492')}
            style={styles.instantAcceptBtn}>
            <Ionicons name="flash" size={16} color="#FFFFFF" />
            <Text style={styles.instantAcceptBtnText}>
              Accept Instant Dispatch (₹{quoteAmount})
            </Text>
          </Pressable>
        </View>
      )}

      {/* JOB CARD 2: SCHEDULED BATHROOM TAP */}
      {(activeFilter === 'all' || activeFilter === 'near') && (
        <View style={[styles.jobCard, styles.scheduledCardBorder]}>
          <View style={styles.cardHeaderRow}>
            <View style={styles.scheduledTag}>
              <Ionicons name="calendar-outline" size={12} color={Palette.info} />
              <Text style={styles.scheduledTagText}>SCHEDULED • Today 2:30 PM</Text>
            </View>
            <View style={styles.priceColumn}>
              <Text style={styles.fixedPriceText}>₹250</Text>
              <Text style={styles.fixedRateLabel}>Fixed Rate</Text>
            </View>
          </View>

          <Text style={styles.jobTitle}>Bathroom Tap Replacement & Angle Valve</Text>

          <View style={styles.customerRow}>
            <Ionicons name="person-outline" size={15} color={Palette.textSecondary} />
            <Text style={styles.customerText}>Pooja Sharma (House #14, Brahmpura)</Text>
          </View>

          <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={15} color={Palette.textSecondary} />
            <Text style={styles.locationText}>4.1 km • Materials already purchased by owner</Text>
          </View>

          {/* Required tool banner */}
          <View style={styles.toolRequirementBox}>
            <MaterialCommunityIcons name="wrench-outline" size={16} color={Palette.warningText} />
            <Text style={styles.toolRequirementText}>
              Required tool: 12-inch pipe wrench + PTFE teflon roll
            </Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.scheduledActionsRow}>
            <Pressable
              onPress={() =>
                Alert.alert(
                  'Job Details',
                  'Client: Pooja Sharma\nTask: Replace bath tap & angle valve.\nOwner already has hardware ready.'
                )
              }
              style={styles.viewDetailsBtn}>
              <Ionicons name="information-circle-outline" size={16} color={Palette.primary} />
              <Text style={styles.viewDetailsBtnText}>View Details</Text>
            </Pressable>

            <Pressable
              onPress={() => handleAcceptScheduled('LF-8493')}
              style={styles.acceptJobBtn}>
              <Ionicons name="checkmark" size={16} color="#FFFFFF" />
              <Text style={styles.acceptJobBtnText}>Accept Job</Text>
            </Pressable>
          </View>
        </View>
      )}

      {/* JOB CARD 3: SOCIETY MAINTENANCE */}
      {activeFilter === 'all' && (
        <View style={[styles.jobCard, styles.societyCardBorder]}>
          <View style={styles.cardHeaderRow}>
            <View style={styles.societyTag}>
              <MaterialCommunityIcons name="office-building" size={13} color={Palette.warningText} />
              <Text style={styles.societyTagText}>SOCIETY MAINTENANCE</Text>
            </View>
            <View style={styles.priceColumn}>
              <Text style={styles.fixedPriceText}>₹450</Text>
              <Text style={styles.fixedRateLabel}>Standard Payout</Text>
            </View>
          </View>

          <Text style={styles.jobTitle}>Overhead 5000L Water Tank Overflow Sensor</Text>

          <View style={styles.customerRow}>
            <Ionicons name="business-outline" size={15} color={Palette.textSecondary} />
            <Text style={styles.customerText}>Green View Society, Rooftop • Tower C</Text>
          </View>

          <View style={styles.locationRow}>
            <Ionicons name="navigate-outline" size={15} color={Palette.textSecondary} />
            <Text style={styles.locationText}>1.9 km away • Ladder access unlocked</Text>
          </View>

          {/* Guaranteed Clearance Box */}
          <View style={styles.clearanceBox}>
            <Ionicons name="checkmark-circle-outline" size={16} color={Palette.success} />
            <Text style={styles.clearanceText}>
              Guaranteed digital invoice clearing within 1 hour
            </Text>
          </View>

          {/* Action button */}
          <Pressable
            onPress={() => handleSendCustomQuote('LF-8494')}
            style={styles.sendQuoteBtn}>
            <Ionicons name="paper-plane-outline" size={16} color={Palette.infoText} />
            <Text style={styles.sendQuoteBtnText}>Send Custom Quote</Text>
          </Pressable>
        </View>
      )}

      {/* District Lock Notice Banner */}
      <View style={styles.lockNoticeCard}>
        <View style={styles.lockIconBox}>
          <Ionicons name="lock-closed" size={18} color={Palette.secondary} />
        </View>
        <View style={styles.lockTextBox}>
          <Text style={styles.lockTitle}>Muzaffarpur District Lock Active</Text>
          <Text style={styles.lockDesc}>
            You only compete with registered local tradespeople in your ward. Out-of-district workers are strictly blocked from bidding.
          </Text>
          <View style={styles.fairWagePill}>
            <Ionicons name="shield-checkmark" size={12} color={Palette.success} />
            <Text style={styles.fairWageText}>Fair Wage Protected</Text>
          </View>
        </View>
      </View>

      <View style={{ height: 20 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Palette.background,
  },
  contentContainer: {
    padding: 16,
  },
  partnerCard: {
    backgroundColor: Palette.surface,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: Palette.border,
    shadowColor: Palette.primary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    marginBottom: 14,
  },
  partnerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: Palette.infoBg,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  avatarInitials: {
    fontSize: 16,
    fontWeight: '800',
    color: Palette.info,
  },
  avatarCheck: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: Palette.surface,
    borderRadius: 8,
  },
  partnerDetails: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  partnerName: {
    fontSize: 16,
    fontWeight: '700',
    color: Palette.primary,
  },
  proBadge: {
    backgroundColor: Palette.primary,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4,
  },
  proText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  onlinePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Palette.successBg,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginLeft: 'auto',
  },
  offlinePill: {
    backgroundColor: Palette.borderLight,
  },
  onlineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Palette.success,
  },
  offlineDot: {
    backgroundColor: Palette.textSecondary,
  },
  onlinePillText: {
    fontSize: 10,
    fontWeight: '700',
    color: Palette.successText,
  },
  offlinePillText: {
    color: Palette.textSecondary,
  },
  tradeSub: {
    fontSize: 12,
    color: Palette.textSecondary,
    marginTop: 2,
  },
  districtBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Palette.warningBg,
    borderWidth: 1,
    borderColor: Palette.warningBorder,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    marginTop: 12,
  },
  districtBannerText: {
    fontSize: 11,
    fontWeight: '600',
    color: Palette.warningText,
    flex: 1,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: Palette.borderLight,
  },
  metricItem: {
    flex: 1,
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 11,
    color: Palette.textSecondary,
    fontWeight: '500',
  },
  metricVal: {
    fontSize: 16,
    fontWeight: '800',
    color: Palette.primary,
    marginTop: 2,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  metricDivider: {
    width: 1,
    height: 24,
    backgroundColor: Palette.border,
  },
  filterScroll: {
    marginBottom: 14,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Palette.surface,
    borderWidth: 1,
    borderColor: Palette.border,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
  },
  filterChipActive: {
    backgroundColor: Palette.primary,
    borderColor: Palette.primary,
  },
  filterChipUrgent: {
    backgroundColor: Palette.dangerBg,
    borderColor: Palette.dangerBorder,
  },
  filterText: {
    fontSize: 12,
    fontWeight: '600',
    color: Palette.primary,
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  urgentFilterText: {
    fontSize: 12,
    fontWeight: '600',
    color: Palette.dangerText,
  },
  countBadge: {
    backgroundColor: Palette.border,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 10,
  },
  countBadgeActive: {
    backgroundColor: '#1E293B',
  },
  countText: {
    fontSize: 10,
    fontWeight: '700',
    color: Palette.primary,
  },
  countTextActive: {
    color: '#FFFFFF',
  },
  urgentCountBadge: {
    backgroundColor: Palette.dangerBorder,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 10,
  },
  urgentCountText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#991B1B',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Palette.primary,
  },
  liveAutoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Palette.secondary,
  },
  liveAutoText: {
    fontSize: 11,
    fontWeight: '500',
    color: Palette.textSecondary,
  },
  jobCard: {
    backgroundColor: Palette.surface,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: Palette.border,
    marginBottom: 14,
    shadowColor: Palette.primary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  urgentCardBorder: {
    borderLeftWidth: 4,
    borderLeftColor: Palette.secondary,
  },
  scheduledCardBorder: {
    borderLeftWidth: 4,
    borderLeftColor: Palette.info,
  },
  societyCardBorder: {
    borderLeftWidth: 4,
    borderLeftColor: Palette.warningText,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  urgentTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Palette.dangerBg,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  urgentTagText: {
    fontSize: 10,
    fontWeight: '800',
    color: Palette.dangerText,
    letterSpacing: 0.3,
  },
  urgentPriceText: {
    fontSize: 18,
    fontWeight: '800',
    color: Palette.secondary,
  },
  scheduledTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Palette.infoBg,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  scheduledTagText: {
    fontSize: 10,
    fontWeight: '700',
    color: Palette.info,
  },
  societyTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Palette.warningBg,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  societyTagText: {
    fontSize: 10,
    fontWeight: '800',
    color: Palette.warningText,
  },
  priceColumn: {
    alignItems: 'flex-end',
  },
  fixedPriceText: {
    fontSize: 17,
    fontWeight: '800',
    color: Palette.primary,
  },
  fixedRateLabel: {
    fontSize: 10,
    color: Palette.success,
    fontWeight: '600',
  },
  jobTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Palette.primary,
    marginBottom: 6,
  },
  customerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  customerText: {
    fontSize: 12,
    color: Palette.primary,
    fontWeight: '500',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 10,
  },
  locationText: {
    fontSize: 11,
    color: Palette.textSecondary,
  },
  photosRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
  },
  photoBox: {
    flex: 1,
    height: 100,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: Palette.border,
  },
  photoImg: {
    width: '100%',
    height: '100%',
  },
  photoLabelBox: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(12, 27, 51, 0.75)',
    paddingVertical: 4,
    alignItems: 'center',
  },
  photoLabelText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  quoteOfferBox: {
    backgroundColor: Palette.infoBg,
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
  },
  quoteOfferHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  quoteOfferTitle: {
    fontSize: 11,
    fontWeight: '600',
    color: Palette.primary,
  },
  quoteOfferSub: {
    fontSize: 10,
    color: Palette.secondary,
    fontWeight: '600',
  },
  quoteInputsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  quoteInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Palette.surface,
    borderWidth: 1,
    borderColor: Palette.borderDark,
    borderRadius: 8,
    paddingHorizontal: 8,
    height: 38,
  },
  quoteCurrency: {
    fontSize: 14,
    fontWeight: '700',
    color: Palette.textSecondary,
    marginRight: 4,
  },
  quoteTextInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    color: Palette.primary,
  },
  quickAddChip: {
    backgroundColor: Palette.surface,
    borderWidth: 1,
    borderColor: Palette.borderDark,
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickAddText: {
    fontSize: 11,
    fontWeight: '700',
    color: Palette.primary,
  },
  instantAcceptBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: Palette.secondary,
    paddingVertical: 12,
    borderRadius: 10,
    shadowColor: Palette.secondary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  instantAcceptBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: Palette.primary,
  },
  toolRequirementBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Palette.infoBg,
    padding: 8,
    borderRadius: 8,
    marginBottom: 12,
  },
  toolRequirementText: {
    fontSize: 11,
    color: Palette.infoText,
    fontWeight: '500',
    flex: 1,
  },
  scheduledActionsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  viewDetailsBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    backgroundColor: Palette.borderLight,
    paddingVertical: 10,
    borderRadius: 8,
  },
  viewDetailsBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: Palette.primary,
  },
  acceptJobBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    backgroundColor: Palette.primary,
    paddingVertical: 10,
    borderRadius: 8,
  },
  acceptJobBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  clearanceBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Palette.successBg,
    padding: 8,
    borderRadius: 8,
    marginBottom: 12,
  },
  clearanceText: {
    fontSize: 11,
    color: Palette.successText,
    fontWeight: '600',
    flex: 1,
  },
  sendQuoteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: Palette.infoBg,
    borderWidth: 1,
    borderColor: Palette.infoBorder,
    paddingVertical: 10,
    borderRadius: 8,
  },
  sendQuoteBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: Palette.infoText,
  },
  lockNoticeCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    backgroundColor: Palette.infoBg,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: Palette.infoBorder,
    marginTop: 6,
  },
  lockIconBox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Palette.warningBorder,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lockTextBox: {
    flex: 1,
  },
  lockTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: Palette.primary,
    marginBottom: 2,
  },
  lockDesc: {
    fontSize: 11,
    color: Palette.textSecondary,
    lineHeight: 15,
  },
  fairWagePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Palette.successBg,
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginTop: 8,
  },
  fairWageText: {
    fontSize: 10,
    fontWeight: '700',
    color: Palette.successText,
  },
});
