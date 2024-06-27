import { View, Text, Dimensions, ScrollView, Image } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react'
import { Habit, calculateCompletedDays, getHabit, transRecordToCommitsData } from '@/lib/storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomIconButton from '@/components/CustomIconButton';
import images from '@/constants/images';
import ImageAndTitle from '@/components/ImageAndTitle';
import { ContributionGraph } from 'react-native-chart-kit'

import DataBlock from '@/components/DataBlock';

import { ExpandableCalendar, AgendaList, CalendarProvider, WeekCalendar, Calendar } from 'react-native-calendars';

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
      <ScrollView>
        {/* header */}
        <View className='flex-row justify-between mx-4 mt-4'>
          <CustomIconButton
            image={images.arrowLeft}
            callBackFunction={router.back}
            containerStyles='w-[32px] h-[32px] bg-mypurple-light items-center justify-center rounded-lg'
            customStyle='w-[8px] h-[8px]'
          />
          {/* todo 完成变得更显眼 */}
          <View className='items-center'>
            <ImageAndTitle image={images.ball} name={habit.name} />
            <Text className='text-[12px] text-mygray'>{habit.startDate}-{habit.endDate}</Text>

            <Image
              source={images.laurelWreath}
              className='w-[88px] h-[88px]'
              resizeMode='contain'
            />
            {/* <Text className='text-[12px] text-mygray'>Completed: {calculateCompletedDays(habit)}</Text> */}
          </View>


          <CustomIconButton
            image={images.pen}
            callBackFunction={router.back}
            containerStyles='w-[32px] h-[32px] bg-mypurple-light items-center justify-center rounded-lg'
            customStyle='w-[22px] h-[22px]'
          />
        </View>

        {/* 分块数据 */}
        <View className='mt-4 mx-2'>
          <View className='flex flex-row flex-wrap'>
            <DataBlock title='Total clicked' count={habit.everyCount} />
            <DataBlock title='Days lefted' count={habit.everyCount} />
            <DataBlock title='Current streak' count={habit.everyCount} />
            <DataBlock title='Best streak' count={habit.everyCount} />
          </View>
        </View>

        {/* 日期进度条 */}

        {/* 周数据分析 */}
        <Calendar
          className='mx-4 mt-4 rounded-lg'

          theme={{
            backgroundColor: '#F8F6F9',
            calendarBackground: '#F8F6F9',
            textSectionTitleColor: '#A19C9C',
            textSectionTitleDisabledColor: '#d9e1e8',
            selectedDayBackgroundColor: '#CEBEE8',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#CEBEE8',
            dayTextColor: '#2d4150',
            textDisabledColor: '#d9e1e8',
            dotColor: '#00adf5',
            selectedDotColor: '#ffffff',
            arrowColor: 'black',
            // disabledArrowColor: '#d9e1e8',
            monthTextColor: 'black',
            indicatorColor: 'black',
            textDayFontFamily: 'monospace',
            textMonthFontFamily: 'monospace',
            textDayHeaderFontFamily: 'monospace',
            textDayFontWeight: '300',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: '300',
            textDayFontSize: 14,
            textMonthFontSize: 14,
            textDayHeaderFontSize: 14
          }}

          hideExtraDays={true}
        />
        {/* 月数据分析 */}

        {/* 年数据分析 */}
        <View>
          <ScrollView horizontal={true} className='mt-4 mx-4 rounded-lg' showsHorizontalScrollIndicator={false}>
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
        </View>


      </ScrollView>
    </SafeAreaView>

  )
}

export default Detail