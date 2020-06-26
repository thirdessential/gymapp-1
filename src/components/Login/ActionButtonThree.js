import React,{Component} from 'react';
import {TouchableOpacity, Text,View, StyleSheet,TouchableHighlight} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default class  ActionButtonThree extends Component {
    constructor(props) {
        super(props);
        this.state = { buttonColor:this.props.color,
                        counter:0,
                    textColor:this.props.textColor,
                borderColor:this.props.borderColor,
            icon:this.props.icon};
    }
  changeColor= () =>{
     
      this.state.counter+=1;
      if(this.props.color !='white'){
      if(this.state.counter%2!=0){
      this.setState({buttonColor:'#2472D4'})
      this.setState({textColor:'white'})
          
    }
      else
      {
          this.setState({buttonColor:'rgba(52, 52, 52, 0.8)'})
          this.setState({textColor:'#2472D4'})
  }
      }
  }
    render(){
  return (
 


    <TouchableOpacity
     style={[styles.Button,{backgroundColor:this.state.buttonColor,borderColor:this.props.borderColor,borderWidth:2}]}
     onPress={()=>this.changeColor()}
      {...this.props}
    ><View style={{flexDirection:'row'}}>
        {this.state.icon&&<FontAwesome
            name={this.props.icon}
            color={this.props.iconColor}
            size={28}
            style={{marginRight:10,marginTop:3}}
        />}
      <Text style={[styles.label,{color:this.state.textColor}]}>{this.props.label}</Text>
      </View>
    </TouchableOpacity>

  );
}}

const styles = StyleSheet.create(
  {
    Button: {
        width:"60%",
        textAlign:'center',
      backgroundColor: "#2472D4",
      borderRadius: 50,
      alignItems: 'center',
      padding: 15,
      marginTop: 20
    },
    label: {
      fontSize: 28,
        
    },
    buttonPress:{
        width:"60%",
        textAlign:'center',
      backgroundColor: "#2472D4",
      borderRadius: 50,
      alignItems: 'center',
      padding: 15,
      marginTop: 20
    },
    button:{
        width:"60%",
        textAlign:'center',
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        padding: 15,
        marginTop: 20

    },
    TextPress:{
        color: 'white',
        fontSize: 28,
    },
    Text:{
        color: '#2472D4',
        fontSize: 28,
    }
  }
);
