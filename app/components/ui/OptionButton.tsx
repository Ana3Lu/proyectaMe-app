import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface OptionButtonProps {
  option: string; 
  selected: boolean; 
  iconName?: keyof typeof Ionicons.glyphMap; 
  onPress: () => void;
}

export const OptionButton = ({ option, selected, iconName, onPress }: OptionButtonProps) => (
  <TouchableOpacity
    style={[styles.card, selected && styles.selectedCard]} 
    onPress={onPress}
    activeOpacity={0.8}
    disabled={selected} 
  >
    <View style={styles.contentContainer}>
      {/* Solo muestra el ícono si se proporciona */}
      {iconName && <Ionicons name={iconName} size={24} color="#E8F1FF" style={styles.icon} />}
      <Text style={styles.text}>{option}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    // Color original: Rosado/Fucsia
    backgroundColor: '#DD3282', 
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginVertical: 8,
    borderRadius: 12,
    width: '100%',
    alignItems: 'flex-start', // Alineamos a la izquierda para un mejor aspecto en lista
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
    borderWidth: 2,
    borderColor: 'transparent', // Borde transparente por defecto
  },
  selectedCard: {
    // Color para el botón seleccionado (un tono más claro o con borde)
    backgroundColor: '#E8799E', // Tono ligeramente diferente para indicar selección
    borderColor: '#FFF', // Borde blanco para resaltar que fue la opción elegida
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 15,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});