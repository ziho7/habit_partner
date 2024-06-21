import { View, Text, Image } from 'react-native'
import React from 'react'


const ImageAndTitle = ({image, name}: {
    image: any,
    name: string
}) => {
    return (
        <View className='flex-row items-center space-x-4 mb-2'>
          <View className='bg-mypurple h-[36px] w-[36px] rounded-full justify-center items-center'>
            <Image
              source={image}
              className='w-[26px] h-[26px]'
              resizeMode='contain'
            />
          </View>
          <Text className='font-semibold text-[20px]'>{name}</Text>
        </View>
    )
}

export default ImageAndTitle    