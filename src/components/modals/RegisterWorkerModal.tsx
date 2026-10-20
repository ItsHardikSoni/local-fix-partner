import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TextInput, Pressable, ScrollView } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { usePartner } from '@/context/PartnerContext';

const TRADES = [
  'Plumbing Specialist',
  'Master Electrician',
  'Appliance Repair Tech',
  'Carpenter & Woodworker',
  'Water Purifier & Tank Tech',
];

const WARDS = [
  'Ward 12 (Mithanpura & Club Rd)',
  'Ward 14 (Brahmpura & Zero Mile)',
  'Ward 8 (Aghoria Bazar)',
  'Ward 21 (Bhagwanpur Chowk)',
  'Ward 5 (Kalambagh Road)',
];

export default function RegisterWorkerModal() {
  const { isRegisterModalOpen, setIsRegisterModalOpen, partner, updateProfile } = usePartner();
  const [step, setStep] = useState(1);
  const [name, setName] = useState(partner.name);
  const [phone, setPhone] = useState(partner.phone);
  const [selectedTrade, setSelectedTrade] = useState(partner.trade);
  const [selectedWard, setSelectedWard] = useState(partner.ward);
  const [aadhaar, setAadhaar] = useState('7829 4401 9283');
  const [skillCert, setSkillCert] = useState('NSDC Level 4 Plumber (Cert #2024-984)');
  const [bankAcc, setBankAcc] = useState('State Bank of India - 4091');
  const [upi, setUpi] = useState('rahul.kumar@sbi');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isRegisterModalOpen) return null;

  const handleCompleteRegistration = () => {
    updateProfile({
      name,
      phone,
      trade: selectedTrade,
      ward: selectedWard.split(' ')[0] + ' ' + selectedWard.split(' ')[1],
      kyc: {
        aadhaarVerified: true,
        policeCleared: true,
        skillCertified: true,
        bankLinked: true,
      },
    });
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setIsRegisterModalOpen(false);
      setStep(1);
    }, 1600);
  };

  return (
    <Modal visible={isRegisterModalOpen} transparent animationType="slide">
      <View style={styles.backdrop}>
        <View style={styles.card}>
          {isSuccess ? (
            <View style={styles.successWrapper}>
              <View style={styles.successIcon}>
                <Ionicons name="checkmark-done" size={42} color="#10B981" />
              </View>
              <Text style={styles.successTitle}>Partner Account Activated!</Text>
              <Text style={styles.successSub}>
                Welcome to LocalFix Partner, {name}! Your Muzaffarpur district municipal lock is active and ready to receive dispatches.
              </Text>
            </View>
          ) : (
            <>
              {/* Header */}
              <View style={styles.headerRow}>
                <View>
                  <Text style={styles.title}>Worker Account Hub</Text>
                  <Text style={styles.subtitle}>Register & Connect with Residents in Muzaffarpur</Text>
                </View>
                <Pressable onPress={() => setIsRegisterModalOpen(false)} style={styles.closeBtn}>
                  <Ionicons name="close" size={22} color="#64748B" />
                </Pressable>
              </View>

              {/* Step indicator */}
              <View style={styles.stepsBar}>
                <View style={[styles.stepItem, step >= 1 && styles.stepItemActive]}>
                  <Text style={[styles.stepNum, step >= 1 && styles.stepNumActive]}>1</Text>
                  <Text style={styles.stepText}>Trade & Ward</Text>
                </View>
                <View style={styles.stepLine} />
                <View style={[styles.stepItem, step >= 2 && styles.stepItemActive]}>
                  <Text style={[styles.stepNum, step >= 2 && styles.stepNumActive]}>2</Text>
                  <Text style={styles.stepText}>KYC & Skill</Text>
                </View>
                <View style={styles.stepLine} />
                <View style={[styles.stepItem, step >= 3 && styles.stepItemActive]}>
                  <Text style={[styles.stepNum, step >= 3 && styles.stepNumActive]}>3</Text>
                  <Text style={styles.stepText}>Payout UPI</Text>
                </View>
              </View>

              <ScrollView style={styles.scrollArea}>
                {step === 1 && (
                  <View style={styles.stepContent}>
                    <View style={styles.inputGroup}>
                      <Text style={styles.label}>Full Name (as on Aadhaar)</Text>
                      <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                        placeholder="e.g. Rahul Kumar"
                      />
                    </View>

                    <View style={styles.inputGroup}>
                      <Text style={styles.label}>Mobile Number (OTP linked)</Text>
                      <TextInput
                        style={styles.input}
                        value={phone}
                        onChangeText={setPhone}
                        placeholder="+91 98765 43210"
                        keyboardType="phone-pad"
                      />
                    </View>

                    <Text style={styles.label}>Select Primary Skill / Trade</Text>
                    {TRADES.map((t) => (
                      <Pressable
                        key={t}
                        onPress={() => setSelectedTrade(t)}
                        style={[styles.tradeCard, selectedTrade === t && styles.tradeCardSelected]}>
                        <MaterialCommunityIcons
                          name="wrench"
                          size={18}
                          color={selectedTrade === t ? '#EA580C' : '#64748B'}
                        />
                        <Text style={[styles.tradeCardText, selectedTrade === t && styles.tradeCardTextSelected]}>
                          {t}
                        </Text>
                        {selectedTrade === t && (
                          <Ionicons name="checkmark-circle" size={18} color="#EA580C" />
                        )}
                      </Pressable>
                    ))}

                    <Text style={[styles.label, { marginTop: 14 }]}>Assigned Municipal Ward</Text>
                    {WARDS.map((w) => (
                      <Pressable
                        key={w}
                        onPress={() => setSelectedWard(w)}
                        style={[styles.tradeCard, selectedWard === w && styles.tradeCardSelected]}>
                        <Ionicons
                          name="location"
                          size={18}
                          color={selectedWard === w ? '#EA580C' : '#64748B'}
                        />
                        <Text style={[styles.tradeCardText, selectedWard === w && styles.tradeCardTextSelected]}>
                          {w}
                        </Text>
                        {selectedWard === w && (
                          <Ionicons name="checkmark-circle" size={18} color="#EA580C" />
                        )}
                      </Pressable>
                    ))}
                  </View>
                )}

                {step === 2 && (
                  <View style={styles.stepContent}>
                    <View style={styles.kycNotice}>
                      <Ionicons name="shield-checkmark" size={20} color="#059669" />
                      <Text style={styles.kycNoticeText}>
                        Government & Municipal Verification: Out-of-district technicians are blocked to protect your trade rates.
                      </Text>
                    </View>

                    <View style={styles.inputGroup}>
                      <Text style={styles.label}>12-Digit Aadhaar Number</Text>
                      <TextInput
                        style={styles.input}
                        value={aadhaar}
                        onChangeText={setAadhaar}
                        placeholder="XXXX XXXX XXXX"
                      />
                      <Text style={styles.inputSub}>✓ Biometric OTP verified with UIDAI</Text>
                    </View>

                    <View style={styles.inputGroup}>
                      <Text style={styles.label}>Trade Skill Certification / Experience</Text>
                      <TextInput
                        style={styles.input}
                        value={skillCert}
                        onChangeText={setSkillCert}
                        placeholder="NSDC Level 4 / ITI Certificate No."
                      />
                      <Text style={styles.inputSub}>✓ Certified Level 4 Master Technician</Text>
                    </View>

                    <View style={styles.inputGroup}>
                      <Text style={styles.label}>Local Police Verification Status</Text>
                      <View style={styles.verifiedBox}>
                        <Ionicons name="checkmark-circle" size={18} color="#10B981" />
                        <Text style={styles.verifiedBoxText}>
                          Mithanpura Thana Clearance: Active (Clean Record)
                        </Text>
                      </View>
                    </View>
                  </View>
                )}

                {step === 3 && (
                  <View style={styles.stepContent}>
                    <View style={styles.inputGroup}>
                      <Text style={styles.label}>Bank Account for IMPS Payouts</Text>
                      <TextInput
                        style={styles.input}
                        value={bankAcc}
                        onChangeText={setBankAcc}
                        placeholder="Bank Name & Account No."
                      />
                    </View>

                    <View style={styles.inputGroup}>
                      <Text style={styles.label}>Direct UPI ID (Instant Payouts)</Text>
                      <TextInput
                        style={styles.input}
                        value={upi}
                        onChangeText={setUpi}
                        placeholder="e.g. mobile@upi or name@sbi"
                      />
                    </View>

                    <View style={styles.guaranteeBox}>
                      <Ionicons name="sparkles" size={18} color="#D97706" />
                      <Text style={styles.guaranteeText}>
                        LocalFix Partner Guarantee: 0% cut from labour fees. 100% of customer payments go to your account immediately upon resident OTP verification.
                      </Text>
                    </View>
                  </View>
                )}
              </ScrollView>

              {/* Bottom Navigation */}
              <View style={styles.footerRow}>
                {step > 1 ? (
                  <Pressable onPress={() => setStep(step - 1)} style={styles.backBtn}>
                    <Text style={styles.backBtnText}>Back</Text>
                  </Pressable>
                ) : (
                  <View style={{ flex: 1 }} />
                )}

                {step < 3 ? (
                  <Pressable onPress={() => setStep(step + 1)} style={styles.nextBtn}>
                    <Text style={styles.nextBtnText}>Continue</Text>
                    <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
                  </Pressable>
                ) : (
                  <Pressable onPress={handleCompleteRegistration} style={styles.submitBtn}>
                    <Ionicons name="shield-checkmark" size={18} color="#FFFFFF" />
                    <Text style={styles.nextBtnText}>Save & Activate</Text>
                  </Pressable>
                )}
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    justifyContent: 'flex-end',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    height: '85%',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
  },
  subtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  closeBtn: {
    padding: 4,
  },
  stepsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    marginBottom: 12,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    opacity: 0.5,
  },
  stepItemActive: {
    opacity: 1,
  },
  stepNum: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#E2E8F0',
    color: '#475569',
    fontSize: 11,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 22,
  },
  stepNumActive: {
    backgroundColor: '#EA580C',
    color: '#FFFFFF',
  },
  stepText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#1E293B',
  },
  stepLine: {
    height: 1,
    backgroundColor: '#CBD5E1',
    flex: 1,
    marginHorizontal: 8,
  },
  scrollArea: {
    flex: 1,
  },
  stepContent: {
    paddingVertical: 8,
  },
  inputGroup: {
    marginBottom: 14,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    color: '#0F172A',
  },
  inputSub: {
    fontSize: 11,
    color: '#059669',
    marginTop: 4,
    fontWeight: '500',
  },
  tradeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
  },
  tradeCardSelected: {
    borderColor: '#EA580C',
    backgroundColor: '#FFFBEB',
  },
  tradeCardText: {
    flex: 1,
    fontSize: 13,
    color: '#334155',
    fontWeight: '500',
  },
  tradeCardTextSelected: {
    color: '#B45309',
    fontWeight: '700',
  },
  kycNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#ECFDF5',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  kycNoticeText: {
    fontSize: 12,
    color: '#065F46',
    flex: 1,
    lineHeight: 16,
  },
  verifiedBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#F0FDF4',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  verifiedBoxText: {
    fontSize: 12,
    color: '#15803D',
    fontWeight: '600',
  },
  guaranteeBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    backgroundColor: '#FFFBEB',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FDE68A',
    marginTop: 10,
  },
  guaranteeText: {
    fontSize: 12,
    color: '#92400E',
    flex: 1,
    lineHeight: 17,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  backBtn: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  backBtnText: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '600',
  },
  nextBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#0F172A',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
  },
  submitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#EA580C',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
  },
  nextBtnText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  successWrapper: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ECFDF5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
  },
  successSub: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: 20,
    lineHeight: 18,
  },
});
