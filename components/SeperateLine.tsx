import { View, Text } from 'react-native'
import React from 'react'

const SeperateLine = () => {
  return (
    <View className='flex-row mt-4 justify-center items-center space-x-4'>
        <View className='h-[1px] w-1/12 bg-mygray '></View>
        <Text className='text-mygray text-[12px]'>Finished</Text>
        <View className='h-[1px] w-1/12 bg-mygray '></View>
      </View>
  )
}

export default SeperateLine