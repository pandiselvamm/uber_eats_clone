import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export const localRestaurants = [
    {
        name: "Beachside Bar",
        image_url:
            "https://static.onecms.io/wp-content/uploads/sites/9/2020/04/24/ppp-why-wont-anyone-rescue-restaurants-FT-BLOG0420.jpg",
        categories: ["Cafe", "Bar"],
        price: "$$",
        reviews: 1244,
        rating: 4.5,
    },
    {
        name: "Benihana",
        image_url:
            "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmVzdGF1cmFudCUyMGludGVyaW9yfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
        categories: ["Cafe", "Bar"],
        price: "$$",
        reviews: 1244,
        rating: 3.7,
    },
    {
        name: "India's Grill",
        image_url:
            "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
        categories: ["Indian", "Bar"],
        price: "$$",
        reviews: 700,
        rating: 4.9,
    },
];

export default function RestaurantItem({ navigation, ...props }) {
    return (
        <>
            {props.data.map((item, index) => (
                <TouchableOpacity key={index} activeOpacity={1} style={{ marginBottom: 10 }} onPress={
                    () => navigation.navigate("RestaurantDetail", {
                        id: item._id,
                        name: item.title,
                        image_url: item.image_url,
                        categories: item.categories,
                        price: item.price,
                        review_count: item.review_count,
                        rating: item.rating,
                    })
                }>
                    <View style={{
                        padding: 15,
                        backgroundColor: "white"
                    }}>
                        <RestaurantItemImage image={item.image_url} />
                        <RestaurantItemInfo name={item.title} rating={item.rating} />
                    </View>
                </TouchableOpacity >
            ))}
        </>
    )
}

const RestaurantItemImage = (prop) => (
    <>
        <Image
            source={{ uri: prop.image }}
            style={{
                width: "100%",
                height: 180,
                borderRadius: 15
            }}
        />
        <TouchableOpacity style={{
            position: 'absolute', right: 20, top: 20
        }}>
            <MaterialCommunityIcons name="heart-outline" size={25} color="#fff" />
        </TouchableOpacity>
    </>
);

const RestaurantItemInfo = (prop) => (
    <View
        style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 10
        }}
    >
        <View >
            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{prop.name}</Text>
            <Text style={{ fontSize: 15, color: 'gray' }}>30-45 Min</Text>
        </View>
        <View style={{
            backgroundColor: '#eee',
            height: 30,
            width: 30,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 50
        }}>
            <Text>{prop.rating}</Text>
        </View>
    </View>
);
