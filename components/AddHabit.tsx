import { View, Text, TextInput, TouchableOpacity, Modal } from 'react-native'
import React, { useState } from 'react'
import CustomIconButton from './CustomIconButton'
import images from '@/constants/images'
import { Record, Habit } from '@/lib/storage'
import { dateTypeToDash } from '@/lib/utils'
import DateModal from './DateModal'
import { addHabit } from '@/lib/storage'




const AddHabit = ({ closeCallBack, okCallBack }: {
    closeCallBack: () => void,
    okCallBack: () => Promise<void>
}) => {

    const [habit, setHabit] = useState({
        id: "",
        user_id: "",
        name: '',
        startDate: '2024-03-07',
        endDate: '2024-09-07',
        creatorId: '',
        everycount: 1,
        type: 0,
        showsDays: [],
        createTime: new Date(),
        records: new Map<string, Record>([
            ["2024-03-07", { done: 0 }],
            ["2024-03-08", { done: 12 }],
            ["2024-03-09", { done: 11 }],
            ["2024-06-16", { done: 11 }],
        ])
    } as Habit)

    const [pickStartDate, setPickStartDate] = useState(new Date())
    const [pickEndDate, setPickEndDate] = useState(new Date())

    const [showStartDatePicker, setShowStartDatePicker] = useState(false)
    const [showEndDatePicker, setShowEndDatePicker] = useState(false)


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
                        callBackFunction={
                            async () => {
                                await addHabit(habit)
                                await okCallBack()
                                closeCallBack()
                            }
                        }
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
                        <Text>Times to Complete</Text>
                        <TextInput
                            className='h-12 border-2 border-mypurple-light bg-mypurple-light rounded-lg px-6'
                            onChangeText={(text) => {
                                let num = parseInt(text)
                                if (text === '') {
                                    num = 0
                                }
                                setHabit({ ...habit, everycount : num})
                            }}
                            value={habit.everycount === 0 ? '' : habit.everycount.toString()}
                            placeholder='5'
                        />
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
                                callBackFunction={() => {
                                    setShowEndDatePicker(true)
                                }}
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
                        showDatePicker={showStartDatePicker}
                        closeFunction={() => setShowStartDatePicker(false)}
                        pickDate={pickStartDate}
                        onChangeFunction={(selectedDate) => {
                            setHabit({ ...habit, startDate: dateTypeToDash(selectedDate) })
                        }}
                    />

                    <DateModal
                        showDatePicker={showEndDatePicker}
                        closeFunction={() => setShowEndDatePicker(false)}
                        pickDate={pickEndDate}
                        onChangeFunction={(selectedDate) => {
                            setHabit({ ...habit, endDate: dateTypeToDash(selectedDate) })
                        }}
                    />

                </View>
            </View>
        </View>
    )
}

export default AddHabit