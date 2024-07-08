import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'

import images, { getHabitIcons } from '@/constants/images'
import Donut2 from '@/components/Donut2'
import { Habit, calculateCompletedDays } from '@/lib/storage'
import { router } from 'expo-router'
import ImageAndTitle from './ImageAndTitle'

const HabitCard = ({
  clickCount,
  habit,
  doneCallBack
}: {
  clickCount: number,
  habit: Habit,
  doneCallBack: () => void
}) => {

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
        <ImageAndTitle image={getHabitIcons(habit.icon)} name={habit.name} />
        <Text className='text-[12px] text-mygray'>{habit.startDate}-{habit.endDate}</Text>
        <Text className='text-[12px] text-mygray'>Completed days: {calculateCompletedDays(habit)}</Text>

      </View>

      {/* <Donut /> */}

      <Donut2 clickCount1={clickCount} habit={habit} doneCallBack={doneCallBack} />
    </View>
  </TouchableOpacity>
}

export default HabitCard