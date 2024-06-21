import { View, Text } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react'
import { Habit, calculateCompletedDays, getHabit } from '@/lib/storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomIconButton from '@/components/CustomIconButton';

import images from '@/constants/images';
import ImageAndTitle from '@/components/ImageAndTitle';

const Detail = () => {
  const { habitId } = useLocalSearchParams()

  // todo 放到useEffect里面
  // const habit = getHabit(habitId as string)
  const [habit, setHabit] = useState<Habit>(new Habit())

  useEffect(() => {
    getHabit(habitId as string).then((habit) => {
      setHabit(habit)
    })
  }, [])



  return (
    <SafeAreaView className='flex space-y-4'>
      {/* header */}
      <View className='flex-row justify-between mx-4 mt-4'>
        <CustomIconButton
          image={images.arrowLeft}
          callBackFunction={router.back}
          containerStyles='w-[32px] h-[32px] bg-mypurple-light items-center justify-center rounded-lg'
          customStyle='w-[8px] h-[8px]'
        />
        <View>
          <ImageAndTitle image={images.ball} name={habit.name} />
          <Text className='text-[12px] text-mygray'>{habit.startDate}-{habit.endDate}</Text>
          <Text className='text-[12px] text-mygray'>Completed days: {calculateCompletedDays(habit)}</Text>
        </View>

        <CustomIconButton
          image={images.pen}
          callBackFunction={router.back}
          containerStyles='w-[32px] h-[32px] bg-mypurple-light items-center justify-center rounded-lg'
          customStyle='w-[22px] h-[22px]'
        />
      </View>

      {/* 周数据分析 */}
      <View>
        
      </View>

      
    </SafeAreaView>

  )
}

export default Detail