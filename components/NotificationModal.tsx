import { View, Text } from 'react-native'
import Modal from "react-native-modal"
import React from 'react'
import { useGlobalContext } from '@/context/GlobalProvider'

const NotificationModal = () => {
    const {showNotification, notificationMessage} = useGlobalContext()
    return (
        <View>
            <Modal 
                isVisible={showNotification}
                animationIn="slideInDown"
                animationOut="slideOutUp"
            >
                <View style={{ flex: 1 }}>
                    <Text>{notificationMessage}</Text>
                </View>
            </Modal>
        </View>
    )
}

export default NotificationModal