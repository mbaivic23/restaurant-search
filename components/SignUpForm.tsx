import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { register } from "@/services/authService";
import { useAuth } from "@/context/AuthContext";

interface SignUpFormProps {
  onSuccess?: () => void;
  onSwitchToSignIn?: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({
  onSuccess,
  onSwitchToSignIn,
}) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const { setUser } = useAuth();

  const handleInputChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    if (
      !formData.email ||
      !formData.password ||
      !formData.firstName ||
      !formData.lastName
    ) {
      Alert.alert("Validation Error", "All fields are required");
      return false;
    }
    if (!validateEmail(formData.email)) {
      Alert.alert("Validation Error", "Please enter a valid email address");
      return false;
    }
    if (formData.password.length < 6) {
      Alert.alert("Validation Error", "Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;
    setLoading(true);
    try {
      const user = await register(formData);
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
    <View className="w-full min-w-[400px] self-center p-6">
      <Text className="text-3xl font-bold text-center dark:text-white text-zinc-800 mb-8">
        Registrirajte se
      </Text>
      <Text className="text-sm font-medium dark:text-gray-300 text-zinc-700 mb-1">
        Ime
      </Text>
      <TextInput
        className="w-full px-4 py-2 mb-4 border border-zinc-200 dark:border-zinc-700 rounded-md dark:bg-zinc-700 bg-zinc-200 dark:text-white text-black"
        placeholder="Unesite vaše ime"
        placeholderTextColor="#9CA3AF"
        value={formData.firstName}
        onChangeText={(text) => handleInputChange("firstName", text)}
      />
      <Text className="text-sm font-medium dark:text-gray-300 text-zinc-700 mb-1">
        Prezime
      </Text>
      <TextInput
        className="w-full px-4 py-2 mb-4 border border-zinc-200 dark:border-zinc-700 rounded-md dark:bg-zinc-700 bg-zinc-200 dark:text-white text-black"
        placeholder="Unesite vaše prezime"
        placeholderTextColor="#9CA3AF"
        value={formData.lastName}
        onChangeText={(text) => handleInputChange("lastName", text)}
      />
      <Text className="text-sm font-medium dark:text-gray-300 text-zinc-700 mb-1">
        Email
      </Text>
      <TextInput
        className="w-full px-4 py-2 mb-4 border border-zinc-200 dark:border-zinc-700 rounded-md dark:bg-zinc-700 bg-zinc-200 dark:text-white text-black"
        placeholder="Unesite email adresu"
        placeholderTextColor="#9CA3AF"
        keyboardType="email-address"
        autoCapitalize="none"
        value={formData.email}
        onChangeText={(text) => handleInputChange("email", text)}
      />
      <Text className="text-sm font-medium dark:text-gray-300 text-zinc-700 mb-1">
        Lozinka
      </Text>
      <TextInput
        className="w-full px-4 py-2 mb-4 border border-zinc-200 dark:border-zinc-700 rounded-md dark:bg-zinc-700 bg-zinc-200 dark:text-white text-black"
        placeholder="Unesite lozinku"
        placeholderTextColor="#9CA3AF"
        secureTextEntry
        value={formData.password}
        onChangeText={(text) => handleInputChange("password", text)}
      />
      <TouchableOpacity
        className={`w-full py-3 my-4 rounded-md items-center justify-center ${
          loading ? "bg-zinc-900" : "bg-zinc-950"
        }`}
        onPress={handleSignUp}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text className="text-white font-medium text-center">
            Registrirajte se
          </Text>
        )}
      </TouchableOpacity>

      {onSwitchToSignIn && (
        <View className="flex-row justify-between mt-4 px-1">
          <Text className="text-zinc-600 dark:text-zinc-300">Imate račun?</Text>
          <TouchableOpacity onPress={onSwitchToSignIn} className="ml-2">
            <Text className="text-blue-600 dark:text-blue-400 font-medium">
              Prijavite se
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default SignUpForm;
