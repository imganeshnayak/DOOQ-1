import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, TextInput, Button, Chip } from 'react-native-paper';
import { useState, useEffect } from 'react';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import axios from 'axios';
import Constants from 'expo-constants';

const API_URL = Constants.expoConfig?.extra?.API_URL;

const CATEGORIES = ['Moving', 'Cleaning', 'Delivery', 'Assembly', 'Gardening', 'Painting', 'Pet Care', 'Tech Help'];

interface Location {
  latitude: number | null;
  longitude: number | null;
}

export default function PostTaskScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [location, setLocation] = useState<Location>({ latitude: null, longitude: null });
  const [dueDate, setDueDate] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null); // Allow string or null

  // Request location permission and get coordinates
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied'); // Now this works
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);



  
 


  const handleSubmit = async () => {
    try {
      let token = await AsyncStorage.getItem('authToken');
      if (!token) {
        console.error("No token found, user is not authenticated.");
        return;
      }
  
      const taskData = {
        title,
        description,
        budget,
        location: location.latitude && location.longitude 
          ? { latitude: location.latitude, longitude: location.longitude } 
          : null, // Ensuring correct format
        dueDate,
        category: selectedCategory,
      };
  
      console.log("Sending Task Data:", taskData); // Debugging
  
      const response = await axios.post(`${API_URL}/api/tasks`, taskData, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      console.log('Task created:', response.data);
      router.push('./tabs');
    } catch (error:any) {
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

          <Text variant="titleMedium" style={styles.sectionTitle}>Location</Text>
          <Text style={styles.coordinates}>
            {location.latitude && location.longitude
              ? `Latitude: ${location.latitude}, Longitude: ${location.longitude}`
              : 'Fetching location...'}
          </Text>

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
    paddingTop: 24,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 24,
    marginTop: 16,
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
  coordinates: {
    fontFamily: 'Poppins-Regular',
    marginBottom: 16,
    color: '#666',
  },
  button: {
    marginTop: 8,
    borderRadius: 8,
  },
  buttonContent: {
    height: 48,
  },
});