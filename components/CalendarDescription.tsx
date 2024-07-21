import { View, Text } from 'react-native'
import React from 'react'
import { useTranslation } from 'react-i18next'

const CalendarDescription = () => {
    const {t} = useTranslation()

    return (
        <View className='flex-row bg-mypurple-light mx-4 justify-end gap-x-2 pb-2 px-2 mb-6'>
            <View className='flex-row space-x-1'>
                <View className="rounded h-[14px] w-[14px] cursor-pointer items-center justify-center bg-[#e4e0ec]" />
                <Text className='text-[10px] mt-1'>{t('clicked')}</Text>
            </View>

            <View className='flex-row space-x-1'>
            <View className="rounded h-[14px] w-[14px] cursor-pointer items-center justify-center bg-[#CEBEE8]" />
                <Text className='text-[10px] mt-1'>{t('finished')}</Text>
            </View>
        </View>
    )
}

export default CalendarDescription