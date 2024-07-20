import { View, Text } from 'react-native'
import React from 'react'

const CalendarDescription = () => {
    return (
        <View className='flex-row bg-mypurple-light mx-4 justify-end gap-x-2 pb-2 px-2'>
            <View>
                <View className="rounded h-[14px] w-[14px] cursor-pointer items-center justify-center bg-[#dacbe7]" />
                <Text className='text-[10px] mt-1'>clicked</Text>
            </View>

            <View>
            <View className="rounded h-[14px] w-[14px] cursor-pointer items-center justify-center bg-mypurple" />
                <Text className='text-[10px] mt-1'>finished</Text>
            </View>
        </View>
    )
}

export default CalendarDescription