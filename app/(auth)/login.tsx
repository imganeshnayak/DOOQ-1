import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, Button, Surface } from 'react-native-paper';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Logo from '../components/Logo';

export default function Login() {
  const handleNext = () => {
    // For now, this will navigate to the tabs screen
    // You can modify this later to add validation or other login logic
    router.push('/(tabs)');
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <Logo size="large" />
        <Text style={styles.welcomeText}>Welcome back</Text>
      </View>

      {/* Content */}
      <Surface style={styles.content} elevation={0}>
        <Text variant="bodyLarge" style={styles.description}>
          Sign in to continue managing your tasks and staying productive
        </Text>
      </Surface>

      {/* Bottom Button */}
      <View style={styles.bottomContainer}>
        <Button
          mode="contained"
          onPress={handleNext}
          style={styles.button}
          contentStyle={styles.buttonContent}
        >
          Next
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    paddingTop: 80,
    paddingBottom: 40,
  },
  welcomeText: {
    marginTop: 16,
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
    color: '#666',
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  description: {
    color: '#666',
    lineHeight: 24,
  },
  bottomContainer: {
    padding: 24,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
  button: {
    borderRadius: 12,
    backgroundColor: '#FF5733',
  },
  buttonContent: {
    paddingVertical: 8,
  },
});