import { View, Text,Image } from 'react-native'
import React from 'react'

import images from '@/constants/images'
import Donut2 from '@/components/Donut2'

const HabitCard = ({
    beginDate,
    endDate,
    everyCount,
    name,
    habitId
  }: {
    beginDate: string,
    endDate: string,
    everyCount: string,
    name: string,
    habitId: string
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
          <Text className='text-[12px] text-mygray'>Completed today: {everyCount}</Text>
          {/* <Text className='text-[12px] text-mygray'>Completed total: {totalCount}</Text> */}
          
        </View>
  
        {/* <Donut /> */}
  
        <Donut2 everyCount={Number(everyCount)}/>
  
  
      </View>
    </View>
  }

export default HabitCard