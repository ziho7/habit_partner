import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import CustomIconButton from '@/components/CustomIconButton'
import images from '@/constants/images'
import DateModal from '@/components/DateModal'
import { router } from 'expo-router'

const Settings = () => {
  return (
    <SafeAreaView className=''>
      <View className=''>
            <View className='h-3/4 p-4 my-4 space-y-6'>
                {/* form */}
                <View className='space-y-6'>
                    <View className='flex-row justify-between items-center bg-mypurple-light border-2 border-mypurple-light rounded-lg px-4'>
                        <Text>Language</Text>
                        <View className='flex-row items-center h-12 '>
                            <Text className=' items-center justify-center'>
                                English
                            </Text>
                            <CustomIconButton
                                image={images.arrowRight}
                                callBackFunction={() => { }}
                                containerStyles='w-[32px] h-[32px] bg-mypurple-light items-center justify-center rounded-lg'
                                customStyle='w-[16px] h-[16px]'
                            />
                        </View>
                    </View>

                    <View className='flex-row justify-between items-center bg-mypurple-light border-2 border-mypurple-light rounded-lg px-4'>
                        <Text> Time Zone</Text>
                        <View className='flex-row items-center h-12'>
                            <Text className=' items-center justify-center'>
                                UTC + 8
                            </Text>
                            <CustomIconButton
                                image={images.arrowRight}
                                callBackFunction={() => {
                                    
                                }}
                                containerStyles='w-[32px] h-[32px] bg-mypurple-light items-center justify-center rounded-lg'
                                customStyle='w-[16px] h-[16px]'
                            />
                        </View>
                    </View>

                    <TouchableOpacity 
                        className='flex-row justify-between items-center bg-mypurple-light border-2 border-mypurple-light rounded-lg px-4'
                        onPress={() => {
                            router.push('pages/contactUs')
                        }}
                    >
                        <Text>Contact us</Text>
                        <View className='flex-row items-center h-12'>
                            <Text className=' items-center justify-center'>
                                {}
                            </Text>
                            <CustomIconButton
                                image={images.arrowRight}
                                callBackFunction={() => {
                                }}
                                containerStyles='w-[32px] h-[32px] bg-mypurple-light items-center justify-center rounded-lg'
                                customStyle='w-[16px] h-[16px]'
                            />
                        </View>
                    </TouchableOpacity>

                    {/* <DateModal
                        showDatePicker={showStartDatePicker}
                        closeFunction={() => setShowStartDatePicker(false)}
                        pickDate={pickStartDate}
                        onChangeFunction={(selectedDate) => {
                            setHabit({ ...habit, startDate: dateTypeToDash(selectedDate) })
                        }}
                    /> */}


                </View>
            </View>
        </View>
    </SafeAreaView>
  )
}

export default Settings