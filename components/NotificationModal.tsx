import { View, Text, StyleSheet } from 'react-native'
import Modal from "react-native-modal"
import React from 'react'
import { useGlobalContext } from '@/context/GlobalProvider'

const NotificationModal = () => {
    const {showNotification, notificationMessage, notifyLevel, setShowNotification} = useGlobalContext()    
    let color = 'bg-mygreen'
    if (notifyLevel === 'error') {
        color = 'bg-myred'
    }

    
    return (
        <View>
            <Modal 
                style={{zIndex: 2000000, flex: 1}}
                isVisible={showNotification}
                animationIn="slideInDown"
                animationOut="slideOutUp"
                className='h-[100px] bg-black w-full justify-start m-0'
                backdropOpacity={0}
                swipeDirection={['up']}
                onSwipeMove={() => setShowNotification(false)}
            >
                <View className= {`h-[100px] justify-end items-center ${color}`}>
                    <Text className='mb-4'>{notificationMessage}</Text>
                </View>
            </Modal>
        </View>
    )
}

export default NotificationModal