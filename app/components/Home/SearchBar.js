import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Keyboard } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'

export default function SearchBar(props) {
    const [address, setAddress] = useState("");
    const onChange = (text) => {
        setAddress(text);
    };
    const handleSearch = () => {
        Keyboard.dismiss()
        props.cityHandle(address);
    }
    return (
        <View style={{ marginTop: 15, flexDirection: 'row' }}>
            <GooglePlacesAutocomplete
                textInputProps={{
                    onChangeText: onChange
                }}
                placeholder="Search"
                query={{ key: 'AIzaSyATiAqIXBARofRD2apZcPQ1eEWZPH4fPV4' }}
                styles={{
                    textInput: {
                        backgroundColor: "#eee",
                        borderRadius: 20,
                        fontWeight: "700",
                        marginTop: 7
                    },
                    textInputContainer: {
                        backgroundColor: "#eee",
                        flexDirection: 'row',
                        borderRadius: 50,
                        alignItems: 'center',
                        marginRight: 10
                    }
                }}
                renderLeftButton={() =>
                    <View style={{ marginLeft: 10 }}>
                        <Ionicons name="location-sharp" size={24}></Ionicons>
                    </View>
                }
                renderRightButton={() =>
                    <TouchableOpacity onPress={handleSearch}>
                        <View style={{
                            marginRight: 8,
                            backgroundColor: 'white',
                            flexDirection: 'row',
                            padding: 9,
                            borderRadius: 30,
                            alignItems: 'center'
                        }}

                        >
                            <AntDesign name="clockcircle"
                                size={11}
                                style={{
                                    marginRight: 6
                                }}
                            />
                            <Text>Search</Text>
                        </View>
                    </TouchableOpacity>
                }
            />
        </View>
    )
}
