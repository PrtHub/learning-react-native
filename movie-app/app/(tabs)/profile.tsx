import { Link } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { icons } from "@/constants/icons";
import { useAuth } from "@/context/auth";
import { updateUserName } from "@/services/appwrite";

const Profile = () => {
  const { user, signOut } = useAuth();
  const [updating, setUpdating] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [isEditing, setIsEditing] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.log("Logout error:", error);
      Alert.alert("Error", "Failed to log out");
    }
  };

  const handleUpdateName = async () => {
    if (!name.trim()) {
      Alert.alert("Error", "Name cannot be empty");
      return;
    }

    try {
      setUpdating(true);
      await updateUserName(name);
      setIsEditing(false);
      Alert.alert("Success", "Name updated successfully");
    } catch (error) {
      console.log("Update name error:", error);
      Alert.alert("Error", "Failed to update name");
    } finally {
      setUpdating(false);
    }
  };

  if (!user) {
    return (
      <View className="flex-1 bg-primary items-center justify-center">
        <ActivityIndicator size="large" color="#AB8BFF" />
      </View>
    );
  }

  if (!user) {
    return (
      <View className="flex-1 bg-primary items-center justify-center">
        <Text className="text-white text-xl mb-6">
          Please sign in to view your profile
        </Text>
        <Link href="/sign-in" asChild>
          <TouchableOpacity className="bg-accent px-6 py-3 rounded-lg">
            <Text className="text-white font-bold text-base">Sign In</Text>
          </TouchableOpacity>
        </Link>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-primary px-5">
      <View className="items-center mb-8 mt-24">
        <View className="w-24 h-24 rounded-full bg-dark-100 items-center justify-center mb-4">
          <Text className="text-white text-3xl font-bold">
            {name.charAt(0).toUpperCase()}
          </Text>
        </View>
        {isEditing ? (
          <View className="w-full">
            <TextInput
              className="bg-dark-100 text-white p-4 rounded-lg text-center mb-4"
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
              placeholderTextColor="#9CA4AB"
            />
            <View className="flex-row justify-center gap-4">
              <TouchableOpacity
                className="bg-accent px-6 py-2 rounded-lg"
                onPress={handleUpdateName}
                disabled={updating}
              >
                {updating ? (
                  <ActivityIndicator color="#fff" size="small" />
                ) : (
                  <Text className="text-white font-bold">Save</Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-dark-100 px-6 py-2 rounded-lg"
                onPress={() => {
                  setName(user.name);
                  setIsEditing(false);
                }}
                disabled={updating}
              >
                <Text className="text-white font-bold">Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <>
            <Text className="text-white text-2xl font-bold">{name}</Text>
            <TouchableOpacity onPress={() => setIsEditing(true)}>
              <Text className="text-accent mt-1">Edit Name</Text>
            </TouchableOpacity>
          </>
        )}
        <Text className="text-light-300 mt-2">{user.email}</Text>
      </View>

      <View className="bg-dark-100 rounded-lg p-5 mt-4">
        <Text className="text-white text-lg font-bold mb-4">Account</Text>

        <TouchableOpacity
          className="flex-row items-center py-3 border-b border-dark-200"
          onPress={() =>
            Alert.alert(
              "Coming Soon",
              "This feature will be available in a future update."
            )
          }
        >
          <Image source={icons.play} className="w-5 h-5 mr-3" />
          <Text className="text-white">Watchlist</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-row items-center py-3 border-b border-dark-200"
          onPress={() =>
            Alert.alert(
              "Coming Soon",
              "This feature will be available in a future update."
            )
          }
        >
          <Image source={icons.play} className="w-5 h-5 mr-3" />
          <Text className="text-white">App Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-row items-center py-3"
          onPress={handleLogout}
        >
          <Image source={icons.play} className="w-5 h-5 mr-3" />
          <Text className="text-accent">Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;
