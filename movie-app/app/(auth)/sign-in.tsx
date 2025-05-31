import { icons } from '@/constants/icons'
import { useAuth } from '@/context/auth'
import { Link } from 'expo-router'
import React, { useState } from 'react'
import { ActivityIndicator, Alert, Image, Text, TextInput, TouchableOpacity, View } from 'react-native'

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn } = useAuth()

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields')
      return
    }

    try {
      setLoading(true)
      await signIn(email, password)
    } catch (error) {
      console.log('Login error:', error)
      Alert.alert('Login Failed', 'Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <View className="flex-1 bg-primary px-8 justify-center">
      <View className="items-center mb-10">
        <Image source={icons.logo} className="w-12 h-12 object-contain" />
        <Text className="text-white text-2xl font-bold mt-4">Welcome Back</Text>
        <Text className="text-light-300 text-base mt-2">Sign in to your account</Text>
      </View>
      
      <View className="gap-4">
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
            placeholder="Enter your password"
            placeholderTextColor="#9CA4AB"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
      </View>

      <TouchableOpacity 
        className="bg-accent mt-8 p-4 rounded-lg items-center"
        onPress={handleSignIn}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white font-bold text-base">Sign In</Text>
        )}
      </TouchableOpacity>

      <View className="flex-row justify-center mt-6">
        <Text className="text-light-300">Don&apos;t have an account? </Text>
        <Link href="/sign-up" asChild>
          <TouchableOpacity>
            <Text className="text-accent font-bold">Sign Up</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  )
}

export default SignIn