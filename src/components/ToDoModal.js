import {FlatList, Modal, StyleSheet} from 'react-native'
import {Button, Icon, Text, Layout, CheckBox, Input} from '@ui-kitten/components'
import {useState} from 'react'

const CloseIcon = (props) => (
    <Icon {...props} name='close-outline'/>
);
const AddIcon = (props) => (
    <Icon {...props} name='plus-circle-outline'/>
);
const RemoveIcon = (props) => (
    <Icon {...props} name='trash-2-outline'/>
);

// const removeButtons = [
//     <Button style={{flex: 1, marginRight: 10, alignSelf: 'flex-end', alignItems: 'center'}} status='danger' accessoryLeft={RemoveIcon}/>
// ];

// const removeButtons = () => <Button style={{flex: 1, marginRight: 10, alignSelf: 'flex-end', alignItems: 'center'}} status='danger' accessoryLeft={RemoveIcon}/>


const ToDoRenderItem = ({todo, handleChecked, handleRemoveToDo}) => {
    return (
            <Layout style={styles.todoRenderItem}>
                <CheckBox
                    style={styles.todoRenderItemCheckBox}
                    checked={todo.completed}
                    onChange={nextChecked => handleChecked(todo, nextChecked)}
                />
                <Text style={[
                    {textDecorationLine: todo.completed ? 'line-through' : 'none'},
                    {color: todo.completed ? 'gray' : 'white'},
                    {flex: 3, marginRight: 10}]}>{todo.title}</Text>
                <Button
                    onPress={() => handleRemoveToDo(todo)}
                    style={{marginLeft: 'auto'}}
                    size='small'
                    status='danger'
                    appearance='ghost'
                    accessoryLeft={RemoveIcon}/>
            </Layout>
    )
}

const ToDoModal = ({visible, hideModal, todo, addToDo, handleChecked, handleRemoveToDo}) => {
    const [newTodoTitle, setNewTodoTitle] = useState(null);

    // Если нет туду то и нет модального окна
    if (!todo){
        return null;
    }
    const isButtonDisabled = !(newTodoTitle && newTodoTitle.length > 0);

    const todosLength = todo.todos.length;
    const readyTodos = (todo.todos.filter((el) => el.completed)).length

    const handleAddToDo = () => {
        addToDo(newTodoTitle)
        setNewTodoTitle(null)
    }

    return(
        <Modal visible={visible} animationType={'slide'}>
            <Layout style={styles.container}>
                <Button onPress={hideModal} style={styles.closeButton} status='danger' appearance='ghost' accessoryLeft={CloseIcon}/>
                <Layout style={styles.topText}>
                    <Text category='h4'>{todo.name}</Text>
                    <Text style={{marginLeft: 10}} appearance='hint' category='s2'>{readyTodos} из {todosLength}</Text>
                </Layout>

                <Layout style={styles.todoList}>
                    {
                        todosLength
                            ? (<FlatList
                                data={todo.todos}
                                keyExtractor={(item, i) => `list-todos-${item.title}-${i}`}
                                horizontal={false}
                                renderItem={({item}) => (
                                    <ToDoRenderItem handleRemoveToDo={handleRemoveToDo} handleChecked={handleChecked}
                                                    todo={item}/>)}
                            />)
                            : (<Layout>
                                <Text style={styles.addYourText} category='h2' status='success'>Пока ваш список пуст!</Text>
                                <Text style={styles.addYourText} category='h3' status='warning'>Добавьте задачу!</Text>
                            </Layout>)
                    }
                </Layout>

                <Layout style={styles.addLayout}>
                    <Input
                        style={styles.addLayoutInput}
                        placeholder='Добавить задачу'
                        value={newTodoTitle}
                        onChangeText={nextValue => setNewTodoTitle(nextValue)}
                    />
                    <Button onPress={handleAddToDo} disabled={isButtonDisabled} style={styles.addLayoutBtn} status='success' accessoryLeft={AddIcon}/>
                </Layout>
            </Layout>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
       flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%'
    },
    closeButton: {
        position: 'absolute',
        top: 0,
        right: 0,
        borderRadius: 100
    },
    todoRenderItem: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'center'
    },
    todoRenderItemCheckBox: {
        marginRight: 20
    },
    todoList: {
        flex: 3,
        width: '70%',
    },
    addLayout: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    addLayoutBtn: {
        height: 30,
        borderBottomLeftRadius: 0,
        borderTopLeftRadius: 0
    },
    addLayoutInput: {
        width: '70%',
        borderBottomRightRadius: 0,
        borderTopRightRadius: 0
    },
    topText: {
        flexDirection:"column",
        alignItems: 'center',
        marginTop: 50,
        textAlign: 'center'
    },
    addYourText: {
        marginTop: '10%',
        width: '100%',
        textAlign: 'center'
    }
});

export default ToDoModal;
