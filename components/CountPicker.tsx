import { View, Text, Modal, TouchableOpacity } from 'react-native'
import React from 'react'

const CountPicker = ({showDatePicker, closeFunction, onChangeFunction, pickDate}: {
    showDatePicker: boolean,
    closeFunction: () => void,
    pickDate: Date,
    onChangeFunction: (data: any) => void
}) => {
  return <Modal
  visible={showDatePicker}
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
          
      </View>
  </TouchableOpacity>
</Modal>
}

export default CountPicker