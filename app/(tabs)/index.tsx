import { View, Text, SafeAreaView, TouchableOpacity, Image, SectionList, ScrollView, Modal, StyleSheet, TextInput, RefreshControl } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import CustomButton from '@/components/CustomButton'
import images from '@/constants/images'
import { useGlobalContext } from '@/context/GlobalProvider'
import { getClickCount, getCurrentDateAndDayOfWeekInTimeZone, getHabitsByHabitType, getMonthHabits, getTodayHabits, getWeekHabits } from '@/lib/get_data'
import SeperateLine from '@/components/SeperateLine'
import HabitCard from '@/components/HabitCard2'
import Header from '@/components/Header'
import CustomIconButton from '@/components/CustomIconButton'
import AddHabit from '@/components/AddHabit'
import { Habit, HabitType, habitTypeIntToString } from '@/lib/storage'
import { useTranslation } from 'react-i18next'




const Home = () => {
  const { refreshHomeCount } = useGlobalContext()
  // todo 这里好像有重复刷新的问题

  const { t } = useTranslation()

  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    // fetchHabits()
    setTimeout(() => {
      setRefreshing(false)
    }, 600)
  }, [])

  const { currentDate, dayOfWeek } = getCurrentDateAndDayOfWeekInTimeZone()
  const [showHabits, setShowHabits] = useState<any>([])
  const [showAddHabit, setShowAddHabit] = useState(false)
  const [currentHabitType, setCurrentHabitType] = useState<HabitType>(HabitType.Daily)

  const [showHabitType, setShowHabitType] = useState(false)
  const [showAllHabit, setShowAllHabit] = useState(false)

  const fetchHabits = async (habitType = currentHabitType) => {
    const todayHabits = await getHabitsByHabitType(habitType)
    setShowHabits(todayHabits)
  }

  const changeCurrentHabitType = async (habitType: HabitType) => {
    await fetchHabits(habitType)
    setCurrentHabitType(habitType)
  }

  const getHeader = () => {
    return <>
      <Header dayOfWeek={dayOfWeek} currentDate={currentDate} />
      <View className='flex-row h-16 justify-between items-center'>
        <View className='flex-row justify-start space-x-2'>
          <CustomButton title={t('daily')} handlePress={async () => changeCurrentHabitType(HabitType.Daily)} containerStyles={`mr-6 w-[76px] ${currentHabitType === HabitType.Daily ? 'bg-mypurple' : ''}`} textStyles="text-[12px]"></CustomButton>
          <CustomButton title={t('weekly')} handlePress={async () => changeCurrentHabitType(HabitType.Weekly)} containerStyles={`mr-6 w-[76px] ${currentHabitType === HabitType.Weekly ? 'bg-mypurple' : ''}`} textStyles="text-[12px]"></CustomButton>
          <CustomButton title={t('monthly')} handlePress={async () => changeCurrentHabitType(HabitType.Monthly)} containerStyles={`mr-6 w-[76px] ${currentHabitType === HabitType.Monthly ? 'bg-mypurple' : ''}`} textStyles="text-[12px]"></CustomButton>
        </View>
        <CustomIconButton image={images.add} callBackFunction={() => setShowAddHabit(true)} />
      </View>

      <View className='h-16 w-[76px]'>
        <CustomButton title={t(habitTypeIntToString(currentHabitType))} handlePress={async () => setShowHabitType(!showHabitType)} containerStyles={`mr-6 w-[76px] `} textStyles="text-[12px]"></CustomButton>
        {
          showHabitType && (
            <View className='parent'>
              <View className='absolute'>
                <CustomButton
                  title={t('daily')}
                  handlePress={async () => {
                    setShowHabitType(false)
                    await changeCurrentHabitType(HabitType.Daily)
                  }}
                  containerStyles={`mr-6 w-[76px] border-x-[0.5px] rounded-none ${currentHabitType === HabitType.Daily ? 'bg-mypurple' : ''}`}
                  textStyles="text-[12px]" />
                <CustomButton
                  title={t('weekly')}
                  handlePress={async () => {
                    setShowHabitType(false)
                    changeCurrentHabitType(HabitType.Weekly)
                  }}
                  containerStyles={`mr-6 w-[76px] border-x-[0.5px] border-[#000000] rounded-none ${currentHabitType === HabitType.Weekly ? 'bg-mypurple' : ''}`}
                  textStyles="text-[12px]" />
                <CustomButton
                  title={t('monthly')}
                  handlePress={async () => {
                    changeCurrentHabitType(HabitType.Monthly)
                    setShowHabitType(false)
                  }}
                  containerStyles={`mr-6 w-[76px] rounded-none border-x-[0.5px] border-b-[0.5px] rounded-b-lg ${currentHabitType === HabitType.Monthly ? 'bg-mypurple' : ''}`}
                  textStyles="text-[12px]" />
              </View>
            </View>
          )
        }
      </View>

    </>
  }

  useEffect(() => {
    fetchHabits()
  }, [refreshHomeCount]);

  return (
    <SafeAreaView className='mx-4 h-full' style={{ flex: 1 }}>
      <SectionList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        sections={showHabits}
        extraData={showHabits}
        renderItem={({ item }: {
          item: Habit
        }) => {
          return <HabitCard
            clickCount={getClickCount(item, currentDate)}
            habit={item}
            doneCallBack={fetchHabits}
            currentDate={currentDate}
          />
        }}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponentStyle={{ zIndex: 10 }}
        renderSectionHeader={({ section }) => {
          if (section.title === 'finished' && section.data.length > 0) {
            return <SeperateLine />
          }
          return null
        }}

        ListHeaderComponent={getHeader}
        ListEmptyComponent={
          <View className='items-center m-4'>
            <Text className='my-2'>{t('empty')}!</Text>
            <Text>{t("addAHabit")}</Text>
          </View>
        }
      />

      <Modal
        visible={showAddHabit}
        onRequestClose={() => setShowAddHabit(false)}
        animationType='slide'
        presentationStyle='overFullScreen'
        transparent={true}
      >
        <AddHabit
          closeCallBack={() => setShowAddHabit(false)}
          currentHabitType={currentHabitType}
          okCallBack={async () => {
            fetchHabits()
          }}
        />
      </Modal>


    </SafeAreaView>


  )
}



export default Home