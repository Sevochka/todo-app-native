import {Drawer, DrawerItem, Icon, Layout, Text} from '@ui-kitten/components'
import React from 'react'
import {StyleSheet} from 'react-native'

const ForwardIcon = ({todo}) => {
    const todosLength = todo.todos.length;
    const readyTodos = (todo.todos.filter((el) => el.completed)).length
    return (<Layout style={styles.todoInfo}>
        <Text>{readyTodos} of {todosLength}</Text>
    </Layout>)
};

const ToDoDrawer = ({todos, onSelect, onLongPressItem}) => {
    // const [selectedIndex, setSelectedIndex] = React.useState(null);

    const mapTodos = todos.map((todo, i) => {
        return (<DrawerItem
            accessoryLeft={<Icon name={todo.emoji}/>}
            accessoryRight={(props) => <ForwardIcon {...props} todo={todo}/>}
            key={`list-${todo.name}-${i}`}
            title={todo.name}
            onLongPress={() => onLongPressItem(todo)}
        />)
    })
    return (
        <Drawer
            onSelect={onSelect}>
            {mapTodos}
        </Drawer>
    )
}

const styles = StyleSheet.create({
    todoInfo: {
        width: 40
    }
})
export default ToDoDrawer;
