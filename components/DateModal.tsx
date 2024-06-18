import { View, Text, Modal, TouchableOpacity } from 'react-native'
import React from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';

const DateModal = ({showStartDatePicker, closeFunction, onChangeFunction, pickDate}: {
    showStartDatePicker: boolean,
    closeFunction: () => void,
    pickDate: Date,
    onChangeFunction: (data: any) => void
}) => {
    return <Modal
        visible={showStartDatePicker}
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
                <DateTimePicker
                    mode='date'
                    value={pickDate}
                    display='spinner'
                    onChange={(event, selectedDate) => {
                        if (selectedDate) {
                            onChangeFunction(selectedDate) 
                        }
                    }}
                />
            </View>
        </TouchableOpacity>
    </Modal>
}

export default DateModal