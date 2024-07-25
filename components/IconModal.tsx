import { View, Text, Modal, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import CustomIconButton from './CustomIconButton'
import images, { getHabitIconsByCode, getHabitNameByCode, habitList } from '@/constants/images'
import { useTranslation } from 'react-i18next'

const IconModal = ({ showPicker, closeFunction, onChangeFunction, selectedIcon }: {
    showPicker: boolean,
    closeFunction: () => void,
    onChangeFunction: (data: any) => void,
    selectedIcon: string
}) => {


    // 1开头是运动 // 2开头是学习 // 3开头是生活 // 4开头是娱乐 // 5开头是健康 // 6开头是戒除 7开头是其他
    const sportList = [101, 102, 103, 104, 105, 106]
    const studyList = [201, 202, 203, 204, 205]
    const dailyList = [301, 302, 303, 304, 305]
    const entertainmentList = [401, 402]
    const healthList = [501, 502, 503, 504]
    const quitList = [601]
    const otherList = [701]

    const {t} = useTranslation()

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
                className=' bg-[#FFFFFF] p-4 rounded-xl my-4 space-y-6 h-[480x] border-t-[0.5px] border-x-[0.5px] border-mypurple'
                activeOpacity={1.0}
                onPressOut={() => { }}
            >
                {/* 标题 */}
                {/* <ScrollView> */}
                    <View className='justify-center items-center my-2'>
                        <Text className='text-[20px]'>
                            {t('selectIcon')}
                        </Text>
                    </View>

                    {/* 第一类 运动 */}
                    <View className='flex-row mx-2'>
                        <View className='w-[40px]'>
                            <Text className='text-[8px]'>{t('sport')}</Text>
                        </View>
                        <View className='flex-row px-2 justify-start items-center gap-4 flex-wrap'>
                            {
                                sportList.map((item) => {
                                    return <TouchableOpacity
                                        className={`border border-[#CEBEE8] h-[30px] w-[30px] items-center justify-center rounded-sm`}
                                        key={'sport' + item}
                                        onPress={() => { }}
                                    >
                                        <CustomIconButton
                                            image={getHabitIconsByCode(item)}
                                            callBackFunction={() => { 
                                                onChangeFunction(getHabitNameByCode(item))
                                            }}
                                            containerStyles={`w-[32px] h-[32px] items-center justify-center rounded-sm ${selectedIcon === getHabitIconsByCode(item) ? 'bg-mypurple' : 'bg-mypurple-light'}`}
                                            customStyle='w-[16px] h-[16px]'
                                        />
                                    </TouchableOpacity>
                                })
                            }
                        </View>
                    </View>

                    {/* 第二类 学习 */}
                    <View className='flex-row mx-2'>
                        <View className='w-[40px]'>
                            <Text className='text-[8px]'>{t('study')}</Text>
                        </View>
                        <View className='flex-row px-2 justify-start items-center gap-4 flex-wrap'>
                            {
                                studyList.map((item) => {
                                    return <TouchableOpacity
                                        className={`border border-[#CEBEE8] h-[30px] w-[30px] items-center justify-center rounded-sm`}
                                        key={'sport' + item}
                                        onPress={() => { }}
                                    >
                                        <CustomIconButton
                                            image={getHabitIconsByCode(item)}
                                            callBackFunction={() => {
                                                onChangeFunction(getHabitNameByCode(item))
                                            }}
                                            containerStyles={`w-[32px] h-[32px] items-center justify-center rounded-sm ${selectedIcon === getHabitIconsByCode(item) ? 'bg-mypurple' : 'bg-mypurple-light'}`}
                                            customStyle='w-[16px] h-[16px]'
                                        />
                                    </TouchableOpacity>
                                })
                            }
                        </View>
                    </View>

                    {/* 第三类  */}
                    <View className='flex-row mx-2'>
                        <View className='w-[40px]'>
                            <Text className='text-[8px]'>{t('daily2')}</Text>
                        </View>
                        <View className='flex-row px-2 justify-start items-center gap-4 flex-wrap'>
                            {
                                dailyList.map((item) => {
                                    return <TouchableOpacity
                                        className={`border border-[#CEBEE8] h-[30px] w-[30px] items-center justify-center rounded-sm`}
                                        key={'sport' + item}
                                        onPress={() => { }}
                                    >
                                        <CustomIconButton
                                            image={getHabitIconsByCode(item)}
                                            callBackFunction={() => {
                                                onChangeFunction(getHabitNameByCode(item))
                                            }}
                                            containerStyles={`w-[32px] h-[32px] items-center justify-center rounded-sm ${selectedIcon === getHabitIconsByCode(item) ? 'bg-mypurple' : 'bg-mypurple-light'}`}
                                            customStyle='w-[16px] h-[16px]'
                                        />
                                    </TouchableOpacity>
                                })
                            }
                        </View>
                    </View>

                    {/* 第四类 */}
                    <View className='flex-row mx-2'>
                        <View className='w-[40px]'>
                            <Text className='text-[8px]'>{t('entertainment')}</Text>
                        </View>
                        <View className='flex-row px-2 justify-start items-center gap-4 flex-wrap'>
                            {
                                entertainmentList.map((item) => {
                                    return <TouchableOpacity
                                        className={`border border-[#CEBEE8] h-[30px] w-[30px] items-center justify-center rounded-sm`}
                                        key={'sport' + item}
                                        onPress={() => { }}
                                    >
                                        <CustomIconButton
                                            image={getHabitIconsByCode(item)}
                                            callBackFunction={() => {
                                                onChangeFunction(getHabitNameByCode(item))
                                            }}
                                            containerStyles={`w-[32px] h-[32px] items-center justify-center rounded-sm ${selectedIcon === getHabitIconsByCode(item) ? 'bg-mypurple' : 'bg-mypurple-light'}`}
                                            customStyle='w-[16px] h-[16px]'
                                        />
                                    </TouchableOpacity>
                                })
                            }
                        </View>
                    </View>

                    {/* 第五类 */}
                    <View className='flex-row mx-2'>
                        <View className='w-[40px]'>
                            <Text className='text-[8px]'>{t('health')}</Text>
                        </View>
                        <View className='flex-row px-2 justify-start items-center gap-4 flex-wrap'>
                            {
                                healthList.map((item) => {
                                    return <TouchableOpacity
                                        className={`border border-[#CEBEE8] h-[30px] w-[30px] items-center justify-center rounded-sm`}
                                        key={'sport' + item}
                                        onPress={() => { }}
                                    >
                                        <CustomIconButton
                                            image={getHabitIconsByCode(item)}
                                            callBackFunction={() => {
                                                onChangeFunction(getHabitNameByCode(item))
                                            }}
                                            containerStyles={`w-[32px] h-[32px] items-center justify-center rounded-sm ${selectedIcon === getHabitIconsByCode(item) ? 'bg-mypurple' : 'bg-mypurple-light'}`}
                                            customStyle='w-[16px] h-[16px]'
                                        />
                                    </TouchableOpacity>
                                })
                            }
                        </View>
                    </View>

                    {/* 第六类 戒除 */}
                    <View className='flex-row mx-2'>
                        <View className='w-[40px]'>
                            <Text className='text-[8px]'>{t('quit')}</Text>
                        </View>
                        <View className='flex-row px-2 justify-start items-center gap-4 flex-wrap'>
                            {
                                quitList.map((item) => {
                                    return <TouchableOpacity
                                        className={`border border-[#CEBEE8] h-[30px] w-[30px] items-center justify-center rounded-sm`}
                                        key={'otherList' + item}
                                        onPress={() => { }}
                                    >
                                        <CustomIconButton
                                            image={getHabitIconsByCode(item)}
                                            callBackFunction={() => {
                                                onChangeFunction(getHabitNameByCode(item))
                                            }}
                                            containerStyles={`w-[32px] h-[32px] items-center justify-center rounded-sm ${selectedIcon === getHabitIconsByCode(item) ? 'bg-mypurple' : 'bg-mypurple-light'}`}
                                            customStyle='w-[16px] h-[16px]'
                                        />
                                    </TouchableOpacity>
                                })
                            }
                        </View>
                    </View>

                    {/* 第7类 戒除 */}
                    <View className='flex-row mx-2'>
                        <View className='w-[40px]'>
                            <Text className='text-[8px]'>{t('other')}</Text>
                        </View>
                        <View className='flex-row px-2 justify-start items-center gap-4 flex-wrap'>
                            {
                                otherList.map((item) => {
                                    return <TouchableOpacity
                                        className={`border border-[#CEBEE8] h-[30px] w-[30px] items-center justify-center rounded-sm`}
                                        key={'sport' + item}
                                        onPress={() => { }}
                                    >
                                        <CustomIconButton
                                            image={getHabitIconsByCode(item)}
                                            callBackFunction={() => {
                                                onChangeFunction(getHabitNameByCode(item))
                                            }}
                                            containerStyles={`w-[32px] h-[32px] items-center justify-center rounded-sm ${selectedIcon === getHabitIconsByCode(item) ? 'bg-mypurple' : 'bg-mypurple-light'}`}
                                            customStyle='w-[16px] h-[16px]'
                                        />
                                    </TouchableOpacity>
                                })
                            }
                        </View>
                    </View>

                {/* </ScrollView> */}


                {/* todo 自己上传 */}
                {/* <View className='flex-row px-2 justify-center items-center gap-4 flex-wrap'>
                    <Text>choose from album</Text>
                </View> */}

            </TouchableOpacity>
        </TouchableOpacity>
    </Modal>
}

export default IconModal