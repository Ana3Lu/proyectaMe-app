import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react"; // 👈 IMPORTAR useState
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

// Importar el componente reutilizable
import { OptionButton } from "../components/ui/OptionButton";

// Definimos los identificadores de las opciones
type OptionKey = 'simulaciones' | 'mapa' | 'comunidad' | null;

export default function TutorialScreen() {
    // 1. ESTADO: Estado para rastrear qué botón está seleccionado
    const [selectedOption, setSelectedOption] = useState<OptionKey>(null);

    // Función para manejar la selección
    const handleSelectOption = (key: OptionKey) => {
        // Opcional: Permitir deseleccionar si se presiona de nuevo
        // setSelectedOption(key === selectedOption ? null : key);
        setSelectedOption(key); // Solo seleccionar
        console.log(`Opción seleccionada: ${key}`);
    };

    return (
        <LinearGradient
            colors={["#7794F5", "#2F32CD"]}
            style={styles.container}
        >
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

            <View style={styles.contentArea}>
                {/* Logo/Imagen de Robby con Círculo */}
                <View style={styles.logoContainer}>
                    <Image
                        source={require("../../assets/images/robby-character.png")}
                        style={styles.logo}
                    />
                </View>

                {/* Contenido Principal */}
                <Text style={styles.greetingTitle}>¡Hola! Soy <Text style={styles.robbyName}>Robby</Text></Text>
                <Text style={styles.subtitle}>
                    Tu compañero en el viaje hacia descubrir tu futuro profesional
                </Text>
                <Text style={styles.sectionTitle}>Encontrarás:</Text>

                {/* 2. IMPLEMENTACIÓN: Pasar `selected` y la función `onPress` */}
                <OptionButton
                    option="Simulaciones interactivas para explorar profesiones"
                    iconName="rocket-outline"
                    selected={selectedOption === 'simulaciones'} // 👈 Nuevo prop
                    onPress={() => handleSelectOption('simulaciones')} // 👈 Nueva función
                />

                <OptionButton
                    option="Mapa vocacional personalizado según tus afinidades"
                    iconName="map-outline"
                    selected={selectedOption === 'mapa'} // 👈 Nuevo prop
                    onPress={() => handleSelectOption('mapa')} // 👈 Nueva función
                />

                <OptionButton
                    option="Comunidad educativa para compartir experiencias"
                    iconName="chatbubbles-outline"
                    selected={selectedOption === 'comunidad'} // 👈 Nuevo prop
                    onPress={() => handleSelectOption('comunidad')} // 👈 Nueva función
                />

                {/* Botón Principal de Navegación */}
                <TouchableOpacity
                    style={styles.primaryButton}
                    onPress={() => router.replace("/(auth)/LoginScreen")} 
                >
                    <Text style={styles.buttonText}>Explorar mi futuro</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    // ... (Mantener tus estilos existentes)
    container: {
        flex: 1,
    },
    contentArea: {
        flex: 1,
        alignItems: "center",
        paddingTop: 70,
        paddingHorizontal: 30,
        justifyContent: 'space-between',
        paddingBottom: 50,
    },
    logoContainer: {
        backgroundColor: 'white',
        borderRadius: 100,
        padding: 15,
        marginBottom: 20,
        shadowColor: '#fff',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 8,
    },
    logo: {
        width: 80,
        height: 80,
        resizeMode: "contain",
    },
    greetingTitle: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 10,
        textAlign: 'center',
    },
    robbyName: {
        color: '#90EE90', // Verde brillante para el nombre Robby
    },
    subtitle: {
        fontSize: 18, // Tamaño de fuente solicitado
        color: "#E0E0E0",
        textAlign: "center",
        marginBottom: 30,
        fontWeight: '500', // Poppins
    },
    sectionTitle: {
        color: "#fff",
        fontSize: 18, // Tamaño de fuente solicitado
        fontWeight: "700",
        marginBottom: 15,
        alignSelf: 'center',
        marginLeft: 20,
    },
    primaryButton: {
        width: "100%",
        paddingVertical: 16,
        borderRadius: 30,
        alignItems: "center",
        backgroundColor: "#DD3282",
        shadowColor: '#DD3282',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.6,
        shadowRadius: 10,
        elevation: 8,
        marginTop: 30,
    },
    buttonText: {
        color: "#fff",
        fontSize: 20, fontWeight: "700"
    },
});