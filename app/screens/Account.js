import React from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, StyleSheet, Image, ImageBackground, Alert } from 'react-native'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../styles/account'
import ImagePicker from 'react-native-image-picker';

export default function Account({ navigation }) {
    const dispatch = useDispatch();

    const handleLogout = () => {
        Alert.alert(
            "Logout ?",
            "",
            [
                { text: "OK", onPress: () => dispatch({ type: 'LOGOUT' }) },
                {
                    text: "Cancel",
                    style: "cancel"
                },
            ]
        );


    }
    const user = useSelector((state) => state.userReducers.data.user);
    console.log(user);
    const image = { uri: "https://reactjs.org/logo-og.png" };
    return (
        <View>
            <View style={styles.container}>
                <View style={styles.header}>
                    <ImageBackground style={{
                        height: "100%",
                        width: "100%",
                    }} source={{ uri: 'https://images.pexels.com/photos/5531434/pexels-photo-5531434.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' }} >
                        <SafeAreaView style={{ flexDirection: 'row', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, }}>
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <FontAwesome5Icon style={{
                                    color: 'white', fontSize: 23, fontWeight: 'bold', margin: 10
                                }} name="chevron-left" size={23} />
                            </TouchableOpacity>
                        </SafeAreaView>
                    </ImageBackground>
                </View>
                <>
                    <Image style={styles.avatar} source={{ uri: user.profile_image }} />
                    <TouchableOpacity style={{
                        position: 'absolute', right: 130, top: 140
                    }}>
                        <View style={{
                            backgroundColor: 'white',
                            borderRadius: 50,
                            height: 30,
                            width: 30,
                            alignItems: 'center',
                            justifyContent: 'center',
                            alignSelf: 'center'
                        }}>
                            <FontAwesome5Icon name="camera" size={18} style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                alignSelf: 'center'
                            }} color="#000" />
                        </View>
                    </TouchableOpacity>
                </>
                <View style={styles.body}>
                    <View style={styles.bodyContent}>
                        <Text style={styles.name}>{user.username}</Text>
                        <Text style={styles.info}>{user.email}</Text>
                        <TouchableOpacity style={styles.buttonContainer} onPress={handleLogout}>
                            <Text style={{
                                fontSize: 20,
                                color: 'white'
                            }}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}