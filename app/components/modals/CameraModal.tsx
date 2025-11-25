import PrimaryButton from '@/app/components/ui/PrimaryButton';
import { AuthContext } from '@/contexts/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { decode } from 'base64-arraybuffer';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { supabase } from "../../../utils/supabase";

interface PreviewProps {
    base64: string;
    uri: string;
}

interface CameraModalProps {
    isVisible: boolean;
    onConfirm: (url: string) => void;
    onCancel: () => void;
}

export default function CameraModal({ isVisible, onConfirm, onCancel }: CameraModalProps) {

    const { user } = useContext(AuthContext);
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [preview, setPreview] = useState<PreviewProps | null>(null);
    const cameraRef = useRef<CameraView>(null);

    useEffect(() => {
        if (!permission?.granted) requestPermission();
    }, [permission?.granted, requestPermission]);

    if (!permission) return <View />;

    if (!permission.granted) {
        return (
            <View style={styles.centered}>
                <Text style={styles.message}>Se necesita permiso para usar la cámara</Text>
                <TouchableOpacity onPress={requestPermission}>
                    <Text style={styles.allowText}>Permitir cámara</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const handleTake = async () => {
        try {
            const response = await cameraRef.current?.takePictureAsync({ quality: 0.5, base64: true });
            if (response?.uri && response?.base64) setPreview({ uri: response.uri, base64: response.base64 });
        } catch (error) { console.log(error); }
    }

    const handlePickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], quality: 0.5, base64: true });
        if (!result.canceled && result.assets[0].uri && result.assets[0].base64) {
            setPreview({ uri: result.assets[0].uri, base64: result.assets[0].base64 });
        }
    };

    const handleSaveImageBucket = async () => {
        if (!user || !preview) return;
        try {
            const folder = `${user.id}/`;
            const filename = `${Date.now()}.jpg`;
            const relativePath = `${folder}${filename}`;

            const { data, error } = await supabase
                .storage
                .from('avatars')
                .upload(relativePath, decode(preview.base64), { contentType: 'image/jpg' });

            if (!error && data?.fullPath) {
                const { data: publicData } = await supabase.storage.from('avatars').getPublicUrl(relativePath);
                if (publicData?.publicUrl) onConfirm(publicData.publicUrl);
            }
        } catch (error) { console.log(error); }
    }

    return (
        <Modal animationType="slide" visible={isVisible}>
            <View style={styles.container}>
                {preview ? (
                    <>
                        <LinearGradient colors={['#7794F5', '#2F32CD']} style={styles.previewBackground} />
                        <Text style={styles.previewTitle}>¡Preview!</Text>
                        <Image source={{ uri: preview.uri }} style={styles.previewImage} />
                        <View style={styles.previewButtons}>
                            <PrimaryButton title="Repetir" onPress={() => setPreview(null)} />
                            <PrimaryButton title="Guardar" onPress={handleSaveImageBucket}  />
                            <PrimaryButton title="Cancelar" onPress={onCancel} />
                        </View>
                    </>
                ) : (
                    <>
                        <CameraView ref={cameraRef} style={styles.camera} facing={facing} />
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={() => setFacing(prev => (prev === 'back' ? 'front' : 'back'))} style={styles.iconButton}>
                                <Ionicons name="camera-reverse" size={40} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleTake} style={styles.iconButton}>
                                <Ionicons name="radio-button-on" size={110} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handlePickImage} style={styles.iconButton}>
                                <Ionicons name="images-outline" size={35} color="white" />
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'black' },
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1b266bff' },
    message: { textAlign: 'center', paddingBottom: 10, color: 'white', fontSize: 18, fontFamily: 'PoppinsRegular' },
    allowText: { color: '#85E0CD', fontSize: 18, fontFamily: 'PoppinsBold' },
    camera: { flex: 1 },
    buttonContainer: { position: 'absolute', bottom: 30, flexDirection: 'row', width: '100%', justifyContent: 'space-around', paddingHorizontal: 20, alignItems: 'center' },
    iconButton: { padding: 10 },
    previewTitle: { color: 'white', fontSize: 36, fontFamily: 'PoppinsBold', textAlign: 'center', marginTop: 60 },
    previewImage: { width: 300, height: 300, alignSelf: 'center', borderRadius: 150, borderWidth: 6, borderColor: 'white', marginVertical: 30 },
    previewBackground: { position: 'absolute', width: '100%', height: '100%' },
    previewButtons: { paddingHorizontal: 20, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 15, marginBottom: 50 },
    primaryBtn: { width: 200, borderRadius: 20 },
});
