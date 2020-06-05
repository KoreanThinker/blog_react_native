import React from 'react'
import { View, Text, Button } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const HomeScreen = () => {

    const { navigate } = useNavigation()


    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
            <Text>Home</Text>
            <Button
                onPress={() => navigate("Test")}
                title='Go to the TestScreen'
            />
        </View>
    )
}

export default HomeScreen
