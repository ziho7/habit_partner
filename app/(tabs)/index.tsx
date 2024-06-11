import { View, Text, SafeAreaView, Button } from 'react-native'
import React from 'react'
import CustomButton from '@/components/CustomButton'

const Home = () => {
  return (
    <SafeAreaView className='mx-4'>
      {/* title */}
      <View className='flex-row h-16 justify-between items-center'>
        <Text className='font-extrabold text-[24px]'>Habit Partner</Text>
        <Text className=''>June 11</Text>
      </View>
      {/* calender */}
      <View className='flex-row h-16 justify-between items-center'>
        <View className='flex-row justify-start space-x-2'>
          <CustomButton title='Today' handlePress={() => { }}></CustomButton>
          <CustomButton title='Week' handlePress={() => { }}></CustomButton>
          <CustomButton title='Month' handlePress={() => { }}></CustomButton>
        </View>
        <Button title='Add'>

        </Button>


      </View>
    </SafeAreaView>
  )
}

export default Home