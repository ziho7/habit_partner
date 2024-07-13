import { View, Text, SafeAreaView, TouchableOpacity, Image, SectionList, ScrollView, Modal, StyleSheet, TextInput } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import CustomButton from '@/components/CustomButton'
import images from '@/constants/images'
import { useGlobalContext } from '@/context/GlobalProvider'
import { getClickCount, getCurrentDateAndDayOfWeekInTimeZone, getHabitsByHabitType, getMonthHabits, getTodayHabits, getWeekHabits } from '@/lib/get_data'
import { dateToDash, dateToSlash } from '@/lib/utils'
import SeperateLine from '@/components/SeperateLine'
import HabitCard from '@/components/HabitCard'
import Header from '@/components/Header'
import CustomIconButton from '@/components/CustomIconButton'
import AddHabit from '@/components/AddHabit'
import { Habit, HabitType } from '@/lib/storage'



const Home = () => {
  const { loading, isLogged, timeZone } = useGlobalContext()

  const { currentDate, dayOfWeek } = getCurrentDateAndDayOfWeekInTimeZone()
  const [showHabits, setShowHabits] = useState<any>([])
  const [showAddHabit, setShowAddHabit] = useState(false)
  const [currentHabitType, setCurrentHabitType] = useState<HabitType>(HabitType.Daily)

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
          <CustomButton title='Daily' handlePress={async () => changeCurrentHabitType(HabitType.Daily)} containerStyles={`mr-6 w-[76px] ${currentHabitType === HabitType.Daily ? 'bg-mypurple' : ''}`} textStyles="text-[12px]"></CustomButton>
          <CustomButton title='Weekly' handlePress={async () => changeCurrentHabitType(HabitType.Weekly)} containerStyles={`mr-6 w-[76px] ${currentHabitType === HabitType.Weekly ? 'bg-mypurple' : ''}`} textStyles="text-[12px]"></CustomButton>
          <CustomButton title='Monthly' handlePress={async () => changeCurrentHabitType(HabitType.Monthly)} containerStyles={`mr-6 w-[76px] ${currentHabitType === HabitType.Monthly ? 'bg-mypurple' : ''}`} textStyles="text-[12px]"></CustomButton>
        </View>
        <CustomIconButton image={images.add} callBackFunction={() => setShowAddHabit(true)} />

      </View>
    </>
  }

  useEffect(() => {
    fetchHabits();
  }, []);

  return (
    <SafeAreaView className='mx-4'>
      <SectionList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        sections={showHabits}
        renderItem={({ item }: {
          item: Habit
        }) => {
          return <HabitCard
            clickCount={getClickCount(item, currentDate)}
            habit={item}
            doneCallBack={fetchHabits}
          />
        }}
        keyExtractor={(item) => item.id.toString()}
        renderSectionHeader={({ section }) => {
          if (section.title === 'finished' && section.data.length > 0) {
            return <SeperateLine />
          }
          return null
        }}

        ListHeaderComponent={getHeader}
        ListEmptyComponent={
          <View className='items-center m-4'>
            <Text className='my-2'>Empty!</Text>
            <Text>Please add a new habit😊</Text>
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
        <AddHabit closeCallBack={() => setShowAddHabit(false)} okCallBack={async () => {
          fetchHabits()
        }} />
      </Modal>
    </SafeAreaView>


  )
}



export default Home