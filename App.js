
import dayjs from 'dayjs';
import { StatusBar } from 'expo-status-bar';
import { useEffect,useRef } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View ,Image,TextInput, KeyboardAvoidingView, Platform, Pressable, Keyboard, Alert} from 'react-native';
import Margin from './src/margin';
import { runPracticeDayjs } from './src/practice-dayjs';
import { getCalendarColumns, getDaycolor, getDayText, itemSize, Item_Width } from './src/util';
import { MaterialIcons } from '@expo/vector-icons';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useCalendar } from './src/use-calendar';
import { useTodolist } from './src/use-todolist';
import Calendar from './src/Calendar';
import {Ionicons,AntDesign} from '@expo/vector-icons'
import AddTodoInput from './src/AddTodoInput';
import Picture from './src/Picture';

export default function App() {
  const { 
    selectDate,
    setSelectedDate,
    isDatePickerVisible,
    showDatePicker,
    hideDatePicker,
    handleConfirm,
    onPressArrowleft,
    onPressArrowright
  } = useCalendar(now);
  const {
    todolist,
    filteredTodoList,
    addtodo,
    toogletodo,
    removetodo,
    setinput,
    resetInput,
    input,} =  useTodolist(selectDate);

  const now = dayjs();
  const columns = getCalendarColumns(selectDate);
  const flatListRef = useRef(null);
  const scrolltoEnd = () => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 400);
  }

  const onSubmitEditing =()=>{
    addtodo();
    resetInput();
    scrolltoEnd();
  }
  

  const onPressAdd = ()=>{
    addtodo();
    resetInput();
    scrolltoEnd(); 
  }

  const onFocus =()=>{
  if(filteredTodoList.length>0)
      scrolltoEnd();    
  }
  

  const Header = ()=>{
      return(
      <View>
        <Margin height={1}/>
        <Calendar
        todolist={todolist}
        columns={columns}
        selectedDate={selectDate}
        onPressLeftArrow={onPressArrowleft}
        onPressHeaderDate={showDatePicker}
        onPressRightArrow={onPressArrowright}
        onPressDate = {setSelectedDate}
        />

        <View
          style={{width:5,height:5,borderRadius:5/2,
        backgroundColor:"#a3a3a3"}}
        />

        <Margin height={20}/>
      </View>
      );
  }
  const renderItem = ({item:todo})=>{
      const issucess = todo.issucess;
      const onPress = ()=>toogletodo(todo.id);
      const longPress = ()=>{
        Alert.alert("삭제할까요?","",[{text:"네",onPress:()=>removetodo(todo.id)},{text:"아니요",style:"default"}])
      }

    return(
        <Pressable
          onLongPress={longPress}
          onPress={onPress} 
          style={{ 
            width:220,
            flexDirection:"row",
            alignSelf:"center",
            justifyContent:"space-between",
            paddingVertical:10,
            paddingHorizontal:5,
            borderBottomWidth:0.2,
            borderColor: "#a6a6a6"
            }}>
          <Text style={{fontSize:14,color:"#595959"}}>{todo.content}</Text>
          <TouchableOpacity>
              <Ionicons name='ios-checkmark' 
                size={18}
                color={issucess ? "#595959" :"#bfbfbf"}
              />
          </TouchableOpacity>
        </Pressable>
      
    )
  }

  return (
    <Pressable style={styles.container} onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
      <Margin height={20}/>  
      <KeyboardAvoidingView 
      behavior={Platform.OS ==="ios" ? "padding":"height"}>
      <View style={{flexDirection:"column",alignItems:"center"}}>
        <Picture/> 
        <FlatList
            showsVerticalScrollIndicator={false}
            ref={flatListRef}
            focusable={true}
            style={{flex:1}}
            ListHeaderComponent={Header}
            data={filteredTodoList}
            renderItem={renderItem}
            removeClippedSubviews={false}
          />
           
          {/* ios 시뮬레이터 키보드 on/off cmd + shift + k */}

          <AddTodoInput 
            value={input}
            onchangetext={setinput}
            width={{Item_Width}}
            placeholder={`${dayjs(selectDate).format('MM.DD')}에 추가할 투두`}
            onpressAdd={onPressAdd}
            onSubmitEditing ={onSubmitEditing}
            onFocus = {onFocus}
            />
     </View>
     </KeyboardAvoidingView>
    </SafeAreaView>
    <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
