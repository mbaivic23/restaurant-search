import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { login } from "@/services/authService";
import { useAuth } from "@/context/AuthContext";

interface SignInFormProps {
  onSuccess?: () => void;
  onSwitchToSignUp?: () => void;
}

const SignInForm: React.FC<SignInFormProps> = ({
  onSuccess,
  onSwitchToSignUp,
}) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useAuth();

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    if (!email || !password) {
      Alert.alert("Validation Error", "Email and password are required");
      return false;
    }
    if (!validateEmail(email)) {
      Alert.alert("Validation Error", "Please enter a valid email address");
      return false;
    }
    return true;
  };

  const handleSignIn = async () => {
    if (!validateForm()) return;
    setLoading(true);
    try {
      const user = await login({ email, password });
      setUser(user);
      if (onSuccess) {
        onSuccess();
      }
    } catch (error: any) {
      let errorMessage = "Something went wrong";
      if (error.response?.data?.message)
        errorMessage = error.response.data.message;
      else if (error.message) errorMessage = error.message;
      Alert.alert("Error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="w-full min-w-[400px] p-6">
      <Text className="text-3xl font-bold text-center dark:text-white text-zinc-800 mb-8">
        Prijavite se
      </Text>
      <Text className="text-sm font-medium dark:text-gray-300 text-zinc-700 mb-1">
        Email
      </Text>
      <TextInput
        className="w-full px-4 py-2 mb-4 border border-zinc-200 dark:border-zinc-700 rounded-md dark:bg-zinc-700 bg-zinc-200 dark:text-white text-black"
        placeholder="Unesite email adresu"
        placeholderTextColor="#9CA3AF"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <Text className="text-sm font-medium dark:text-gray-300 text-zinc-700 mb-1">
        Lozinka
      </Text>
      <TextInput
        className="w-full px-4 py-2 mb-4 border border-zinc-200 dark:border-zinc-700 rounded-md dark:bg-zinc-700 bg-zinc-200 dark:text-white text-black"
        placeholder="Unesite lozinku"
        placeholderTextColor="#9CA3AF"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity
        className={`w-full py-3 my-4 rounded-md items-center justify-center ${
          loading ? "bg-zinc-900" : "bg-zinc-950"
        }`}
        onPress={handleSignIn}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text className="text-white font-medium text-center">
            Prijavite se
          </Text>
        )}
      </TouchableOpacity>

      {onSwitchToSignUp && (
        <View className="flex-row justify-between mt-4 px-1">
          <Text className="text-zinc-600 dark:text-zinc-300">
            Nemate račun?
          </Text>
          <TouchableOpacity onPress={onSwitchToSignUp} className="ml-2">
            <Text className="text-blue-600 dark:text-blue-400 font-medium">
              Registrirajte se
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default SignInForm;
