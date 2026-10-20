import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { usePartner } from '@/context/PartnerContext';
import WithdrawModal from '@/components/modals/WithdrawModal';

const WEEKLY_DATA = [
  { day: 'Mon', amount: 450, isPeak: false },
  { day: 'Tue', amount: 1420, isPeak: true },
  { day: 'Wed', amount: 320, isPeak: false },
  { day: 'Thu', amount: 510, isPeak: false },
  { day: 'Fri', amount: 700, isPeak: false },
  { day: 'Sat', amount: 1850, isPeak: true, isMax: true },
  { day: 'Sun', amount: 550, isPeak: false },
];

export default function EarningsScreen() {
  const { walletBalance, thisWeekEarnings, avgPerJob, bonusEarned, settlements } = usePartner();
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState<string>('Sat');

  const maxAmount = 1850;

  return (
    <View style={styles.screenWrapper}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {/* FINANCIAL OVERVIEW HEADER */}
        <View style={styles.overviewHeaderRow}>
          <View>
            <Text style={styles.overviewSmall}>FINANCIAL OVERVIEW</Text>
            <Text style={styles.overviewTitle}>Earnings & Wallet</Text>
          </View>
          <View style={styles.instantPill}>
            <View style={styles.instantDot} />
            <Text style={styles.instantPillText}>Instant T+0 Active</Text>
          </View>
        </View>

        {/* AVAILABLE FOR WITHDRAWAL CARD */}
        <View style={styles.withdrawalCard}>
          <View style={styles.withdrawableHeader}>
            <View style={styles.withdrawableLabelRow}>
              <Ionicons name="card-outline" size={16} color="#854D0E" />
              <Text style={styles.withdrawableLabel}>Available for Withdrawal</Text>
            </View>
            <Pressable
              onPress={() => Alert.alert('Balance Synced', 'Wallet balance is synced with banking nodes.')}
              style={styles.refreshIconBtn}>
              <Ionicons name="sync" size={16} color="#3B82F6" />
            </Pressable>
          </View>

          <View style={styles.balanceAmountRow}>
            <Text style={styles.balanceAmount}>₹{walletBalance.toLocaleString()}</Text>
            <View style={styles.readyBadge}>
              <Text style={styles.readyBadgeText}>Ready Now</Text>
            </View>
          </View>

          {/* Linked Bank Container */}
          <View style={styles.bankContainer}>
            <View style={styles.bankIconCircle}>
              <MaterialCommunityIcons name="bank" size={18} color="#FFFFFF" />
            </View>
            <View style={styles.bankTextCol}>
              <Text style={styles.bankName}>State Bank of India</Text>
              <Text style={styles.bankEnding}>Ending in 4091</Text>
            </View>
            <View style={styles.verifiedTag}>
              <Ionicons name="checkmark-circle-outline" size={12} color="#059669" />
              <Text style={styles.verifiedTagText}>Verified</Text>
            </View>
          </View>

          {/* Instant Transfer CTA Button */}
          <Pressable
            onPress={() => setShowWithdrawModal(true)}
            style={styles.transferButton}>
            <Ionicons name="flash" size={16} color="#0F172A" />
            <Text style={styles.transferButtonText}>Instant Bank Transfer / UPI</Text>
          </Pressable>

          <Text style={styles.transferSubtext}>
            Zero fee • Dispatches within 90 seconds via IMPS
          </Text>
        </View>

        {/* 2-COLUMN STATS ROW */}
        <View style={styles.statsRow}>
          {/* Card 1: This Week */}
          <View style={styles.statCard}>
            <View style={styles.statHeader}>
              <Text style={styles.statLabel}>This Week</Text>
              <Ionicons name="calendar-outline" size={14} color="#3B82F6" />
            </View>
            <Text style={styles.statValue}>₹{thisWeekEarnings.toLocaleString()}</Text>
            <Text style={styles.statSub}>18 Jobs completed</Text>
          </View>

          {/* Card 2: Avg. per Job */}
          <View style={styles.statCard}>
            <View style={styles.statHeader}>
              <Text style={styles.statLabel}>Avg. per Job</Text>
              <Ionicons name="trending-up" size={14} color="#3B82F6" />
            </View>
            <Text style={styles.statValue}>₹{avgPerJob}</Text>
            <Text style={styles.statSubGreen}>+12% vs last week</Text>
          </View>
        </View>

        {/* DISTRICT TOP PERFORMER BONUS BANNER */}
        <View style={styles.bonusBanner}>
          <View style={styles.bonusLeftAccent} />
          <View style={styles.medalCircle}>
            <Ionicons name="trophy" size={20} color="#D97706" />
          </View>
          <View style={styles.bonusTexts}>
            <View style={styles.bonusHeaderRow}>
              <Text style={styles.bonusDistrict}>MUZAFFARPUR CENTRAL</Text>
              <View style={styles.bonusAmountTag}>
                <Text style={styles.bonusAmountText}>+₹{bonusEarned}</Text>
              </View>
            </View>
            <Text style={styles.bonusTitle}>District Top-Performer Bonus Earned</Text>
            <Text style={styles.bonusSub}>
              Credited to this payout cycle • Rank #3 in zone
            </Text>
          </View>
        </View>

        {/* WEEKLY TREND BAR CHART CARD */}
        <View style={styles.chartCard}>
          <View style={styles.chartHeaderRow}>
            <Text style={styles.chartTitle}>Weekly Trend</Text>
            <View style={styles.daysBadge}>
              <Text style={styles.daysBadgeText}>7 Days</Text>
            </View>
          </View>
          <Text style={styles.chartSubtitle}>
            Peaks on Tuesday (₹1,420) & Saturday (₹1,850)
          </Text>

          {/* Bar Chart Bars */}
          <View style={styles.barsContainer}>
            {WEEKLY_DATA.map((item) => {
              const heightPct = Math.max(18, (item.amount / maxAmount) * 110);
              const isSelected = selectedDay === item.day;

              return (
                <Pressable
                  key={item.day}
                  onPress={() => setSelectedDay(item.day)}
                  style={styles.barColumn}>
                  {/* Peak top dot indicator on Tue */}
                  {item.day === 'Tue' && <View style={styles.peakDotIndicator} />}

                  <View
                    style={[
                      styles.barTrack,
                      { height: heightPct },
                      item.day === 'Tue' && styles.barPeakOrange,
                      item.day === 'Sat' && styles.barSaturdayNavy,
                      isSelected && styles.barSelectedHighlight,
                    ]}>
                    {/* Saturday top cap in orange */}
                    {item.day === 'Sat' && <View style={styles.saturdayCap} />}
                  </View>

                  <Text
                    style={[
                      styles.barDayLabel,
                      isSelected && styles.barDayLabelSelected,
                    ]}>
                    {item.day}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {/* Chart Legend */}
          <View style={styles.legendRow}>
            <View style={styles.legendItem}>
              <View style={styles.legendOrangeDot} />
              <Text style={styles.legendText}>Peak High Days</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={styles.legendNavyDot} />
              <Text style={styles.legendText}>Standard Route Dispatch</Text>
            </View>
          </View>
        </View>

        {/* RECENT JOB SETTLEMENTS */}
        <View style={styles.settlementsSection}>
          <View style={styles.settlementsHeaderRow}>
            <Text style={styles.settlementsTitle}>Recent Job Settlements</Text>
            <Pressable
              onPress={() =>
                Alert.alert('Ledger Export', 'Opening comprehensive audited settlements ledger...')
              }>
              <Text style={styles.viewLedgerLink}>View Ledger</Text>
            </Pressable>
          </View>

          {/* Settlement List */}
          {settlements.map((item) => (
            <View key={item.id} style={styles.settlementItem}>
              <View style={styles.settlementTopRow}>
                <View style={styles.settlementIconCol}>
                  <View
                    style={[
                      styles.settlementIconCircle,
                      item.icon === 'wrench' && styles.iconCircleGreen,
                      item.icon === 'water' && styles.iconCircleBlue,
                      item.icon === 'pump' && styles.iconCircleNavy,
                    ]}>
                    {item.icon === 'wrench' && (
                      <MaterialCommunityIcons name="wrench" size={16} color="#059669" />
                    )}
                    {item.icon === 'water' && (
                      <MaterialCommunityIcons name="water-pump" size={16} color="#2563EB" />
                    )}
                    {item.icon === 'pump' && (
                      <Ionicons name="water" size={16} color="#0284C7" />
                    )}
                  </View>
                </View>

                <View style={styles.settlementDetails}>
                  <View style={styles.settlementNameRow}>
                    <Text style={styles.settlementJobTitle} numberOfLines={1}>
                      {item.title}
                    </Text>
                    <Text style={styles.settlementAmount}>+₹{item.amount}</Text>
                  </View>

                  <View style={styles.tagTimeRow}>
                    <View style={styles.upiTag}>
                      <Text style={styles.upiTagText}>{item.paymentType}</Text>
                    </View>
                    <Text style={styles.settlementTime}>{item.time}</Text>
                  </View>

                  <Text style={styles.settlementCustomer}>
                    {item.customer} • {item.location}
                  </Text>
                </View>
              </View>

              {/* Settlement Footer */}
              <View style={styles.settlementFooterRow}>
                <View style={styles.receiptRow}>
                  <Ionicons name="receipt-outline" size={12} color="#64748B" />
                  <Text style={styles.receiptNumber}>Receipt #{item.receiptNumber}</Text>
                </View>
                <View style={styles.settledBadge}>
                  <Text style={styles.settledBadgeText}>{item.tag}</Text>
                  <Ionicons name="checkmark-circle-outline" size={12} color="#059669" />
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* LOCALFIX PARTNER GUARANTEE CARD */}
        <View style={styles.guaranteeCard}>
          <View style={styles.guaranteeTop}>
            <View style={styles.guaranteeIconCircle}>
              <Ionicons name="shield-checkmark" size={18} color="#D97706" />
            </View>
            <Text style={styles.guaranteeHeading}>LocalFix Partner Guarantee</Text>
          </View>
          <Text style={styles.guaranteeBody}>
            0% deduction on basic labour charges. 100% of customer tips and municipal rates go directly to your account.
          </Text>
          <View style={styles.guaranteePillsRow}>
            <View style={styles.pillItem}>
              <Ionicons name="shield-outline" size={12} color="#92400E" />
              <Text style={styles.pillItemText}>Zero Hidden Fees</Text>
            </View>
            <View style={styles.pillItem}>
              <Ionicons name="help-circle-outline" size={12} color="#92400E" />
              <Text style={styles.pillItemText}>Dispute Support</Text>
            </View>
          </View>
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>

      {/* Withdrawal Modal */}
      <WithdrawModal
        visible={showWithdrawModal}
        onClose={() => setShowWithdrawModal(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screenWrapper: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  overviewHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  overviewSmall: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748B',
    letterSpacing: 0.5,
  },
  overviewTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 1,
  },
  instantPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 16,
  },
  instantDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#F59E0B',
  },
  instantPillText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#2563EB',
  },
  withdrawalCard: {
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
  withdrawableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  withdrawableLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  withdrawableLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  refreshIconBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  balanceAmountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 14,
  },
  balanceAmount: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0F172A',
  },
  readyBadge: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  readyBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#059669',
  },
  bankContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    padding: 10,
    marginBottom: 14,
  },
  bankIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#0F172A',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  bankTextCol: {
    flex: 1,
  },
  bankName: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1E293B',
  },
  bankEnding: {
    fontSize: 11,
    color: '#64748B',
  },
  verifiedTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  verifiedTagText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#059669',
  },
  transferButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#F59E0B',
    paddingVertical: 12,
    borderRadius: 10,
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  transferButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  transferSubtext: {
    fontSize: 11,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 8,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 14,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 2,
  },
  statSub: {
    fontSize: 11,
    color: '#64748B',
  },
  statSubGreen: {
    fontSize: 11,
    color: '#059669',
    fontWeight: '600',
  },
  bonusBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    position: 'relative',
    overflow: 'hidden',
    marginBottom: 14,
  },
  bonusLeftAccent: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: '#F59E0B',
  },
  medalCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginLeft: 4,
  },
  bonusTexts: {
    flex: 1,
  },
  bonusHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  bonusDistrict: {
    fontSize: 10,
    fontWeight: '800',
    color: '#92400E',
    letterSpacing: 0.3,
  },
  bonusAmountTag: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4,
  },
  bonusAmountText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#B45309',
  },
  bonusTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  bonusSub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 1,
  },
  chartCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 14,
  },
  chartHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chartTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  daysBadge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  daysBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#2563EB',
  },
  chartSubtitle: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
    marginBottom: 16,
  },
  barsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 120,
    paddingHorizontal: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    paddingBottom: 8,
  },
  barColumn: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
    position: 'relative',
  },
  peakDotIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#F59E0B',
    marginBottom: 4,
  },
  barTrack: {
    width: 22,
    backgroundColor: '#CBD5E1',
    borderRadius: 6,
    overflow: 'hidden',
  },
  barPeakOrange: {
    backgroundColor: '#F59E0B',
  },
  barSaturdayNavy: {
    backgroundColor: '#0F172A',
  },
  saturdayCap: {
    height: 8,
    backgroundColor: '#F59E0B',
  },
  barSelectedHighlight: {
    borderWidth: 1.5,
    borderColor: '#3B82F6',
  },
  barDayLabel: {
    fontSize: 10,
    color: '#64748B',
    marginTop: 6,
    fontWeight: '500',
  },
  barDayLabelSelected: {
    fontWeight: '700',
    color: '#0F172A',
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginTop: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  legendOrangeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#F59E0B',
  },
  legendNavyDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#0F172A',
  },
  legendText: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '500',
  },
  settlementsSection: {
    marginBottom: 14,
  },
  settlementsHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  settlementsTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  viewLedgerLink: {
    fontSize: 12,
    fontWeight: '700',
    color: '#B45309',
  },
  settlementItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 10,
  },
  settlementTopRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 8,
  },
  settlementIconCol: {
    justifyContent: 'flex-start',
  },
  settlementIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCircleGreen: {
    backgroundColor: '#ECFDF5',
  },
  iconCircleBlue: {
    backgroundColor: '#EFF6FF',
  },
  iconCircleNavy: {
    backgroundColor: '#E0F2FE',
  },
  settlementDetails: {
    flex: 1,
  },
  settlementNameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settlementJobTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
    flex: 1,
    paddingRight: 6,
  },
  settlementAmount: {
    fontSize: 15,
    fontWeight: '800',
    color: '#059669',
  },
  tagTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 2,
    marginBottom: 2,
  },
  upiTag: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4,
  },
  upiTagText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#065F46',
  },
  settlementTime: {
    fontSize: 11,
    color: '#64748B',
  },
  settlementCustomer: {
    fontSize: 11,
    color: '#475569',
  },
  settlementFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F8FAFC',
  },
  receiptRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  receiptNumber: {
    fontSize: 10,
    color: '#64748B',
  },
  settledBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  settledBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#059669',
  },
  guaranteeCard: {
    backgroundColor: '#EFF6FF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  guaranteeTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  guaranteeIconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  guaranteeHeading: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  guaranteeBody: {
    fontSize: 11,
    color: '#475569',
    lineHeight: 16,
    marginBottom: 10,
  },
  guaranteePillsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  pillItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  pillItemText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#92400E',
  },
});
