import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 160,
        alignItems: 'center',
        width: "100%",
        height: "100%"
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 300,
        height: 50,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: 'white',
        marginTop: 10,
        elevation: 3,
        backgroundColor: 'black',
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    invalid_input: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        margin: 5,
        width: 300,
        height: 50,
        borderColor: 'red',
        borderWidth: 2
    },
    logo: {
        width: 100,
        height: 100,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        marginBottom: 10
    },
    input: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        margin: 5,
        width: 300,
        height: 50,
        borderWidth: 1
    }
});

export default styles;