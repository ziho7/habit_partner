import { View, Text, Modal, TouchableOpacity } from 'react-native'
import React from 'react'
import CustomIconButton from './CustomIconButton'
import images, { getHabitIcons, habitList } from '@/constants/images'

const IconModal = ({ showPicker, closeFunction, onChangeFunction, pickData }: {
    showPicker: boolean,
    closeFunction: () => void,
    pickData: string,
    onChangeFunction: (data: any) => void
}) => {


    return <Modal
        visible={showPicker}
        onRequestClose={closeFunction}
        animationType='slide'

        presentationStyle='overFullScreen'
        transparent={true}
        className='border-1'
    >
        <TouchableOpacity
            className='h-1/4 flex-1 justify-end bg-black broder-1 border-black bg-[#FFFFFF]' // todo remove
            activeOpacity={1.0}
            onPressOut={closeFunction}
        >
            <View
                className=' bg-[#FFFFFF] p-4 rounded-xl my-4 space-y-6 h-[300px]'
            >
                <View className='justify-center items-center my-2'>
                    <Text className='text-[20px]'>
                        Select the Icon of this habit
                    </Text>
                </View>

                <View className='flex-row px-2 justify-center items-center gap-4 flex-wrap'>
                    <TouchableOpacity
                        className={`border border-[#CEBEE8] h-[30px] w-[30px] items-center justify-center rounded-sm`}
                        onPress={() => { }}
                    >
                        <CustomIconButton
                            image={getHabitIcons(habitList[0])}
                            callBackFunction={() => {
                                onChangeFunction(habitList[0])
                            }}
                            containerStyles='w-[32px] h-[32px] bg-mypurple-light items-center justify-center rounded-sm'
                            customStyle='w-[16px] h-[16px]'
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        className={`border border-[#CEBEE8] h-[30px] w-[30px] items-center justify-center rounded-sm`}
                        onPress={() => { }}
                    >
                        <CustomIconButton
                            image={getHabitIcons(habitList[1])}
                            callBackFunction={() => {
                                onChangeFunction(habitList[1])
                            }}
                            containerStyles='w-[32px] h-[32px] bg-mypurple-light items-center justify-center rounded-sm'
                            customStyle='w-[16px] h-[16px]'
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        className={`border border-[#CEBEE8] h-[30px] w-[30px] items-center justify-center rounded-sm`}
                        onPress={() => { }}
                    >
                        <CustomIconButton
                            image={getHabitIcons(habitList[2])}
                            callBackFunction={() => {
                                onChangeFunction(habitList[2])
                            }}
                            containerStyles='w-[32px] h-[32px] bg-mypurple-light items-center justify-center rounded-sm'
                            customStyle='w-[16px] h-[16px]'
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        className={`border border-[#CEBEE8] h-[30px] w-[30px] items-center justify-center rounded-sm`}
                        onPress={() => { }}
                    >
                        <CustomIconButton
                            image={getHabitIcons(habitList[3])}
                            callBackFunction={() => {
                                onChangeFunction(habitList[3])
                            }}
                            containerStyles='w-[32px] h-[32px] bg-mypurple-light items-center justify-center rounded-sm'
                            customStyle='w-[16px] h-[16px]'
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        className={`border border-[#CEBEE8] h-[30px] w-[30px] items-center justify-center rounded-sm`}
                        onPress={() => { }}
                    >
                        <CustomIconButton
                            image={getHabitIcons(habitList[4])}
                            callBackFunction={() => {
                                onChangeFunction(habitList[4])
                            }}
                            containerStyles='w-[32px] h-[32px] bg-mypurple-light items-center justify-center rounded-sm'
                            customStyle='w-[16px] h-[16px]'
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        className={`border border-[#CEBEE8] h-[30px] w-[30px] items-center justify-center rounded-sm`}
                        onPress={() => { }}
                    >
                        <CustomIconButton
                            image={getHabitIcons(habitList[5])}
                            callBackFunction={() => {
                                onChangeFunction(habitList[5])
                            }}
                            containerStyles='w-[32px] h-[32px] bg-mypurple-light items-center justify-center rounded-sm'
                            customStyle='w-[16px] h-[16px]'
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        className={`border border-[#CEBEE8] h-[30px] w-[30px] items-center justify-center rounded-sm`}
                        onPress={() => { }}
                    >
                        <CustomIconButton
                            image={getHabitIcons(habitList[6])}
                            callBackFunction={() => {
                                onChangeFunction(habitList[6])
                            }}
                            containerStyles='w-[32px] h-[32px] bg-mypurple-light items-center justify-center rounded-sm'
                            customStyle='w-[16px] h-[16px]'
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        className={`border border-[#CEBEE8] h-[30px] w-[30px] items-center justify-center rounded-sm`}
                        onPress={() => { }}
                    >
                        <CustomIconButton
                            image={images.ball}
                            callBackFunction={() => {

                            }}
                            containerStyles='w-[32px] h-[32px] bg-mypurple-light items-center justify-center rounded-sm'
                            customStyle='w-[16px] h-[16px]'
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        className={`border border-[#CEBEE8] h-[30px] w-[30px] items-center justify-center rounded-sm`}
                        onPress={() => { }}
                    >
                        <CustomIconButton
                            image={images.ball}
                            callBackFunction={() => {

                            }}
                            containerStyles='w-[32px] h-[32px] bg-mypurple-light items-center justify-center rounded-sm'
                            customStyle='w-[16px] h-[16px]'
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        className={`border border-[#CEBEE8] h-[30px] w-[30px] items-center justify-center rounded-sm`}
                        onPress={() => { }}
                    >
                        <CustomIconButton
                            image={images.ball}
                            callBackFunction={() => {

                            }}
                            containerStyles='w-[32px] h-[32px] bg-mypurple-light items-center justify-center rounded-sm'
                            customStyle='w-[16px] h-[16px]'
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        className={`border border-[#CEBEE8] h-[30px] w-[30px] items-center justify-center rounded-sm`}
                        onPress={() => { }}
                    >
                        <CustomIconButton
                            image={images.ball}
                            callBackFunction={() => {

                            }}
                            containerStyles='w-[32px] h-[32px] bg-mypurple-light items-center justify-center rounded-sm'
                            customStyle='w-[16px] h-[16px]'
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        className={`border border-[#CEBEE8] h-[30px] w-[30px] items-center justify-center rounded-sm`}
                        onPress={() => { }}
                    >
                        <CustomIconButton
                            image={images.ball}
                            callBackFunction={() => {

                            }}
                            containerStyles='w-[32px] h-[32px] bg-mypurple-light items-center justify-center rounded-sm'
                            customStyle='w-[16px] h-[16px]'
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        className={`border border-[#CEBEE8] h-[30px] w-[30px] items-center justify-center rounded-sm`}
                        onPress={() => { }}
                    >
                        <CustomIconButton
                            image={images.ball}
                            callBackFunction={() => {

                            }}
                            containerStyles='w-[32px] h-[32px] bg-mypurple-light items-center justify-center rounded-sm'
                            customStyle='w-[16px] h-[16px]'
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        className={`border border-[#CEBEE8] h-[30px] w-[30px] items-center justify-center rounded-sm`}
                        onPress={() => { }}
                    >
                        <CustomIconButton
                            image={images.ball}
                            callBackFunction={() => {

                            }}
                            containerStyles='w-[32px] h-[32px] bg-mypurple-light items-center justify-center rounded-sm'
                            customStyle='w-[16px] h-[16px]'
                        />
                    </TouchableOpacity>
                </View>

                {/* todo 自己上传 */}
                {/* <View className='flex-row px-2 justify-center items-center gap-4 flex-wrap'>
                    <Text>choose from album</Text>
                </View> */}

            </View>
        </TouchableOpacity>
    </Modal>
}

export default IconModal