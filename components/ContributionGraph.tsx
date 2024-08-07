import { View, Text, ScrollView, Dimensions } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { getCurrentDateAndDayOfWeekInTimeZone } from '@/lib/get_data'
import { useTranslation } from 'react-i18next'

const ContributionGraph = ({ year, dataValues, everyCount }: {
    year: number,
    dataValues: { date: string, count: number }[],
    everyCount: number
}) => {
    const startDate = new Date(year + '-01-01')
    const endingDate = new Date(year + '-12-31')
    const today = getCurrentDateAndDayOfWeekInTimeZone().currentDate
    const scrollViewRef = useRef<ScrollView>(null)
    const {t} = useTranslation()

    const differenceInMilliseconds = endingDate.getTime() - startDate.getTime()
    const daysTotal = Math.ceil((differenceInMilliseconds / (1000 * 60 * 60 * 24))) + 1;
    //  日期list

    const getCalenderGrid = (daysTotal: number) => {
        // 全年所有天数
        let calenderGrid = Array.from({ length: daysTotal }, (_, i) => {
            const date = new Date(year + '-01-01')
            date.setDate(startDate.getDate() + i)

            return date.toISOString().slice(0, 10);
        })

        // 补全前面的空格
        const startDateDay = startDate.getDay()
        if (startDateDay != 7) {
            for (let i = 0; i < startDateDay; i++) {
                calenderGrid.unshift('')
            }
        }


        // 每隔7天补全空格
        let newCalenrerGrid: string[] = []
        let currentMonth = ""
        for (let i = 0; i < calenderGrid.length; i++) {
            newCalenrerGrid.push(calenderGrid[i])
            if ((i + 1) % 7 !== 0 || i === 0) {
                continue
            }

            let currentMonth2 = t(new Date(calenderGrid[i]).toLocaleString('default', { month: 'short' })) // 这里写入了月份
            if (calenderGrid[i] !== '' && currentMonth2 !== currentMonth) {
                currentMonth = currentMonth2
                newCalenrerGrid.push(currentMonth)
            } else {
                newCalenrerGrid.push('empty')
            }
        }

        return newCalenrerGrid
    }

    let calenderGrid = getCalenderGrid(daysTotal)

    // const highestValue = dataValues?.reduce((a, b) => Math.max(a, b.count), -Infinity)
    // const getColor = (date: string) => {
    //     const activityCount = dataValues.find(item => item.date === date)?.count || 0
    //     const intensity = highestValue !== 0 ? Number(activityCount / highestValue) : 0
    //     const colorCodes = ['#f6f2f9', '#ede5f3', '#e3d8ed', '#dacbe7', '#c8b2db', '#b598cf'] // https://photokit.com/colors/color-gradient/?lang=zh
    //     const colorIndex = Math.min(Math.floor((intensity * colorCodes.length)), colorCodes.length - 1)
    //     return colorCodes[colorIndex]
    // }

    const getColor = (date: string) => {
        const activityCount = dataValues.find(item => item.date === date)?.count || 0
        if (activityCount === 0) {
            return '#F8F6F9'
        }
        if (activityCount > 0 && activityCount < everyCount) {
            return '#e4e0ec'
        }
        if (activityCount >= everyCount) {
            return '#CEBEE8'
        }
        return '#ffffff'
    }

    const getBorderColor = (date: string) => {
        if (date === today) {
            return 'border-[#ff3d57]' // red
        }
        return 'border-mypurple'
    }

    useEffect(() => {
        const date = new Date()
        const todayIndexRate = date.getMonth() / 12
        const windowWidth = Dimensions.get('window').width;
        scrollViewRef.current?.scrollTo({ x: (windowWidth) * todayIndexRate + 50, animated: true });
    });

    return (
        <ScrollView 
            horizontal={true}
            className='' 
            ref={scrollViewRef}
            showsHorizontalScrollIndicator={false}
        >
            <View className=''>
                {/* 方块 */}
                <View className='gap-1 flex-col flex-wrap h-[150px]' >
                    {
                        calenderGrid.map((day, index) => {

                            if (day === 'empty') {
                                return <View className='rounded h-[14px] w-[14px] cursor-pointer' key={index}></View>
                            }

                            if (!day.includes('-')) { // 月份
                                return <View className='rounded h-[14px] w-[14px] cursor-pointer' key={index}>
                                        <Text className='text-[7px]'>{day}</Text>
                                    </View>
                            }

                            const color = getColor(day)
                            return (
                                <View
                                    className={`rounded h-[14px] w-[14px] cursor-pointer border items-center justify-center ${getBorderColor(day)} `}
                                    style={{ backgroundColor: String(color) }}
                                    key={index}
                                >
                                    <Text className='text-mypurple text-[7px]'>{dateContainsOne(day)? 1 : null}</Text>
                                </View>
                            )

                        })
                    }
                </View>

            </View>
        </ScrollView>
    )
}

const dateContainsOne = (date: string) => {
    const dateSplit = date.split('-')
    if (dateSplit.length !== 3) {
        return false
    }
    
    if (dateSplit[2] === '01') {
        return true
    }
}


export default ContributionGraph