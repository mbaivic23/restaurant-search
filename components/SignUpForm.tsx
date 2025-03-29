import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { z } from "zod";
import { register } from "@/services/authService";
import { useAuth } from "@/context/AuthContext";
import { registerSchema } from "@/utils/validation";

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
  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
  }>({});

  const { setUser } = useAuth();

  const handleInputChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
    if (errors[field as keyof typeof errors]) {
      setErrors({
        ...errors,
        [field]: undefined,
      });
    }
  };
  const validateForm = (): boolean => {
    try {
      setErrors({});
      registerSchema.parse(formData);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors: {
          firstName?: string;
          lastName?: string;
          email?: string;
          password?: string;
        } = {};
        error.errors.forEach((err) => {
          const field = err.path[0];
          if (
            field === "firstName" ||
            field === "lastName" ||
            field === "email" ||
            field === "password"
          ) {
            formattedErrors[field] = err.message;
          }
        });
        setErrors(formattedErrors);
      }
      return false;
    }
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;
    setLoading(true);
    try {
      const user = await register(formData);
      setUser(user);
      if (onSuccess) onSuccess();
    } catch (error: any) {
      let errorMessage = "Nešto je pošlo po krivu";
      if (error.response?.data?.message)
        errorMessage = error.response.data.message;
      else if (error.message) errorMessage = error.message;
      Alert.alert("Greška", errorMessage);
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
        className={`w-full px-4 py-2 mb-1 border ${
          errors.firstName
            ? "border-red-500"
            : "border-zinc-200 dark:border-zinc-700"
        } rounded-md dark:bg-zinc-700 bg-zinc-200 dark:text-white text-black`}
        placeholder="Unesite vaše ime"
        placeholderTextColor="#9CA3AF"
        value={formData.firstName}
        onChangeText={(text) => handleInputChange("firstName", text)}
      />
      {errors.firstName && (
        <Text className="text-red-500 text-xs mb-2">{errors.firstName}</Text>
      )}

      <Text className="text-sm font-medium dark:text-gray-300 text-zinc-700 mb-1 mt-2">
        Prezime
      </Text>
      <TextInput
        className={`w-full px-4 py-2 mb-1 border ${
          errors.lastName
            ? "border-red-500"
            : "border-zinc-200 dark:border-zinc-700"
        } rounded-md dark:bg-zinc-700 bg-zinc-200 dark:text-white text-black`}
        placeholder="Unesite vaše prezime"
        placeholderTextColor="#9CA3AF"
        value={formData.lastName}
        onChangeText={(text) => handleInputChange("lastName", text)}
      />
      {errors.lastName && (
        <Text className="text-red-500 text-xs mb-2">{errors.lastName}</Text>
      )}

      <Text className="text-sm font-medium dark:text-gray-300 text-zinc-700 mb-1 mt-2">
        Email
      </Text>
      <TextInput
        className={`w-full px-4 py-2 mb-1 border ${
          errors.email
            ? "border-red-500"
            : "border-zinc-200 dark:border-zinc-700"
        } rounded-md dark:bg-zinc-700 bg-zinc-200 dark:text-white text-black`}
        placeholder="Unesite email adresu"
        placeholderTextColor="#9CA3AF"
        keyboardType="email-address"
        autoCapitalize="none"
        value={formData.email}
        onChangeText={(text) => handleInputChange("email", text)}
      />
      {errors.email && (
        <Text className="text-red-500 text-xs mb-2">{errors.email}</Text>
      )}

      <Text className="text-sm font-medium dark:text-gray-300 text-zinc-700 mb-1 mt-2">
        Lozinka
      </Text>
      <TextInput
        className={`w-full px-4 py-2 mb-1 border ${
          errors.password
            ? "border-red-500"
            : "border-zinc-200 dark:border-zinc-700"
        } rounded-md dark:bg-zinc-700 bg-zinc-200 dark:text-white text-black`}
        placeholder="Unesite lozinku"
        placeholderTextColor="#9CA3AF"
        secureTextEntry
        value={formData.password}
        onChangeText={(text) => handleInputChange("password", text)}
      />
      {errors.password && (
        <Text className="text-red-500 text-xs mb-2">{errors.password}</Text>
      )}

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
