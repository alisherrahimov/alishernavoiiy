import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import database from '@react-native-firebase/database';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';
const {width, height} = Dimensions.get('window');
export default function Home({navigation}) {
  const [borderEmail, setBorderEmail] = useState({
    borEmail: false,
    borderPass: false,
  });
  const [email, setEmail] = useState('');
  const [eye, setEye] = useState(true);

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 0.3,
          alignItems: 'flex-start',
          justifyContent: 'center',
          width: width,
        }}>
        <View style={{marginLeft: width / 8}}>
          <Text style={styles.text}>Alisher Navoiy</Text>
          <Text
            style={
              (styles.text, {fontFamily: 'OpenSans-SemiBold', fontSize: 16})
            }>
            asarlari dasturiga xush kelibsiz
          </Text>
        </View>
      </View>
      <KeyboardAvoidingView
        style={{flex: 0.5, alignItems: 'center', justifyContent: 'center'}}>
        <TextInput
          onSubmitEditing={() => {
            setBorderEmail({borEmail: false});
          }}
          value={email}
          style={[
            styles.TextInput,
            {borderColor: borderEmail.borEmail ? '#FA598E' : '#dbdbdb'},
          ]}
          onTouchCancel={() => console.log('fu')}
          onChangeText={(text) => {
            console.log(text);
            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (reg.test(text) === false) {
              console.log('Email is Not Correct');
              setEmail(text);
              return false;
            } else {
              setEmail(text);
              console.log('Email is Correct');
            }
          }}
          placeholder="Email"
          onFocus={() => {
            setBorderEmail({borEmail: true});
          }}
        />
        <View style={{flexDirection: 'row'}}>
          <TextInput
            onSubmitEditing={() => {
              setBorderEmail({borderPass: false});
            }}
            autoCompleteType="password"
            secureTextEntry={eye}
            maxLength={16}
            onFocus={() => {
              setBorderEmail({borderPass: true});
            }}
            style={[
              {
                borderColor: borderEmail.borderPass ? '#FA598E' : '#dbdbdb',
                width: width / 1.45,
                borderTopWidth: 2,
                height: height / 13,
                borderLeftWidth: 2,
                borderBottomWidth: 2,
                borderTopLeftRadius: 15,
                borderBottomLeftRadius: 15,
                fontFamily: 'OpenSans-SemiBold',
                fontSize: 16,
                paddingLeft: 15,
              },
            ]}
            placeholder="Parolni kiriting"
          />
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              borderBottomRightRadius: 15,
              borderBottomWidth: 2,
              borderTopRightRadius: 15,
              borderTopColor: borderEmail.borderPass ? '#FA598E' : '#dbdbdb',
              borderBottomColor: borderEmail.borderPass ? '#FA598E' : '#dbdbdb',
              borderRightColor: borderEmail.borderPass ? '#FA598E' : '#dbdbdb',
              borderRightWidth: 2,
              borderTopWidth: 2,
            }}>
            {eye ? (
              <TouchableOpacity
                onPress={() => {
                  setEye(false);
                }}>
                <Icon
                  style={{paddingRight: 10}}
                  name="eye-slash"
                  size={20}
                  color="#dbdbdb"
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  setEye(true);
                }}>
                <Icon
                  style={{paddingRight: 10}}
                  name="eye"
                  size={20}
                  color="red"
                />
              </TouchableOpacity>
            )}
          </View>
        </View>

        <LinearGradient
          style={{marginTop: 15, borderRadius: 15}}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#FA598E', '#FDA68E']}>
          <TouchableOpacity
            style={styles.TouchableOpacity}
            onPress={() => {
              navigation.navigate('EnterData');
            }}>
            <Text
              style={{
                fontFamily: 'OpenSans-SemiBold',
                fontSize: 20,
                color: '#fff',
              }}>
              Kirish
            </Text>
          </TouchableOpacity>
        </LinearGradient>

        <LinearGradient
          style={{borderRadius: 15, marginTop: 15}}
          start={{x: 0, y: 1}}
          end={{x: 0, y: 1}}
          colors={['#4285f4', '#34a853', '#fbbc05', '#ea4335']}>
          <TouchableOpacity style={styles.TouchableOpacity}>
            <Icon name="google" size={20} color="#fff" />
            <Text
              style={{
                fontFamily: 'OpenSans-SemiBold',
                fontSize: 20,
                color: '#fff',
                marginLeft: 2,
              }}>
              oogle
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </KeyboardAvoidingView>
      <View style={{flex: 0.2, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{fontFamily: 'OpenSans-SemiBold', fontSize: 16}}>
          Dastur Verisiya 1.0
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {alignItems: 'center', flex: 1},
  text: {
    fontFamily: 'OpenSans-ExtraBold',
    fontSize: 26,
    textAlign: 'left',
    textAlignVertical: 'center',
  },
  TextInput: {
    width: width / 1.3,
    height: height / 13,
    borderWidth: 2,
    borderRadius: 15,
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 16,
    paddingLeft: 15,
    marginBottom: 15,
    letterSpacing: 1,
  },
  TouchableOpacity: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width / 1.3,
    height: height / 15,
    flexDirection: 'row',
  },
});
