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
              <Ionicons name="checkmark-circle" size={14} color="#10B981" />
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
          <Ionicons name="shield-outline" size={14} color="#D97706" />
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
              <Ionicons name="star" size={14} color="#F59E0B" />
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
          <Ionicons name="alert-circle" size={14} color="#DC2626" />
          <Text style={styles.urgentFilterText}>Urgent</Text>
          <View style={styles.urgentCountBadge}>
            <Text style={styles.urgentCountText}>1</Text>
          </View>
        </Pressable>

        <Pressable
          onPress={() => setActiveFilter('near')}
          style={[styles.filterChip, activeFilter === 'near' && styles.filterChipActive]}>
          <Ionicons name="navigate-outline" size={13} color="#475569" />
          <Text style={styles.filterText}>Near Me (&lt;3km)</Text>
        </Pressable>
      </ScrollView>

      {/* Section Header: Live Dispatches */}
      <View style={styles.sectionHeader}>
        <View style={styles.sectionTitleRow}>
          <MaterialCommunityIcons name="broadcast" size={18} color="#D97706" />
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
              <Ionicons name="flash" size={12} color="#DC2626" />
              <Text style={styles.urgentTagText}>URGENT • 12m ago</Text>
            </View>
            <Text style={styles.urgentPriceText}>₹350 – ₹500</Text>
          </View>

          <Text style={styles.jobTitle}>Kitchen Sink Pipe Burst & Valve Seep</Text>

          <View style={styles.customerRow}>
            <Ionicons name="person-circle-outline" size={16} color="#64748B" />
            <Text style={styles.customerText}>
              Ayush (Flat A-204, ABC Heights, Mithanpura)
            </Text>
            <Ionicons name="checkmark-circle" size={14} color="#10B981" />
          </View>

          <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={15} color="#64748B" />
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
              <Ionicons name="calendar-outline" size={12} color="#2563EB" />
              <Text style={styles.scheduledTagText}>SCHEDULED • Today 2:30 PM</Text>
            </View>
            <View style={styles.priceColumn}>
              <Text style={styles.fixedPriceText}>₹250</Text>
              <Text style={styles.fixedRateLabel}>Fixed Rate</Text>
            </View>
          </View>

          <Text style={styles.jobTitle}>Bathroom Tap Replacement & Angle Valve</Text>

          <View style={styles.customerRow}>
            <Ionicons name="person-outline" size={15} color="#64748B" />
            <Text style={styles.customerText}>Pooja Sharma (House #14, Brahmpura)</Text>
          </View>

          <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={15} color="#64748B" />
            <Text style={styles.locationText}>4.1 km • Materials already purchased by owner</Text>
          </View>

          {/* Required tool banner */}
          <View style={styles.toolRequirementBox}>
            <MaterialCommunityIcons name="wrench-outline" size={16} color="#B45309" />
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
              <Ionicons name="information-circle-outline" size={16} color="#334155" />
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
              <MaterialCommunityIcons name="office-building" size={13} color="#92400E" />
              <Text style={styles.societyTagText}>SOCIETY MAINTENANCE</Text>
            </View>
            <View style={styles.priceColumn}>
              <Text style={styles.fixedPriceText}>₹450</Text>
              <Text style={styles.fixedRateLabel}>Standard Payout</Text>
            </View>
          </View>

          <Text style={styles.jobTitle}>Overhead 5000L Water Tank Overflow Sensor</Text>

          <View style={styles.customerRow}>
            <Ionicons name="business-outline" size={15} color="#64748B" />
            <Text style={styles.customerText}>Green View Society, Rooftop • Tower C</Text>
          </View>

          <View style={styles.locationRow}>
            <Ionicons name="navigate-outline" size={15} color="#64748B" />
            <Text style={styles.locationText}>1.9 km away • Ladder access unlocked</Text>
          </View>

          {/* Guaranteed Clearance Box */}
          <View style={styles.clearanceBox}>
            <Ionicons name="checkmark-circle-outline" size={16} color="#059669" />
            <Text style={styles.clearanceText}>
              Guaranteed digital invoice clearing within 1 hour
            </Text>
          </View>

          {/* Action button */}
          <Pressable
            onPress={() => handleSendCustomQuote('LF-8494')}
            style={styles.sendQuoteBtn}>
            <Ionicons name="paper-plane-outline" size={16} color="#1E40AF" />
            <Text style={styles.sendQuoteBtnText}>Send Custom Quote</Text>
          </Pressable>
        </View>
      )}

      {/* District Lock Notice Banner */}
      <View style={styles.lockNoticeCard}>
        <View style={styles.lockIconBox}>
          <Ionicons name="lock-closed" size={18} color="#D97706" />
        </View>
        <View style={styles.lockTextBox}>
          <Text style={styles.lockTitle}>Muzaffarpur District Lock Active</Text>
          <Text style={styles.lockDesc}>
            You only compete with registered local tradespeople in your ward. Out-of-district workers are strictly blocked from bidding.
          </Text>
          <View style={styles.fairWagePill}>
            <Ionicons name="shield-checkmark" size={12} color="#059669" />
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
    backgroundColor: '#F8FAFC',
  },
  contentContainer: {
    padding: 16,
  },
  partnerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
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
    backgroundColor: '#E0F2FE',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  avatarInitials: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0284C7',
  },
  avatarCheck: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: '#FFFFFF',
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
    color: '#0F172A',
  },
  proBadge: {
    backgroundColor: '#0F172A',
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
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginLeft: 'auto',
  },
  offlinePill: {
    backgroundColor: '#F1F5F9',
  },
  onlineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
  },
  offlineDot: {
    backgroundColor: '#94A3B8',
  },
  onlinePillText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#065F46',
  },
  offlinePillText: {
    color: '#64748B',
  },
  tradeSub: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  districtBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFFBEB',
    borderWidth: 1,
    borderColor: '#FEF3C7',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    marginTop: 12,
  },
  districtBannerText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#92400E',
    flex: 1,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  metricItem: {
    flex: 1,
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
  },
  metricVal: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
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
    backgroundColor: '#E2E8F0',
  },
  filterScroll: {
    marginBottom: 14,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
  },
  filterChipActive: {
    backgroundColor: '#0F172A',
    borderColor: '#0F172A',
  },
  filterChipUrgent: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FEE2E2',
  },
  filterText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  urgentFilterText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#DC2626',
  },
  countBadge: {
    backgroundColor: '#E2E8F0',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 10,
  },
  countBadgeActive: {
    backgroundColor: '#334155',
  },
  countText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#334155',
  },
  countTextActive: {
    color: '#FFFFFF',
  },
  urgentCountBadge: {
    backgroundColor: '#FCA5A5',
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
    color: '#0F172A',
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
    backgroundColor: '#F59E0B',
  },
  liveAutoText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#64748B',
  },
  jobCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  urgentCardBorder: {
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  scheduledCardBorder: {
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
  },
  societyCardBorder: {
    borderLeftWidth: 4,
    borderLeftColor: '#B45309',
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
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  urgentTagText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#DC2626',
    letterSpacing: 0.3,
  },
  urgentPriceText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#EA580C',
  },
  scheduledTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  scheduledTagText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#2563EB',
  },
  societyTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  societyTagText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#92400E',
  },
  priceColumn: {
    alignItems: 'flex-end',
  },
  fixedPriceText: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
  },
  fixedRateLabel: {
    fontSize: 10,
    color: '#059669',
    fontWeight: '600',
  },
  jobTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
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
    color: '#475569',
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
    color: '#64748B',
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
    backgroundColor: '#E2E8F0',
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
    backgroundColor: 'rgba(0,0,0,0.65)',
    paddingVertical: 4,
    alignItems: 'center',
  },
  photoLabelText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  quoteOfferBox: {
    backgroundColor: '#EFF6FF',
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
    color: '#1E293B',
  },
  quoteOfferSub: {
    fontSize: 10,
    color: '#D97706',
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
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    paddingHorizontal: 8,
    height: 38,
  },
  quoteCurrency: {
    fontSize: 14,
    fontWeight: '700',
    color: '#64748B',
    marginRight: 4,
  },
  quoteTextInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  quickAddChip: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickAddText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#334155',
  },
  instantAcceptBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#EA580C',
    paddingVertical: 12,
    borderRadius: 10,
    shadowColor: '#EA580C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  instantAcceptBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  toolRequirementBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#EFF6FF',
    padding: 8,
    borderRadius: 8,
    marginBottom: 12,
  },
  toolRequirementText: {
    fontSize: 11,
    color: '#1E3A8A',
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
    backgroundColor: '#F1F5F9',
    paddingVertical: 10,
    borderRadius: 8,
  },
  viewDetailsBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#334155',
  },
  acceptJobBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    backgroundColor: '#0F172A',
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
    backgroundColor: '#ECFDF5',
    padding: 8,
    borderRadius: 8,
    marginBottom: 12,
  },
  clearanceText: {
    fontSize: 11,
    color: '#065F46',
    fontWeight: '600',
    flex: 1,
  },
  sendQuoteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    paddingVertical: 10,
    borderRadius: 8,
  },
  sendQuoteBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1E40AF',
  },
  lockNoticeCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    backgroundColor: '#EFF6FF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#DBEAFE',
    marginTop: 6,
  },
  lockIconBox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lockTextBox: {
    flex: 1,
  },
  lockTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 2,
  },
  lockDesc: {
    fontSize: 11,
    color: '#475569',
    lineHeight: 15,
  },
  fairWagePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#ECFDF5',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginTop: 8,
  },
  fairWageText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#047857',
  },
});
