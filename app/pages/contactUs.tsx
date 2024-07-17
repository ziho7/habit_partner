import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import CustomIconButton from '@/components/CustomIconButton'

import images, { getHabitIcons } from '@/constants/images';
import { router } from 'expo-router';
import i18n from '@/lib/i18n';

const contactUs = () => {
    return (
        <SafeAreaView>
            <View>
                {/* header */}
                <View className='flex-row justify-between items-center mx-4 mt-4'>
                    <CustomIconButton
                        image={images.arrowLeft}
                        callBackFunction={router.back}
                        containerStyles='w-[32px] h-[32px] bg-mypurple-light items-center justify-center rounded-lg'
                        customStyle='w-[8px] h-[8px]'
                    />
                    <Text className='items-center text-[18px] pr-2'>
                        {i18n.t('contactUs')}
                    </Text>

                    <View className='items-center'>
                    </View>
                </View>
            </View>

            <View className='flex-row justify-between items-center bg-mypurple-light border-2 border-mypurple-light rounded-lg px-4 mt-4 mx-4'>
                <Text>Email</Text>
                <View className='flex-row items-center h-12'>
                    <Text className=' items-center justify-center'>
                        funkywzh@gmail.com
                    </Text>
                    {/* <CustomIconButton
                        image={images.arrowRight}
                        callBackFunction={() => {

                        }}
                        containerStyles='w-[32px] h-[32px] bg-mypurple-light items-center justify-center rounded-lg'
                        customStyle='w-[16px] h-[16px]'
                    /> */}
                </View>
            </View>
        </SafeAreaView>
    )
}

export default contactUs