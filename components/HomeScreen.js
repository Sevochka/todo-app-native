import {Button, Divider, Icon, Layout, Spinner, Text} from '@ui-kitten/components'
import {StyleSheet} from 'react-native'
import NavigationBar from './NavigationBar'
import ToDoDrawer from './TodoDrawer'
import NavigationBottom from './NavigationBottom'
import AddModal from './AddModal'
import {useEffect, useRef, useState} from 'react'
import ToDoModal from './ToDoModal'
import Fire from '../Fire'
import RemoveListDialog from './RemoveListDialog'
import GridDrawer from './GridDrawer'


const AddIcon = (props) => (
    <Icon {...props} name='plus-circle-outline'/>
);


const HomeScreen = () => {
    const [isAddModalVisible, setIsAddModalVisible] = useState(false)
    const [itemToRemove, setItemToRemove] = useState(false)
    const [currentToDo, setCurrentToDo] = useState(null)
    // const [user, setUser] = useState(null)
    const [lists, setLists] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isGridView, setIsGridView] = useState(true)

    const firebase = useRef(null)

    useEffect(() => {
        firebase.current = new Fire((error, user) => {
            console.log(error, user);
            firebase.current.getLists((lists) => {
                setLists(lists);
                // setUser(user);
                setIsLoading(false)
            })
        });
        return () => {
            firebase.current.detach();
        }
    }, [])

    const handleAddBtnClick = () => {
        setIsAddModalVisible(true);
    }
    const handleTodoFolderSelect = (index) => {
        setCurrentToDo(lists[index-1])
    }
    const handleHideToDoModal = () => {
        setCurrentToDo(null)
    }
    const handleAddList = (list) => {
        firebase.current.addList({...list, todos: []}).then(() => {
            setIsAddModalVisible(false)
        });
    }

    const handleAddToDo = (newToDoTitle) => {
        const current = {...currentToDo};
        current.todos.push({title: newToDoTitle, completed: false});
        firebase.current.updateList(current);
    }

    const handleChecked = (todo, flag) => {
        const current = {...currentToDo};
        const indexToDoToBeChanged = current.todos.indexOf(todo);
        current.todos[indexToDoToBeChanged].completed = flag;
        firebase.current.updateList(current);
    }

    const handleRemoveToDo = (todo) => {
        const current = {...currentToDo};
        const indexToDoToBeChanged = current.todos.indexOf(todo);
        current.todos.splice(indexToDoToBeChanged, 1);
        firebase.current.updateList(current);
    }

    const handleRemoveFolder = () => {
        firebase.current.removeList(itemToRemove).then(() => {});
        setItemToRemove(null)
    }

    if (isLoading){
        return  (<Layout style={styles.spinnerContainer}><Spinner/></Layout>)
    }
    return (
        <>
            <Layout style={styles.homeContainer}>
                <RemoveListDialog
                    handleRemoveItem={handleRemoveFolder}
                    itemToRemove={itemToRemove}
                    hideModal={() => setItemToRemove(null)}
                />
                <AddModal
                    visible={isAddModalVisible}
                    hideModal={() => setIsAddModalVisible(false)}
                    addList={handleAddList}/>
                <ToDoModal
                    handleRemoveToDo={handleRemoveToDo}
                    handleChecked={handleChecked}
                    addToDo={handleAddToDo}
                    todo={currentToDo}
                    visible={Boolean(currentToDo)}
                    hideModal={handleHideToDoModal}/>
                <NavigationBar />
                <Divider style={styles.dividerTop} />
                <Layout>
                    <Text style={styles.mainHintText} status='primary' category='h3'>Ваш список задач</Text>
                </Layout>
                <Divider style={styles.dividerSimple} />
                <Layout style={styles.todoDrawer}>
                {isGridView
                    ? <GridDrawer todos={lists} onSelect={handleTodoFolderSelect} onLongPressItem={setItemToRemove}/>
                    : <ToDoDrawer todos={lists} onSelect={handleTodoFolderSelect} onLongPressItem={setItemToRemove}/>
                }
                </Layout>
                <Button onPress={handleAddBtnClick} style={styles.addBtn} status='success' accessoryLeft={AddIcon}>
                    Добавить
                </Button>
            </Layout>
            <NavigationBottom selectedIndex={isGridView ? 1 : 0} onSelect={(flag) => setIsGridView(flag)}/>
        </>
    )
}

const styles = StyleSheet.create({
    spinnerContainer: {
        transform: [{ scale: 3 }],
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        flex: 1,
    },
    homeContainer: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    dividerTop: {
        width: '100%',
        alignSelf: 'stretch',
    },
    dividerSimple: {
        width: '100%',
        alignSelf: 'stretch',
        margin: 10
    },
    mainHintText: {
        textAlign: 'center',
        marginTop: 20,
    },
    todoDrawer: {
        flex: 1,
        margin: 10,
        width: '80%'
    },
    addBtn: {
        marginTop: 'auto',
        width: '100%',
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0
    }
});


export default HomeScreen;
