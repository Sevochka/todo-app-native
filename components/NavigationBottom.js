import {BottomNavigationTab, BottomNavigation} from '@ui-kitten/components'

const NavigationBottom = ({selectedIndex, onSelect}) => {
    return (
        <BottomNavigation
            selectedIndex={selectedIndex}
            onSelect={onSelect}>
            <BottomNavigationTab title='LIST'/>
            <BottomNavigationTab title='GRID'/>
        </BottomNavigation>
    )
}

export default NavigationBottom;
