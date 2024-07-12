import { View, Text, Image } from 'react-native'
import React from 'react'


const ImageAndTitle = ({ image, name }: {
  image: any,
  name: string
}) => {
  let centerImage = (
    <Image
      source={image}
      className='w-[26px] h-[26px]'
      resizeMode='contain'
    />
  )
  if (image === '' || image === undefined) {
    if (name === '' || name === undefined) {
      centerImage = <Text className='text-white text-[7px] font-light text-ellipsis'>no icon</Text>
    } else {
      centerImage = <Text className='text-white text-[7px] font-light text-ellipsis'>{name.length <= 8 ? name: name.substring(0, 7) + '...'}</Text>
    }
    
  }
  return (
    <View className='flex-row items-center space-x-4 mb-2'>
      <View className='relative bg-mypurple h-[36px] w-[36px] rounded-full justify-center items-center'>
        {centerImage}
      </View>
      <Text className='font-semibold text-[20px]'>{name}</Text>
    </View>
  )
}

export default ImageAndTitle    