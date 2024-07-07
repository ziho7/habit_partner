import { View, Text, TextInput, TouchableOpacity, Modal, Alert } from 'react-native'
import React, { useState } from 'react'
import CustomIconButton from './CustomIconButton'
import images from '@/constants/images'
import { Record, Habit, habitTypeIntToString } from '@/lib/storage'
import { dateTypeToDash } from '@/lib/utils'
import DateModal from './DateModal'
import { addHabit } from '@/lib/storage'
import { getCurrentDateAndDayOfWeekInTimeZone, getShowdaysStr } from '@/lib/get_data'
import { Picker } from '@react-native-picker/picker';
import PickerModal from './PickerModal'
import ShowDaysModal from './ShowDaysModal'


const habits = ["Reading", "Gardening", "Photography", "Hiking", "Painting", "Cooking", "Woodworking", "Knitting", "Yoga", "Birdwatching", "Cycling", "Pottery", "Calligraphy", "Stargazing", "Creative writing", "Skateboarding", "Scrapbooking", "Fishing", "Archery", "Origami"]

const AddHabit = ({ closeCallBack, okCallBack }: {
    closeCallBack: () => void,
    okCallBack: () => Promise<void>
}) => {

    const today = getCurrentDateAndDayOfWeekInTimeZone().currentDate

    const [habit, setHabit] = useState({
        id: "",
        userId: "",
        name: habits[Math.floor(Math.random() * habits.length)],
        startDate: today,
        endDate: today,
        creatorId: '',
        everyCount: 1,
        type: 0,
        showsDays: [0, 1, 2, 3, 4, 5, 6],
        createTime: new Date(),
        records: new Map<string, Record>([
        ])
    } as Habit)

    const [pickStartDate, setPickStartDate] = useState(new Date())
    const [pickEndDate, setPickEndDate] = useState(new Date())

    const [showStartDatePicker, setShowStartDatePicker] = useState(false)
    const [showEndDatePicker, setShowEndDatePicker] = useState(false)
    const [showTimesPicker, setShowTimesPicker] = useState(false)
    const [showHabitTypePicker, setShowHabitTypePicker] = useState(false)
    const [showDaysPicker, setShowDaysPicker] = useState(false)


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
                                try {
                                    await addHabit(habit)
                                } catch (e: any) {
                                    Alert.alert('Error', 'Failed to add habit' + e)
                                }
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
                    <TouchableOpacity className='flex-row justify-between items-center bg-mypurple-light border-2 border-mypurple-light rounded-lg px-4'>
                        <Text>Habit Name</Text>
                        <TextInput
                            className='h-12 border-2 w-[300px] flex-1 text-right border-mypurple-light bg-mypurple-light rounded-lg px-6'
                            onChangeText={(text) => {
                                setHabit({ ...habit, name: text })
                            }}
                            value={habit.name}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setShowHabitTypePicker(true)} className='flex-row justify-between items-center bg-mypurple-light border-2 border-mypurple-light rounded-lg px-4'>
                        <Text>Habit Type</Text>
                        <View className='flex-row items-center h-12 '>
                            <Text className=' items-center justify-center'>
                                {habitTypeIntToString(habit.type)}
                            </Text>
                            <CustomIconButton
                                image={images.arrowRight}
                                callBackFunction={() => {
                                    setShowHabitTypePicker(true)
                                }}
                                containerStyles='w-[32px] h-[32px] bg-mypurple-light items-center justify-center rounded-lg'
                                customStyle='w-[16px] h-[16px]'
                            />
                        </View>
                    </TouchableOpacity>

                    <View className='flex-row justify-between items-center bg-mypurple-light border-2 border-mypurple-light rounded-lg px-4'>
                        <Text>Icon</Text>
                        <View className='flex-row items-center h-12 '>
                            <View className=' items-center justify-center'>
                                <CustomIconButton
                                    image={images.ball}
                                    callBackFunction={() => { }}
                                    containerStyles='w-[32px] h-[32px] bg-mypurple-light items-center justify-center rounded-lg'
                                    customStyle='w-[16px] h-[16px]'
                                />
                            </View>
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
                            className='h-12 border-2 border-mypurple-light bg-mypurple-light rounded-lg px-6 flex-1 text-right'
                            onChangeText={(text) => {
                                let num = parseInt(text)
                                if (text === '') {
                                    num = 0
                                }
                                setHabit({ ...habit, everyCount: num })
                            }}
                            value={habit.everyCount === 0 ? '' : habit.everyCount.toString()}
                            placeholder='5'
                        />
                    </View>
                    {/* <View className='flex-row justify-between items-center bg-mypurple-light border-2 border-mypurple-light rounded-lg px-4'>
                        <Text>Times to Complete</Text>
                        <View className='flex-row items-center h-12'>
                            <Text className=' items-center justify-center'>
                                {habit.everyCount}
                            </Text>
                            <CustomIconButton
                                image={images.arrowRight}
                                callBackFunction={() => {
                                    
                                }}
                                containerStyles='w-[32px] h-[32px] bg-mypurple-light items-center justify-center rounded-lg'
                                customStyle='w-[16px] h-[16px]'
                            />
                        </View>
                    </View> */}

                    <TouchableOpacity onPress={() => setShowStartDatePicker(true)} className='flex-row justify-between items-center bg-mypurple-light border-2 border-mypurple-light rounded-lg px-4'>
                        <Text>Start Date</Text>
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
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setShowEndDatePicker(true)} className='flex-row justify-between items-center bg-mypurple-light border-2 border-mypurple-light rounded-lg px-4'>
                        <Text>End Date</Text>
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
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setShowDaysPicker(true)} className='flex-row justify-between items-center bg-mypurple-light border-2 border-mypurple-light rounded-lg px-4'>
                        <Text>Show Policy</Text>
                        <View className='flex-row items-center h-12 '>
                            <Text className=' items-center justify-center'>
                                {getShowdaysStr(habit.showsDays)}
                            </Text>
                            <CustomIconButton
                                image={images.arrowRight}
                                callBackFunction={() => {
                                    setShowDaysPicker(true)
                                }}
                                containerStyles='w-[32px] h-[32px] bg-mypurple-light items-center justify-center rounded-lg'
                                customStyle='w-[16px] h-[16px]'
                            />
                        </View>
                    </TouchableOpacity>

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

                    <PickerModal
                        showPicker={showHabitTypePicker}
                        closeFunction={() => { setShowHabitTypePicker(false) }}
                        onChangeFunction={(selectedTimes: number) =>
                            setHabit({ ...habit, type: selectedTimes })
                        }
                        pickerData={["Daily", "Weekly", "Monthly"]}
                    >
                    </PickerModal>

                    <ShowDaysModal
                        showPicker={showDaysPicker}
                        closeFunction={() => {
                            setShowDaysPicker(false)
                        }}
                        pickData={habit.showsDays}
                        onChangeFunction={(selectedData) => {
                            setHabit({ ...habit, showsDays: selectedData })
                        }}
                    >
                    </ShowDaysModal>



                </View>
            </View>
        </View>
    )
}

export default AddHabit