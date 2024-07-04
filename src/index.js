import { View, Text, StyleSheet, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native'
import React, {useState} from 'react'
import axios from 'axios'
import DropDownPicker from 'react-native-dropdown-picker'

const DismissKeyboard = ({children}) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
)
const TranslateApp = () => {
    const [inputText, setInputText] = useState('');
    const [translatedText, setTranslatedText] = useState('');
    const [fromLanguage, setFromLanguage] = useState('English');
    const [toLanguage, setToLanguage] = useState('Hindi');
    const [openFrom, setOpenFrom] = useState(false);
    const [openTo, setOpenTo] = useState(false);

    const API_KEY = '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'
//If the API Key expires, then get a new key by making a new account with another number
    const translateText = async () => {
        try {
            const response = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                {
                    messages: [
                        {role: 'user', context: `Translate the following ${fromLanguage} text into ${toLanguage}: "${inputText}"`},
                        {role: 'assistant', content: 'translate'}
                    ],
                    max_tokens: 500,
                    model: 'gpt-3.5-turbo'
                },
                {
                    headers: {
                        'Content-Type' : 'application/json',
                        'Authorization' :  `Bearer ${API_KEY}`,
                    },
                }
            )
            setTranslatedText(response.data.choices[0].message.content);
            Keyboard.dismiss();
        } catch (error) {
            console.error('Error translating text', error.response.data);
        }
    }
  return (
    <DismissKeyboard>
    <View style = {styles.container}>
      <Text style= {styles.title}>TranslateApp</Text>
      <View style = {styles.dropdowncontainer}>
        <DropDownPicker
        open = {openFrom}
        value = {fromLanguage}
        setOpen={setOpenFrom}
        setValue={setFromLanguage}
        items={[
            {label: 'English', value: 'English'},
            {label: 'French', value: 'French'},
            {label: 'German', value: 'German'},
            {label: 'Hindi', value: 'Hindi'}
        ]}
        defaultValue = {fromLanguage}
        style = {styles.dropdown}
        containerStyle = {{flex:1, alignItems: 'center'}}
        onChangeItem = {(item) => {
            setFromLanguage(item.value)
        }}
        ></DropDownPicker>
        <DropDownPicker
        open = {openTo}
        value = {toLanguage}
        setOpen={setOpenTo}
        setValue={setToLanguage}
        items={[
            {label: 'English', value: 'English'},
            {label: 'French', value: 'French'},
            {label: 'German', value: 'German'},
            {label: 'Hindi', value: 'Hindi'}
        ]}
        defaultValue = {toLanguage}
        style = {styles.dropdown}
        containerStyle = {{flex:1, alignItems: 'center'}}
        onChangeItem = {(item) => {
            setToLanguage(item.value)
        }}
        ></DropDownPicker>
      </View>
      <TextInput
      style = {styles.input}
      onChangeText={text => setInputText(text)}
      value = {inputText}
      multiline/>
      <TouchableOpacity
      style = {styles.button}
      onPress={translateText}>
        <Text style = {styles.buttontext}>Translate</Text>
      </TouchableOpacity>
      <Text style = {styles.title2}>Translated Text:</Text>
      <Text style = {styles.text}>{translatedText}</Text>
    </View>
    </DismissKeyboard>
  )
}

export default TranslateApp

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black',
      alignItems: 'center'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 32,
        marginBottom: 40,
        color: '#fff',
        marginTop: 100
    },
    dropdowncontainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    dropdown: {
        backgroundColor: '#fff',
        width: 170,
        marginTop: 50,
        color: '#fff'
    },
    input: {
        height: 150,
        width: '100%',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#fff',
        color: '#fff',
        padding: 10,
        marginTop: 100
    },
    button: {
        backgroundColor: '#026efd',
        width: 200,
        height: 50,
        marginTop: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttontext: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold'
    },
    title2: {
        fontWeight: 'bold',
        fontSize: 32,
        marginBottom: 20,
        color: '#fff',
        marginTop: 50
    },
    text: {
        color: '#fff',
        fontSize: 20
    }
  });