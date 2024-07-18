import { View, Text, Modal, TouchableOpacity } from 'react-native'
import React from 'react'

import { Picker } from 'react-native-wheel-pick';
import { habitTypeStringToInt } from '@/lib/storage';



const PickerModal = ({ showPicker, closeFunction, onChangeFunction, pickerData, selectedValue }: {
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
                className=' bg-[#FFFFFF] p-4 rounded-xl my-4 space-y-6 justify-center items-center'
                onPressOut={() => {}}
                activeOpacity={1.0}
            >
                <Picker
                    style={{ backgroundColor: 'white', width: 300, height: 215 }}
                    selectedValue={selectedValue}
                    pickerData={pickerData}
                    onValueChange={(value: string) => {
                        onChangeFunction(value)
                    }}
                />
            </TouchableOpacity>
        </TouchableOpacity>
    </Modal>
}

export default PickerModal