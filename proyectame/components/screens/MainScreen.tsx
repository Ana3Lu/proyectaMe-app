import { useEffect, useState } from 'react';
import { ScrollView, Text } from 'react-native';
import { GeminiResponse } from '../../types/responses';

export default function MainScreen() {

    const [text, setText] = useState('Loading...');
    const [isLoading, setIsLoading] = useState(false);
    const [questions, setQuestions] = useState<Array<{
        question: string;
        options: string[];
        correctOption: number;
    }>>([]);

    useEffect(() => {
        getIAResponse();
    }, []);

    const getIAResponse = async () => {
        const body = {
            "contents": [{
                "parts": [
                    { "text": "List of question about general culture about Colombia." }
                ]
            }],
            "generationConfig": {
                "responseMimeType": "application/json",
                "responseSchema": {
                    "type": "ARRAY",
                    "items": {
                        "type": "OBJECT",
                        "properties": {
                            "question": { "type": "STRING" },
                            "options": {
                                "type": "ARRAY",
                                "items": { "type": "STRING" }
                            },
                            "correctOption": { "type": "NUMBER" }
                        }
                    }
                }
            }
        }
 
        // [{question: text, options:[text], correctOption:number}]
 
        try {
            setIsLoading(true);
            const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent", {
                method: "POST",
                headers: {
                    "x-goog-api-key": process.env.EXPO_PUBLIC_GEMINI_API_KEY ?? "",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            });
 
            const data: GeminiResponse = await response.json();
 
            const questionsData = JSON.parse(data.candidates[0].content.parts[0].text);
            setQuestions(questionsData);
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false);
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
