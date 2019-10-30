import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity
} from "react-native";
import { Actions }  from 'react-native-router-flux';
import { getToken } from './api-client';

export default class LoginView extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: null,
            password: null,
        };
    }
    ingresar = () => {
        getToken(this.state.username, this.state.password).then(data => {
            global.token = data.token
            Actions.home()
        }).catch((error)=> {
            console.warn(error)
        })
    }

    render() {
        return(
            <View style={conatiner}>
                <Image source={require('./assets/ucol.png')} style={logo} resizeMode="contain" />
                <TextInput 
                style={textInput}
                onChangeText={(username) => this.setState({username})}
                value= {this.state.username}
                placeholder={'Correo Electonico'}
                placeholderTextColor={'#000035'}
                onSubmitEditing={()=> {this.passwordTextInput.focus(); }}
                returnKeyType={'next'}
                />
                <TextInput 
                style={textInput}
                onChangeText={(password) => this.setState({password})}
                value= {this.state.password}
                secureTextEntry={true}
                placeholder={'Contraseña'}
                placeholderTextColor={'#000035'}
                ref={(input) => {this.passwordTextInput = input; }}
                returnKeyType={'done'}
                onSubmitEditing={()=> {this.ingresar }}
                />
                <TouchableOpacity onPress={this.ingresar} style={boton}>
                    <Text style={textoBoton} >
                        Entrar
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}
