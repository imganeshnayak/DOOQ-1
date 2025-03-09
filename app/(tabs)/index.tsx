import { View, StyleSheet, ScrollView, Image, RefreshControl } from 'react-native';
import { Text, Card, Button, Chip, Searchbar, FAB, Surface } from 'react-native-paper';
import { useState } from 'react';
import { RelativePathString, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Logo from '../components/Logo';
import customTheme from '../theme'; // Import the custom theme

const CATEGORIES = ['All', 'Moving', 'Cleaning', 'Delivery', 'Assembly', 'Gardening'];

const tasks = [
  {
    id: 1,
    title: 'Help Moving Furniture',
    description: 'Need help moving heavy furniture from a 2-bedroom apartment to a new house, including a sofa, bed, and dining table.',
    budget: 150,
    location: 'Brooklyn, NY',
    category: 'Moving',
    dueDate: '2024-02-20',
    image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115',
  },
  {
    id: 2,
    title: 'Garden Maintenance',
    description: 'Looking for someone to help with general garden maintenance including mowing, weeding, and pruning.',
    budget: 80,
    location: 'Queens, NY',
    category: 'Gardening',
    dueDate: '2024-02-22',
    image: 'https://images.unsplash.com/photo-1557429287-b2e26467fc2b',
  },
  {
    id: 3,
    title: 'Furniture Assembly',
    description: 'Need help assembling IKEA furniture - 2 wardrobes and a bed frame. All tools will be provided.',
    budget: 120,
    location: 'Manhattan, NY',
    category: 'Assembly',
    dueDate: '2024-02-25',
    image: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221',
  },
];

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => setRefreshing(false), 1000);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      <Surface style={styles.header} elevation={0}>
        <Logo size="medium" />
        <Text style={[styles.headerSubtitle, { color: '#0e0e0e' }]}>Available Tasks</Text>
      </Surface>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {tasks.map((task) => (
          <Surface key={task.id} style={styles.card} elevation={1}>
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
                {task.description}
              </Text>

              <View style={styles.tags}>
                <Chip icon="map-marker" compact>{task.location}</Chip>
                <Chip icon="tag" compact>{task.category}</Chip>
                <Chip icon="calendar" compact>{task.dueDate}</Chip>
              </View>
            </Card.Content>
            <Card.Actions>
              <Button mode="outlined" onPress={() => router.push(`/task/${task.id}` as RelativePathString)}>
                View Details
              </Button>
              <Button mode="contained" onPress={() => router.push(`/task/${task.id}/offer` as RelativePathString)}>
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