import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, I18nManager } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import {
    useSharedValue,
    withTiming,
    useDerivedValue,
    runOnJS,
} from 'react-native-reanimated';

interface Props {
    value: number;
    category: 'low' | 'medium' | 'high';
    testID?: string;
}

const TOTAL_LENGTH = 283;

const Speedometer = ({ value, category, testID }: Props) => {
    const [animatedDash, setAnimatedDash] = useState(TOTAL_LENGTH);
    const progress = useSharedValue(0);

    useEffect(() => {
        let current = 0;

        const interval = setInterval(() => {
            const step = Math.floor(Math.random() * 10) + 5;
            current += step;

            if (current >= value) {
                clearInterval(interval);
                progress.value = withTiming(value, { duration: 800 });
            } else {
                progress.value = current;
            }
        }, 100);

        return () => clearInterval(interval);
    }, [value]);

    useDerivedValue(() => {
        const offset = TOTAL_LENGTH - (TOTAL_LENGTH * progress.value) / 100;
        runOnJS(setAnimatedDash)(offset);
    });

    const getColor = () => {
        switch (category) {
            case 'low':
                return '#4CAF50';
            case 'medium':
                return '#FFC107';
            case 'high':
                return '#F44336';
        }
    };

    return (
        <View testID={testID} style={styles.wrapper}>
            <Svg width={200} height={100} viewBox="0 0 200 100">
                <Path
                    d="M10,100 A90,90 0 0,1 190,100"
                    stroke="#eee"
                    strokeWidth={20}
                    fill="none"
                />
                <Path
                    d="M10,100 A90,90 0 0,1 190,100"
                    stroke={getColor()}
                    strokeWidth={20}
                    fill="none"
                    strokeDasharray={TOTAL_LENGTH.toString()}
                    strokeDashoffset={animatedDash}
                />
            </Svg>
            <View style={styles.labels}>
                <Text style={styles.label}>Low</Text>
                <Text style={styles.label}>Medium</Text>
                <Text style={styles.label}>High</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
    },
    labels: {
        flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
        width: 200,
        justifyContent: 'space-between',
        marginTop: 10,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },
});

export default Speedometer;
