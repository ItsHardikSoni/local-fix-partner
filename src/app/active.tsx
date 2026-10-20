import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  Alert,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { usePartner } from '@/context/PartnerContext';
import { Palette } from '@/constants/theme';
import AddMaterialModal from '@/components/modals/AddMaterialModal';
import SignOffModal from '@/components/modals/SignOffModal';

export default function ActiveJobScreen() {
  const { activeTicket, setCallingCustomer } = usePartner();
  const [showAddMaterial, setShowAddMaterial] = useState(false);
  const [showSignOff, setShowSignOff] = useState(false);

  // Format execution clock (HH:MM:SS)
  const formatTimer = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const mins = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
  };

  const totalExtra = activeTicket.extraMaterials.reduce((acc, m) => acc + m.cost, 0);
  const totalAmount = activeTicket.labourCost + totalExtra;
  const completedCount = activeTicket.status === 'COMPLETED' ? 5 : 3;

  return (
    <View style={styles.screenWrapper}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {/* TICKET TOP CARD */}
        <View style={styles.ticketCard}>
          <View style={styles.ticketHeaderRow}>
            <View style={styles.ticketInfoRow}>
              <Text style={styles.ticketNumber}>{activeTicket.id}</Text>
              <Text style={styles.dotSeparator}>•</Text>
              <Text style={styles.ticketCategory}>{activeTicket.category}</Text>
            </View>

            <View
              style={[
                styles.statusPill,
                activeTicket.status === 'COMPLETED' && styles.completedPill,
              ]}>
              <View
                style={[
                  styles.statusPillDot,
                  activeTicket.status === 'COMPLETED' && styles.completedPillDot,
                ]}
              />
              <Text
                style={[
                  styles.statusPillText,
                  activeTicket.status === 'COMPLETED' && styles.completedPillText,
                ]}>
                {activeTicket.status === 'COMPLETED' ? 'COMPLETED' : 'IN PROGRESS'}
              </Text>
            </View>
          </View>

          {/* Customer info & avatar */}
          <View style={styles.customerInfoRow}>
            <View style={styles.customerTexts}>
              <View style={styles.customerNameVerified}>
                <Text style={styles.customerName}>{activeTicket.customerName}</Text>
                <Ionicons name="checkmark-circle" size={15} color={Palette.success} />
              </View>
              <View style={styles.addressRow}>
                <MaterialCommunityIcons name="office-building" size={14} color={Palette.textSecondary} />
                <Text style={styles.addressText} numberOfLines={1}>
                  {activeTicket.customerAddress}
                </Text>
              </View>
            </View>
            <Image
              source={{ uri: activeTicket.customerAvatar }}
              style={styles.customerAvatar}
            />
          </View>

          {/* Action buttons (Call & Map) */}
          <View style={styles.ticketActionsRow}>
            <Pressable
              onPress={() => setCallingCustomer(true)}
              style={styles.callButton}>
              <Ionicons name="call-outline" size={16} color={Palette.primary} />
              <Text style={styles.callButtonText}>Call {activeTicket.customerName.split(' ')[0]}</Text>
            </Pressable>

            <Pressable
              onPress={() =>
                Alert.alert(
                  'Directions',
                  'Navigating to ABC Heights, Flat A-204, Mithanpura. Estimated arrival: 3 min (0.4 km away).'
                )
              }
              style={styles.mapButton}>
              <Ionicons name="navigate-outline" size={16} color={Palette.secondary} />
              <Text style={styles.mapButtonText}>Open Map (3 min)</Text>
            </Pressable>
          </View>
        </View>

        {/* PHYSICAL PRESENCE CHECK CARD */}
        <View style={styles.presenceCard}>
          <View style={styles.presenceLeft}>
            <View style={styles.keyIconCircle}>
              <Ionicons name="key" size={16} color={Palette.secondary} />
            </View>
            <View>
              <Text style={styles.presenceLabel}>PHYSICAL PRESENCE CHECK</Text>
              <View style={styles.pinRow}>
                <Text style={styles.pinCode}>{activeTicket.pin}</Text>
                <View style={styles.pinVerifiedBadge}>
                  <Text style={styles.pinVerifiedText}>PIN Verified</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.verifiedCheckCircle}>
            <Ionicons name="checkmark-circle-outline" size={24} color={Palette.success} />
          </View>
        </View>

        {/* WORK EXECUTION CLOCK CARD */}
        <View style={styles.clockCard}>
          <View style={styles.clockLeft}>
            <View style={styles.stopwatchIconCircle}>
              <Ionicons name="stopwatch-outline" size={20} color={Palette.secondary} />
            </View>
            <View>
              <Text style={styles.clockLabel}>Work Execution Clock</Text>
              <Text style={styles.clockTime}>{formatTimer(activeTicket.executionSeconds)}</Text>
            </View>
          </View>
          <View style={styles.clockRight}>
            <Text style={styles.windowLabel}>Scheduled Window</Text>
            <Text style={styles.windowTime}>{activeTicket.scheduledWindow}</Text>
          </View>
        </View>

        {/* JOB PROGRESS CHECKLIST CARD */}
        <View style={styles.checklistCard}>
          <View style={styles.checklistHeader}>
            <Text style={styles.checklistTitle}>Job Progress Checklist</Text>
            <View style={styles.progressBadge}>
              <Text style={styles.progressBadgeText}>{completedCount} of 5 Complete</Text>
            </View>
          </View>

          {/* Checklist Items */}
          <View style={styles.checklistTimeline}>
            {/* Step 1: Dispatched */}
            <View style={styles.timelineRow}>
              <View style={styles.timelineIconCol}>
                <View style={styles.stepCircleDone}>
                  <Ionicons name="checkmark" size={14} color="#FFFFFF" />
                </View>
                <View style={styles.timelineLine} />
              </View>
              <View style={styles.timelineContent}>
                <View style={styles.stepTitleRow}>
                  <Text style={styles.stepTitle}>Dispatched to Location</Text>
                  <Text style={styles.stepTime}>09:30 AM</Text>
                </View>
                <Text style={styles.stepDesc}>Confirmed route from Mithanpura workshop</Text>
              </View>
            </View>

            {/* Step 2: Arrived */}
            <View style={styles.timelineRow}>
              <View style={styles.timelineIconCol}>
                <View style={styles.stepCircleDone}>
                  <Ionicons name="checkmark" size={14} color="#FFFFFF" />
                </View>
                <View style={styles.timelineLine} />
              </View>
              <View style={styles.timelineContent}>
                <View style={styles.stepTitleRow}>
                  <Text style={styles.stepTitle}>Arrived & Resident Handshake</Text>
                  <Text style={styles.stepTime}>09:48 AM</Text>
                </View>
                <Text style={styles.stepDesc}>Society gate entry approved, OTP confirmed</Text>
              </View>
            </View>

            {/* Step 3: Kitchen Sink Pipe Replacement */}
            <View style={styles.timelineRow}>
              <View style={styles.timelineIconCol}>
                <View style={styles.stepCircleActive}>
                  <MaterialCommunityIcons name="wrench" size={14} color="#FFFFFF" />
                </View>
                <View style={styles.timelineLine} />
              </View>
              <View style={styles.timelineContent}>
                <View style={styles.stepTitleRow}>
                  <Text style={styles.stepTitle}>Kitchen Sink Pipe Replacement</Text>
                  <Text style={styles.stepTimeOngoing}>10:00 AM (Ongoing)</Text>
                </View>
                <Text style={styles.stepDesc}>P-trap disassembled, main inlet valve sealed</Text>

                {/* Photo thumbnail attachment */}
                <View style={styles.thumbBox}>
                  <Image
                    source={{
                      uri: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=200&q=80',
                    }}
                    style={styles.thumbImg}
                  />
                  <Text style={styles.thumbCaption}>
                    Initial leak diagnostic photo recorded.
                  </Text>
                </View>
              </View>
            </View>

            {/* Step 4: Extra Materials & Consumables */}
            <View style={styles.timelineRow}>
              <View style={styles.timelineIconCol}>
                <View style={styles.stepCircleBox}>
                  <MaterialCommunityIcons name="cube-outline" size={14} color={Palette.textSecondary} />
                </View>
                <View style={styles.timelineLine} />
              </View>
              <View style={styles.timelineContent}>
                <View style={styles.stepTitleRow}>
                  <Text style={styles.stepTitle}>Extra Materials & Consumables</Text>
                  <Text style={styles.stepCount}>
                    {activeTicket.extraMaterials.length} Item Added
                  </Text>
                </View>

                {/* List of added materials */}
                {activeTicket.extraMaterials.map((mat) => (
                  <View key={mat.id} style={styles.materialRow}>
                    <Ionicons name="pencil" size={12} color={Palette.secondary} />
                    <Text style={styles.materialName} numberOfLines={1}>
                      {mat.name}
                    </Text>
                    <Text style={styles.materialPrice}>₹{mat.cost}</Text>
                  </View>
                ))}

                {/* Add Extra Part Button */}
                <Pressable
                  onPress={() => setShowAddMaterial(true)}
                  style={styles.addPartBtn}>
                  <Ionicons name="add-circle-outline" size={16} color={Palette.infoText} />
                  <Text style={styles.addPartBtnText}>Add Extra Part / Material</Text>
                </Pressable>
              </View>
            </View>

            {/* Step 5: Inspection & Resident Sign-off */}
            <View style={styles.timelineRow}>
              <View style={styles.timelineIconCol}>
                <View
                  style={[
                    styles.stepCirclePending,
                    activeTicket.status === 'COMPLETED' && styles.stepCircleDone,
                  ]}>
                  <Ionicons
                    name={activeTicket.status === 'COMPLETED' ? 'checkmark' : 'ellipse-outline'}
                    size={14}
                    color={activeTicket.status === 'COMPLETED' ? '#FFFFFF' : Palette.textSecondary}
                  />
                </View>
              </View>
              <View style={styles.timelineContent}>
                <View style={styles.stepTitleRow}>
                  <Text style={styles.stepTitle}>Inspection & Resident Sign-off</Text>
                  <Text style={styles.stepPendingText}>
                    {activeTicket.status === 'COMPLETED' ? 'Completed' : 'Pending'}
                  </Text>
                </View>
                <Text style={styles.stepDesc}>
                  High-pressure water flow test & resident digital signature
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* ON-SITE DISPATCH MAP CARD */}
        <View style={styles.mapCard}>
          <View style={styles.mapHeaderRow}>
            <Text style={styles.mapTitle}>On-Site Dispatch Map</Text>
            <View style={styles.liveGpsBadge}>
              <View style={styles.liveGpsDot} />
              <Text style={styles.liveGpsText}>Live GPS</Text>
            </View>
          </View>

          {/* Map Preview Graphic */}
          <View style={styles.mapContainer}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=700&q=80',
              }}
              style={styles.mapGraphic}
            />
            {/* Map Overlay Badge */}
            <View style={styles.mapPinBadge}>
              <Ionicons name="warning-outline" size={14} color={Palette.secondary} />
              <Text style={styles.mapPinText}>ABC Heights • Tower A</Text>
            </View>
          </View>
        </View>

        {/* ESTIMATED BILL SUMMARY CARD */}
        <View style={styles.billCard}>
          <View style={styles.billHeaderRow}>
            <Text style={styles.billTitle}>Estimated Bill Summary</Text>
            <View style={styles.draftBadge}>
              <Text style={styles.draftBadgeText}>Pre-tax Draft</Text>
            </View>
          </View>

          <View style={styles.billItemRow}>
            <Text style={styles.billItemLabel}>Standard Plumbing Service Labour</Text>
            <Text style={styles.billItemValue}>₹{activeTicket.labourCost}.00</Text>
          </View>

          <View style={styles.billItemRow}>
            <View style={styles.extraMaterialLabelRow}>
              <Text style={styles.billItemLabel}>
                Extra Material ({activeTicket.extraMaterials.length} approved item)
              </Text>
              <Ionicons name="information-circle-outline" size={14} color={Palette.textSecondary} />
            </View>
            <Text style={styles.billItemValue}>₹{totalExtra}.00</Text>
          </View>

          <View style={styles.billItemRow}>
            <Text style={styles.billItemLabel}>Platform Partner Convenience Fee</Text>
            <Text style={styles.freeFeeText}>FREE</Text>
          </View>

          <View style={styles.billDivider} />

          <View style={styles.totalRow}>
            <View>
              <Text style={styles.totalDueLabel}>TOTAL AMOUNT DUE</Text>
              <Text style={styles.totalDueVal}>₹{totalAmount}.00</Text>
            </View>

            <View style={styles.upiQrBox}>
              <Ionicons name="qr-code-outline" size={22} color={Palette.primary} />
              <Text style={styles.upiQrText}>Instant UPI QR Ready at finish</Text>
            </View>
          </View>
        </View>

        {/* Bottom CTA & Subtext */}
        <Pressable
          onPress={() => setShowSignOff(true)}
          style={[
            styles.signOffBtn,
            activeTicket.status === 'COMPLETED' && styles.signOffBtnCompleted,
          ]}>
          <Ionicons
            name={activeTicket.status === 'COMPLETED' ? 'checkmark-done' : 'clipboard-outline'}
            size={18}
            color={Palette.primary}
          />
          <Text style={styles.signOffBtnText}>
            {activeTicket.status === 'COMPLETED'
              ? 'Job Completed & Settled'
              : 'Mark Completed & Request Resident Sign-Off'}
          </Text>
        </Pressable>

        <View style={styles.subtextRow}>
          <Ionicons name="shield-checkmark-outline" size={13} color={Palette.success} />
          <Text style={styles.subtextNote}>
            Resident OTP / digital touch approval required on completion
          </Text>
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>

      {/* Add Material Modal */}
      <AddMaterialModal
        visible={showAddMaterial}
        onClose={() => setShowAddMaterial(false)}
      />

      {/* Resident Sign Off Modal */}
      <SignOffModal
        visible={showSignOff}
        onClose={() => setShowSignOff(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screenWrapper: {
    flex: 1,
    backgroundColor: Palette.background,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  ticketCard: {
    backgroundColor: Palette.surface,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: Palette.border,
    borderLeftWidth: 4,
    borderLeftColor: Palette.secondary,
    marginBottom: 12,
    shadowColor: Palette.primary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  ticketHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  ticketInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  ticketNumber: {
    fontSize: 14,
    fontWeight: '800',
    color: Palette.primary,
  },
  dotSeparator: {
    color: Palette.textSecondary,
  },
  ticketCategory: {
    fontSize: 13,
    color: Palette.textSecondary,
    fontWeight: '500',
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: Palette.warningBg,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  completedPill: {
    backgroundColor: Palette.successBg,
  },
  statusPillDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Palette.secondary,
  },
  completedPillDot: {
    backgroundColor: Palette.success,
  },
  statusPillText: {
    fontSize: 10,
    fontWeight: '800',
    color: Palette.warningText,
    letterSpacing: 0.2,
  },
  completedPillText: {
    color: Palette.successText,
  },
  customerInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  customerTexts: {
    flex: 1,
    paddingRight: 10,
  },
  customerNameVerified: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 3,
  },
  customerName: {
    fontSize: 16,
    fontWeight: '700',
    color: Palette.primary,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  addressText: {
    fontSize: 11,
    color: Palette.textSecondary,
    flex: 1,
  },
  customerAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: Palette.border,
  },
  ticketActionsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  callButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: Palette.infoBg,
    paddingVertical: 9,
    borderRadius: 8,
  },
  callButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: Palette.primary,
  },
  mapButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: Palette.warningBg,
    borderWidth: 1,
    borderColor: Palette.warningBorder,
    paddingVertical: 9,
    borderRadius: 8,
  },
  mapButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: Palette.warningText,
  },
  presenceCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Palette.infoBg,
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Palette.infoBorder,
  },
  presenceLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  keyIconCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: Palette.warningBorder,
    justifyContent: 'center',
    alignItems: 'center',
  },
  presenceLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: Palette.textSecondary,
    letterSpacing: 0.5,
  },
  pinRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
  },
  pinCode: {
    fontSize: 18,
    fontWeight: '800',
    color: Palette.primary,
    letterSpacing: 2,
  },
  pinVerifiedBadge: {
    backgroundColor: Palette.infoBorder,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  pinVerifiedText: {
    fontSize: 9,
    fontWeight: '700',
    color: Palette.infoText,
  },
  verifiedCheckCircle: {
    paddingRight: 4,
  },
  clockCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Palette.primary,
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
  },
  clockLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  stopwatchIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#142542',
    justifyContent: 'center',
    alignItems: 'center',
  },
  clockLabel: {
    fontSize: 10,
    color: '#94A3B8',
    fontWeight: '500',
  },
  clockTime: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    fontFamily: 'monospace',
    marginTop: 2,
  },
  clockRight: {
    alignItems: 'flex-end',
  },
  windowLabel: {
    fontSize: 10,
    color: '#94A3B8',
  },
  windowTime: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 2,
  },
  checklistCard: {
    backgroundColor: Palette.surface,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: Palette.border,
    marginBottom: 12,
  },
  checklistHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  checklistTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Palette.primary,
  },
  progressBadge: {
    backgroundColor: Palette.warningBg,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  progressBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: Palette.warningText,
  },
  checklistTimeline: {},
  timelineRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 14,
  },
  timelineIconCol: {
    alignItems: 'center',
    width: 22,
  },
  stepCircleDone: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: Palette.success,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepCircleActive: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: Palette.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepCircleBox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: Palette.borderLight,
    borderWidth: 1,
    borderColor: Palette.borderDark,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepCirclePending: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: Palette.background,
    borderWidth: 1.5,
    borderColor: Palette.borderDark,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timelineLine: {
    width: 1.5,
    flex: 1,
    backgroundColor: Palette.border,
    marginVertical: 4,
  },
  timelineContent: {
    flex: 1,
    paddingBottom: 4,
  },
  stepTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  stepTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: Palette.primary,
  },
  stepTime: {
    fontSize: 11,
    color: Palette.textSecondary,
    fontWeight: '500',
  },
  stepTimeOngoing: {
    fontSize: 11,
    color: Palette.secondary,
    fontWeight: '700',
  },
  stepCount: {
    fontSize: 11,
    color: Palette.textSecondary,
  },
  stepPendingText: {
    fontSize: 11,
    color: Palette.textSecondary,
  },
  stepDesc: {
    fontSize: 11,
    color: Palette.textSecondary,
    lineHeight: 15,
  },
  thumbBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Palette.background,
    padding: 6,
    borderRadius: 8,
    marginTop: 8,
    borderWidth: 1,
    borderColor: Palette.border,
  },
  thumbImg: {
    width: 44,
    height: 44,
    borderRadius: 6,
  },
  thumbCaption: {
    fontSize: 11,
    color: Palette.primary,
    flex: 1,
  },
  materialRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Palette.background,
    borderWidth: 1,
    borderColor: Palette.border,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
    marginTop: 6,
  },
  materialName: {
    fontSize: 12,
    color: Palette.primary,
    fontWeight: '500',
    flex: 1,
  },
  materialPrice: {
    fontSize: 12,
    fontWeight: '700',
    color: Palette.primary,
  },
  addPartBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: Palette.infoBg,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 8,
  },
  addPartBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: Palette.infoText,
  },
  mapCard: {
    backgroundColor: Palette.surface,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: Palette.border,
    marginBottom: 12,
  },
  mapHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  mapTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Palette.primary,
  },
  liveGpsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  liveGpsDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Palette.success,
  },
  liveGpsText: {
    fontSize: 11,
    color: Palette.successText,
    fontWeight: '600',
  },
  mapContainer: {
    height: 120,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: Palette.border,
  },
  mapGraphic: {
    width: '100%',
    height: '100%',
  },
  mapPinBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: Palette.surface,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    shadowColor: Palette.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  mapPinText: {
    fontSize: 11,
    fontWeight: '700',
    color: Palette.primary,
  },
  billCard: {
    backgroundColor: Palette.surface,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: Palette.border,
    marginBottom: 14,
  },
  billHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  billTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Palette.primary,
  },
  draftBadge: {
    backgroundColor: Palette.infoBg,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  draftBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: Palette.info,
  },
  billItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  billItemLabel: {
    fontSize: 12,
    color: Palette.textSecondary,
  },
  extraMaterialLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  billItemValue: {
    fontSize: 13,
    fontWeight: '600',
    color: Palette.primary,
  },
  freeFeeText: {
    fontSize: 12,
    fontWeight: '800',
    color: Palette.success,
  },
  billDivider: {
    height: 1,
    backgroundColor: Palette.borderLight,
    marginVertical: 10,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalDueLabel: {
    fontSize: 10,
    color: Palette.textSecondary,
    fontWeight: '700',
  },
  totalDueVal: {
    fontSize: 22,
    fontWeight: '800',
    color: Palette.primary,
    marginTop: 2,
  },
  upiQrBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Palette.background,
    borderWidth: 1,
    borderColor: Palette.border,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  upiQrText: {
    fontSize: 10,
    fontWeight: '600',
    color: Palette.primary,
    maxWidth: 90,
  },
  signOffBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Palette.secondary,
    paddingVertical: 14,
    borderRadius: 12,
    shadowColor: Palette.secondary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 3,
  },
  signOffBtnCompleted: {
    backgroundColor: Palette.success,
  },
  signOffBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: Palette.primary,
  },
  subtextRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    marginTop: 8,
  },
  subtextNote: {
    fontSize: 11,
    color: Palette.textSecondary,
  },
});
