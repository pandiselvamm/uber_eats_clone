import React, { useCallback, useEffect, useState } from 'react'
import { View, RefreshControl, SafeAreaView, ScrollView, Keyboard, Alert } from 'react-native'
import Categories from '../components/Home/Categories'
import HeaderTabs from '../components/Home/HeaderTabs'
import RestaurantItem, { localRestaurants } from '../components/Home/RestaurantItem'
import SearchBar from '../components/Home/SearchBar'
import { Dimensions } from 'react-native';
import BottomTabs from '../components/Home/BottomTabs'
import { Divider } from 'react-native-elements'
import axios from 'axios';
const windowHeight = Dimensions.get('window').height;

const YELP_API_KEY =
    "0bhUpS15EiRZt3_zecfVFsbyav2FkHn56aF-9JTY8DfvggwoxqnIb57624oXdbiqH-ad-8XiSsfiosqk2PBuvUsfsHWv21vZzpqMVmA9BRj3GJcWtnCKVE82tAiHYXYx";

export default function Home({ navigation }) {
    const [refreshing, setRefreshing] = useState(false);
    const [data, setData] = useState(localRestaurants);
    const [city, setCity] = useState("Los");
    const [activeTab, setActiveTab] = useState("Delivery");
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getRestaurantsFromYelp();
    }, []);

    const getRestaurantsFromYelp = () => {
        axios.get(`https://uber-clone-ps.herokuapp.com/api/restaurants?location=${city}`).then(res => {
            const restaurants = res.data;
            setData(restaurants);
            setRefreshing(false);
        }).catch(err => {
            console.error(err);
        });
    };

    useEffect(() => {
        getRestaurantsFromYelp();
    }, [city]);


    return (
        <SafeAreaView style={{ backgroundColor: '#eee' }} >
            <View style={{ backgroundColor: 'white', padding: 15 }}>
                <HeaderTabs activeTab={activeTab} setActiveTab={setActiveTab} />
                <SearchBar cityHandle={setCity} />
            </View>
            <ScrollView showsVerticalScrollIndicator={false} style={{ height: 500 }} onScroll={Keyboard.dismiss}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }>
                <Categories />
                <RestaurantItem data={data} navigation={navigation} />
            </ScrollView>
            <Divider width={1} />
            <BottomTabs navigation={navigation} />
        </SafeAreaView>
    )
}
