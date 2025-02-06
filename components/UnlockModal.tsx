import React, { useState } from 'react';
import { View, TouchableOpacity, Modal, StyleSheet, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

interface UnlockModalProps {
  isVisible: boolean;
  onClose: () => void;
  onUnlock: () => Promise<void>;
}

export default function UnlockModal({ 
  isVisible, 
  onClose,
  onUnlock
}: UnlockModalProps) {
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [unlockComplete, setUnlockComplete] = useState(false);

  const handleUnlock = async () => {
    if (isUnlocking) return;
    
    setIsUnlocking(true);
    try {
      await onUnlock();
      setUnlockComplete(true);
    } catch (error) {
      console.error(error);
      setIsUnlocking(false);
      setUnlockComplete(false);
    }
  };

  const handleClose = () => {
    setIsUnlocking(false);
    setUnlockComplete(false);
    onClose();
  };

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={handleClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity 
            style={styles.closeButton} 
            onPress={handleClose}
          >
            <MaterialIcons name="close" size={24} color="#000000" />
          </TouchableOpacity>

          <View style={styles.unlockContainer}>
            {unlockComplete ? (
              <View style={[styles.messageContainer, styles.messageCompleted]}>
                <FontAwesome 
                  name="unlock" 
                  size={32} 
                  color="#4CAF50" 
                  style={styles.unlockIcon}
                />
                <Text style={styles.unlockMessage}>
                  Contenu déverrouillé !
                </Text>
              </View>
            ) : (
              <TouchableOpacity 
                style={styles.iconContainer}
                onPress={handleUnlock}
                disabled={isUnlocking}
              >
                <FontAwesome 
                  name={isUnlocking ? "unlock" : "lock"} 
                  size={32} 
                  color={isUnlocking ? "#4CAF50" : "#FF3366"} 
                />
                {isUnlocking && (
                  <Text style={styles.unlockingText}>Déverrouillage...</Text>
                )}
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    minHeight: 200,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
    marginBottom: 10,
  },
  unlockContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 100,
    height: 100,
    backgroundColor: '#FFE5EB',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  unlockMessage: {
    marginTop: 10,
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: '600'
  },
  messageCompleted: {
    transform: [{ scale: 1.1 }],
  },
  unlockIcon: {
    marginBottom: 10,
  },
  unlockingText: {
    marginTop: 10,
    fontSize: 14,
    color: '#4CAF50',
  }
});