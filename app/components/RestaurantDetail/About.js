import React from 'react'
import { View, Text, Image } from 'react-native'

export default function About(props) {
    const { name, image_url, price, rating, categories, review_count } = props.route.params;

    const formatedCategories = categories.map((cat) => cat.title).join(' · ');

    const description = `${formatedCategories}  ${price ? "· " + price : " "} · 🎫 · ${rating} ⭐ (${review_count}+)`

    return (
        <View>
            <RestaurantImage image={image_url} />
            <RestaurantTitle title={name} />
            <RestaurantDescription description={description} />
        </View>
    )
}

const RestaurantImage = (props) => (
    <Image source={{ uri: props.image }} style={{ width: '100%', height: 180 }} />
);

const RestaurantTitle = (props) => (
    <Text style={{
        fontSize: 23,
        fontWeight: '600',
        marginTop: 10,
        marginHorizontal: 15
    }}>{props.title}</Text>
);

const RestaurantDescription = (props) => (
    <Text style={{
        fontSize: 15.5,
        fontWeight: '400',
        marginTop: 10,
        marginHorizontal: 15.5
    }}>{props.description}</Text>
);