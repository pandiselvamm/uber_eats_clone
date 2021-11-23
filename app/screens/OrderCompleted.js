import React from "react";
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import LottieView from "lottie-react-native";
const styles = StyleSheet.create({
    menuItemStyles: {
        margin: 20
    },
    titleStyle: {
        fontSize: 19,
        fontWeight: '600'
    }
});
export default function OrderCompleted({ route, navigation }) {
    const order = route.params.order;
    const dispatch = useDispatch();
    const { restaurantName } = useSelector((state) => state.cartReducer.selectedItems);

    const totalUSD = order.price.toLocaleString("en", {
        style: "currency",
        currency: "USD",
    });

    const backToHome = () => {
        dispatch({
            type: 'CLEAN_CART',
        })
        navigation.navigate('Home');
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <View
                style={{
                    margin: 15,
                    alignItems: "center",
                    height: "100%",
                }}
            >
                <LottieView
                    style={{ height: 100, alignSelf: "center", marginBottom: 30 }}
                    source={require("../assets/animations/check-mark.json")}
                    autoPlay
                    speed={0.5}
                    loop={false}
                />
                <Text style={{
                    fontSize: 15, fontWeight: "bold", alignItems: 'center', textAlign: 'center'
                }}>
                    Your order at {restaurantName} has been placed for ${totalUSD}
                </Text>
                <Text style={{
                    fontSize: 13, fontWeight: "bold", alignItems: 'center', textAlign: 'center', marginTop: 10
                }}>
                    Your Transaction Id is : {order.txn_id}
                </Text>
                <LottieView
                    style={{ height: 200, alignSelf: "center" }}
                    source={require("../assets/animations/cooking.json")}
                    autoPlay
                    speed={0.5}
                />
                <View style={{ flexDirection: "row", justifyContent: "center" }}>
                    <TouchableOpacity
                        style={{
                            backgroundColor: "black",
                            alignItems: "center",
                            padding: 13,
                            borderRadius: 50,
                            width: 150,
                            position: "relative",
                            marginTop: 40
                        }}
                        onPress={() => backToHome()}
                    >
                        <Text style={{ color: "white", fontSize: 20 }}>Back To Home</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView >
    );
}