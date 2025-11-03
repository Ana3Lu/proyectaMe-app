import { useEffect, useState } from 'react';
import { ScrollView, Text } from 'react-native';

export default function MainScreen() {

    const [text, setText] = useState('Loading...');

    useEffect(() => {
        getIARsponse();
    }, []);

    const getIARsponse = async () => {
        try {
            const body = {
            "contents": [
                {
                    "parts": [
                        {
                            "text": "Explain how AI works in a few words"
                        }
                    ]
                }
            ]
            }

            const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent', {
                    method: 'POST',
                headers: {
                    'x-goog-api-key': process.env.EXPO_PUBLIC_API_KEY || '',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            });
            
            const data = await response.json();

            setText(data?.candidates[0]?.content.parts[0].text || 'No response');
        } catch (error) {
            setText('Error fetching response');
            console.error(error);
        }
    }

    return (
        <ScrollView
            style={{
                flex: 1, 
                justifyContent: 'center', 
                alignItems: 'center' 
                }}
        >
            <Text>{text}</Text>
        </ScrollView>
    )
}
