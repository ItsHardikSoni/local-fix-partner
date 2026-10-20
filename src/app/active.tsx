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
                <Ionicons name="checkmark-circle" size={15} color="#10B981" />
              </View>
              <View style={styles.addressRow}>
                <MaterialCommunityIcons name="office-building" size={14} color="#64748B" />
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
              <Ionicons name="call-outline" size={16} color="#1E293B" />
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
              <Ionicons name="navigate-outline" size={16} color="#EA580C" />
              <Text style={styles.mapButtonText}>Open Map (3 min)</Text>
            </Pressable>
          </View>
        </View>

        {/* PHYSICAL PRESENCE CHECK CARD */}
        <View style={styles.presenceCard}>
          <View style={styles.presenceLeft}>
            <View style={styles.keyIconCircle}>
              <Ionicons name="key" size={16} color="#D97706" />
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
            <Ionicons name="checkmark-circle-outline" size={24} color="#059669" />
          </View>
        </View>

        {/* WORK EXECUTION CLOCK CARD */}
        <View style={styles.clockCard}>
          <View style={styles.clockLeft}>
            <View style={styles.stopwatchIconCircle}>
              <Ionicons name="stopwatch-outline" size={20} color="#F59E0B" />
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
                  <MaterialCommunityIcons name="cube-outline" size={14} color="#475569" />
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
                    <Ionicons name="pencil" size={12} color="#D97706" />
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
                  <Ionicons name="add-circle-outline" size={16} color="#1E3A8A" />
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
                    color={activeTicket.status === 'COMPLETED' ? '#FFFFFF' : '#94A3B8'}
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
              <Ionicons name="warning-outline" size={14} color="#D97706" />
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
              <Ionicons name="information-circle-outline" size={14} color="#64748B" />
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
              <Ionicons name="qr-code-outline" size={22} color="#1E293B" />
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
            color="#FFFFFF"
          />
          <Text style={styles.signOffBtnText}>
            {activeTicket.status === 'COMPLETED'
              ? 'Job Completed & Settled'
              : 'Mark Completed & Request Resident Sign-Off'}
          </Text>
        </Pressable>

        <View style={styles.subtextRow}>
          <Ionicons name="shield-checkmark-outline" size={13} color="#059669" />
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
    backgroundColor: '#F8FAFC',
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  ticketCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
    marginBottom: 12,
    shadowColor: '#000',
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
    color: '#0F172A',
  },
  dotSeparator: {
    color: '#94A3B8',
  },
  ticketCategory: {
    fontSize: 13,
    color: '#475569',
    fontWeight: '500',
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  completedPill: {
    backgroundColor: '#ECFDF5',
  },
  statusPillDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#D97706',
  },
  completedPillDot: {
    backgroundColor: '#059669',
  },
  statusPillText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#B45309',
    letterSpacing: 0.2,
  },
  completedPillText: {
    color: '#065F46',
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
    color: '#0F172A',
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  addressText: {
    fontSize: 11,
    color: '#64748B',
    flex: 1,
  },
  customerAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
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
    backgroundColor: '#EFF6FF',
    paddingVertical: 9,
    borderRadius: 8,
  },
  callButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1E293B',
  },
  mapButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#FFF7ED',
    borderWidth: 1,
    borderColor: '#FFEDD5',
    paddingVertical: 9,
    borderRadius: 8,
  },
  mapButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#C2410C',
  },
  presenceCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#DBEAFE',
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
    backgroundColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  presenceLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: '#475569',
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
    color: '#0F172A',
    letterSpacing: 2,
  },
  pinVerifiedBadge: {
    backgroundColor: '#DBEAFE',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  pinVerifiedText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#1E40AF',
  },
  verifiedCheckCircle: {
    paddingRight: 4,
  },
  clockCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0F172A',
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
    backgroundColor: '#1E293B',
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
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
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
    color: '#0F172A',
  },
  progressBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  progressBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#B45309',
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
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepCircleActive: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#F59E0B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepCircleBox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepCirclePending: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timelineLine: {
    width: 1.5,
    flex: 1,
    backgroundColor: '#E2E8F0',
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
    color: '#1E293B',
  },
  stepTime: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
  },
  stepTimeOngoing: {
    fontSize: 11,
    color: '#D97706',
    fontWeight: '700',
  },
  stepCount: {
    fontSize: 11,
    color: '#475569',
  },
  stepPendingText: {
    fontSize: 11,
    color: '#94A3B8',
  },
  stepDesc: {
    fontSize: 11,
    color: '#64748B',
    lineHeight: 15,
  },
  thumbBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#F8FAFC',
    padding: 6,
    borderRadius: 8,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  thumbImg: {
    width: 44,
    height: 44,
    borderRadius: 6,
  },
  thumbCaption: {
    fontSize: 11,
    color: '#475569',
    flex: 1,
  },
  materialRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
    marginTop: 6,
  },
  materialName: {
    fontSize: 12,
    color: '#1E293B',
    fontWeight: '500',
    flex: 1,
  },
  materialPrice: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
  },
  addPartBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#EFF6FF',
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 8,
  },
  addPartBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1E40AF',
  },
  mapCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
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
    color: '#0F172A',
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
    backgroundColor: '#10B981',
  },
  liveGpsText: {
    fontSize: 11,
    color: '#059669',
    fontWeight: '600',
  },
  mapContainer: {
    height: 120,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#E2E8F0',
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
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  mapPinText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0F172A',
  },
  billCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
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
    color: '#0F172A',
  },
  draftBadge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  draftBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#2563EB',
  },
  billItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  billItemLabel: {
    fontSize: 12,
    color: '#475569',
  },
  extraMaterialLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  billItemValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0F172A',
  },
  freeFeeText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#059669',
  },
  billDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 10,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalDueLabel: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '700',
  },
  totalDueVal: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 2,
  },
  upiQrBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  upiQrText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#334155',
    maxWidth: 90,
  },
  signOffBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#F59E0B',
    paddingVertical: 14,
    borderRadius: 12,
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 3,
  },
  signOffBtnCompleted: {
    backgroundColor: '#10B981',
  },
  signOffBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
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
    color: '#475569',
  },
});
