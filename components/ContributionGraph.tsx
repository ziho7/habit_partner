import { View, Text } from 'react-native'
import React from 'react'

const ContributionGraph = ({startDate, endDate, dataValues}: {
    startDate: string,
    endDate: string,
    dataValues: {date: string, count: number}[]
}) => {
    let startingDate = new Date(startDate)
    let endingDate = new Date(endDate);
    const differenceInMilliseconds = endingDate.getTime() - startingDate.getTime()
    const daysInMonth = Math.ceil((differenceInMilliseconds / (1000 * 60 * 60 * 24))) + 1;
    console.log(daysInMonth, ' day here');
    const calenderGrid = Array.from({ length: daysInMonth }, (_, i) => {
        const date = new Date(startingDate);
        date.setDate(startingDate.getDate() + i)
        return date.toISOString().slice(0, 10);
    })

    const highestValue = dataValues?.reduce((a, b)=> Math.max(a, b.count), -Infinity)

    const getIntensity = (activityCount: number) => {
        return highestValue !== 0 ? Number(activityCount / highestValue) : 0;
    }
    const getColorFromIntensity = (intensity: number) => {
        const colorCodes = ['#FFEEEE', '#FFCCCC', '#FFAAAA', '#FF8888', '#FF6666', '#FF4444'];
        const colorIndex = Math.min(Math.floor((intensity * colorCodes.length)), colorCodes.length - 1)
        // console.log(colorIndex, ' color index here')
        return colorCodes[colorIndex]
    }
  return (
    <View className='grid grid-flow-col gap-1 grid-rows-7' >
        {
        calenderGrid.map((day, index)=>{
                
            const activityCount = dataValues.find(item => item.date === day)?.count || 0;
            const intensity = getIntensity(activityCount);
            const color = getColorFromIntensity(intensity)
            return <View className='w-4 h-4 rounded cursor-pointer bg-gray-400' style={{backgroundColor: `${activityCount == 0 ? "#ffffff10" : String(color)}`}}></View>
        })
        }
    </View>
  )
}


export default ContributionGraph