import React from 'react';
import { TopNavigation } from '@ui-kitten/components';
import {StyleSheet} from 'react-native'

const NavigationBar = () => {
    return (
        <TopNavigation
            title='ToDo Lists'
            alignment='center'
            style={styles.navigationBar}
        />
    )
}

const styles = StyleSheet.create({
    navigationBar: {
       width: '100%'
    },
});

export default NavigationBar;
