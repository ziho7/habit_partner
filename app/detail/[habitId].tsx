import { View, Text } from 'react-native'
import { useLocalSearchParams } from 'expo-router';
import React from 'react'

const Detail = () => {
    const {habitId} = useLocalSearchParams()
  return (
    <View>
      <Text>habitId: {habitId}</Text>
    </View>
  )
}

export default Detail