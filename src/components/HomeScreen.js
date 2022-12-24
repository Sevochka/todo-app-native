import {Button, Divider, Icon, Layout, Spinner, Text} from '@ui-kitten/components'
import {StyleSheet} from 'react-native'
import NavigationBar from './NavigationBar'
import ToDoDrawer from './TodoDrawer'
import NavigationBottom from './NavigationBottom'
import AddModal from './AddModal'
import {useEffect, useRef, useState} from 'react'
import ToDoModal from './ToDoModal'
import RemoveListDialog from './RemoveListDialog'
import GridDrawer from './GridDrawer'
import {addList, addToDo, aunteficate, changeComplete, getList, removeFolder, removeToDo} from "../services/api";
import {useTodosStore} from "../store/todos.store";
import { observer } from 'mobx-react-lite';


const AddIcon = (props) => (
    <Icon {...props} name='plus-circle-outline'/>
);


const HomeScreen = observer(() => {
    const [isAddModalVisible, setIsAddModalVisible] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [isGridView, setIsGridView] = useState(true)


    const { lists, updateList,
        setCurrentToDo, currentToDo,
        setItemToRemove} = useTodosStore();

    useEffect(async () => {
        await aunteficate();
        await updateList();

        setIsLoading(false)
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

    if (isLoading){
        return  (<Layout style={styles.spinnerContainer}><Spinner/></Layout>)
    }
    return (
        <>
            <Layout style={styles.homeContainer}>
                <RemoveListDialog />
                <AddModal
                    visible={isAddModalVisible}
                    hideModal={() => setIsAddModalVisible(false)}
                    />
                <ToDoModal
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
});

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
