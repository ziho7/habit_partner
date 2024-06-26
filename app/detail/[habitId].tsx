import { View, Text, Dimensions, ScrollView } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react'
import { Habit, calculateCompletedDays, getHabit, transRecordToCommitsData } from '@/lib/storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomIconButton from '@/components/CustomIconButton';
import images from '@/constants/images';
import ImageAndTitle from '@/components/ImageAndTitle';
import { ContributionGraph } from 'react-native-chart-kit'
import Data from '../(tabs)/data';
import DataBlock from '@/components/DataBlock';

const Detail = () => {
  const { habitId } = useLocalSearchParams()

  // const habit = getHabit(habitId as string)
  const [habit, setHabit] = useState<Habit>(new Habit())

  useEffect(() => {
    getHabit(habitId as string).then((habit) => {
      setHabit(habit)
    })
  }, [])

  const windowWidth = Dimensions.get('window').width
  const handleToolTip: any = {}


  return (
    <SafeAreaView className=''>
      {/* header */}
      <View className='flex-row justify-between mx-4 mt-4'>
        <CustomIconButton
          image={images.arrowLeft}
          callBackFunction={router.back}
          containerStyles='w-[32px] h-[32px] bg-mypurple-light items-center justify-center rounded-lg'
          customStyle='w-[8px] h-[8px]'
        />
        {/* todo 完成变得更显眼 */}
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

      {/* 分块数据 */}
      <View className='mt-4'>
        <View className='flex flex-row flex-wrap'>
          <DataBlock title='Completed' count={habit.everyCount} />
          <DataBlock title='Days lefted' count={habit.everyCount} />
          <DataBlock title='consecutive completion' count={habit.everyCount} />
          <DataBlock title='Longest consecutive completion' count={habit.everyCount} />
        </View>
      </View>

      {/* 日期进度条 */}
      
      {/* 周数据分析 */}
      

      {/* 月数据分析 */}

      {/* 年数据分析 */}
      <ScrollView horizontal={true} className='flex'>
        <ContributionGraph
          values={transRecordToCommitsData(habit)}
          width={windowWidth * 2}
          height={120}
          tooltipDataAttrs={(value) => handleToolTip}
          numDays={365}
          chartConfig={{
            backgroundGradientFrom: '#F8F6F9',
            backgroundGradientTo: '#F8F6F9',
            color: (opacity = 1) => `rgba(206, 190, 232, ${opacity})`,
          }}
          squareSize={5.5}
          showOutOfRangeDays={true}
          showMonthLabels={true}
          endDate={new Date()}

        />
      </ScrollView>


    </SafeAreaView>

  )
}

export default Detail