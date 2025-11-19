import { Image, StyleSheet, Text, View } from 'react-native';

interface ChatBubbleProps {
  message: string;
  sender: 'robby' | 'user';
}

export const ChatBubble = ({ message, sender }: ChatBubbleProps) => (
  <View style={[
      styles.wrapper,
      sender === 'robby' ? { flexDirection: 'row' } : { flexDirection: 'row-reverse' }
    ]}
  >
    {sender === 'robby' && <Image source={require("../../../assets/images/robby.png")} style={styles.avatar} />}
    <View style={[styles.bubble, sender === 'robby' ? styles.robby : styles.user]}>
      <Text style={[styles.text, sender === 'robby' ? styles.messageText : styles.userText]}>
        {message}
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 4,
    maxWidth: '100%',
    alignItems: 'flex-start',
  },
  bubble: {
    padding: 12,
    borderRadius: 16,
    maxWidth: '80%',
  },
  robby: { backgroundColor: '#E5E5EA' },
  user: { backgroundColor: '#2F32CD' },
  text: { fontSize: 16, fontFamily: 'Roboto-Regular' },
  messageText: { color: '#000' },
  userText: { color: '#fff' },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 8 },
});
