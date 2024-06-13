import { View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import CustomButton from '@/components/CustomButton'

// import {images} from '../../constants'
import images from '@/constants/images'
import Donut2 from '@/components/Donut2'
import { useGlobalContext } from '@/context/GlobalProvider'
import { getCurrentDateAndDayOfWeekInTimeZone, getDayDataByUserId } from '@/lib/get_data'


const HabitCard = ({
  beginDate,
  endDate,
  totalCount,
  name,
}: {
  beginDate: string,
  endDate: string,
  totalCount: string,
  name: string
}) => {
  return <View className='mt-4'>
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
          <Text className='font-semibold text-[20px]'>{name}</Text>
        </View>
        <Text className='text-[12px] text-mygray'>{beginDate}-{endDate}</Text>
        {/* <Text className='text-[12px] text-mygray'>每天一次</Text> */}
        <Text className='text-[12px] text-mygray'>Completed: {totalCount}</Text>
      </View>

      {/* <Donut /> */}

      <Donut2 />


    </View>
  </View>
}

const Home = () => {
  const { loading, isLogged } = useGlobalContext()

  const { currentDate, dayOfWeek } = getCurrentDateAndDayOfWeekInTimeZone()

  const dayHabit = getDayDataByUserId(123)




  return (
    <SafeAreaView className='mx-4'>
      {/* title */}
      <View className='flex-row h-16 justify-between items-center'>
        <Text className='font-extrabold text-[24px]'>Habit Partner</Text>
        <View>
          <Text className=''>{currentDate}</Text>
          <Text className=''>{dayOfWeek}</Text>
        </View>
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
      <HabitCard beginDate='2024-06-12' endDate='2024-09-12' totalCount='1' name='Sport' />
      <HabitCard beginDate='2024-06-11' endDate='2024-09-12' totalCount='1' name='Work' />
      {/* dividing ling */}
      <View className='flex-row mt-4 justify-center items-center space-x-4'>
        <View className='h-[1px] w-1/12 bg-mygray '></View>
        <Text className='text-mygray text-[12px]'>Finished</Text>
        <View className='h-[1px] w-1/12 bg-mygray '></View>
      </View>
      {/* finished list */}
      <HabitCard beginDate='2024-06-11' endDate='2024-09-12' totalCount='3' name='Games' />
      
      


    </SafeAreaView>
  )
}

export default Home