import React from 'react'
import { View, Text, Alert, Image } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler'


export default function BottomTabs({ navigation }) {
    const user = useSelector((state) => state.userReducers.data.user);
    const handleNavigate = (caseName) => {
        if (caseName == "account") {
            navigation.navigate('Account');
        }
    };

    const Icon = (props) => (
        <TouchableOpacity onPress={() => handleNavigate(props.case)}>
            <View>
                {props.case == "account" ? (
                    <>
                        <Image
                            source={{ uri: user?.profile_image }}
                            style={{
                                height: 25,
                                width: 25,
                                borderRadius: 25 / 2,
                                overflow: 'hidden',
                                alignSelf: 'center',
                            }} />
                    </>
                ) : (
                    <>
                        <FontAwesome5 name={props.name} size={25} style={{
                            marginBottom: 3,
                            alignSelf: 'center'
                        }} />
                    </>
                )}

                <Text>{props.text}</Text>
            </View>
        </TouchableOpacity >
    );

    return (
        <View style={{ flexDirection: 'row', margin: 15, height: '25%', justifyContent: 'space-between' }}>
            <Icon name="search" text="Browse" isLogout={false} case="home" />
            <Icon name="shopping-bag" text="Grocery" isLogout={false} case="grocery" />
            <Icon name="receipt" text="Orders" isLogout={false} case="orders" />
            <Icon name="users" text="Account" isLogout={true} case="account" />
        </View>
    )
}

