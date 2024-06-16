import { View, Text, TextInput } from 'react-native'
import React from 'react'
import CustomIconButton from './CustomIconButton'
import images from '@/constants/images'

const AddHabit = ({closeCallBack, okCallBack}: {
    closeCallBack: () => void,
    okCallBack: () => void
}) => {
  return (
    <View className='flex-1 justify-end '>
          <View className='h-3/4 bg-[#FFFFFF] p-4 rounded-xl my-4'>
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
            <View>
              <TextInput>

              </TextInput>
            </View>
          </View>
        </View>
  )
}

export default AddHabit