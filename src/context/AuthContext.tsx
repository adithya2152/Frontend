import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { User } from "../types";

const API_BASE_URL = "http://localhost:3001/api";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (usernameOrEmail: string, password: string) => Promise<boolean>;
  logout: () => void;
  signup: (
    userData: Omit<User, "id" | "joinDate"> & { password: string }
  ) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validateAndSetUser = async () => {
      const token = localStorage.getItem("authToken");
      const userStr = localStorage.getItem("user");

      if (!token || !userStr) {
        setLoading(false);
        return;
      }

      try {
        const parsedUser: User = JSON.parse(userStr);

        // Use the /api/auth/me endpoint to validate token
        const response = await fetch(`${API_BASE_URL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            throw new Error("Token invalid");
          }
          console.warn("Server error, using cached user data");
          setUser(parsedUser);
          setLoading(false);
          return;
        }

        const data = await response.json();

        if (data.success && data.data) {
          // Map the backend user data to your User type
          const userData: User = {
            id: data.data.id,
            username: data.data.username,
            role: data.data.role as "manager" | "driver" | "user",
            email: data.data.mail,
            // Add other fields based on your User type and backend response
            ...(data.data.role === "manager" && {
              created_at: data.data.created_at,
              updated_at: data.data.updated_at,
            }),
            ...(data.data.role === "driver" && {
              first_name: data.data.first_name,
              last_name: data.data.last_name,
              license_number: data.data.license_number,
              license_class: data.data.license_class,
              date_of_birth: data.data.date_of_birth,
              insurance_policy_number: data.data.insurance_policy_number,
              phone_number: data.data.phone_number,
              address: data.data.address,
              image_url: data.data.image_url,
              manager_id: data.data.manager_id,
            }),
          };

          setUser(userData);
          localStorage.setItem("user", JSON.stringify(userData));
        }
      } catch (error) {
        const err = error as Error;
        console.error("Auth validation error:", err);
        if (err.message === "Token invalid") {
          setUser(null);
          localStorage.removeItem("authToken");
          localStorage.removeItem("user");
        } else {
          const parsedUser = JSON.parse(userStr);
          setUser(parsedUser);
        }
      } finally {
        setLoading(false);
      }
    };

    validateAndSetUser();
  }, []);

  const login: AuthContextType["login"] = async (usernameOrEmail, password) => {
    setLoading(true);
    try {
      // Use your backend's single login endpoint
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: usernameOrEmail, // Your backend expects 'username' field
          password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success && data.data.token) {
        const rawUserData = data.data;

        // Map the backend response to your User type
        console.log("User data received:", rawUserData);
        const userData: User = {
          id: rawUserData.id,
          username: rawUserData.username,
          role: rawUserData.role as "manager" | "driver" | "user",
          email: rawUserData.mail,
          // Add conditional fields based on role
          ...(rawUserData.role === "manager" && {
            created_at: rawUserData.created_at,
            updated_at: rawUserData.updated_at,
          }),
          ...(rawUserData.role === "driver" && {
            first_name: rawUserData.first_name,
            last_name: rawUserData.last_name,
            license_number: rawUserData.license_number,
            license_class: rawUserData.license_class,
            date_of_birth: rawUserData.date_of_birth,
            insurance_policy_number: rawUserData.insurance_policy_number,
            phone_number: rawUserData.phone_number,
            address: rawUserData.address,
            image_url: rawUserData.image_url,
            manager_id: rawUserData.manager_id,
          }),
        };

        setUser(userData);
        console.log("Setting user in context:", userData);
        localStorage.setItem("authToken", rawUserData.token);
        localStorage.setItem("user", JSON.stringify(userData));

        return true;
      }

      return false;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  };

  const signup: AuthContextType["signup"] = async (userData) => {
    setLoading(true);
    try {
      // Use your backend's register endpoint
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: userData.email.split("@")[0], // Generate username from email
          email: userData.email,
          password: userData.password,
          role: userData.role,
          // Add other profile data based on role
          ...(userData.role === "driver" && {
            first_name: userData.first_name,
            last_name: userData.last_name,
            phone_number: userData.phone_number,
            license_number: userData.license_number,
            license_class: userData.license_class || "Class A",
            date_of_birth:
              userData.date_of_birth || new Date().toISOString().split("T")[0],
            insurance_policy_number:
              userData.insurance_policy_number || "INS123",
            address: userData.address || "Default Address",
            manager_id: userData.manager_id,
          }),
        }),
      });

      const data = await response.json();

      if (response.ok && data.success && data.data.token) {
        const rawUserData = data.data;

        const fullUser: User = {
          id: rawUserData.id,
          role: userData.role,
          email: rawUserData.email,
          ...(userData.role === "manager" && {
            created_at: rawUserData.created_at,
            updated_at: rawUserData.updated_at,
          }),
          ...(userData.role === "driver" && {
            first_name: rawUserData.first_name,
            last_name: rawUserData.last_name,
            license_number: rawUserData.license_number,
            license_class: rawUserData.license_class,
            date_of_birth: rawUserData.date_of_birth,
            insurance_policy_number: rawUserData.insurance_policy_number,
            phone_number: rawUserData.phone_number,
            address: rawUserData.address,
            image_url: rawUserData.image_url,
            manager_id: rawUserData.manager_id,
          }),
        };

        setUser(fullUser);
        localStorage.setItem("authToken", rawUserData.token);
        localStorage.setItem("user", JSON.stringify(fullUser));
        return true;
      }

      return false;
    } catch (error) {
      console.error("Signup failed:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
