import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import {
    Image,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

export default function LogoScreen() {

    const robbyImage = require("../../assets/images/robby-character.png");

    return (
        <LinearGradient
            colors={["#7794F5", "#2F32CD"]}
            style={styles.container}
        >
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

            <View style={styles.contentArea}>
                
                {/* Contenido Superior */}
                <View style={styles.topContent}>

                    {/* Wrapper del ovalo y logo */}
                    <View style={styles.logoWrapper}>

                        {/* Fondo ovalado */}
                        <View style={styles.ovalBackground} />

                        {/* Logo */}
                        <Image
                            source={robbyImage}
                            style={styles.logo}
                        />
                    </View>

                    <Text style={styles.title}>
                        Proyecta<Text style={styles.highlightText}>Me</Text>
                    </Text>
                </View>
                
                {/* Botón */}
                <TouchableOpacity
                    style={styles.primaryButton}
                    onPress={() => router.push('/main/TutorialScreen')}
                >
                    <Text style={styles.buttonText}>Empezar</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
    },
    contentArea: {
        flex: 1,
        justifyContent: "space-between",
        paddingHorizontal: 40,
        paddingTop: 150,
        paddingBottom: 80, 
    },
    topContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginBottom: 40,
    },
    logoWrapper: {
        width: 240,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    ovalBackground: {
        position: 'absolute',
        width: 180,
        height: 180,
        backgroundColor: 'white',
        borderRadius: 100,
        transform: [{ scaleX: 1.6 }],
        shadowColor: '#fff',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.6,
        shadowRadius: 20,
        elevation: 10,
    },
    logo: {
        width: 260,
        height: 260,
        resizeMode: "contain",
        position: 'absolute',
        marginBottom: 35,
    },
    title: {
        fontSize: 40,
        color: "#fff",
        textAlign: 'center',
        fontFamily: 'PoppinsBold',
    },
    highlightText: {
        color: "#FEE543",
        fontFamily: 'PoppinsBold',
    },
    primaryButton: {
        width: "100%",
        paddingVertical: 5,
        borderRadius: 30,
        alignItems: "center",
        backgroundColor: "#DD3282",
        shadowColor: '#DD3282',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.8,
        shadowRadius: 15,
        elevation: 12,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontFamily: 'PoppinsBold',
    },
});