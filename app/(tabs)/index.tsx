import { View, Text, SafeAreaView, TouchableOpacity, Image, SectionList, ScrollView, Modal, StyleSheet, TextInput } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import CustomButton from '@/components/CustomButton'
import images from '@/constants/images'
import { useGlobalContext } from '@/context/GlobalProvider'
import { getCurrentDateAndDayOfWeekInTimeZone, getMonthHabits, getTodayHabits, getWeekHabits } from '@/lib/get_data'
import { dateToSlash } from '@/lib/utils'
import SeperateLine from '@/components/SeperateLine'
import HabitCard from '@/components/HabitCard'
import Header from '@/components/Header'
import CustomIconButton from '@/components/CustomIconButton'
import AddHabit from '@/components/AddHabit'
import { Habit } from '@/lib/storage'



const Home = () => {
  const { loading, isLogged, timeZone } = useGlobalContext()

  const { currentDate, dayOfWeek } = getCurrentDateAndDayOfWeekInTimeZone()
  const [showHabits, setShowHabits] = useState<any>([])
  const [showAddHabit, setShowAddHabit] = useState(false)

  const fetchHabits = async () => {
    const todayHabits = await getTodayHabits()

    setShowHabits(todayHabits)
  }

  const getHeader = () => {
    return <>
      <Header dayOfWeek={dayOfWeek} currentDate={currentDate} />
      <View className='flex-row h-16 justify-between items-center'>
        <View className='flex-row justify-start space-x-2'>
          <CustomButton title='Today' handlePress={fetchHabits} containerStyles="mr-6 w-[76px]" textStyles="text-[12px]"></CustomButton>
          <CustomButton title='Week' handlePress={fetchHabits} containerStyles="mr-6 w-[76px]" textStyles="text-[12px]"></CustomButton>
          <CustomButton title='Month' handlePress={fetchHabits} containerStyles="mr-6 w-[76px]" textStyles="text-[12px]"></CustomButton>
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
        sections={showHabits}
        renderItem={({ item }: {
          item: Habit
        }) => {
          return <HabitCard
            habitId={item.id}
            beginDate={dateToSlash(item.startDate)}
            endDate={dateToSlash(item.endDate)}
            clickCount={Number(item.records.get(dateToSlash(item.startDate))?.clickCount.toString() || '0')}
            everyCount={item.everyCount}
            name={item.name}
          />
        }}
        keyExtractor={(item) => item.id.toString()}
        renderSectionHeader={({ section }) => {
          if (section.title === 'finished') {
            return <SeperateLine />
          }
          return null
        }}

        ListHeaderComponent={getHeader}
        ListEmptyComponent={<Text>Empty Please, add a new habit first</Text>}
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