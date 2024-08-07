import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Touchable, TouchableOpacity } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import Animated, { useSharedValue, useAnimatedProps, withTiming } from 'react-native-reanimated';
import { Habit, updateHabit } from '@/lib/storage';
import { getCurrentDateAndDayOfWeekInTimeZone } from '@/lib/get_data';
import { useTranslation } from 'react-i18next';

const AnimatedPath = Animated.createAnimatedComponent(Path);

const DonutChart = ({clickCount, habit, doneCallBack, setClickCount }: {
    clickCount: number,
    habit: Habit,
    doneCallBack: () => Promise<void>
    setClickCount: (clickCount: number) => void
}) => {  
    
    const progress = useSharedValue(0);
    const currentDate = getCurrentDateAndDayOfWeekInTimeZone().currentDate
    const {t} = useTranslation()

    // 计算圆周长
    const radius = 40;
    const strokeWidth = 8;
    const circumference = 2 * Math.PI * radius;
    const finished = clickCount >= habit.everyCount;

    // 动画路径属性
    const animatedProps = useAnimatedProps(() => ({
        strokeDashoffset: circumference * (1 - progress.value),
    }));

    useEffect(() => {
        // 点击时更新进度动画
        let value = clickCount
        if (clickCount > habit.everyCount) {
            value = habit.everyCount
        }
        progress.value = withTiming(value / habit.everyCount, { duration: 500 });

    }, [clickCount]);

    const handleClick = async () => {
        if (clickCount < habit.everyCount) {
            habit.records.set(currentDate, { clickCount: clickCount + 1 });
            await updateHabit(habit);
            setClickCount(clickCount + 1);
            if (clickCount + 1 === habit.everyCount) {
                await doneCallBack();
            }
        } 
    }

    const handleLongClick = async () => {    
        
    }

    const calFontSize = (everyCount: number) => {
        if (everyCount < 100) {
            return 'text-[20px]'
        }
        if (everyCount < 10000) {
            return 'text-[16px]'
        }

        if (everyCount < 1000000) {
            return 'text-[12px]'
        }

        if (everyCount < 100000000) {
            return 'text-[10px]'
        }

        return 'text-[8px]'
    }


    return (
        <View>
            <Svg width="120" height="120" viewBox="0 0 120 120">
                <Circle
                    cx="60"
                    cy="60"
                    r={radius}
                    strokeWidth={strokeWidth}
                    stroke="#C2E4DC"
                    fill="#BEF1D8"
                />
                <AnimatedPath
                    animatedProps={animatedProps}
                    stroke="#CEBEE8"
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    d={`M60,60 m-${radius},0 a ${radius},${radius} 0 1,1 ${radius * 2},0 a ${radius},${radius} 0 1,1 -${radius * 2},0`}
                />
            </Svg>

            <TouchableOpacity 
                onPress={handleClick}
                onLongPress={handleLongClick}
                style={[StyleSheet.absoluteFillObject, { alignItems: 'center', justifyContent: 'center' }]}
                className='text-[12px] text-mygray'
            >   
            {finished ? 
                <Text className='text-[20px] font-semibold'>{t('done')}</Text> : 
                <Text className={`font-semibold ${calFontSize(habit.everyCount)}`}> {clickCount} / {habit.everyCount}</Text>
            }
            
            </TouchableOpacity>

        </View>
    );
};

export default DonutChart;