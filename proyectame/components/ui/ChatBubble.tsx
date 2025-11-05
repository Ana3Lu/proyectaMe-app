import { View, Text, StyleSheet } from 'react-native';

interface ChatBubbleProps {
  message: string;
  sender: 'robby' | 'user';
}

export const ChatBubble = ({ message, sender }: ChatBubbleProps) => {
  return (
    <View style={[
      styles.bubble,
      sender === 'robby' ? styles.robbyBubble : styles.userBubble
    ]}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  bubble: {
    padding: 12,
    borderRadius: 10,
    marginVertical: 4,
    maxWidth: '85%',
  },
  robbyBubble: {
    backgroundColor: '#e0f7fa',
    alignSelf: 'flex-start',
  },
  userBubble: {
    backgroundColor: '#c5e1a5',
    alignSelf: 'flex-end',
  },
  text: {
    fontSize: 16,
  }
});
