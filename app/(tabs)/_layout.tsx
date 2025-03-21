import { Tabs } from 'expo-router';
import { Chrome as Home, Search, SquarePlus as PlusSquare, MessageSquare, User, FileSearch, Send } from 'lucide-react-native';
import { Text } from 'react-native-paper';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: 'rgba(0,0,0,0.05)',
          elevation: 0,
          backgroundColor: '#fff',
        },
        tabBarActiveTintColor: '#FF5733',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
          tabBarLabel: ({ color }) => (
            <Text style={{ color, fontSize: 12, fontFamily: 'Poppins-Regular' }}>
              Home
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color, size }) => <Search size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="post-task"
        options={{
          title: 'Post Task',
          tabBarIcon: ({ color, size }) => <PlusSquare size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: 'Messages',
          tabBarIcon: ({ color, size }) => <MessageSquare size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="view-details"
        options={{
          title: 'Details',
          tabBarIcon: ({ color }) => <FileSearch size={24} color={color} />,
          tabBarLabel: ({ color }) => (
            <Text style={{ color, fontSize: 12, fontFamily: 'Poppins-Regular' }}>
              Details
            </Text>
          ),
          href: null,
        }}
      />
      <Tabs.Screen
        name="make-offer"
        options={{
          title: 'Offer',
          tabBarIcon: ({ color }) => <Send size={24} color={color} />,
          tabBarLabel: ({ color }) => (
            <Text style={{ color, fontSize: 12, fontFamily: 'Poppins-Regular' }}>
              Offer
            </Text>
          ),
          href: null,
        }}
      />
    </Tabs>
  );
}