import { WalletSdk } from "@circle-fin/w3s-pw-react-native-sdk";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

export const CircleWallet = () => {
  const [walletInfo, setWalletInfo] = useState<string>(
    "No wallet info available"
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize the SDK
  const initializeSDK = async () => {
    try {
      setLoading(true);
      setError(null);

      // Replace with your actual app ID and API URL
      const appId = "YOUR_APP_ID";
      const apiUrl = "https://api.circle.com/v1/w3s";

      // Initialize the SDK
      await WalletSdk.init({
        appId,
        endpoint: apiUrl,
      });

      setWalletInfo("SDK initialized successfully");
      setLoading(false);
    } catch (err) {
      setError(
        `Error initializing SDK: ${
          err instanceof Error ? err.message : String(err)
        }`
      );
      setLoading(false);
    }
  };

  // Execute a challenge (example function)
  const executeChallenge = async () => {
    try {
      setLoading(true);
      setError(null);

      // Replace with your actual user token, encryption key, and challenge IDs
      const userToken = "YOUR_USER_TOKEN";
      const encryptionKey = "YOUR_ENCRYPTION_KEY";
      const challengeIds = ["YOUR_CHALLENGE_ID"];

      // Execute the challenge
      WalletSdk.execute(
        userToken,
        encryptionKey,
        challengeIds,
        (result) => {
          setWalletInfo(
            `Challenge executed successfully: ${JSON.stringify(
              result,
              null,
              2
            )}`
          );
          setLoading(false);
        },
        (error) => {
          setError(`Error executing challenge: ${error.message}`);
          setLoading(false);
        }
      );
    } catch (err) {
      setError(
        `Error executing challenge: ${
          err instanceof Error ? err.message : String(err)
        }`
      );
      setLoading(false);
    }
  };

  // Set biometrics PIN
  const setBiometricsPin = async () => {
    try {
      setLoading(true);
      setError(null);

      // Replace with your actual user token and encryption key
      const userToken = "YOUR_USER_TOKEN";
      const encryptionKey = "YOUR_ENCRYPTION_KEY";

      // Set biometrics PIN
      WalletSdk.setBiometricsPin(
        userToken,
        encryptionKey,
        (result) => {
          setWalletInfo(
            `Biometrics PIN set successfully: ${JSON.stringify(
              result,
              null,
              2
            )}`
          );
          setLoading(false);
        },
        (error) => {
          setError(`Error setting biometrics PIN: ${error.message}`);
          setLoading(false);
        }
      );
    } catch (err) {
      setError(
        `Error setting biometrics PIN: ${
          err instanceof Error ? err.message : String(err)
        }`
      );
      setLoading(false);
    }
  };

  // Get device ID
  const getDeviceId = () => {
    try {
      const deviceId = WalletSdk.getDeviceId();
      setWalletInfo(`Device ID: ${deviceId}`);
    } catch (err) {
      setError(
        `Error getting device ID: ${
          err instanceof Error ? err.message : String(err)
        }`
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Circle Programmable Wallet</Text>

      <ScrollView style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={initializeSDK}
          disabled={loading}
        >
          <Text style={styles.buttonText}>Initialize SDK</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={executeChallenge}
          disabled={loading}
        >
          <Text style={styles.buttonText}>Execute Challenge</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={setBiometricsPin}
          disabled={loading}
        >
          <Text style={styles.buttonText}>Set Biometrics PIN</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={getDeviceId}
          disabled={loading}
        >
          <Text style={styles.buttonText}>Get Device ID</Text>
        </TouchableOpacity>
      </ScrollView>

      {loading && <Text style={styles.loading}>Loading...</Text>}
      {error && <Text style={styles.error}>{error}</Text>}

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Wallet Information:</Text>
        <ScrollView style={styles.infoScroll}>
          <Text style={styles.infoText}>{walletInfo}</Text>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  buttonContainer: {
    maxHeight: 200,
  },
  button: {
    backgroundColor: "#3498db",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  loading: {
    marginVertical: 10,
    fontSize: 16,
    color: "#2980b9",
    textAlign: "center",
  },
  error: {
    marginVertical: 10,
    fontSize: 16,
    color: "#e74c3c",
    textAlign: "center",
  },
  infoContainer: {
    flex: 1,
    marginTop: 20,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 12,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  infoScroll: {
    flex: 1,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 20,
  },
});
