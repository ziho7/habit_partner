import { View, Text, SafeAreaView, TouchableOpacity, Image, SectionList, ScrollView } from 'react-native'
import React, { useRef, useState } from 'react'
import CustomButton from '@/components/CustomButton'
import images from '@/constants/images'
import { useGlobalContext } from '@/context/GlobalProvider'
import { getCurrentDateAndDayOfWeekInTimeZone, getMonthHabits, getTodayHabits, getWeekHabits } from '@/lib/get_data'
import { dateToSlash } from '@/lib/utils'
import SeperateLine from '@/components/SeperateLine'
import HabitCard from '@/components/HabitCard'
import Header from '@/components/Header'



const Home = () => {
  const { loading, isLogged } = useGlobalContext()

  const { currentDate, dayOfWeek } = getCurrentDateAndDayOfWeekInTimeZone()
  const [showHabits, setShowHabits] = useState(getTodayHabits())
  // const todayHabits = getTodayHabits()

  const getHeader = () => {
    return <>
      <Header dayOfWeek={dayOfWeek} currentDate={currentDate} />
      <View className='flex-row h-16 justify-between items-center'>
        <View className='flex-row justify-start space-x-2'>
          <CustomButton title='Today' handlePress={() => { setShowHabits(getTodayHabits()) }} containerStyles="mr-6 w-[76px]" textStyles="text-[12px]"></CustomButton>
          <CustomButton title='Week' handlePress={() => { setShowHabits(getWeekHabits()) }} containerStyles="mr-6 w-[76px]" textStyles="text-[12px]"></CustomButton>
          <CustomButton title='Month' handlePress={() => { setShowHabits(getMonthHabits()) }} containerStyles="mr-6 w-[76px]" textStyles="text-[12px]"></CustomButton>
        </View>
        <TouchableOpacity className='bg-black' onPress={() => { }}>
          <Image source={images.add} className='w-[26px] h-[26px]' />
        </TouchableOpacity>
      </View>
    </>
  }

  return (
    // <ScrollView>
      <SafeAreaView className='mx-4'>
        <SectionList
          sections={showHabits}
          renderItem={({ item }) => {
            return <HabitCard beginDate={dateToSlash(item.startDate)} endDate={dateToSlash(item.endDate)} totalCount={item.records.get(dateToSlash(item.startDate))?.done.toString() || '0'} name={item.name} />
          }}
          keyExtractor={(item) => item.id.toString()}
          renderSectionHeader={({ section }) => {
            if (section.title === 'finished') {
              return <SeperateLine />
            }
            return null
          }}

          ListHeaderComponent={getHeader}
        />

      </SafeAreaView>
    // </ScrollView>
  )
}

export default Home