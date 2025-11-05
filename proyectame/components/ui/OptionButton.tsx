import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface OptionButtonProps {
  option: string;
  selected: boolean;
  onPress: () => void;
}

export const OptionButton = ({ option, selected, onPress }: OptionButtonProps) => (
  <TouchableOpacity
    style={[styles.card, selected && styles.selectedCard]}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <Text style={styles.text}>{option}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginVertical: 6,
    borderRadius: 20,
    backgroundColor: '#e0f7fa',
    borderWidth: 1,
    borderColor: '#b2ebf2',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  selectedCard: {
    backgroundColor: '#81d4fa',
    borderColor: '#0288d1',
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
});
