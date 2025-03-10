import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, TextInput, Button, Chip } from 'react-native-paper';
import { useState } from 'react';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';
import Constants from 'expo-constants';

const API_URL = Constants.expoConfig?.extra?.API_URL;

const CATEGORIES = ['Moving', 'Cleaning', 'Delivery', 'Assembly', 'Gardening', 'Painting', 'Pet Care', 'Tech Help'];

export default function PostTaskScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [location, setLocation] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleSubmit = async () => {
    try {
      let token;
      try {
        token = await AsyncStorage.getItem('authToken'); // Retrieve token
      } catch (error) {
        console.error('Error retrieving token:', error);
        return;
      }

      if (!token) {
        console.error("No token found, user is not authenticated.");
        return;
      }

      console.log("Using token:", token); // Debugging

      const response = await axios.post(
        'http://10.0.2.2:5000/api/tasks',
        {
          title,
          description,
          budget,
          location,
          dueDate,
          category: selectedCategory,
        },
        {
          headers: { Authorization: `Bearer ${token}` }, // Include token
        }
      );

      console.log('Task created:', response.data);
      router.push('./tabs');
    } catch (error: any) {
      console.error('Error creating task:', error.response?.data || error.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text variant="headlineMedium" style={styles.title}>Post a New Task</Text>
        
        <View style={styles.form}>
          <TextInput
            label="Task Title"
            value={title}
            onChangeText={setTitle}
            mode="outlined"
            style={styles.input}
          />

          <TextInput
            label="Description"
            value={description}
            onChangeText={setDescription}
            mode="outlined"
            multiline
            numberOfLines={4}
            style={styles.input}
          />

          <Text variant="titleMedium" style={styles.sectionTitle}>Category</Text>
          <View style={styles.categories}>
            {CATEGORIES.map((category) => (
              <Chip
                key={category}
                selected={selectedCategory === category}
                onPress={() => setSelectedCategory(category)}
                style={styles.categoryChip}
                showSelectedOverlay
              >
                {category}
              </Chip>
            ))}
          </View>

          <TextInput
            label="Budget ($)"
            value={budget}
            onChangeText={setBudget}
            mode="outlined"
            keyboardType="numeric"
            style={styles.input}
          />

          <TextInput
            label="Location"
            value={location}
            onChangeText={setLocation}
            mode="outlined"
            style={styles.input}
          />

          <TextInput
            label="Due Date"
            value={dueDate}
            onChangeText={setDueDate}
            mode="outlined"
            placeholder="YYYY-MM-DD"
            style={styles.input}
          />

          <Button
            mode="contained"
            onPress={handleSubmit}
            style={styles.button}
            contentStyle={styles.buttonContent}
          >
            Post Task
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 16,
    paddingTop: 24, // Add more padding at the top
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 24,
    marginTop: 16, // Add margin to the top of the title
  },
  form: {
    gap: 16,
  },
  input: {
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 8,
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 8,
  },
  categoryChip: {
    marginBottom: 8,
  },
  button: {
    marginTop: 8,
    borderRadius: 8,
  },
  buttonContent: {
    height: 48,
  },
});