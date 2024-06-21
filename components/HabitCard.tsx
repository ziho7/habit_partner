import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'

import images from '@/constants/images'
import Donut2 from '@/components/Donut2'
import { Habit } from '@/lib/storage'
import { router } from 'expo-router'

const HabitCard = ({
  clickCount,
  habit,
  doneCallBack
}: {
  clickCount: number,
  habit: Habit,
  doneCallBack: () => void
}) => {

  const calculateCompletedDays = (habit: Habit) => {
    const recordArray = Array.from(habit.records.values());
    return recordArray.filter((record) => record.clickCount > 0).length;
  }

  return <TouchableOpacity
    className='mt-4'
    onPress={() => {
      router.push({
        pathname: "/detail/[habitId]",
        params: { habitId: habit.id }
      })
    }}>
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
        <Text className='text-[12px] text-mygray'>Completed days: {calculateCompletedDays(habit)}</Text>

      </View>

      {/* <Donut /> */}

      <Donut2 clickCount1={clickCount} habit={habit} doneCallBack={doneCallBack} />
    </View>
  </TouchableOpacity>
}

export default HabitCard