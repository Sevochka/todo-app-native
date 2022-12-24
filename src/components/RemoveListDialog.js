import {Button, Card, Divider, Layout, Modal, Text} from '@ui-kitten/components'
import React from 'react'
import {StyleSheet} from 'react-native'
import {useTodosStore} from "../store/todos.store";
import {observer} from "mobx-react-lite";

const RemoveListDialog = observer(() => {
    const { itemToRemove, handleRemoveFolder, setItemToRemove} = useTodosStore();

    const hideModal = () => {
        setItemToRemove(null)
    }

    if (!itemToRemove){
        return null
    }
    return (
        <Modal
            visible={itemToRemove}
            backdropStyle={styles.backdrop}
            onBackdropPress={hideModal}>
            <Card style={styles.card} disabled={true}>
                <Text  style={styles.title} category={'h6'}>Вы уверены, что хотите удалить? </Text>
                <Text style={{color: 'red', textAlign: 'center'}}>{itemToRemove.name}</Text>
                <Divider style={styles.divider}/>
                <Layout>
                    <Button onPress={handleRemoveFolder} status='danger' style={styles.button} appearance='filled'>
                       Да
                    </Button>
                    <Button onPress={hideModal} style={styles.button} appearance='outline'>
                        Нет
                    </Button>
                </Layout>
            </Card>
        </Modal>
    )
});

const styles = StyleSheet.create({
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    card: {
        width: '100%',
    },
    title: {
      textAlign: 'center'
    },
    button: {
        width: '100%',
        marginBottom: 20
    },
    divider: {
        margin: 10
    },
});

export default RemoveListDialog;
