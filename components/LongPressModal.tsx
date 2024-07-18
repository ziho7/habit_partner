import { View, Text, Modal, TouchableOpacity, Alert } from 'react-native'
import React from 'react'

import { Picker } from 'react-native-wheel-pick';
import { Habit, habitTypeStringToInt, updateHabit } from '@/lib/storage';
import CustomIconButton from './CustomIconButton';
import images from '@/constants/images';
import i18n from '@/lib/i18n';
import { useGlobalContext } from '@/context/GlobalProvider';



const LongPressModal = ({ showPicker, closeFunction, onChangeFunction, pickerData, selectedValue, habit }: {
    showPicker: boolean,
    closeFunction: () => void,
    onChangeFunction: (data: string) => void,
    pickerData: any,
    selectedValue: string,
    habit: Habit,
}) => {

    const { notify, refreshHome } = useGlobalContext()

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
                        Alert.alert(i18n.t('deleteAlert1'), i18n.t('deleteAlert2'), [
                            {
                                text: i18n.t('cancel'),
                                onPress: () => console.log("Cancel Pressed"),
                                style: "cancel"
                            },
                            {
                                text: i18n.t('delete'), onPress: async () => {
                                    habit.states = 1
                                    await updateHabit(habit)

                                    notify("habit deleted", "error", 2)
                                    refreshHome()
                                }
                            }
                        ])
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