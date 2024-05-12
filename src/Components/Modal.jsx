import React, { useState } from 'react';
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from 'react-native-paper';
import notifee, { TriggerType } from '@notifee/react-native';
import { useBearStore } from './zustandstate';
import DateTimePickerModal from "react-native-modal-datetime-picker";

function Modal({ closeModal }) {
    const [Input, setInput] = useState("")
    const [Hours, setHours] = useState("00")
    const [Minutes, setMinutes] = useState("00")
    const [AMPM, setAMPM] = useState(null)
    const [timestampNotification, settimestampNotification] = useState(null)

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        let stamp = new Date(date);
        settimestampNotification(stamp.getTime());
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        setHours(hours);
        setMinutes(minutes);
        setAMPM(ampm);
        hideDatePicker();
    };


    const insertDataHook = useBearStore((state) => state.addData)
    const insertData = async () => {
        if (Input.length === 0) return;
        if (Hours == null && Minutes == null) return;
        if (Hours <= 0 && Minutes <= 0) return;
        const timestamp = Math.floor(Date.now() / 1000)
        let dataObj = {
            Task: Input,
            Hours: Hours,
            Minutes: Minutes,
            AMPM: AMPM,
            Completed: false,
            notificationID: null,
            isDeleted: false,
            isHidden: false,
            creationDate: timestamp,
            deletionDate: null
        }

        let notificationID = await onCreateTriggerNotification();
        dataObj.notificationID = notificationID;
        return dataObj;

    }
    async function onCreateTriggerNotification() {

        const trigger = {
            type: TriggerType.TIMESTAMP,
            timestamp: timestampNotification,
            alarmManager: true,
        };
        const channelId = await notifee.createChannel({
            id: 'default',
            name: 'Default Channel',
            sound: 'tone',
            vibration: true,
            vibrationPattern: [300, 500],
        });

        let id = await notifee.createTriggerNotification(
            {
                title: Input.toLowerCase().replace(/\b(\s\w|^\w)/g, function (txt) { return txt.toUpperCase(); }),
                body: `Your Task is pending`,
                android: {
                    channelId,
                    smallIcon: 'ic_notification',
                },
            },
            trigger,
        );
        return id;
    }

    return (
        <>
            <StatusBar
                barStyle="dark-content"
                backgroundColor={"rgba(0,0,0,0.5)"}
            />
            <View style={styles.modal} onTouchStart={(e) => { closeModal() }}>
                <View style={styles.addNewTodo} onTouchStart={(e) => { e.stopPropagation() }}>
                    <TextInput
                        label="Todo Item"
                        value={Input}
                        mode="outlined"
                        contentStyle={{ fontFamily: "LED Dot-Matrix 400", color: "black" }}
                        onChangeText={text => setInput(text)}
                        activeOutlineColor='#dcdcdc'
                        outlineStyle={{
                            borderStyle: "dashed",
                        }}
                        style={{ width: "100%", backgroundColor: "white", fontFamily: "LED Dot-Matrix 400" }}
                    />
                    <Text style={{ width: "90%", fontFamily: "LED Dot-Matrix 400", textAlign: "center" }}>Remind me in :-</Text>
                    <Text style={{ width: "90%", fontFamily: "LED Dot-Matrix 400", textAlign: "center", fontSize: 22 }}>{Hours}:{Minutes} {AMPM ? AMPM : null}</Text>
                    <View style={styles.scrollwrap}>
                        <View>
                            <Button title="Show Date Picker" onPress={showDatePicker} >
                                <Text style={{ width: "90%", fontFamily: "LED Dot-Matrix 400" }}>Set Time</Text>
                            </Button>
                            <DateTimePickerModal
                                isVisible={isDatePickerVisible}
                                mode="time"
                                onConfirm={handleConfirm}
                                onCancel={hideDatePicker}
                                is24Hour={false}
                            />
                        </View>



                    </View>

                    <Button labelStyle={{ fontFamily: "LED Dot-Matrix 400", fontSize: 22 }} mode="elevated" buttonColor='white' textColor='grey' onPress={() => {
                        insertData().then((dataObj) => {
                            insertDataHook(dataObj)
                            closeModal()
                        })
                    }} contentStyle={{ height: 80, width: '100%', }}>
                        Add
                    </Button>
                </View>
            </View>
        </>
    );
}
const styles = StyleSheet.create({
    modal: {
        zIndex: 5,
        position: "absolute",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    addNewTodo: {
        width: "95%",
        height: 300,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "white",
        borderRadius: 30,
        padding: 20,

    },
    scrollpick: {
        height: 80,
        width: 80,
        elevation: 5,


    },
    hour: {
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-evenly"
    },
    scrollwrap: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly"
    }
});
export default Modal;
