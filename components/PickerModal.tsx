import { View, Text, Modal, TouchableOpacity } from 'react-native'
import React from 'react'
import { Picker } from '@react-native-picker/picker';

const PickerModal = ({ showPicker ,closeFunction, onChangeFunction, pickValue }: {
    showPicker: boolean,
    closeFunction: () => void,
    pickValue: string|number,
    onChangeFunction: (data: any) => void
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
        >
            <View
                className=' bg-[#FFFFFF] p-4 rounded-xl my-4 space-y-6'
            >
                <Picker
                    selectedValue={pickValue}
                    onValueChange={(itemValue, itemIndex) =>
                        onChangeFunction(itemValue)
                    }>
                    <Picker.Item label="Daily" value={0} />
                    <Picker.Item label="Weekly" value={1} />
                    <Picker.Item label="Monthly" value={2} />
                </Picker>
            </View>
        </TouchableOpacity>
    </Modal>
}

export default PickerModal