import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./api";
import {
  loginSchema,
  registerSchema,
  userSchema,
  LoginInput,
  RegisterInput,
  User,
} from "@/utils/validation";
export interface AuthResponse {
  message: string;
  user: User;
  token: string;
  refreshToken: string;
}

export type { LoginInput as LoginData, RegisterInput as RegisterData, User };
export const register = async (data: RegisterInput): Promise<User> => {
  try {
    const result = registerSchema.safeParse(data);
    if (!result.success) {
      const errorMessages = result.error.errors
        .map((err) => `${err.path.join(".")}: ${err.message}`)
        .join(", ");
      throw new Error(`Greška u validaciji: ${errorMessages}`);
    }
    const response = await api.post<AuthResponse>("/auth/register", data);
    await AsyncStorage.setItem("accessToken", response.data.token);
    await AsyncStorage.setItem("refreshToken", response.data.refreshToken);
    await AsyncStorage.setItem("user", JSON.stringify(response.data.user));
    return response.data.user;
  } catch (error) {
    console.error("Greška u registraciji :", error);
    throw error;
  }
};

export const login = async (data: LoginInput): Promise<User> => {
  try {
    const result = loginSchema.safeParse(data);
    if (!result.success) {
      const errorMessages = result.error.errors
        .map((err) => `${err.path.join(".")}: ${err.message}`)
        .join(", ");
      throw new Error(`Greška u validaciji: ${errorMessages}`);
    }
    const response = await api.post<AuthResponse>("/auth/login", data);
    await AsyncStorage.setItem("accessToken", response.data.token);
    await AsyncStorage.setItem("refreshToken", response.data.refreshToken);
    await AsyncStorage.setItem("user", JSON.stringify(response.data.user));
    return response.data.user;
  } catch (error) {
    console.error("Greška u prijavi:", error);
    throw error;
  }
};

export const logout = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem("accessToken");
    await AsyncStorage.removeItem("refreshToken");
    await AsyncStorage.removeItem("user");
  } catch (error) {
    console.error("Greška u odjavi:", error);
    throw error;
  }
};

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const userJson = await AsyncStorage.getItem("user");
    if (!userJson) return null;
    const userData = JSON.parse(userJson);
    const result = userSchema.safeParse(userData);

    if (result.success) {
      return result.data;
    } else {
      console.warn("Nevažeći korisnički podaci u pohrani:", result.error);
      await AsyncStorage.removeItem("user");
      return null;
    }
  } catch (error) {
    console.error("Greška pri dohvaćanju trenutnog korisnika:", error);
    return null;
  }
};

export const isAuthenticated = async (): Promise<boolean> => {
  try {
    const token = await AsyncStorage.getItem("accessToken");
    return !!token;
  } catch (error) {
    console.error("Greška pri provjeri autentifikacije:", error);
    return false;
  }
};
