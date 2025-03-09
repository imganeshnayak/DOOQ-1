import { View, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Text, Surface, Avatar } from 'react-native-paper';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import customTheme from '../theme'; // Import the custom theme

const messagesData = {
  1: [
    { sender: 'John Smith', message: 'I can help you with moving the furniture tomorrow.' },
    { sender: 'You', message: 'Great! What time works for you?' },
  ],
  2: [
    { sender: 'Sarah Wilson', message: 'The garden looks great! Thank you for your help.' },
    { sender: 'You', message: 'I\'m glad you liked it!' },
  ],
  3: [
    { sender: 'Mike Johnson', message: "I'll bring my tools for the furniture assembly." },
    { sender: 'You', message: 'Perfect! See you then.' },
  ],
};

export default function ChatScreen() {
  const { id } = useLocalSearchParams();
  const [newMessage, setNewMessage] = useState('');

  const chatMessages = messagesData[id] || [];

  const handleSend = () => {
    // Logic to send the message (e.g., update state, send to server)
    console.log('Message sent:', newMessage);
    setNewMessage('');
  };

  // Define the user based on the ID
  const user = {
    name: id === '1' ? 'John Smith' : id === '2' ? 'Sarah Wilson' : 'Mike Johnson',
    avatar: id === '1' ? 'https://images.unsplash.com/photo-1599566150163-29194dcaad36' :
            id === '2' ? 'https://images.unsplash.com/photo-1494790108377-be9c29b29330' :
            'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c',
  };

  return (
    <View style={styles.container}>
      {/* Header with User Info */}
      <Surface style={styles.header} elevation={0}>
        <Avatar.Image size={40} source={{ uri: user.avatar }} />
        <Text style={styles.headerTitle}>{user.name}</Text>
      </Surface>

      {/* Chat Messages */}
      <ScrollView style={styles.chatContainer}>
        {chatMessages.map((msg, index) => (
          <View key={index} style={msg.sender === 'You' ? styles.myMessageBubble : styles.messageBubble}>
            <Text style={styles.sender}>{msg.sender}:</Text>
            <Text style={styles.message}>{msg.message}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Input Box and Send Button */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          placeholderTextColor="#999" // Add placeholder text color
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // White background
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 40, // Add padding to the top to adjust header position
    backgroundColor: '#fff', // White background for header
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0', // Light gray border
  },
  headerTitle: {
    marginLeft: 12,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18, // Increase font size for better visibility
    color: '#000', // Black text
  },
  chatContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff', // White background
  },
  messageBubble: {
    marginBottom: 10,
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#f1f1f1', // Light gray background for received messages
    maxWidth: '80%', // Limit message width
  },
  myMessageBubble: {
    marginBottom: 10,
    padding: 12,
    borderRadius: 10,
    backgroundColor: customTheme.colors.primary, // Use theme primary color for sent messages
    alignSelf: 'flex-end', // Align to the right
    maxWidth: '80%', // Limit message width
  },
  sender: {
    fontWeight: 'bold',
    color: '#000', // Black text
  },
  message: {
    marginTop: 4,
    color: '#000', // Black text
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0', // Light gray border
    backgroundColor: '#fff', // White background
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e0e0e0', // Light gray border
    borderRadius: 25, // Make the input box more rounded
    paddingHorizontal: 16, // Add horizontal padding
    paddingVertical: 10, // Add vertical padding
    marginRight: 10,
    backgroundColor: '#fff', // White background for input
    fontSize: 16, // Increase font size
    color: '#000', // Black text
  },
  sendButton: {
    backgroundColor: customTheme.colors.primary, // Use theme primary color
    borderRadius: 25, // Make the button more rounded
    paddingVertical: 12, // Add vertical padding
    paddingHorizontal: 20, // Add horizontal padding
  },
  sendButtonText: {
    color: '#fff', // White text for the send button
    fontSize: 16, // Increase font size
    fontWeight: 'bold', // Make text bold
  },
});