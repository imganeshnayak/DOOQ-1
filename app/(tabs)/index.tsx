import { View, StyleSheet, ScrollView, Image, RefreshControl } from 'react-native';
import { Text, Card, Button, Chip, Searchbar, FAB, Surface } from 'react-native-paper';
import { useState, useEffect } from 'react';
import { RelativePathString, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Logo from '../components/Logo';
import Config from 'react-native-config';
import axios from 'axios';
import Constants from 'expo-constants';

const API_URL = Constants.expoConfig?.extra?.API_URL;




const CATEGORIES = ['All', 'Moving', 'Cleaning', 'Delivery', 'Assembly', 'Gardening'];

// Define the Task type
type Task = {
  _id: string;
  title: string;
  description?: string; // Make it optional if it can be undefined
  budget: number;
  location?: string;
  category: string;
  dueDate: string;
  image?: string; // Add other properties as needed
};

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [tasks, setTasks] = useState<Task[]>([]); // Use the Task type

  const fetchTasks = async () => {
    try {
      console.log('API URL:', API_URL);
      const response = await axios.get(`${API_URL}/api/tasks`);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchTasks().finally(() => setRefreshing(false));
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      <Surface style={styles.header} elevation={0}>
        <Logo size="medium" />
        <Text style={[styles.headerSubtitle, { color: '#0e0e0e' }]}>Available Tasks</Text>
      </Surface>

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {tasks.map((task) => (
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
                <Chip icon="map-marker" compact>{task.location ? task.location : 'No location available'}</Chip>
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
        ))}
      </ScrollView>

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