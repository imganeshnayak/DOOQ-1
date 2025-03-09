import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { Text, Searchbar, List, Avatar, Divider } from 'react-native-paper';
import { useState } from 'react';
import { router } from 'expo-router';
import { useRouter } from 'expo-router';

const messages = [
  {
    id: 1,
    user: {
      name: 'John Smith',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36',
    },
    lastMessage: 'I can help you with moving the furniture tomorrow.',
    time: '5m ago',
    unread: true,
    task: 'Help with Moving',
  },
  {
    id: 2,
    user: {
      name: 'Sarah Wilson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    },
    lastMessage: 'The garden looks great! Thank you for your help.',
    time: '2h ago',
    unread: false,
    task: 'Garden Maintenance',
  },
  {
    id: 3,
    user: {
      name: 'Mike Johnson',
      avatar: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c',
    },
    lastMessage: "I'll bring my tools for the furniture assembly.",
    time: '1d ago',
    unread: false,
    task: 'Furniture Assembly',
  },
];

export default function MessagesScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.title}>Messages</Text>
        <Searchbar
          placeholder="Search messages"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
          elevation={1}
        />
      </View>

      <ScrollView style={styles.messageList}>
        {messages.map((message, index) => (
          <View key={message.id}>
            <List.Item
              title={message.user.name}
              description={message.lastMessage}
              left={() => (
                <Avatar.Image
                  size={50}
                  source={{ uri: message.user.avatar }}
                  style={styles.avatar}
                />
              )}
              right={() => (
                <View style={styles.messageInfo}>
                  <Text variant="bodySmall" style={styles.time}>
                    {message.time}
                  </Text>
                  {message.unread && <View style={styles.unreadDot} />}
                </View>
              )}
              onPress={() => router.push(`/messages/${message.id.toString()}`)}
              style={[
                styles.messageItem,
                message.unread && styles.unreadMessage,
              ]}
            />
            <Text variant="bodySmall" style={styles.taskName}>
              Re: {message.task}
            </Text>
            {index < messages.length - 1 && <Divider />}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 16,
  },
  searchBar: {
    backgroundColor: '#f5f5f5',
  },
  messageList: {
    flex: 1,
  },
  messageItem: {
    paddingVertical: 12,
  },
  unreadMessage: {
    backgroundColor: '#fff5f2',
  },
  avatar: {
    marginRight: 12,
  },
  messageInfo: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginRight: 8,
  },
  time: {
    color: '#666',
    marginBottom: 4,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF5733',
  },
  taskName: {
    color: '#666',
    paddingHorizontal: 16,
    paddingBottom: 12,
    fontStyle: 'italic',
  },
});