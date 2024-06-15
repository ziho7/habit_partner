import { View, Text, SafeAreaView, TouchableOpacity, Image, SectionList, ScrollView } from 'react-native'
import React from 'react'
import CustomButton from '@/components/CustomButton'

// import {images} from '../../constants'
import images from '@/constants/images'
import Donut2 from '@/components/Donut2'
import { useGlobalContext } from '@/context/GlobalProvider'
import { Habit, getCurrentDateAndDayOfWeekInTimeZone, getTodayHabits } from '@/lib/get_data'
import { dateToSlash } from '@/lib/utils'
import SeperateLine from '@/components/SeperateLine'
import HabitCard from '@/components/HabitCard'


const Home = () => {
  const { loading, isLogged } = useGlobalContext()

  const { currentDate, dayOfWeek } = getCurrentDateAndDayOfWeekInTimeZone()

  const todayHabits = getTodayHabits()
  console.log(todayHabits)





  return (
    <ScrollView>
      <SafeAreaView className='mx-4'>
        {/* title */}
        <View className='flex-row h-16 justify-between items-center'>
          <Text className='font-extrabold text-[24px]'>Habit Partner</Text>
          <Text className=''>{dayOfWeek} {dateToSlash(currentDate)}</Text>
        </View>
        {/* calender */}
        <View className='flex-row h-16 justify-between items-center'>
          <View className='flex-row justify-start space-x-2'>
            <CustomButton title='Today' handlePress={() => { }} containerStyles="mr-6 w-[76px]" textStyles="text-[12px]"></CustomButton>
            <CustomButton title='Week' handlePress={() => { }} containerStyles="mr-6 w-[76px]" textStyles="text-[12px]"></CustomButton>
            <CustomButton title='Month' handlePress={() => { }} containerStyles="mr-6 w-[76px]" textStyles="text-[12px]"></CustomButton>
          </View>

          <TouchableOpacity className='bg-black' onPress={() => { }}>
            {/* <Text>Press Here</Text> */}
            <Image source={images.add} className='w-[26px] h-[26px]' />

          </TouchableOpacity>
        </View>

        {/* habit list */}
        <SectionList
          sections={todayHabits}
          renderItem={({ item }) => {
            return <HabitCard beginDate={dateToSlash(item.startDate)} endDate={dateToSlash(item.endDate)} totalCount={item.records.get(dateToSlash(item.startDate))?.done.toString() || '0'} name={item.name} />
          }}
          keyExtractor={(item) => item.id.toString()}
          SectionSeparatorComponent={() => <SeperateLine />}
        />
        {/* dividing ling */}
        
        {/* <SeperateLine /> */}
        {/* finished list */}
        
      </SafeAreaView>
    </ScrollView>
  )
}

export default Home