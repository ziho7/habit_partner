import { View, Text, TextInput, TouchableOpacity, Modal } from 'react-native'
import React, { useState } from 'react'
import CustomIconButton from './CustomIconButton'
import images from '@/constants/images'
import { Record, Habit } from '@/lib/get_data'
import { dateTypeToDash } from '@/lib/utils'
import DateModal from './DateModal'




const AddHabit = ({ closeCallBack, okCallBack }: {
    closeCallBack: () => void,
    okCallBack: () => void
}) => {

    const [habit, setHabit] = useState({
        id: 100,
        user_id: "",
        name: '',
        startDate: '2024-03-07',
        endDate: '2024-09-07',
        creatorId: '1231239',
        everycount: 0,
        type: 0,
        showsDays: [],
        createTime: new Date(2024, 5, 7),
        records: new Map<string, Record>([
        ])
    } as Habit)

    const [pickDate, setPickDate] = useState(new Date())

    const [showStartDatePicker, setShowStartDatePicker] = useState(false)


    return (
        <View className='flex-1 justify-end '>
            <View className='h-3/4 bg-[#FFFFFF] p-4 rounded-xl my-4 space-y-6'>
                {/* title */}
                <View className='flex-row justify-between '>
                    <CustomIconButton
                        image={images.close}
                        callBackFunction={closeCallBack}
                        containerStyles='w-[32px] h-[32px] bg-mypurple-light items-center justify-center rounded-lg'
                        customStyle='w-[8px] h-[8px]'
                    />
                    <Text className='text-[24px]'>
                        Add a new habit
                    </Text>
                    <CustomIconButton
                        image={images.ok}
                        callBackFunction={okCallBack}
                        containerStyles='w-[32px] h-[32px] bg-mypurple-light items-center justify-center rounded-lg'
                        customStyle='w-[8px] h-[8px]'
                    />
                </View>
                {/* form */}
                <View className='space-y-6'>
                    <View className='flex-row justify-between items-center bg-mypurple-light border-2 border-mypurple-light rounded-lg px-4'>
                        <Text>Habit Name</Text>
                        <TextInput
                            className='h-12 border-2 border-mypurple-light bg-mypurple-light rounded-lg px-6'
                            onChangeText={(text) => {
                                setHabit({ ...habit, name: text })
                            }}
                            value={habit.name}
                            placeholder='Habit name'
                        />
                    </View>

                    <View className='flex-row justify-between items-center bg-mypurple-light border-2 border-mypurple-light rounded-lg px-4'>
                        <Text>Habit Type</Text>
                        <View className='flex-row items-center h-12 '>
                            <Text className=' items-center justify-center'>
                                Daily habits
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
                        <Text>Goal</Text>
                        <View className='flex-row items-center h-12 '>
                            <Text className=' items-center justify-center'>
                                7
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
                        <Text> Start Date</Text>
                        <View className='flex-row items-center h-12'>
                            <Text className=' items-center justify-center'>
                                {habit.startDate}
                            </Text>
                            <CustomIconButton
                                image={images.arrowRight}
                                callBackFunction={() => {
                                    setShowStartDatePicker(true)
                                }}
                                containerStyles='w-[32px] h-[32px] bg-mypurple-light items-center justify-center rounded-lg'
                                customStyle='w-[16px] h-[16px]'
                            />
                        </View>
                    </View>

                    <View className='flex-row justify-between items-center bg-mypurple-light border-2 border-mypurple-light rounded-lg px-4'>
                        <Text> End Date</Text>
                        <View className='flex-row items-center h-12 '>
                            <Text className=' items-center justify-center'>
                                {habit.endDate}
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
                        <Text> Show Days </Text>
                        <View className='flex-row items-center h-12 '>
                            <Text className=' items-center justify-center'>
                                {habit.showsDays.join(',')}
                            </Text>
                            <CustomIconButton
                                image={images.arrowRight}
                                callBackFunction={() => { }}
                                containerStyles='w-[32px] h-[32px] bg-mypurple-light items-center justify-center rounded-lg'
                                customStyle='w-[16px] h-[16px]'
                            />
                        </View>
                    </View>

                    <DateModal
                        showStartDatePicker={showStartDatePicker}
                        closeFunction={() => setShowStartDatePicker(false)}
                        pickDate={pickDate}
                        onChangeFunction={(selectedDate) => {
                            setHabit({ ...habit, startDate: dateTypeToDash(selectedDate) })
                        }}
                    />

                </View>
            </View>
        </View>
    )
}

export default AddHabit