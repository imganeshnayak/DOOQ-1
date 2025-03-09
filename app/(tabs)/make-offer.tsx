import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, TextInput, Surface } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';

export default function MakeOffer() {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <Surface style={styles.header} elevation={0}>
        <Text variant="headlineSmall" style={styles.headerTitle}>Make an Offer</Text>
      </Surface>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Offer Form */}
        <Surface style={styles.card} elevation={1}>
          <Text variant="titleMedium" style={styles.sectionTitle}>Offer Details</Text>
          
          <TextInput
            label="Offer Amount"
            mode="outlined"
            keyboardType="numeric"
            style={styles.input}
            placeholder="Enter amount"
          />

          <TextInput
            label="Description"
            mode="outlined"
            multiline
            numberOfLines={4}
            style={styles.input}
            placeholder="Describe your offer"
          />

          <TextInput
            label="Delivery Timeline"
            mode="outlined"
            style={styles.input}
            placeholder="Expected delivery date"
          />
        </Surface>

        {/* Terms and Conditions */}
        <Surface style={[styles.card, { marginTop: 16 }]} elevation={1}>
          <Text variant="titleMedium" style={styles.sectionTitle}>Terms & Conditions</Text>
          <Text style={styles.termsText}>
            By submitting this offer, you agree to our terms and conditions regarding the service delivery and payment process.
          </Text>
        </Surface>
      </ScrollView>

      {/* Bottom Buttons */}
      <Surface style={styles.bottomBar} elevation={2}>
        <Button 
          mode="outlined" 
          onPress={() => router.back()}
          style={styles.button}
        >
          Cancel
        </Button>
        <Button 
          mode="contained"
          onPress={() => {/* Handle submit */}}
          style={[styles.button, styles.submitButton]}
        >
          Submit Offer
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
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 16,
    color: '#333',
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  termsText: {
    color: '#666',
    lineHeight: 20,
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
  submitButton: {
    backgroundColor: '#FF5733',
  },
}); 