import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TextInput, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { usePartner } from '@/context/PartnerContext';

interface WithdrawModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function WithdrawModal({ visible, onClose }: WithdrawModalProps) {
  const { walletBalance, withdrawFunds } = usePartner();
  const [amount, setAmount] = useState(walletBalance.toString());
  const [method, setMethod] = useState<'bank' | 'upi'>('bank');
  const [upiId, setUpiId] = useState('rahul.kumar@sbi');
  const [successInfo, setSuccessInfo] = useState<{ refId: string; amount: number } | null>(null);

  const handleWithdraw = () => {
    const val = parseFloat(amount);
    if (isNaN(val) || val <= 0 || val > walletBalance) return;

    const res = withdrawFunds(val);
    if (res.success) {
      setSuccessInfo({ refId: res.refId, amount: val });
    }
  };

  const handleFinish = () => {
    setSuccessInfo(null);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.backdrop}>
        <View style={styles.card}>
          {successInfo ? (
            <View style={styles.successWrapper}>
              <View style={styles.iconCircle}>
                <Ionicons name="checkmark-done" size={42} color="#10B981" />
              </View>
              <Text style={styles.successTitle}>Transfer Dispatched!</Text>
              <Text style={styles.successAmount}>₹{successInfo.amount}</Text>
              <Text style={styles.successNote}>
                Sent to State Bank of India (Ending in 4091) via IMPS 24x7. Funds will reflect in under 90 seconds.
              </Text>
              <View style={styles.refBox}>
                <Text style={styles.refLabel}>IMPS Reference No:</Text>
                <Text style={styles.refVal}>{successInfo.refId}</Text>
              </View>
              <Pressable onPress={handleFinish} style={styles.finishBtn}>
                <Text style={styles.finishBtnText}>Done</Text>
              </Pressable>
            </View>
          ) : (
            <>
              <View style={styles.headerRow}>
                <View>
                  <Text style={styles.title}>Instant Bank Transfer / UPI</Text>
                  <Text style={styles.subtitle}>Direct IMPS Payout • Zero Municipal Deduction</Text>
                </View>
                <Pressable onPress={onClose} style={styles.closeBtn}>
                  <Ionicons name="close" size={22} color="#64748B" />
                </Pressable>
              </View>

              {/* Balance Badge */}
              <View style={styles.balanceRow}>
                <Text style={styles.balanceLabel}>Available Balance:</Text>
                <Text style={styles.balanceVal}>₹{walletBalance}</Text>
              </View>

              {/* Destination Selector */}
              <Text style={styles.sectionLabel}>Select Payout Channel:</Text>
              <View style={styles.methodRow}>
                <Pressable
                  onPress={() => setMethod('bank')}
                  style={[styles.methodCard, method === 'bank' && styles.methodCardSelected]}>
                  <Ionicons name="business" size={20} color={method === 'bank' ? '#EA580C' : '#64748B'} />
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.methodTitle, method === 'bank' && styles.methodTitleSelected]}>
                      State Bank of India
                    </Text>
                    <Text style={styles.methodSub}>Ending in 4091 • Verified ✓</Text>
                  </View>
                  {method === 'bank' && <Ionicons name="checkmark-circle" size={18} color="#EA580C" />}
                </Pressable>

                <Pressable
                  onPress={() => setMethod('upi')}
                  style={[styles.methodCard, method === 'upi' && styles.methodCardSelected]}>
                  <Ionicons name="flash" size={20} color={method === 'upi' ? '#EA580C' : '#64748B'} />
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.methodTitle, method === 'upi' && styles.methodTitleSelected]}>
                      Instant UPI ID
                    </Text>
                    <Text style={styles.methodSub}>{upiId}</Text>
                  </View>
                  {method === 'upi' && <Ionicons name="checkmark-circle" size={18} color="#EA580C" />}
                </Pressable>
              </View>

              {/* Amount input */}
              <View style={styles.inputGroup}>
                <Text style={styles.sectionLabel}>Withdrawal Amount (₹):</Text>
                <View style={styles.amountInputRow}>
                  <Text style={styles.currPrefix}>₹</Text>
                  <TextInput
                    style={styles.amountInput}
                    value={amount}
                    onChangeText={setAmount}
                    keyboardType="numeric"
                  />
                  <Pressable onPress={() => setAmount(walletBalance.toString())} style={styles.allBtn}>
                    <Text style={styles.allBtnText}>Max</Text>
                  </Pressable>
                </View>
              </View>

              {/* Zero Fee Guarantee */}
              <View style={styles.guaranteePill}>
                <Ionicons name="shield-checkmark" size={16} color="#059669" />
                <Text style={styles.guaranteeText}>
                  Zero fees. 100% of labour + tips dispatched within 90 seconds.
                </Text>
              </View>

              {/* Submit Button */}
              <Pressable
                onPress={handleWithdraw}
                style={[
                  styles.submitBtn,
                  (!amount || parseFloat(amount) <= 0 || parseFloat(amount) > walletBalance) &&
                    styles.submitBtnDisabled,
                ]}>
                <Ionicons name="flash" size={18} color="#FFFFFF" />
                <Text style={styles.submitBtnText}>Confirm Instant Withdrawal</Text>
              </Pressable>
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
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    justifyContent: 'flex-end',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    maxHeight: '92%',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  balanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  balanceLabel: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500',
  },
  balanceVal: {
    fontSize: 18,
    fontWeight: '800',
    color: '#059669',
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 8,
  },
  methodRow: {
    gap: 8,
    marginBottom: 16,
  },
  methodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
  },
  methodCardSelected: {
    borderColor: '#EA580C',
    backgroundColor: '#FFFBEB',
  },
  methodTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1E293B',
  },
  methodTitleSelected: {
    color: '#B45309',
  },
  methodSub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  inputGroup: {
    marginBottom: 16,
  },
  amountInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    borderRadius: 12,
    paddingHorizontal: 14,
  },
  currPrefix: {
    fontSize: 20,
    fontWeight: '700',
    color: '#475569',
    marginRight: 6,
  },
  amountInput: {
    flex: 1,
    height: 48,
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
  },
  allBtn: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  allBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#B45309',
  },
  guaranteePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#ECFDF5',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  guaranteeText: {
    fontSize: 11,
    color: '#047857',
    flex: 1,
    lineHeight: 15,
  },
  submitBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#F59E0B',
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 8,
  },
  submitBtnDisabled: {
    backgroundColor: '#CBD5E1',
  },
  submitBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  successWrapper: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#ECFDF5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  successTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  successAmount: {
    fontSize: 28,
    fontWeight: '800',
    color: '#059669',
    marginVertical: 4,
  },
  successNote: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
    paddingHorizontal: 16,
    lineHeight: 18,
  },
  refBox: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginVertical: 14,
    alignItems: 'center',
  },
  refLabel: {
    fontSize: 10,
    color: '#64748B',
  },
  refVal: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1E293B',
    fontFamily: 'monospace',
    marginTop: 2,
  },
  finishBtn: {
    backgroundColor: '#0F172A',
    paddingHorizontal: 36,
    paddingVertical: 12,
    borderRadius: 10,
  },
  finishBtnText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
});
