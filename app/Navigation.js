import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import Home from './screens/Home'
import RestaurantDetail from './screens/RestaurantDetail';
import { useSelector } from 'react-redux';
import Login from './screens/Login';
import Account from './screens/Account';
import Register from './screens/Register';
import OrderCompleted from './screens/OrderCompleted';

export default function RootNavigation() {
    const userData = useSelector((state) => state.userReducers.data.user);
    const isLoggedIn = useSelector((state) => state.userReducers.data.isLoggedIn);
    const Stack = createStackNavigator();

    const screenOption = {
        headerShown: false
    }
    return (
        <NavigationContainer >
            <Stack.Navigator intialRouteName="Home" screenOptions={screenOption}>
                {isLoggedIn ? (
                    <>
                        <Stack.Screen name="Home" component={Home} />
                        <Stack.Screen name="RestaurantDetail" component={RestaurantDetail} />
                        <Stack.Screen name="Account" component={Account} />
                        <Stack.Screen name="OrderCompleted" component={OrderCompleted} options={{ gestureEnabled: false }} />
                    </>
                ) : (
                    <>
                        <Stack.Screen name="Register" component={Register} options={{ gestureEnabled: false }} />
                        <Stack.Screen name="Login" component={Login} options={{ gestureEnabled: false }} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}
