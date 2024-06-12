import { View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import CustomButton from '@/components/CustomButton'

// import {images} from '../../constants'
import images from '@/constants/images'
import Donut2 from '@/components/Donut2'

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
          <CustomButton title='Today' handlePress={() => { }} containerStyles="mr-6 w-[76px]" textStyles="text-[12px]"></CustomButton>
          <CustomButton title='Week' handlePress={() => { }} containerStyles="mr-6 w-[76px]" textStyles="text-[12px]"></CustomButton>
          <CustomButton title='Month' handlePress={() => { }} containerStyles="mr-6 w-[76px]" textStyles="text-[12px]"></CustomButton>
        </View>

        <TouchableOpacity className='bg-black' onPress={() => { }}>
          {/* <Text>Press Here</Text> */}
          <Image source={images.add} className='w-[26px] h-[26px]' />

        </TouchableOpacity>
      </View>

      {/* habit list */}
      <View className='mt-4'>
        <View className='flex-row justify-between items-center h-[160px] bg-mypurple-light rounded-xl px-4'>
          <View className='flex-col'>
            <View className='flex-row items-center space-x-4 mb-2'>
              <View className='bg-mypurple h-[36px] w-[36px] rounded-full justify-center items-center'>
                <Image
                  source={images.ball}
                  className='w-[26px] h-[26px]'
                  resizeMode='contain'
                />
              </View>
              <Text className='font-semibold text-[20px]'>Sport</Text>
            </View>
            <Text className='text-[12px] text-mygray'>2024.03.07-2024.09.07</Text>
            <Text className='text-[12px] text-mygray'>每天一次</Text>
            <Text className='text-[12px] text-mygray'>已坚持30天</Text>
          </View>

          {/* <Donut /> */}
          
          <Donut2 />


        </View>
      </View>

    </SafeAreaView>
  )
}

export default Home