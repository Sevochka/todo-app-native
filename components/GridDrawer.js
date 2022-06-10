import {Text, Layout} from '@ui-kitten/components'
import {StyleSheet, TouchableOpacity, ScrollView} from 'react-native'
import React from 'react'

const GridDrawer = ({todos, onSelect, onLongPressItem}) => {

    const mapTodos = todos.map((todo, i) => {
        const todosLength = todo.todos.length;
        const readyTodos = (todo.todos.filter((el) => el.completed)).length
        return (
            <TouchableOpacity
                onLongPress={() => onLongPressItem(todo)}
                onPress={() => onSelect(i + 1)}
                style={styles.card}
                key={`grid-${todo.name}-${i}`}>
                <Text status='control'>{todo.name}</Text>
                <Text status='warning'>{readyTodos} of {todosLength}</Text>
            </TouchableOpacity>
        )
    })

    return (
        <ScrollView horizontal={false}  style={styles.scrollContainer}>
            <Layout style={styles.container}>
                {mapTodos}
            </Layout>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        height: '100%'
    },
    container: {
        maxWidth: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    card: {
        borderWidth: 2,
        borderRadius: 5,
        borderColor: 'white',
        width: '30%',
        maxWidth: 200,
        backgroundColor: 'rgba(51,102,255, 0.8)',
        margin: 2,
        height: 100,
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})
export default GridDrawer;
