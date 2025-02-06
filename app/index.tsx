import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useState } from 'react';
import UnlockModal from '../components/UnlockModal';
import { FontAwesome } from '@expo/vector-icons';

export default function Page() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleUnlock = async () => {
    console.log('Contenu déverrouillé');
    setIsUnlocked(true);
  };

  return (
    <View style={styles.container}>
      {isUnlocked ? (
        <TouchableOpacity style={[styles.button, styles.unlockedButton]}>
          <FontAwesome name="unlock" size={20} color="#FFF" style={styles.icon} />
          <Text style={styles.buttonText}>Contenu Déverrouillé</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity 
          style={[styles.button, styles.lockedButton]}
          onPress={() => setIsModalVisible(true)}
        >
          <FontAwesome name="lock" size={20} color="#FFF" style={styles.icon} />
          <Text style={styles.buttonText}>Contenu Verrouillé</Text>
        </TouchableOpacity>
      )}

      <UnlockModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onUnlock={handleUnlock}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  lockedButton: {
    backgroundColor: '#FF3366',
  },
  unlockedButton: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  icon: {
    marginRight: 10,
  }
});