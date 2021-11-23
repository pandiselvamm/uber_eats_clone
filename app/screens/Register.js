import React from 'react'
import { View, TextInput, SafeAreaView, ActivityIndicator, KeyboardAvoidingView, Image, Text, TouchableOpacity, Alert, Keyboard, TouchableWithoutFeedback, ImageBackground } from 'react-native'
import { Formik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import styles from '../styles/login'

const registerValidationSchema = yup.object().shape({
    username: yup
        .string()
        .required('Username is Required'),
    email: yup
        .string()
        .email("Please enter valid email")
        .required('Email Address is Required'),
    password: yup
        .string()
        .min(6, ({ min }) => `Password must be at least ${min} characters`)
        .required('Password is required'),
    confirm_password: yup.string().when("password", {
        is: value => value && value.length > 0,
        then: yup.string()
            .required(
                "Required"
            )
            .oneOf([yup.ref("password"), null], "Must match new password."),
        otherwise: yup.string()
    }),
})

export default function Register({ navigation }) {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}  >
            <ImageBackground style={{
                width: "100%",
                height: "100%",
            }} source={{ uri: "https://images.pexels.com/photos/3338497/pexels-photo-3338497.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" }}>
                <View style={{
                    flex: 1,
                    marginTop: 135,
                    alignItems: 'center',
                    width: "100%",
                    height: "100%"
                }}>
                    <KeyboardAvoidingView
                        style={{ flex: 1 }}
                        behavior="position"
                    >
                        <Image
                            style={styles.logo}
                            source={{ uri: 'https://play-lh.googleusercontent.com/MMBG4AZmpMhSfhF5k7QnFmhvFbaF5ZC_BtEOIKRt9TIkUZjul2lWwPZV75PwTfoSm23-jgMxkroRGA-vkDg=s360-rw' }}
                        />
                        <Formik
                            validationSchema={registerValidationSchema}
                            initialValues={{ username: '', email: '', password: '', confirm_password: '' }}
                            onSubmit={values => (
                                axios.post('https://uber-clone-ps.herokuapp.com/api/auth/register', values).then((res) => {
                                    navigation.navigate('Login', {
                                        message: 'You have registered successfully!!!'
                                    });
                                }).catch((error) => {
                                    if (error?.response?.status == '500') {
                                        values.confirm_password = values.password = '';
                                        Alert.alert(error?.response?.data?.message ? error?.response?.data?.message : "Internal error");
                                    } else {
                                        Alert.alert("Something went wrong,please try later");
                                    }
                                })
                            )}
                        >
                            {({ handleChange, handleBlur, handleSubmit, isSubmitting, values, errors, isValid }) => (
                                <>
                                    <TextInput
                                        style={errors.username ? styles.invalid_input : styles.input}
                                        placeholder="Username"
                                        onChangeText={handleChange('username')}
                                        onBlur={handleBlur('username')}
                                        value={values.username}
                                    />
                                    {errors.username &&
                                        <Text style={{ fontSize: 13, fontWeight: 'bold', color: 'red', marginLeft: 6 }}>{errors.username}</Text>
                                    }
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
                                    <TextInput
                                        style={errors.confirm_password ? styles.invalid_input : styles.input}
                                        placeholder="Confirm Password"
                                        onChangeText={handleChange('confirm_password')}
                                        onBlur={handleBlur('confirm_password')}
                                        value={values.confirm_password}
                                        secureTextEntry
                                    />
                                    {errors.confirm_password &&
                                        <Text style={{ fontSize: 13, fontWeight: 'bold', color: 'red', marginLeft: 6 }}>{errors.confirm_password}</Text>
                                    }
                                    <View style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                        <TouchableOpacity onPress={handleSubmit} disabled={isSubmitting} style={styles.button}>
                                            {isSubmitting ? < ActivityIndicator size="large" /> : <Text style={styles.text}>Register</Text>}
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{
                                        marginEnd: 10,
                                        marginTop: 10
                                    }}>
                                        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate("Login")}>
                                            <Text style={{
                                                textAlign: 'right',
                                                fontSize: 15, fontWeight: 'bold',
                                                color: '#eee'
                                            }}>
                                                Already have an account?
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </>
                            )}
                        </Formik>
                    </KeyboardAvoidingView>
                </View >
            </ImageBackground>
        </TouchableWithoutFeedback>
    )
}