import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, StatusBar } from 'react-native';
import { Picker } from '@react-native-picker/picker';


export default function App() {
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState('');
  const [rates, setRates] = useState({});
  const [result, setResult] = useState(0);

  const getData = () => {
    fetch('https://api.apilayer.com/exchangerates_data/latest',
      { headers: { 'apikey' : '42rOUPvSL1AAWQ6sS6tS0USSba7AlgSb' }})
    .then(response => response.json())
    .then(data => setRates(data.rates))
    .catch(err => console.error(err))
  }

    useEffect(() => {
      getData();
    }, []);

  const rateConversion = () => {
    const rate = rates[currency];
    setResult((amount / rate).toFixed(5));
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <Image source={require('./euro.jpg')} style={styles.image} />
      <Text style={{fontSize: 24}}>{result} €</Text>
      <View style={styles.input}>
        <TextInput
          style={{fontSize: 20, width: 100, marginTop: 40}}
          placeholder='amount'
          type="numeric"
          onChangeText={amount => setAmount(amount)} />
        <Picker style={{height: 30, width: 100, marginTop: 40}}
        selectedValue={currency}
        onValueChange={value => setCurrency(value)}>
          {
            Object.keys(rates).map(item =>
              <Picker.item key={item} label={item} value={item} />)
          }
        </Picker>
      </View>
      <Button title="Convert" onPress={rateConversion} />
    </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  image: {
    width: 300,
    height: 300,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
});

