import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Modal } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react'
import { Habit, calculateCompletedDays, getHabit, transRecordToCommitsData } from '@/lib/storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomIconButton from '@/components/CustomIconButton';
import images, { getHabitIcons } from '@/constants/images';
import ImageAndTitle from '@/components/ImageAndTitle';
import DataBlock from '@/components/DataBlock';

import { Calendar } from 'react-native-calendars';
import ContributionGraph from '@/components/ContributionGraph';
import { bestStreak, calDaysLeft, calTotalClickCount, currentStreak, isHabitDone } from '@/lib/get_data';
import { Theme } from 'react-native-calendars/src/types';
import EditHabit from '@/components/EditHabit';
import { useGlobalContext } from '@/context/GlobalProvider';
import i18n from '@/lib/i18n';
import { useTranslation } from 'react-i18next';

const DataPanel = () => {
  const { habitId } = useLocalSearchParams()
  const { refreshHome } = useGlobalContext()
  const {t} = useTranslation()

  const [habit, setHabit] = useState<Habit>(new Habit())

  const [year, setYear] = useState(new Date().getFullYear())
  const [initialDate, setInitialDate] = useState(new Date())
  const [showEditHabit, setShowEditHabit] = useState(false)
  const [refreshCount, setRefreshCount] = useState(0)

  const refresh = () => {
    setRefreshCount(refreshCount + 1)
  }


  const markedDates = (habit: Habit) => {
    let markedDates: { [key: string]: { selected: boolean, selectedColor: string } } = {}
    if (habit.records === undefined) {
      return markedDates
    }
    for (let [date, record] of habit.records) {
      if (isHabitDone(habit, date)) {
        markedDates[date] = { selected: true, selectedColor: '#CEBEE8' }
      }
    }
    return markedDates
  }

  const CustomHeaderTitle = (
    <View className='flex-row justify-between items-center mt-2 w-full '>
      <CustomIconButton
        image={images.arrowLeft}
        callBackFunction={() => { setInitialDate(new Date(initialDate.getFullYear(), initialDate.getMonth() - 1, 1)) }}
        containerStyles='w-[32px] h-[32px] bg-mypurple-light items-center justify-center rounded-lg'
        customStyle='w-[8px] h-[8px]'
      />
      <Text className='text-[14px]'>{t(initialDate.toLocaleString('default', { month: 'long' }))}</Text>
      <CustomIconButton
        image={images.arrowRight}
        callBackFunction={() => { setInitialDate(new Date(initialDate.getFullYear(), initialDate.getMonth() + 1, 1)) }}
        containerStyles='w-[32px] h-[32px] bg-mypurple-light items-center justify-center rounded-lg'
        customStyle='w-[8px] h-[8px]'
      />
    </View>
  )

  useEffect(() => {
    getHabit(habitId as string).then((habit) => {
      setHabit(habit)
    })
  }, [refreshCount])

  const goTohomePage = () => {
      refreshHome() 
      router.back()
  }

  return (
    <SafeAreaView className=''>
      <ScrollView>
        {/* header */}
        <View className='flex-row justify-between mx-4 mt-4'>
          <CustomIconButton
            image={images.arrowLeft}
            callBackFunction={goTohomePage}
            containerStyles='w-[32px] h-[32px] bg-mypurple-light items-center justify-center rounded-lg'
            customStyle='w-[8px] h-[8px]'
          />
          <View className='items-center'>
            <ImageAndTitle image={getHabitIcons(habit.icon)} name={habit.name} />

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
            callBackFunction={() => { setShowEditHabit(!showEditHabit) }}
            containerStyles='w-[32px] h-[32px] bg-mypurple-light items-center justify-center rounded-lg'
            customStyle='w-[22px] h-[22px]'
          />
        </View>

        {/* 分块数据 */}
        <View className='mt-4 mx-2'>
          <View className='flex flex-row flex-wrap'>
            <DataBlock title={i18n.t('totalClicked')} count={calTotalClickCount(habit)} />
            <DataBlock title={i18n.t('daysLefted')} count={calDaysLeft(habit)} />
            <DataBlock title={i18n.t('currentStreak')} count={currentStreak(habit)} />
            <DataBlock title={i18n.t('bestStreak')} count={bestStreak(habit)} />
          </View>
        </View>


        {/* 月数据分析 */}
        {/* todo 左右按钮对齐  */}
        <Calendar
          className='mx-4 mt-4 rounded-lg'
          initialDate={initialDate.toISOString()}
          markedDates={
            markedDates(habit)
          }
          customHeaderTitle={CustomHeaderTitle}
          hideArrows={true}
          theme={mytheme as Theme}

          hideExtraDays={true}
        />


        {/* 年数据分析 */}
        <View className='mt-4 bg-mypurple-light mx-4 h-[260px] rounded-lg'>
          <View className='flex-row justify-between items-center mt-2'>
            <CustomIconButton
              image={images.arrowLeft}
              callBackFunction={() => { setYear(year - 1) }}
              containerStyles='w-[32px] h-[32px] bg-mypurple-light items-center justify-center rounded-lg'
              customStyle='w-[8px] h-[8px]'
            />
            <Text className='text-[14px]'>{year}</Text>
            <CustomIconButton
              image={images.arrowRight}
              callBackFunction={() => { setYear(year + 1) }}
              containerStyles='w-[32px] h-[32px] bg-mypurple-light items-center justify-center rounded-lg'
              customStyle='w-[8px] h-[8px]'
            />
          </View>

          <View className='m-2 flex-row'>
            <View className='flex w-[24px] h-full '>
              <View className='h-[17.5px] justify-center'><Text className='text-[7px]'>{t('sun')}</Text></View>
              <View className='h-[17.5px] justify-center'><Text className='text-[7px]'>{t('mon')}</Text></View>
              <View className='h-[17.5px] justify-center'><Text className='text-[7px]'>{t('tue')}</Text></View>
              <View className='h-[17.5px] justify-center'><Text className='text-[7px]'>{t('wed')}</Text></View>
              <View className='h-[17.5px] justify-center'><Text className='text-[7px]'>{t('thu')}</Text></View>
              <View className='h-[17.5px] justify-center'><Text className='text-[7px]'>{t('fri')}</Text></View>
              <View className='h-[17.5px] justify-center'><Text className='text-[7px]'>{t('sat')}</Text></View>
              <View className='h-[17.5px] justify-center'><Text className='text-[7px]'></Text></View>
            </View>
            <ContributionGraph
              year={year}
              dataValues={transRecordToCommitsData(habit)}
            />
          </View>


        </View>

      </ScrollView>

      <Modal
        visible={showEditHabit}
        onRequestClose={() => setShowEditHabit(false)}
        animationType='slide'
        presentationStyle='overFullScreen'
        transparent={true}
      >
        <EditHabit
          closeCallBack={() => setShowEditHabit(false)}
          okCallBack={refresh}
          habitOriginal={habit}
          goTohomePage={goTohomePage}
        />
      </Modal>
    </SafeAreaView>

  )
}

export default DataPanel

const mytheme = {
  backgroundColor: '#F8F6F9',
  calendarBackground: '#F8F6F9',
  textSectionTitleColor: '#A19C9C',
  textSectionTitleDisabledColor: '#d9e1e8',
  selectedDayBackgroundColor: '#CEBEE8',
  selectedDayTextColor: '#ffffff',  // 选中的颜色
  todayTextColor: '#ff3d57', // 今天颜色
  todayBackgroundColor: '#CEBEE8', // 今天圆圈
  dayTextColor: '#2d4150',
  textDisabledColor: '#d9e1e8',
  monthTextColor: 'black',
  indicatorColor: 'black',
  textDayFontFamily: 'monospace',
  textMonthFontFamily: 'monospace',
  textDayHeaderFontFamily: 'monospace',
  textDayFontWeight: '300',
  textMonthFontWeight: 'semibold',
  textDayHeaderFontWeight: '300',
  textDayFontSize: 14,
  textMonthFontSize: 14,
  textDayHeaderFontSize: 14
}