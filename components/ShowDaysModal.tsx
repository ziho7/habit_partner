import { View, Text, Modal, TouchableOpacity } from 'react-native'
import React from 'react'
import { useTranslation } from 'react-i18next'

const ShowDaysModal = ({ showPicker, closeFunction, onChangeFunction, pickData }: {
    showPicker: boolean,
    closeFunction: () => void,
    pickData: number[],
    onChangeFunction: (data: any) => void
}) => {

    const {t} = useTranslation()

    const getColor = (dayNumber: number) => {
        if (pickData.includes(dayNumber)) {
            return 'bg-[#CEBEE8]'
        }
        return 'bg-[#FFFFFF]'
    }

    const onPressBlock = (dayNumber: number) => {
        if (pickData.includes(dayNumber)) {
            const index = pickData.indexOf(dayNumber)
            pickData.splice(index, 1)
        } else {
            pickData.push(dayNumber)
        }

        pickData.sort((a, b) => a - b)

        onChangeFunction(pickData)
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
        onPressOut={closeFunction}
        >
            <TouchableOpacity
                className=' bg-[#FFFFFF] p-4 rounded-xl my-4 space-y-6 h-[200px]'
                activeOpacity={1.0}
                onPressOut={e => e.preventDefault}
            >
                <View className='justify-center items-center my-2'>
                    <Text className='text-[20px]'>
                        {t('selectShowDaysEveryWeek')}
                    </Text>
                </View>

                <View className='flex-row px-2 justify-center jusitfy-center items-center gap-x-4'>
                    <TouchableOpacity
                        className={`border border-[#CEBEE8] h-[30px] w-[30px] items-center justify-center rounded-sm ${getColor(0)}`}
                        onPress={() => onPressBlock(0)}
                    >
                        <Text className='text-[12px] font-light'>
                            {t('sun')}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className={`border border-[#CEBEE8] h-[30px] w-[30px] items-center justify-center rounded-sm ${getColor(1)}`}
                        onPress={() => onPressBlock(1)}
                    >
                        <Text className='text-[12px] font-light'>
                            {t('mon')}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className={`border border-[#CEBEE8] h-[30px] w-[30px] items-center justify-center rounded-sm ${getColor(2)}`}
                        onPress={() => onPressBlock(2)}
                    >
                        <Text className='text-[12px] font-light'>
                           {t('tue')}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className={`border border-[#CEBEE8] h-[30px] w-[30px] items-center justify-center rounded-sm ${getColor(3)}`}
                        onPress={() => onPressBlock(3)}
                    >
                        <Text className='text-[12px] font-light'>
                            {t('wed')}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className={`border border-[#CEBEE8] h-[30px] w-[30px] items-center justify-center rounded-sm ${getColor(4)}`}
                        onPress={() => onPressBlock(4)}
                    >
                        <Text className='text-[12px] font-light'>
                            {t('thu')}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className={`border border-[#CEBEE8] h-[30px] w-[30px] items-center justify-center rounded-sm ${getColor(5)}`}
                        onPress={() => onPressBlock(5)}
                    >
                        <Text className='text-[12px] font-light'>
                            {t('fri')}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className={`border border-[#CEBEE8] h-[30px] w-[30px] items-center justify-center rounded-sm ${getColor(6)}`}
                        onPress={() => onPressBlock(6)}
                    >
                        <Text className='text-[12px] font-light'>
                            {t('sat')}
                        </Text>
                    </TouchableOpacity>
                </View>

            </TouchableOpacity>
        </TouchableOpacity>
    </Modal>
}

export default ShowDaysModal