import React, { useState } from 'react'
import { StripeProvider } from '@stripe/stripe-react-native';
import { CardField, useStripe } from '@stripe/stripe-react-native';

export default function Stripe(props) {
    return (
        <StripeProvider
            publishableKey={"pk_test_51JvUS2SEvTLUxElMNWH01ZmtqYOlQMVaUy4idsS8h71seTvh9TgQqAcIlpHl21UNUe6L0NgEDq47mrg2htoxtHgN00jAxRMs0M"}
            merchantIdentifier="merchant.identifier"
        >
            <PaymentScreen props={props} />
        </StripeProvider>
    );
}

const PaymentScreen = (props) => {
    const stripe = useStripe();

    return (
        <CardField
            postalCodeEnabled={false}
            placeholder={{
                number: '4242 4242 4242 4242',
            }}
            threeDSecureParams={{
                backgroundColor: '#FFFFFF', // iOS only
                timeout: 5,
                label: {
                    headingTextColor: '#0000',
                    headingFontSize: 13,
                },
                navigationBar: {
                    headerText: '3d secure',
                },
                footer: { // iOS only
                    backgroundColor: '#FFFFFF',
                },
                submitButton: {
                    backgroundColor: '#000000',
                    cornerRadius: 12,
                    textColor: '#FFFFFF',
                    textFontSize: 14,
                },
            }}
            cardStyle={{
                borderColor: "black",
                borderWidth: 2,
                backgroundColor: '#FFFFFF',
                textColor: '#000000',
            }}
            style={{
                width: '100%',
                height: 50,
                marginVertical: 30,
            }}
            onCardChange={(cardDetails) => {
                props.props.setCards(cardDetails);
            }}
            onBlur={() => {
            }}
            onFocus={(focusedField) => {
                console.log('focusField', focusedField);
            }}
        />
    );
}
