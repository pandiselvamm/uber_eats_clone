import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native'
import { Divider } from 'react-native-elements';
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import { useDispatch, useSelector } from 'react-redux';

const styles = StyleSheet.create({
    menuItemStyles: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 20
    },
    titleStyle: {
        fontSize: 19,
        fontWeight: '600'
    }
});

const items = [
    {
        title: 'Grill Chicken',
        description: 'Grill Chicken with mianoise and gravy',
        price: '$15.90',
        image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80'
    }, {
        title: 'Veg Soup',
        description: 'Veg soup with vegetables',
        price: '$10',
        image: 'https://images.unsplash.com/photo-1478749485505-2a903a729c63?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80'
    }, {
        title: 'Chicken Noodles',
        description: 'Chicken Noodles with spicy',
        price: '$12.50',
        image: 'https://images.unsplash.com/photo-1530334044505-5b3aa24cb147?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1169&q=80'
    }, {
        title: 'Chciken Briyani',
        description: 'Briyani with raita and onion',
        price: '$25.30',
        image: 'https://images.unsplash.com/photo-1626777553635-be342a766750?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1631&q=80'
    }, {
        title: 'Fish Fry',
        description: 'Fish fry with onion',
        price: '$20',
        image: 'https://images.unsplash.com/photo-1626253836448-e2376678c191?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2514&q=80'
    }, {
        title: 'Veg Meals',
        description: 'Seves for 2 members with rice and curry',
        price: '$30.50',
        image: 'https://images.unsplash.com/photo-1630409346824-4f0e7b080087?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1246&q=80'
    },
];

export default function MenuItem({ restaurantName }) {
    const dispatch = useDispatch();
    const selectedItems = (item, checkBoxValue) => dispatch({
        type: 'ADD_TO_CART',
        payload: { ...item, restaurantName: restaurantName, checkBoxValue: checkBoxValue }
    })
    const cartItems = useSelector((state) => state.cartReducer.selectedItems.items);
    const resName = useSelector((state) => state.cartReducer.selectedItems.restaurantName);

    const isFoodInCart = (food, cartItems) =>
        Boolean(cartItems.find((item) => (item.title === food.title)));


    let bouncyCheckboxRef = [];
    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{ height: 380 }}>
            {items.map((item, index) => (
                <TouchableOpacity key={index} onPress={() => bouncyCheckboxRef[item.title]?.onPress()}>
                    <View>
                        <View style={styles.menuItemStyles}>
                            <BouncyCheckbox
                                isChecked={isFoodInCart(item, cartItems)}
                                ref={(ref) => (bouncyCheckboxRef[item.title] = ref)}
                                onPress={(checkBoxValue) => selectedItems(item, checkBoxValue)}
                            />
                            <FoodInfo food={item} />
                            <FoodImage food={item} />
                        </View>
                        <Divider width={1} orientation='vertical' />
                    </View>
                </TouchableOpacity>
            ))
            }
        </ScrollView >
    )
}


const FoodInfo = (props) => (
    <View style={{
        width: 240,
        justifyContent: 'space-evenly'
    }}>
        <Text style={styles.titleStyle}>{props.food.title}</Text>
        <Text>{props.food.description}</Text>
        <Text>{props.food.price}</Text>
    </View>
);

const FoodImage = (props) => (
    <View >
        <Image source={{ uri: props.food.image }} style={{
            width: 100,
            height: 100,
            borderRadius: 8,
            marginLeft: -30
        }} />
    </View>
);