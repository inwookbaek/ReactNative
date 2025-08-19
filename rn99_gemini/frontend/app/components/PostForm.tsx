import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';

export interface PostFormData {
  title: string;
  body: string;
}

interface PostFormProps {
  initialValues: PostFormData;
  onSubmit: (data: PostFormData) => void;
  onInputChange: (field: keyof PostFormData, value: string) => void;
  buttonText?: string;
}

export default function PostForm({ initialValues, onSubmit, onInputChange, buttonText = '저장' }: PostFormProps) {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>제목</Text>
      <TextInput
        label="제목"
        value={initialValues.title}
        onChangeText={text => onInputChange('title', text)}
        mode="outlined"
        style={styles.paperInput}
      />

      <Text style={styles.label}>내용</Text>
      <TextInput
        label="내용"
        value={initialValues.body}
        onChangeText={text => onInputChange('body', text)}
        multiline
        mode="outlined"
        style={[styles.paperInput, styles.textArea]}
      />

      <Button mode="contained" onPress={() => onSubmit(initialValues)} style={styles.saveButton}>
        {buttonText}
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  paperInput: {
    marginBottom: 15,
    backgroundColor: 'white',
  },
  textArea: {
    height: 150,
    textAlignVertical: 'top',
  },
  saveButton: {
    marginTop: 10,
    paddingVertical: 5,
  },
});