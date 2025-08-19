import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, SafeAreaView, Alert, ActivityIndicator } from 'react-native';

// --- Configuration ---
//For Android emulator, use http://10.0.2.2:3001
// const API_URL = 'http://localhost:3001'; 
const API_URL = 'http://10.0.2.2:3001';

// --- Type Definitions ---
type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

type ApiResponse = {
    message: string;
}

const DbScreen: React.FC = () => {
    const [results, setResults] = useState<string>('Click a button to see the results...');
    const [loading, setLoading] = useState<boolean>(false);

    const handleRequest = async (endpoint: string, options: RequestInit = {}) => {
        setLoading(true);
        setResults('Loading...');
        try {
            const response = await fetch(`${API_URL}/${endpoint}`, options);
            const contentType = response.headers.get("content-type");

            if (contentType && contentType.indexOf("application/json") !== -1) {
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.message || 'Something went wrong');
                }

                if (options.method === 'POST' || options.method === 'DELETE') {
                    const responseData = data as ApiResponse;
                    Alert.alert('Success', responseData.message);
                    setResults(responseData.message);
                } else {
                    setResults(JSON.stringify(data, null, 2));
                }
            } else {
                const textData = await response.text();
                if (!response.ok) {
                    throw new Error(textData || 'Something went wrong');
                }
                setResults(textData);
            }

        } catch (error: any) {
            const errorMessage = `Error: ${error.message}`;
            setResults(errorMessage);
            Alert.alert('Error', errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteAllRecords = () => {
        Alert.alert(
            "Delete All Records",
            "Are you sure you want to delete all records? This action cannot be undone.",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                { 
                    text: "OK", 
                    onPress: () => handleRequest('delete-all-records', { method: 'DELETE' }) 
                }
            ]
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Import Data to MySQL</Text>
                <View style={styles.buttonContainer}>
                    <Button 
                        title="Import Users" 
                        onPress={() => handleRequest('import-users', { method: 'POST' })} 
                        disabled={loading} 
                    />
                    <Button 
                        title="Import Posts" 
                        onPress={() => handleRequest('import-posts', { method: 'POST' })} 
                        disabled={loading} 
                    />
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Fetch Data from MySQL</Text>
                <View style={styles.buttonContainer}>
                    <Button 
                        title="Fetch Users" 
                        onPress={() => handleRequest('users')} 
                        disabled={loading} 
                    />
                    <Button 
                        title="Fetch Posts" 
                        onPress={() => handleRequest('posts')} 
                        disabled={loading} 
                    />
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Delete Data</Text>
                <View style={styles.buttonContainer}>
                    <Button 
                        title="Delete All Records" 
                        onPress={handleDeleteAllRecords} 
                        disabled={loading} 
                        color="#ff0000"
                    />
                </View>
            </View>
            
            <Text style={styles.resultsTitle}>Results</Text>
            <View style={styles.resultsContainer}>
                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <ScrollView>
                        <Text style={styles.resultsText}>{results}</Text>
                    </ScrollView>
                )}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    resultsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
    },
    resultsContainer: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
        borderWidth: 1,
        borderColor: '#cccccc',
        justifyContent: 'center',
    },
    resultsText: {
        fontFamily: 'monospace',
        fontSize: 12,
    }
});

export default DbScreen;
