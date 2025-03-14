import { View, StyleSheet, ScrollView, Image, RefreshControl } from 'react-native';
import { Text, Card, Button, Chip, Searchbar, FAB, Surface } from 'react-native-paper';
import { useState, useEffect } from 'react';
import { RelativePathString, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as Location from 'expo-location'; // Import expo-location
import Logo from '../components/Logo';
import axios from 'axios';
import Constants from 'expo-constants';

const API_URL = Constants.expoConfig?.extra?.API_URL;

const CATEGORIES = ['All', 'Moving', 'Cleaning', 'Delivery', 'Assembly', 'Gardening'];

// Define the Task type
type Task = {
  _id: string;
  title: string;
  description?: string;
  budget: number;
  location?: { latitude: number; longitude: number }; // Task location
  category: string;
  dueDate: string;
  image?: string;
};

// Haversine formula to calculate distance between two coordinates
const haversineDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const toRadians = (degrees: number) => degrees * (Math.PI / 180);

  const R = 6371; // Radius of the Earth in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers

  return distance;
};

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null); // User's location

  // Fetch tasks from the API
  const fetchTasks = async () => {
    try {
      console.log('API URL:', API_URL);
      const response = await axios.get(`${API_URL}/api/tasks`);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // Get the user's current location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  useEffect(() => {
    fetchTasks();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchTasks().finally(() => setRefreshing(false));
  };

  // Filter tasks based on search query, selected category, and 30 km radius
  const filteredTasks = tasks.filter(task => {
    // Check if the task matches the search query and category
    const matchesSearchAndCategory =
      (selectedCategory === 'All' || task.category === selectedCategory) &&
      task.title.toLowerCase().includes(searchQuery.toLowerCase());

    // Check if the task is within 30 km of the user's location
    if (userLocation && task.location) {
      const distance = haversineDistance(
        userLocation.latitude,
        userLocation.longitude,
        task.location.latitude,
        task.location.longitude
      );
      return matchesSearchAndCategory && distance <= 30; // Only include tasks within 30 km
    }

    // If location data is missing, exclude the task
    return false;
  });

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* Header Section */}
      <Surface style={styles.header} elevation={0}>
        <Logo size="medium" />
        <Text style={styles.headerSubtitle}>Available Tasks</Text>

        {/* Search Bar */}
        <Searchbar
          placeholder="Search tasks"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
          elevation={1}
        />

        {/* Category Chips */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categories}
        >
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
        </ScrollView>
      </Surface>

      {/* Task List */}
      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {filteredTasks.map((task) => {
          // Calculate distance if user location and task location are available
          const distance = userLocation && task.location
            ? haversineDistance(
                userLocation.latitude,
                userLocation.longitude,
                task.location.latitude,
                task.location.longitude
              ).toFixed(2) // Round to 2 decimal places
            : null;

          return (
            <Surface key={task._id} style={styles.card} elevation={1}>
              <Image
                source={{ uri: task.image }}
                style={styles.taskImage}
              />
              <Card.Content>
                <View style={styles.taskHeader}>
                  <Text variant="titleLarge" style={styles.taskTitle}>{task.title}</Text>
                  <Text variant="titleMedium" style={styles.budget}>${task.budget}</Text>
                </View>
                
                <Text variant="bodyMedium" style={styles.description} numberOfLines={2}>
                  {task.description ? task.description : 'No description available'}
                </Text>

                <View style={styles.tags}>
                  <Chip icon="map-marker" compact>
                    {distance ? `${distance} km away` : 'Distance not available'}
                  </Chip>
                  <Chip icon="tag" compact>{task.category}</Chip>
                  <Chip icon="calendar" compact>{task.dueDate}</Chip>
                </View>
              </Card.Content>
              <Card.Actions>
                <Button mode="outlined" onPress={() => router.push(`/task/${task._id}` as RelativePathString)}>
                  View Details
                </Button>
                <Button mode="contained" onPress={() => router.push(`/task/${task._id}/offer` as RelativePathString)}>
                  Make Offer
                </Button>
              </Card.Actions>
            </Surface>
          );
        })}
      </ScrollView>

      {/* Floating Action Button */}
      <FAB
        icon="plus"
        label="Post a Task"
        style={styles.fab}
        onPress={() => router.push('/post-task')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    paddingTop: 60,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  headerSubtitle: {
    fontFamily: 'Poppins-Regular',
    color: '#666',
    marginTop: 4,
    fontSize: 16,
  },
  searchBar: {
    marginTop: 12,
    marginBottom: 10,
    backgroundColor: '#f5f5f5',
  },
  categories: {
    flexDirection: 'row',
    gap: 8,
    paddingVertical: 8,
  },
  categoryChip: {
    marginRight: 8,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  taskImage: {
    height: 200,
    width: '100%',
    borderRadius: 8,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  taskTitle: {
    flex: 1,
    fontFamily: 'Poppins-SemiBold',
  },
  budget: {
    color: '#FF5733',
    fontFamily: 'Poppins-SemiBold',
  },
  description: {
    marginBottom: 16,
    color: '#666',
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#FF5733',
  },
});