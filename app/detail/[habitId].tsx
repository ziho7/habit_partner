import { View, Text, Dimensions, ScrollView, Image } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react'
import { Habit, calculateCompletedDays, getHabit, transRecordToCommitsData } from '@/lib/storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomIconButton from '@/components/CustomIconButton';
import images from '@/constants/images';
import ImageAndTitle from '@/components/ImageAndTitle';
// import { ContributionGraph } from 'react-native-chart-kit'




import DataBlock from '@/components/DataBlock';

import { ExpandableCalendar, AgendaList, CalendarProvider, WeekCalendar, Calendar } from 'react-native-calendars';
import ContributionGraph from '@/components/ContributionGraph';


type InputData = {
  [date: string]: {
    level: number;
    data?: any;
  };
};

const data: InputData[] = [
  {
    '2020-04-20': { level: 2 }
  },
  {
    '2023-07-08': { level: 1 },
  },
  {
    '2023-07-09': { level: 4, data: {} },
  },
  {
    '2023-03-31': {
      level: 3,
      data: {
        myKey: 'my data',
      },
    },
  },
];


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
          <View className='items-center'>
            <ImageAndTitle image={images.ball} name={habit.name} />

            <View className='relative items-center justify-center'>
              <Image
                source={images.laurelWreath}
                className='w-[98px] h-[98px]'
                resizeMode='contain'
              />
              <View className='absolute items-center'>
                <Text className='text-[32px]'>{calculateCompletedDays(habit)}</Text>
                <Text className='text-[6px] text-mygray'>Done</Text>
              </View>



            </View>

            <Text className='text-[12px] text-mygray'>{habit.startDate}-{habit.endDate}</Text>
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
        <View className='mt-4 bg-mypurple-light mx-4 rounded-lg'>
          {/* <View>
            <Text>Title</Text>
          </View>
          <ScrollView horizontal={true} className='rounded-lg' showsHorizontalScrollIndicator={false}>
            <ContributionGraph
              values={transRecordToCommitsData(habit)}
              width={windowWidth }
              height={300}
              tooltipDataAttrs={(value) => handleToolTip}
              numDays={365}
              chartConfig={{
                backgroundGradientFrom: '#F8F6F9',
                backgroundGradientTo: '#F8F6F9',
                color: (opacity = 1) => `rgba(206, 190, 232, ${opacity})`,
              }}
              squareSize={6}
              showOutOfRangeDays={true}
              showMonthLabels={true}
              endDate={new Date()}
              
            />
          </ScrollView> */}
          <ContributionGraph
            year={2024}
            dataValues={[
              {
                date: '2024-05-01',
                count: 1
              },
              {
                date: '2024-05-02',
                count: 3
              },
              {
                date: '2024-05-03',
                count: 3
              },
              {
                date: '2024-05-04',
                count: 3
              },
              {
                date: '2024-05-05',
                count: 3
              },
              {
                date: '2024-05-06',
                count: 3
              },
              {
                date: '2024-05-07',
                count: 3
              },
              {
                date: '2024-05-08',
                count: 3
              },
              {
                date: '2024-05-09',
                count: 3
              },
              {
                date: '2024-05-10',
                count: 5
              },
              {
                date: '2024-05-11',
                count: 3
              }
            ]}
          />
        </View>


      </ScrollView>
    </SafeAreaView>

  )
}

export default Detail