import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Modal, StyleSheet, Alert, ScrollView, ActivityIndicator } from 'react-native'
import { Divider } from 'react-native-elements/dist/divider/Divider';
import { useSelector } from 'react-redux'
import OrderItem from './OrderItem';
import Stripe from './Stripe';
import axios from 'axios'
import { useStripe, useConfirmPayment } from '@stripe/stripe-react-native';

export default function ViewCart(props) {
    const stripe = useStripe();
    const { confirmPayment } = useConfirmPayment();
    const [loading, setLoading] = useState(false);
    const [cards, setCards] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const restaurantId = props.restaurantId;
    const { items, restaurantName } = useSelector((state) => state.cartReducer.selectedItems);
    const total = items.map((item) => Number(item.price.replace('$', ''))).reduce((prev, curr) => prev + curr, 0);
    const user = useSelector((state) => state.userReducers.data.user);
    const totalUsd = total.toLocaleString('en', {
        style: 'currency',
        currency: 'USD'
    });

    const handleSubmit = async () => {
        console.log('submiting');
        setLoading(true);
        const headers = {
            'Content-Type': 'application/json',
            'token': `Bearer ${user.accessToken}`
        }
        stripe.createPaymentMethod({ type: 'Card', card: cards }).then(function (result) {
            const data = {
                token: result.paymentMethod.id,
                price: total,
                menu_items: items,
                restaurantId: restaurantId,
            }
            axios.post('https://uber-clone-ps.herokuapp.com/api/order/make-payment', data, {
                headers: headers
            }).then((res) => {
                confirmPayment(res.data.client_secret, {
                    type: "Card",
                    billingDetails: {
                        name: 'Pandi Selvam'
                    },
                }).then(() => {
                    setLoading(false);
                    setModalVisible(false);
                    props.navigation.navigate("OrderCompleted", {
                        order: res.data.order
                    })
                });
            }).catch((error) => {
                console.log(error);
                setLoading(false);
                Alert.alert(error?.data?.message ? error?.data?.message : "Something went wrong,please try later");
            })
        });
    };


    const styles = StyleSheet.create({
        modalContainer: {
            flex: 1,
            justifyContent: "flex-end",
            backgroundColor: "rgba(0,0,0,0.7)",
        },

        modalCheckoutContainer: {
            backgroundColor: "white",
            padding: 16,
            height: 600,
            borderWidth: 1,
        },

        restaurantName: {
            textAlign: "center",
            fontWeight: "600",
            fontSize: 18,
            marginBottom: 10,
        },

        subtotalContainer: {
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 15,
        },

        subtotalText: {
            textAlign: "left",
            fontWeight: "600",
            fontSize: 15,
            marginBottom: 10,
        },
    });

    const checkOutModalContent = () => {
        return (
            <>

                <View style={styles.modalContainer}>
                    <View style={styles.modalCheckoutContainer}>
                        <ScrollView showsVerticalScrollIndicator={false} vertical={true}>
                            <Text style={styles.restaurantName}>{props.restaurantName}</Text>
                            {items.map((item, index) => (
                                <OrderItem key={index} item={item} />
                            ))}
                            <View style={styles.subtotalContainer}>
                                <Text style={styles.subtotalText}>Subtotal</Text>
                                <Text>{totalUsd}</Text>
                            </View>
                            <Divider width={1} />

                            <Text style={{
                                fontSize: 18,
                                fontWeight: 'bold',
                                marginTop: 30,
                                marginBottom: 10
                            }}>Make Payment</Text>
                            <Divider width={5} />
                            <Stripe setCards={setCards} />
                            <View style={{ flexDirection: "row", justifyContent: "center" }}>
                                <TouchableOpacity disabled={loading}
                                    style={{
                                        marginTop: 20,
                                        backgroundColor: "black",
                                        alignItems: "center",
                                        padding: 13,
                                        borderRadius: 30,
                                        width: 300,
                                        position: "relative",
                                    }}
                                    onPress={handleSubmit}
                                >
                                    {loading ? < ActivityIndicator size="large" /> : <Text style={{ color: "white", fontSize: 20 }}>Checkout  -  ({total ? totalUsd : ""})</Text>}
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: "center" }}>
                                <TouchableOpacity
                                    style={{
                                        marginTop: 10,
                                        backgroundColor: "red",
                                        alignItems: "center",
                                        padding: 13,
                                        borderRadius: 50,
                                        width: 100,
                                        position: "relative",
                                    }}
                                    onPress={() => setModalVisible(false)}
                                >
                                    <Text style={{ color: "white", fontSize: 20 }}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </>
        )
    };
    return (
        <>

            <Modal
                animationType="slide"
                visible={modalVisible}
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >

                {checkOutModalContent()}

            </Modal>

            {
                total ? (
                    <View style={{
                        flex: 1,
                        position: 'absolute',
                        bottom: 25,
                        justifyContent: 'center',
                        zIndex: 999,
                        alignItems: 'center',
                        flexDirection: 'row',
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            width: '100%',
                        }}>
                            <TouchableOpacity
                                style={{
                                    marginTop: 20,
                                    marginBottom: 0,
                                    backgroundColor: "black",
                                    alignItems: "center",
                                    padding: 13,
                                    borderRadius: 30,
                                    width: 300,
                                    position: "relative",
                                }}
                                onPress={() => setModalVisible(true)}
                                onPressOut={() => { setModalVisible(false) }}
                            >
                                <Text style={{
                                    fontSize: 20,
                                    color: 'white'
                                }}>View Cart({totalUsd})</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : <></>
            }
        </>
    )
}
