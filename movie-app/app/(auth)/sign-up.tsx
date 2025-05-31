import { icons } from '@/constants/icons'
import { useAuth } from '@/context/auth'
import { Link } from 'expo-router'
import React, { useState } from 'react'
import { ActivityIndicator, Alert, Image, Text, TextInput, TouchableOpacity, View } from 'react-native'

const SignUp = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { signUp } = useAuth()

  const handleSignUp = async () => {
    if (!name || !email || !password) {
      Alert.alert('Error', 'Please fill in all fields')
      return
    }

    if (password.length < 8) {
      Alert.alert('Error', 'Password must be at least 8 characters')
      return
    }

    try {
      setLoading(true)
      await signUp(email, password, name)
      // No need to navigate, the auth context will handle redirection
    } catch (error) {
      console.log('Sign up error:', error)
      Alert.alert('Sign Up Failed', 'Could not create account. Email may already be in use.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <View className="flex-1 bg-primary px-8 justify-center">
      <View className="items-center mb-10">
        <Image source={icons.logo} className="w-12 h-12 object-contain" />
        <Text className="text-white text-2xl font-bold mt-4">Create Account</Text>
        <Text className="text-light-300 text-base mt-2">Sign up to get started</Text>
      </View>
      
      <View className="gap-4">
        <View>
          <Text className="text-white text-base mb-2">Name</Text>
          <TextInput
            className="bg-dark-100 text-white p-4 rounded-lg"
            placeholder="Enter your name"
            placeholderTextColor="#9CA4AB"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View>
          <Text className="text-white text-base mb-2">Email</Text>
          <TextInput
            className="bg-dark-100 text-white p-4 rounded-lg"
            placeholder="Enter your email"
            placeholderTextColor="#9CA4AB"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        
        <View>
          <Text className="text-white text-base mb-2">Password</Text>
          <TextInput
            className="bg-dark-100 text-white p-4 rounded-lg"
            placeholder="Enter your password (min. 8 characters)"
            placeholderTextColor="#9CA4AB"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
      </View>

      <TouchableOpacity 
        className="bg-accent mt-8 p-4 rounded-lg items-center"
        onPress={handleSignUp}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white font-bold text-base">Create Account</Text>
        )}
      </TouchableOpacity>

      <View className="flex-row justify-center mt-6">
        <Text className="text-light-300">Already have an account? </Text>
        <Link href="/sign-in" asChild>
          <TouchableOpacity>
            <Text className="text-accent font-bold">Sign In</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  )
}

export default SignUp
