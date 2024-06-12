import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Touchable, TouchableOpacity } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import Animated, { useSharedValue, useAnimatedProps, withTiming } from 'react-native-reanimated';

const AnimatedPath = Animated.createAnimatedComponent(Path);

const DonutChart = () => {
    const [clickCount, setClickCount] = useState(0);
    const totalCount = 5;
    const progress = useSharedValue(0);

    // 计算圆周长
    const radius = 40;
    const strokeWidth = 8;
    const circumference = 2 * Math.PI * radius;
    const finished = clickCount === totalCount;

    // 动画路径属性
    const animatedProps = useAnimatedProps(() => ({
        strokeDashoffset: circumference * (1 - progress.value),
    }));

    useEffect(() => {
        // 点击时更新进度动画
        progress.value = withTiming(clickCount / totalCount, { duration: 500 });
    }, [clickCount]);

    const handleClick = () => {
        if (clickCount < totalCount) {
            setClickCount(clickCount + 1);
        } else {
            // todo 完成逻辑
        }
    };

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
                style={[StyleSheet.absoluteFillObject, { alignItems: 'center', justifyContent: 'center' }]}
                className='text-[12px] text-mygray'
            >   
            {finished ? 
                <Text className='text-[20px] font-semibold'>Done</Text> : 
                <Text className='text-[20px] font-semibold'>{clickCount} / {totalCount}</Text>
            }
            
            </TouchableOpacity>

        </View>
    );
};

export default DonutChart;