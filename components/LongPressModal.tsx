import { View, Text, Modal, TouchableOpacity, Alert } from 'react-native'
import React, { useCallback } from 'react'

import { Picker } from 'react-native-wheel-pick';
import { getHabit, Habit, habitTypeStringToInt, updateHabit } from '@/lib/storage';
import CustomIconButton from './CustomIconButton';
import images from '@/constants/images';
import i18n from '@/lib/i18n';
import { useGlobalContext } from '@/context/GlobalProvider';
import { useTranslation } from 'react-i18next'
import Slider from '@react-native-community/slider';




const LongPressModal = ({ showPicker, closeFunction, habit, currentDate, clickCount, setClickCount }: {
    showPicker: boolean,
    closeFunction: () => void,
    habit: Habit,
    currentDate: string,
    setClickCount: (clickCount: number) => void,
    clickCount: number
}) => {
    const { notify, refreshHome } = useGlobalContext()

    const handleCancelClick = async () => {
        habit.records.set(currentDate, { clickCount: 0 })
        await updateHabit(habit)
        refreshHome()
    }

    const { t } = useTranslation()

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



                {/* 第一个设置 取消当天打卡 */}
                <TouchableOpacity
                    className='w-full flex-row justify-between items-center mt-8 bg-mypurple-light border-2 border-mypurple-light rounded-lg px-4'
                    onPress={async () => {
                        setClickCount(0)
                        await handleCancelClick()
                    }}
                >
                    <Text>{t('cancelClick')}</Text>
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

                {/* 第二个设置 删除习惯 */}
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
                    <Text>{t('deleteHabit')}</Text>
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

                {/* 第3个设置 快速完成*/}
                <TouchableOpacity
                    className='w-full flex-row justify-between items-center mt-8 bg-mypurple-light border-2 border-mypurple-light rounded-lg px-4'
                    onPress={async () => {

                    }}
                >
                    <Text>{t('setFinishedCount')}</Text>
                    <Slider
                        style={{ width: 200, height: 40 }}
                        minimumValue={0}
                        maximumValue={habit.everyCount}
                        minimumTrackTintColor="#CEBEE8"
                        maximumTrackTintColor="#dbd9d9"
                        value={clickCount}
                        onValueChange={ async (value) => {
                            // to int
                            value = Math.round(value)
                            setClickCount(value)
                            habit.records.set(currentDate, { clickCount: value })
                            await updateHabit(habit)
                            if (value === habit.everyCount) {
                                refreshHome()
                            }
                        }}
                    />
                </TouchableOpacity>

                {/* 第四个 滑动完成 */}

                {/* <Slider
                    style={{ width: 340, height: 40 }}
                    minimumValue={0}
                    maximumValue={habit.everyCount}
                    minimumTrackTintColor="#CEBEE8"
                    maximumTrackTintColor="#F8F6F9"
                    value={clickCount}
                    onValueChange={(value) => {
                        // to int
                        value = Math.round(value)
                        setClickCount(value)
                    }}
                /> */}






            </TouchableOpacity>
        </TouchableOpacity>
    </Modal>
}

export default LongPressModal