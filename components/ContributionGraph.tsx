import { View, Text } from 'react-native'
import React from 'react'

const ContributionGraph = ({ year, dataValues }: {
    year: number,
    dataValues: { date: string, count: number }[]
}) => {
    const startingDate = new Date(year, 1, 1)
    const endingDate = new Date(year, 12, 31)

    const differenceInMilliseconds = endingDate.getTime() - startingDate.getTime()
    const daysTotal = Math.ceil((differenceInMilliseconds / (1000 * 60 * 60 * 24))) + 1;
    //  日期list
    const calenderGrid = Array.from({ length: daysTotal }, (_, i) => {
        const date = new Date(startingDate);
        date.setDate(startingDate.getDate() + i)
        return date.toISOString().slice(0, 10);
    })


    // const getIntensity = (activityCount: number) => highestValue !== 0 ? Number(activityCount / highestValue) : 0;
    // const getColorFromIntensity = (intensity: number) => {
    //     const colorCodes = ['#FFEEEE', '#FFCCCC', '#FFAAAA', '#FF8888', '#FF6666', '#FF4444'];
    //     const colorIndex = Math.min(Math.floor((intensity * colorCodes.length)), colorCodes.length - 1)
    //     return colorCodes[colorIndex]
    // }

    const highestValue = dataValues?.reduce((a, b) => Math.max(a, b.count), -Infinity)

    const getColor = (date: string) => {
        const activityCount = dataValues.find(item => item.date === date)?.count || 0
        const intensity = highestValue !== 0 ? Number(activityCount / highestValue) : 0
        const colorCodes = ['#FFFFFF', '#FFCCCC', '#FFAAAA', '#FF8888', '#FF6666', '#FF4444']
        const colorIndex = Math.min(Math.floor((intensity * colorCodes.length)), colorCodes.length - 1)
        return colorCodes[colorIndex]
    }

    return (
        <View className='gap-1' >
            {
                calenderGrid.map((day, index) => {
                    const color = getColor(day)

                    return <View className='w-3 h-3 rounded cursor-pointer border border-spacing-1 bg-gray-400' style={{ backgroundColor: String(color)}} ></View>
                })
            }
        </View>
    )
}


export default ContributionGraph