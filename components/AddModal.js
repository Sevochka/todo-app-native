import {Button, Text, Card, Modal, Layout, Input, Divider, Icon} from '@ui-kitten/components'
import {StyleSheet} from 'react-native'
import React from 'react'


const FolderIcon = (props) => (
    <Icon {...props} name='folder-outline'/>
);
const AlertIcon = (props) => (
    <Icon {...props} name='alert-circle-outline'/>
);
const BellIcon = (props) => (
    <Icon {...props} name='bell-outline'/>
);
const BookmarkIcon = (props) => (
    <Icon {...props} name='bookmark-outline'/>
);
const FileIcon = (props) => (
    <Icon {...props} name='file-outline'/>
);

const buttonsIcons = [
    { icon: FolderIcon, name: 'folder-outline' },
    { icon: AlertIcon, name: 'alert-circle-outline' },
    { icon: BellIcon, name: 'bell-outline' },
    { icon: BookmarkIcon, name: 'bookmark-outline' },
    { icon: FileIcon, name: 'file-outline' },
]
const styles = StyleSheet.create({
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    card: {
        width: '100%',
        height: '100%',
    },
    input: {
        marginBottom: 20
    },
    divider: {
        margin: 10
    },
    emojisButtons: {
        alignSelf: 'center',
        marginBottom: 20,
        flexDirection: 'row'
    },
    emojisButton: {
        flex: 1,
        borderRadius: 0
    },
    emojisButtonFirst: {
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
    },
    emojisButtonLast: {
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
    }
});

const AddModal = ({visible, hideModal, addList}) => {
    const [value, setValue] = React.useState('');
    const [activeButtonName, setActiveButtonName] = React.useState(buttonsIcons[0].name);

    const handleCreateClick = () => {
        addList({
            name: value,
            emoji: activeButtonName
        })
        setValue('')
    }
    const isButtonDisabled = value.trim() === '' || !activeButtonName

    const buttonsMap = buttonsIcons.map((iconObject, i) => {
        const style = [
            styles.emojisButton,
            i === 0 ? styles.emojisButtonFirst : null,
            i === buttonsIcons.length - 1 ? styles.emojisButtonLast : null,
        ]
        const appearance = activeButtonName === iconObject.name ? 'filled' : 'outline';
        const handlePress = () => {
            if (iconObject.name === activeButtonName) {
                setActiveButtonName(null);
                return;
            }
            setActiveButtonName(iconObject.name)
        }
        return (
            <Button
                appearance={appearance}
                onPress={handlePress}
                style={style}
                key={iconObject.name}
                accessoryLeft={iconObject.icon}
            />)
    })

    return (
        <Modal
            visible={visible}
            backdropStyle={styles.backdrop}
            onBackdropPress={hideModal}>
            <Card style={styles.card} disabled={true}>
                <Text category={'h3'}>???????????????? ????????????</Text>
                <Divider style={styles.divider}/>
                <Input
                    style={styles.input}
                    value={value}
                    label='???????????????? ?????????? ?????????? ??????????'
                    placeholder='?????????? ???????????? ?????????? ????????...'
                    onChangeText={nextValue => setValue(nextValue)}
                />
                <Layout style={styles.emojisButtons}>
                    {buttonsMap}
                </Layout>
                <Button onPress={handleCreateClick} disabled={isButtonDisabled}>
                   ????????????????
                </Button>
            </Card>
        </Modal>
    )
}


export default AddModal;
