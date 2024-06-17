import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const CustomIconButton = ({callBackFunction, image, customStyle, containerStyles}: {
    callBackFunction: () => void,
    image: any,
    customStyle?: string,
    containerStyles?: string
}) => {
  return (
    <TouchableOpacity className={`bg-black ${containerStyles}`} onPress={() => {
        callBackFunction()
      }}>
        <Image source={image} className={`w-[26px] h-[26px] ${customStyle}`} />
      </TouchableOpacity>
  )
}

export default CustomIconButton