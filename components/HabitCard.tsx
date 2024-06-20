import { View, Text,Image } from 'react-native'
import React from 'react'

import images from '@/constants/images'
import Donut2 from '@/components/Donut2'
import { Habit } from '@/lib/storage'

const HabitCard = ({
    clickCount,
    habit,
    doneCallBack
  }: {
    clickCount: number,
    habit: Habit,
    doneCallBack: () => void
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
            <Text className='font-semibold text-[20px]'>{habit.name}</Text>
          </View>
          <Text className='text-[12px] text-mygray'>{habit.startDate}-{habit.endDate}</Text>
          {/* <Text className='text-[12px] text-mygray'>每天一次</Text> */}
          <Text className='text-[12px] text-mygray'>Completed today: {habit.everyCount}</Text>
          {/* <Text className='text-[12px] text-mygray'>Completed total: {totalCount}</Text> */}
          
        </View>
  
        {/* <Donut /> */}
  
        <Donut2 clickCount1={clickCount} habit={habit} doneCallBack={doneCallBack}/>
  
  
      </View>
    </View>
  }

export default HabitCard