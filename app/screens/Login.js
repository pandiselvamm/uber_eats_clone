import React, { useState } from 'react'
import { View, TextInput, SafeAreaView, Image, Text, TouchableOpacity, Alert, ActivityIndicator, KeyboardAvoidingView, ImageBackground, StyleSheet } from 'react-native'
import { Formik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import styles from '../styles/login'
import { useDispatch, useSelector } from 'react-redux';
import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";

const loginValidationSchema = yup.object().shape({
    email: yup
        .string()
        .email("Please enter valid email")
        .required('Email Address is Required'),
    password: yup
        .string()
        .min(6, ({ min }) => `Password must be at least ${min} characters`)
        .required('Password is required'),
})


const swipe = StyleSheet.create({
    containerContent: { flex: 1, marginTop: 40 },
    containerHeader: {
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        backgroundColor: '#F1F1F1',
    },
    headerContent: {
        marginTop: 0,
    },
    Modal: {
        backgroundColor: '#005252',
        marginTop: 0,
    }
});

export default function Login({ navigation }) {
    const dispatch = useDispatch();
    return (
        <>
            <ImageBackground style={{
                flex: 1,
                width: "100%",
                height: "100%",
            }} source={{ uri: "https://images.pexels.com/photos/3338497/pexels-photo-3338497.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" }}>
                <View style={styles.container}>
                    <FlashMessage position="top" />
                    <KeyboardAvoidingView
                        style={{ flex: 1 }}
                        behavior="position"
                    >
                        <Image
                            style={styles.logo}
                            source={{ uri: 'https://play-lh.googleusercontent.com/MMBG4AZmpMhSfhF5k7QnFmhvFbaF5ZC_BtEOIKRt9TIkUZjul2lWwPZV75PwTfoSm23-jgMxkroRGA-vkDg=s360-rw' }}
                        />
                        <Formik
                            validationSchema={loginValidationSchema}
                            initialValues={{ email: '', password: '' }}
                            onSubmit={values => (
                                axios.post('https://uber-clone-ps.herokuapp.com/api/auth/login', values).then((res) => {
                                    const user = res.data;
                                    dispatch({
                                        type: 'LOGIN_START',
                                        payload: user
                                    })
                                }).catch((error) => {
                                    if (error?.response?.status == '401') {
                                        values.password = '';
                                        Alert.alert("Invalid Credentials");
                                    } else {
                                        Alert.alert("Something went wrong,please try later");
                                    }
                                })
                            )}
                        >
                            {({ handleChange, handleBlur, handleSubmit, isSubmitting, values, errors, isValid }) => (
                                <>
                                    <TextInput
                                        style={errors.email ? styles.invalid_input : styles.input}
                                        placeholder="Email Address"
                                        onChangeText={handleChange('email')}
                                        onBlur={handleBlur('email')}
                                        value={values.email}
                                    />
                                    {errors.email &&
                                        <Text style={{ fontSize: 13, fontWeight: 'bold', color: 'red', marginLeft: 6 }}>{errors.email}</Text>
                                    }
                                    <TextInput
                                        style={errors.password ? styles.invalid_input : styles.input}
                                        placeholder="Password"
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}
                                        value={values.password}
                                        secureTextEntry
                                    />
                                    {errors.password &&
                                        <Text style={{ fontSize: 13, fontWeight: 'bold', color: 'red', marginLeft: 6 }}>{errors.password}</Text>
                                    }
                                    <View style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                        <TouchableOpacity activeOpacity={0.7} onPress={handleSubmit} disabled={isSubmitting} style={styles.button}>
                                            {isSubmitting ? < ActivityIndicator size="large" /> : <Text style={styles.text}>Login</Text>}
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{
                                        marginEnd: 10,
                                        marginTop: 10
                                    }}>
                                        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                                            <Text style={{
                                                textAlign: 'right',
                                                fontSize: 15, fontWeight: 'bold',
                                                color: '#eee',
                                            }}>
                                                Create New Account?
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </>
                            )}
                        </Formik>
                    </KeyboardAvoidingView>
                </View >
            </ImageBackground>
        </>
    )
}
