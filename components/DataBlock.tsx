import { View, Text } from 'react-native'
import React from 'react'

const DataBlock = ({ title, count }: {
  title: string,
  count: number,

}) => {
  return (
    <View className="w-1/2 h-[68px] rounded-lg items-center justify-center p-2">
      <View className='flex-row rounded-lg bg-mypurple-light w-full h-full items-center justify-between'>
        <Text className='w-3/4 text-[14px] text-mypurple p-2 font-medium'>{title}</Text>
        <Text className="w-1/4 text-md font-semibold">{count}</Text>
      </View>
    </View>
  )
}

export default DataBlock