import { useState } from "react";
import dayjs from 'dayjs';
export const useCalendar = (now)=>{

    const [selectDate ,setSelectedDate]  = useState(now);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    
    const showDatePicker = () => {
        setDatePickerVisibility(true);
      };
    
      const hideDatePicker = () => {
        setDatePickerVisibility(false);
      };
    
      const handleConfirm = (date) => {
        setSelectedDate(dayjs(date));
        hideDatePicker();
      };

      const onPressArrowleft = ()=>{
        const newSelectdate = dayjs(selectDate).subtract(1,"month");
        setSelectedDate(newSelectdate);
      }

      const onPressArrowright = ()=>{
        const newSelectdate = dayjs(selectDate).add(1,"month");
        setSelectedDate(newSelectdate);
        
      }

    return{
        selectDate,
        setSelectedDate,
        isDatePickerVisible,
        showDatePicker,
        hideDatePicker,
        handleConfirm,
        onPressArrowleft,
        onPressArrowright,
    }
}