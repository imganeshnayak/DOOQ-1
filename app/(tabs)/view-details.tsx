import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { Text, Button, Surface, Chip } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';

export default function ViewDetails() {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* Header */}
      <Surface style={styles.header} elevation={0}>
        <Text variant="headlineSmall" style={styles.headerTitle}>Task Details</Text>
      </Surface>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Task Info Card */}
        <Surface style={styles.card} elevation={1}>
          <Text variant="titleLarge" style={styles.taskTitle}>
            Website Development Project
          </Text>
          
          <View style={styles.tags}>
            <Chip style={styles.tag}>Web Development</Chip>
            <Chip style={styles.tag}>React</Chip>
            <Chip style={styles.tag}>UI/UX</Chip>
          </View>

          <Text style={styles.price}>Budget: $1,000 - $2,000</Text>
          
          <View style={styles.divider} />

          <Text variant="titleMedium" style={styles.sectionTitle}>
            Description
          </Text>
          <Text style={styles.description}>
            Looking for an experienced developer to create a modern website with React. 
            The project includes responsive design, user authentication, and a dashboard.
          </Text>

          {/* Requirements Section */}
          <Text variant="titleMedium" style={[styles.sectionTitle, { marginTop: 16 }]}>
            Requirements
          </Text>
          <View style={styles.requirementsList}>
            <Text style={styles.requirementItem}>• Responsive design for all devices</Text>
            <Text style={styles.requirementItem}>• Modern UI/UX implementation</Text>
            <Text style={styles.requirementItem}>• Performance optimization</Text>
            <Text style={styles.requirementItem}>• SEO best practices</Text>
          </View>
        </Surface>

        {/* Timeline Card */}
        <Surface style={[styles.card, { marginTop: 16 }]} elevation={1}>
          <Text variant="titleMedium" style={styles.sectionTitle}>Timeline</Text>
          <Text style={styles.timelineText}>Expected delivery: 4 weeks</Text>
          <Text style={styles.timelineText}>Posted: 2 days ago</Text>
        </Surface>
      </ScrollView>

      {/* Bottom Action Bar */}
      <Surface style={styles.bottomBar} elevation={2}>
        <Button 
          mode="outlined" 
          onPress={() => router.back()}
          style={styles.button}
        >
          Back
        </Button>
        <Button 
          mode="contained"
          onPress={() => router.push('/make-offer')}
          style={[styles.button, styles.makeOfferButton]}
        >
          Make Offer
        </Button>
      </Surface>
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
  headerTitle: {
    fontFamily: 'Poppins-SemiBold',
    color: '#333',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  taskTitle: {
    fontFamily: 'Poppins-SemiBold',
    color: '#333',
    marginBottom: 12,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  tag: {
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: 'rgba(255,87,51,0.1)',
  },
  price: {
    fontSize: 18,
    color: '#FF5733',
    fontFamily: 'Poppins-SemiBold',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.05)',
    marginVertical: 16,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 8,
    color: '#333',
  },
  description: {
    color: '#666',
    lineHeight: 22,
  },
  requirementsList: {
    marginTop: 8,
  },
  requirementItem: {
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
  timelineText: {
    color: '#666',
    marginBottom: 8,
  },
  bottomBar: {
    padding: 16,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
  },
  makeOfferButton: {
    backgroundColor: '#FF5733',
  },
}); 