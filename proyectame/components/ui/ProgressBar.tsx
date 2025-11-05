import { View, StyleSheet } from 'react-native';

interface ProgressBarProps {
  value: number; // 0 a 100
}

export const ProgressBar = ({ value }: ProgressBarProps) => (
  <View style={styles.container}>
    <View style={[styles.bar, { width: `${value}%` }]} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 10,
    backgroundColor: '#7794F5',
    borderRadius: 5,
    overflow: 'hidden',
    marginLeft: 12,
  },
  bar: {
    height: '100%',
    backgroundColor: '#d3ad17ff',
    borderRadius: 5,
  },
});
