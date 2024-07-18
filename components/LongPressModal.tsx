import { View, Text, Modal, TouchableOpacity } from 'react-native'
import React from 'react'

import { Picker } from 'react-native-wheel-pick';
import { habitTypeStringToInt } from '@/lib/storage';
import CustomIconButton from './CustomIconButton';
import images from '@/constants/images';



const LongPressModal = ({ showPicker, closeFunction, onChangeFunction, pickerData, selectedValue }: {
    showPicker: boolean,
    closeFunction: () => void,
    onChangeFunction: (data: string) => void,
    pickerData: any,
    selectedValue: string
}) => {
    return <Modal
        visible={showPicker}
        onRequestClose={closeFunction}
        animationType='slide'

        presentationStyle='overFullScreen'
        transparent={true}
    >
        <TouchableOpacity
            className='h-1/4 flex-1 justify-end h-[200px]'
            onPressOut={closeFunction}
            activeOpacity={1.0}
        >
            <TouchableOpacity
                className=' bg-[#ffffff] p-4 rounded-xl my-8 space-y-6 justify-center items-center'
                onPressOut={() => { }}
                activeOpacity={1.0}
            >
            


                {/* 第一个设置 */}
                <TouchableOpacity
                    className='w-full flex-row justify-between items-center mt-8 bg-mypurple-light border-2 border-mypurple-light rounded-lg px-4'
                    onPress={() => {

                    }}
                >
                    <Text>Cancel click</Text>
                    <View className='flex-row items-center h-12'>
                        <Text className=' items-center justify-center'>
                            { }
                        </Text>
                        <CustomIconButton
                            image={images.arrowRight}
                            callBackFunction={() => {
                            }}
                            containerStyles='w-[32px] h-[32px] bg-mypurple-light items-center justify-center rounded-lg'
                            customStyle='w-[8px] h-[8px]'
                        />
                    </View>
                </TouchableOpacity>

                {/* 第二个设置 */}
                <TouchableOpacity
                    className='w-full flex-row justify-between items-center bg-mypurple-light border-2 border-mypurple-light rounded-lg px-4'
                    onPress={() => {

                    }}
                >
                    <Text>Delete habit</Text>
                    <View className='flex-row items-center h-12'>
                        <Text className=' items-center justify-center'>
                            { }
                        </Text>
                        <CustomIconButton
                            image={images.arrowRight}
                            callBackFunction={() => {
                            }}
                            containerStyles='w-[32px] h-[32px] bg-mypurple-light items-center justify-center rounded-lg'
                            customStyle='w-[8px] h-[8px]'
                        />
                    </View>
                </TouchableOpacity>



            </TouchableOpacity>
        </TouchableOpacity>
    </Modal>
}

export default LongPressModal