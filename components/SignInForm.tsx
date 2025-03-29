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
import { login } from "@/services/authService";
import { useAuth } from "@/context/AuthContext";
import { loginSchema } from "@/utils/validation";

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
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const { setUser } = useAuth();
  const validateForm = (): boolean => {
    try {
      setErrors({});
      loginSchema.parse({ email, password });
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors: { email?: string; password?: string } = {};
        error.errors.forEach((err) => {
          const field = err.path[0];
          if (field === "email" || field === "password") {
            formattedErrors[field] = err.message;
          }
        });
        setErrors(formattedErrors);
      }

      return false;
    }
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
      let errorMessage = "Nešto je pošlo po krivu";
      if (error.response && error.response.status === 401) {
        errorMessage =
          "Podaci za prijavu nisu valjani. Provjerite email i lozinku.";
      } else if (error.response?.data?.message)
        errorMessage = error.response.data.message;
      else if (error.message) errorMessage = error.message;
      Alert.alert("Greška", errorMessage);
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
        className={`w-full px-4 py-2 mb-1 border ${
          errors.email
            ? "border-red-500"
            : "border-zinc-200 dark:border-zinc-700"
        } rounded-md dark:bg-zinc-700 bg-zinc-200 dark:text-white text-black`}
        placeholder="Unesite email adresu"
        placeholderTextColor="#9CA3AF"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          if (errors.email) {
            setErrors({ ...errors, email: undefined });
          }
        }}
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
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          if (errors.password) {
            setErrors({ ...errors, password: undefined });
          }
        }}
      />
      {errors.password && (
        <Text className="text-red-500 text-xs mb-2">{errors.password}</Text>
      )}

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
