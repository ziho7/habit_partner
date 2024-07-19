import { View, Text, Image, TouchableOpacity, Animated } from 'react-native'
import React, { useRef, useState } from 'react'

import images, { getHabitIcons } from '@/constants/images'
import Donut2 from '@/components/Donut2'
import { Habit, calculateCompletedDays, getHabit, updateHabit } from '@/lib/storage'
import { router } from 'expo-router'
import ImageAndTitle from './ImageAndTitle'
import { dateToDash, dateToSlash } from '@/lib/utils'
import { getShowdaysStr } from '@/lib/get_data'
import i18n from '@/lib/i18n'
import LongPressModal from './LongPressModal'

const HabitCard = ({
    clickCount,
    habit,
    doneCallBack,
    currentDate
}: {
    clickCount: number,
    habit: Habit,
    doneCallBack: () => Promise<void>,
    currentDate: string
}) => {

    const [showLongPressModal, setShowLongPressModal] = useState(false)

    // const handleLongClick = async () => {
    //     habit.records.set(currentDate, { clickCount: 0 })
    //     await updateHabit(habit)
    //     await doneCallBack()
    // }

    return (
        <TouchableOpacity
            className='mt-4'
            onPress={() => {
                router.push({
                    pathname: "/detail/dataPanel",
                    params: { habitId: habit.id }
                })
            }}

            onLongPress={() => setShowLongPressModal(true)}

        >
            <View className='flex-row justify-between items-center h-[160px] bg-mypurple-light rounded-xl px-4'>
                <View className='flex-col'>
                    <ImageAndTitle image={getHabitIcons(habit.icon)} name={habit.name} />
                    <Text className='text-[11px] text-mygray'>{dateToSlash(habit.startDate)}-{dateToSlash(habit.endDate)}</Text>
                    <View className='flex-row'>
                        <Text className='text-[11px] text-mygray'>{i18n.t('completedDays')}: </Text>
                        <Text className='text-[11px] font-semibold'>{calculateCompletedDays(habit)}</Text>
                    </View>

                    <Text className='text-[11px] text-mygray'>{getShowdaysStr(habit.showsDays)}</Text>
                </View>

                <Donut2 clickCount1={clickCount} habit={habit} doneCallBack={doneCallBack} />
            </View>


            <LongPressModal
                showPicker={showLongPressModal}
                closeFunction={() => { setShowLongPressModal(false)}}
                onChangeFunction={() => { }}
                pickerData={[]}
                selectedValue=''
                habit={habit}
                currentDate={currentDate}
            />
        </TouchableOpacity>


    )
}

export default HabitCard