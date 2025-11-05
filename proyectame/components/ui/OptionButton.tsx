import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface OptionButtonProps {
  option: string;
  selected: boolean;
  onPress: () => void;
}

export const OptionButton = ({ option, selected, onPress }: OptionButtonProps) => (
  <TouchableOpacity
    style={[styles.button, selected && styles.selected]}
    onPress={onPress}
  >
    <Text style={styles.text}>{option}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    padding: 12,
    marginVertical: 6,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#0288d1',
    backgroundColor: 'white',
  },
  selected: {
    backgroundColor: '#81d4fa',
  },
  text: {
    fontSize: 16,
  },
});
