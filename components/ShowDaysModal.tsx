import { View, Text, Modal, TouchableOpacity } from 'react-native'
import React from 'react'

const ShowDaysModal = ({ showPicker, closeFunction, onChangeFunction, pickData }: {
    showPicker: boolean,
    closeFunction: () => void,
    pickData: number[],
    onChangeFunction: (data: any) => void
}) => {

    const getColor = (dayNumber: number) => {
        if (pickData.includes(dayNumber)) {
            return 'bg-[#CEBEE8]'
        } 
        return 'bg-[#FFFFFF]'
    }

    return <Modal
        visible={showPicker}
        onRequestClose={closeFunction}
        animationType='slide'

        presentationStyle='overFullScreen'
        transparent={true}
        className='border-1'
    >
        <TouchableOpacity
            className='h-1/4 flex-1 justify-end bg-black broder-1 border-black'
            activeOpacity={1.0}
            // onPressOut={closeFunction}
        >
            <View
                className=' bg-[#FFFFFF] p-4 rounded-xl my-4 space-y-6 h-[200px]'
            >
                <View className='justify-center items-center my-2'>
                    <Text className='text-[20px]'>
                        Select show days every week
                    </Text>
                </View>

                <View className='flex-row px-2 justify-center jusitfy-center items-center gap-x-4'>
                    <TouchableOpacity className={`border border-[#CEBEE8] h-[30px] w-[30px] items-center justify-center rounded-sm ${getColor(0)}`}>
                        <Text className='text-[12px] font-light'>
                            Sun
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity className={`border border-[#CEBEE8] h-[30px] w-[30px] items-center justify-center rounded-sm ${getColor(1)}`}>
                        <Text className='text-[12px] font-light'>
                            Mon
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity className={`border border-[#CEBEE8] h-[30px] w-[30px] items-center justify-center rounded-sm ${getColor(2)}`}>
                        <Text className='text-[12px] font-light'>
                            Tue
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity className={`border border-[#CEBEE8] h-[30px] w-[30px] items-center justify-center rounded-sm ${getColor(3)}`}>
                        <Text className='text-[12px] font-light'>
                            Wed
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity className={`border border-[#CEBEE8] h-[30px] w-[30px] items-center justify-center rounded-sm ${getColor(4)}`}>
                        <Text className='text-[12px] font-light'>
                            Thu
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity className={`border border-[#CEBEE8] h-[30px] w-[30px] items-center justify-center rounded-sm ${getColor(5)}`}>
                        <Text className='text-[12px] font-light'>
                            Fri
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity className={`border border-[#CEBEE8] h-[30px] w-[30px] items-center justify-center rounded-sm ${getColor(6)}`}>
                        <Text className='text-[12px] font-light'>
                            Sat
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
        </TouchableOpacity>
    </Modal>
}

export default ShowDaysModal