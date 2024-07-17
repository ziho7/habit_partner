import { View, Text, TextInput, TouchableOpacity, Modal, Alert, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useState } from 'react'
import CustomIconButton from './CustomIconButton'
import images, { getHabitIcons } from '@/constants/images'
import { Record, Habit, habitTypeIntToString, habitTypeStringToInt } from '@/lib/storage'
import { dateToDash, dateToSlash, dateTypeToDash } from '@/lib/utils'
import DateModal from './DateModal'
import { addHabit } from '@/lib/storage'
import { getCurrentDateAndDayOfWeekInTimeZone, getShowdaysStr } from '@/lib/get_data'
import PickerModal from './PickerModal'
import ShowDaysModal from './ShowDaysModal'
import IconModal from './IconModal'
import { useGlobalContext } from '@/context/GlobalProvider'
import i18n from '@/lib/i18n'


// todo 是否添加成功
const habits = ["Reading", "Gardening", "Photography", "Hiking", "Painting", "Cooking", "Woodworking", "Knitting", "Yoga", "Birdwatching", "Cycling", "Pottery", "Calligraphy", "Stargazing", "Creative writing", "Skateboarding", "Scrapbooking", "Fishing", "Archery", "Origami"]

const AddHabit = ({ closeCallBack, okCallBack }: {
    closeCallBack: () => void,
    okCallBack: () => Promise<void>
}) => {

    const {notify} = useGlobalContext()

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
        ]),
        icon: 'ball',
        states: 0
    } as Habit)

    const [pickStartDate, setPickStartDate] = useState(new Date())
    const [pickEndDate, setPickEndDate] = useState(new Date())

    const [showStartDatePicker, setShowStartDatePicker] = useState(false)
    const [showEndDatePicker, setShowEndDatePicker] = useState(false)
    const [showHabitTypePicker, setShowHabitTypePicker] = useState(false)
    const [showDaysPicker, setShowDaysPicker] = useState(false)
    const [showIconPicker, setShowIconPicker] = useState(false)

    return (
        // <ScrollView keyboardShouldPersistTaps='handled' >
        <TouchableOpacity
            className='flex-1 justify-end'
            activeOpacity={1.0}
            onPress={() => Keyboard.dismiss()}
        >

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
                        {i18n.t('addANewHabit')}
                    </Text>
                    <CustomIconButton
                        image={images.ok}
                        callBackFunction={
                            async () => {
                                await addHabit(habit)
                                await okCallBack()
                                notify('Add habit successfully','info', 1)
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
                        <Text>{i18n.t('habitName')}</Text>
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
                        <Text>{i18n.t('habitType')}</Text>
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
                        <Text>{i18n.t('icon')}</Text>
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
                        <Text>{i18n.t('timesToComplete')}</Text>
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
                        <Text>{i18n.t('startDate')}</Text>
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
                        <Text>{i18n.t('endDate')}</Text>
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
                        <Text>{i18n.t('showPolicy')}</Text>
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
                        onChangeFunction={(selectedTimes: string) => {
                            let habitTypeInt = habitTypeStringToInt(selectedTimes)
                            setHabit({ ...habit, type: habitTypeInt })
                        }}
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
        </TouchableOpacity >
        // </ScrollView>
    )
}

export default AddHabit