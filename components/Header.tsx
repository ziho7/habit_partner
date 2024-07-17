import { View, Text } from 'react-native'
import React from 'react'
import { dateToSlash } from '@/lib/utils'
import i18n from '@/lib/i18n'

const Header = ({dayOfWeek, currentDate }: {
    dayOfWeek: string,
    currentDate: string
}) => {
  return (
    <View className='flex-row h-16 justify-between items-center'>
          <Text className='font-extrabold text-[24px]'>{i18n.t('habitPartner')}</Text>
          <Text className=''>{dayOfWeek} {dateToSlash(currentDate)}</Text>
        </View>
  )
}

export default Header