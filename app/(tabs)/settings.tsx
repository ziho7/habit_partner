import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import CustomIconButton from '@/components/CustomIconButton'
import images from '@/constants/images'
import { router } from 'expo-router'
import i18n from '@/lib/i18n'
import { useTranslation } from 'react-i18next'
import PickerModal from '@/components/PickerModal'
import { getLanguageList, getLanguageCode } from '@/lib/languageHandler'
import { updateSettingLanguage } from '@/lib/storage'

const Settings = () => {

    const {t} = useTranslation()

    const [showLanguagePicker, setShowLanguagePicker] = useState(false)

    return (
        <SafeAreaView className=''>
            <View className=''>
                <View className='h-3/4 p-4 my-4 space-y-6'>
                    {/* form */}
                    <View className='space-y-6'>
                        <TouchableOpacity
                            className='flex-row justify-between items-center bg-mypurple-light border-2 border-mypurple-light rounded-lg px-4'
                            onPress={() => {
                                setShowLanguagePicker(true)
                            }}
                        >
                            <Text>{t('language')}</Text>
                            <View className='flex-row items-center h-12 '>
                                <Text className=' items-center justify-center'>
                                    {t('currentLanguage')}
                                </Text>
                                <CustomIconButton
                                    image={images.arrowRight}
                                    callBackFunction={() => { }}
                                    containerStyles='w-[32px] h-[32px] bg-mypurple-light items-center justify-center rounded-lg'
                                    customStyle='w-[8px] h-[8px]'
                                />
                            </View>
                        </TouchableOpacity>

                        {/* todo 时区切换 */}
                        {/* <View className='flex-row justify-between items-center bg-mypurple-light border-2 border-mypurple-light rounded-lg px-4'>
                        <Text>Time Zone</Text>
                        <View className='flex-row items-center h-12'>
                            <Text className=' items-center justify-center'>
                                {8888}
                            </Text>
                            <CustomIconButton
                                image={images.arrowRight}
                                callBackFunction={() => {
                                    
                                }}
                                containerStyles='w-[32px] h-[32px] bg-mypurple-light items-center justify-center rounded-lg'
                                customStyle='w-[16px] h-[16px]'
                            />
                        </View>
                    </View> */}

                        <TouchableOpacity
                            className='flex-row justify-between items-center bg-mypurple-light border-2 border-mypurple-light rounded-lg px-4'
                            onPress={() => {
                                router.push('pages/contactUs')
                            }}
                        >
                            <Text>{i18n.t('contactUs')}</Text>
                            <View className='flex-row items-center h-12'>
                                <Text className=' items-center justify-center'>
                                    { }
                                </Text>
                                <CustomIconButton
                                    image={images.arrowRight}
                                    callBackFunction={() => {
                                    }}
                                    containerStyles='w-[32px] h-[32px] bg-mypurple-light items-center justify-center rounded-lg'
                                    customStyle='w-[8px] h-[8px]'
                                />
                            </View>
                        </TouchableOpacity>

                        {/* <DateModal
                        showDatePicker={showStartDatePicker}
                        closeFunction={() => setShowStartDatePicker(false)}
                        pickDate={pickStartDate}
                        onChangeFunction={(selectedDate) => {
                            setHabit({ ...habit, startDate: dateTypeToDash(selectedDate) })
                        }}
                    /> */}

                        <PickerModal
                            showPicker={showLanguagePicker}
                            closeFunction={() => { setShowLanguagePicker(false) }}
                            onChangeFunction={ async (selectedLanguage: string) => {
                                let languageTowLetter = getLanguageCode(selectedLanguage)
                                await updateSettingLanguage(languageTowLetter)
                                i18n.changeLanguage(languageTowLetter)
                                // setShowLanguagePicker(false)
                            }}
                            pickerData={getLanguageList()}
                            selectedValue={i18n.t('currentLanguage')}
                        >
                        </PickerModal>

                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Settings