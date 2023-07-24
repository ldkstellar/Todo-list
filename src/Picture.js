import React from 'react';
import { Text, View ,Image,} from 'react-native';
import Margin from './margin';


export default () =>{
    return(
        <View style={{flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
            <Margin height={2}/> 
            <Image source={require("./img/background.jpg")} style={{width:240,height:162,borderWidth:6,borderColor:"brown"}}/>
            <View style={{alignItems:"center"}}>
                <Margin height={7}/>
                <Text style={{fontSize:12}}>I'd rather be hated for who I am,</Text>
                <Text style={{fontSize:12}}>than loved for who I am not.</Text>
            </View>
      </View>
       
       );
}
