import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { getCurrentDateAndDayOfWeekInTimeZone } from '@/lib/get_data'

const ContributionGraph = ({ year, dataValues }: {
    year: number,
    dataValues: { date: string, count: number }[]
}) => {
    const startDate = new Date('2024-01-01')
    const endingDate = new Date('2024-12-31')

    const differenceInMilliseconds = endingDate.getTime() - startDate.getTime()
    const daysTotal = Math.ceil((differenceInMilliseconds / (1000 * 60 * 60 * 24))) + 1;
    //  日期list

    const getCalenderGrid = (daysTotal: number) => {
        // 全年所有天数
        let calenderGrid = Array.from({ length: daysTotal }, (_, i) => {
            const date = new Date('2024-01-01')
            date.setDate(startDate.getDate() + i)

            return date.toISOString().slice(0, 10);
        })

        // 补全前面的空格
        const startDateDay = startDate.getDay()
        if (startDateDay > 1) {
            for (let i = 0; i < startDateDay - 1; i++) {
                calenderGrid.unshift('')
            }
        }
        console.log('startDateDay', startDateDay);


        // 每隔7天补全空格
        let newCalenrerGrid: string[] = []
        let currentMonth = ""
        for (let i = 0; i < calenderGrid.length; i++) {
            newCalenrerGrid.push(calenderGrid[i])
            if ((i + 1) % 7 !== 0 || i === 0) {
                continue
            }

            let currentMonth2 = new Date(calenderGrid[i]).toLocaleString('default', { month: 'short' });
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





    const highestValue = dataValues?.reduce((a, b) => Math.max(a, b.count), -Infinity)
    const getColor = (date: string) => {
        const activityCount = dataValues.find(item => item.date === date)?.count || 0
        const intensity = highestValue !== 0 ? Number(activityCount / highestValue) : 0
        const colorCodes = ['#FFFFFF', '#FFCCCC', '#FFAAAA', '#FF8888', '#FF6666', '#FF4444']
        const colorIndex = Math.min(Math.floor((intensity * colorCodes.length)), colorCodes.length - 1)
        return colorCodes[colorIndex]
    }

    return (

        <ScrollView horizontal={true}>
            <View className=''>
                {/* 方块 */}
                <View className='gap-1 flex-col flex-wrap h-[150px]' >
                    {
                        calenderGrid.map((day, index) => {

                            if (day === 'empty') {
                                return <View className='rounded h-[14px] w-[14px] cursor-pointer'></View>
                            }

                            if (!day.includes('-')) {
                                return <Text className='text-[7px]'>{day}</Text>
                            }

                            const color = getColor(day)
                            return <View
                                className='rounded h-[14px] w-[14px] cursor-pointer border border-mypurple'
                                style={{ backgroundColor: String(color) }}
                                key={index}
                            >
                            </View>
                        })
                    }
                </View>

            </View>
        </ScrollView>
    )
}


export default ContributionGraph