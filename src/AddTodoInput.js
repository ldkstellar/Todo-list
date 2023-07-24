import React from "react"
import { Text, TextInput, TouchableOpacity, View } from "react-native"
import { Item_Width } from "./util"
import {AntDesign} from '@expo/vector-icons'
export default ({value,onchangetext,placeholder,onpressAdd,onSubmitEditing,onFocus})=>{//parameter가 undefined가 되는 이유는 객체만 넘겨서 그럼 객체의 item을 반환해야 한다.
    
    return(
        <View style={{flexDirection:"row",alignItems:"center",alignSelf:"center"}}>
            <TextInput 
                value={value}
                onChangeText={onchangetext}
                placeholder={placeholder}
                style={{
                    padding:5,
                    width:Item_Width,
                }}
                onSubmitEditing={onSubmitEditing}
                blurOnSubmit={false}
                onFocus={onFocus}
                
               //return 누르면 작동되는것 
            />
        <TouchableOpacity style={{padding:5}} onPress={onpressAdd}>
        <AntDesign name="plus" size={18} color="#595959"/>
        </TouchableOpacity>    
        </View>

    )
}
