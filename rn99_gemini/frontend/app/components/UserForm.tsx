import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';

export interface UserFormData {
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

interface UserFormProps {
  initialValues: UserFormData;
  onSubmit: (data: UserFormData) => void;
  onInputChange: (field: keyof UserFormData, value: string) => void;
  buttonText?: string;
}

export default function UserForm({ initialValues, onSubmit, onInputChange, buttonText = '저장' }: UserFormProps) {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput
        label="Name"
        value={initialValues.name}
        onChangeText={text => onInputChange('name', text)}
        mode="outlined"
        style={styles.paperInput}
      />

      <Text style={styles.label}>Username</Text>
      <TextInput
        label="Username"
        value={initialValues.username}
        onChangeText={text => onInputChange('username', text)}
        mode="outlined"
        style={styles.paperInput}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        label="Email"
        value={initialValues.email}
        onChangeText={text => onInputChange('email', text)}
        keyboardType="email-address"
        mode="outlined"
        style={styles.paperInput}
      />

      <Text style={styles.label}>Phone</Text>
      <TextInput
        label="Phone"
        value={initialValues.phone}
        onChangeText={text => onInputChange('phone', text)}
        keyboardType="phone-pad"
        mode="outlined"
        style={styles.paperInput}
      />

      <Text style={styles.label}>Website</Text>
      <TextInput
        label="Website"
        value={initialValues.website}
        onChangeText={text => onInputChange('website', text)}
        mode="outlined"
        style={styles.paperInput}
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
  saveButton: {
    marginTop: 10,
    paddingVertical: 5,
  },
});