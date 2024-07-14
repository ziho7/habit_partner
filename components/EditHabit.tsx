import { View, Text, TextInput, TouchableOpacity, Modal, Alert } from 'react-native'
import React, { useState } from 'react'
import CustomIconButton from './CustomIconButton'
import images, { getHabitIcons } from '@/constants/images'
import { Record, Habit, habitTypeIntToString } from '@/lib/storage'
import { dateToSlash, dateTypeToDash } from '@/lib/utils'
import DateModal from './DateModal'
import { updateHabit } from '@/lib/storage'
import { getShowdaysStr } from '@/lib/get_data'
import PickerModal from './PickerModal'
import ShowDaysModal from './ShowDaysModal'
import IconModal from './IconModal'
import { useGlobalContext } from '@/context/GlobalProvider'

const EditHabit = ({ closeCallBack, okCallBack, habitOriginal, setHabitOriginal }: {
    closeCallBack: () => void,
    okCallBack: () => void,
    habitOriginal: Habit,
    setHabitOriginal: (habit: Habit) => void
}) => {

    const [habit, setHabit] = useState(habitOriginal)

    const [pickStartDate, setPickStartDate] = useState(new Date())
    const [pickEndDate, setPickEndDate] = useState(new Date())

    const [showStartDatePicker, setShowStartDatePicker] = useState(false)
    const [showEndDatePicker, setShowEndDatePicker] = useState(false)
    const [showHabitTypePicker, setShowHabitTypePicker] = useState(false)
    const [showDaysPicker, setShowDaysPicker] = useState(false)
    const [showIconPicker, setShowIconPicker] = useState(false)

    const {notify} = useGlobalContext()


    return (
        <View className='flex-1 justify-end '>
            <View className='h-5/6 bg-[#FFFFFF] p-4 rounded-xl my-4 space-y-6'>
                {/* title */}
                <View className='flex-row justify-between '>
                    <CustomIconButton
                        image={images.close}
                        callBackFunction={closeCallBack}
                        containerStyles='w-[32px] h-[32px] bg-mypurple-light items-center justify-center rounded-lg'
                        customStyle='w-[8px] h-[8px]'
                    />
                    <Text className='text-[24px]'>
                        Edit your habit
                    </Text>
                    <CustomIconButton
                        image={images.ok}
                        callBackFunction={
                            async () => {
                                await updateHabit(habit)
                                okCallBack()
                                notify('Habit updated', 'info', 1)
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
                            keyboardType='web-search'
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

                    <TouchableOpacity onPress={() => setShowIconPicker(true)} className='flex-row justify-between items-center bg-mypurple-light border-2 border-mypurple-light rounded-lg px-4'>
                        <Text>Icon</Text>
                        <View className='flex-row items-center h-12'>
                            <View className=' items-center justify-center'>
                                <CustomIconButton
                                    image={getHabitIcons(habit.icon)}
                                    callBackFunction={() => {
                                        setShowIconPicker(true)
                                    }}
                                    containerStyles='w-[32px] h-[32px] bg-mypurple-light items-center justify-center rounded-lg'
                                    customStyle='w-[16px] h-[16px]'
                                />
                            </View>
                            <CustomIconButton
                                image={images.arrowRight}
                                callBackFunction={() => {
                                    setShowIconPicker(true)
                                }}
                                containerStyles='w-[32px] h-[32px] bg-mypurple-light items-center justify-center rounded-lg'
                                customStyle='w-[16px] h-[16px]'
                            />
                        </View>
                    </TouchableOpacity>

                    <View className='flex-row justify-between items-center bg-mypurple-light border-2 border-mypurple-light rounded-lg px-4'>
                        <Text>Times to Complete</Text>
                        <TextInput
                            keyboardType='number-pad'
                            className='h-12 border-2 border-mypurple-light bg-mypurple-light rounded-lg px-6 flex-1 text-right mr-2'
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

                    <TouchableOpacity onPress={() => setShowStartDatePicker(true)} className='flex-row justify-between items-center bg-mypurple-light border-2 border-mypurple-light rounded-lg px-4'>
                        <Text>Start Date</Text>
                        <View className='flex-row items-center h-12'>
                            <Text className=' items-center justify-center'>
                                {dateToSlash(habit.startDate)}
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
                                {dateToSlash(habit.endDate)}
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

                    {/* 删除， todo pause */}
                    <TouchableOpacity
                        className='items-center justify-center h-12 bg-myred rounded-lg'
                        onPress={() => {
                            Alert.alert("Are you sure to delete the habit?", "This action cannot be undone", [
                                {
                                    text: "Cancel",
                                    onPress: () => console.log("Cancel Pressed"),
                                    style: "cancel"
                                },
                                {
                                    text: "Delete", onPress: async () => {
                                        setHabitOriginal(habit)
                                        await updateHabit(habit)
                                        okCallBack()
                                        closeCallBack()
                                    }
                                }
                            ])
                        }}
                    >
                        <Text className=' items-center justify-center'>
                            Delete the Habit
                        </Text>
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

                    <IconModal
                        showPicker={showIconPicker}
                        closeFunction={() => {
                            setShowIconPicker(false)
                        }}
                        pickData={habit.icon}
                        onChangeFunction={(selectedData) => {
                            setHabit({ ...habit, icon: selectedData })
                        }}
                    >

                    </IconModal>


                </View>
            </View>
        </View>
    )
}

export default EditHabit
