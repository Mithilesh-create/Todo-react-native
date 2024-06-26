import React, { useState } from 'react';
import { useEffect } from "react";
import { Text, View, StyleSheet, SafeAreaView, ScrollView, StatusBar } from "react-native";
import Element from '../Components/Element';
import { Button } from 'react-native-paper';
import Modal from '../Components/Modal';
import { request, PERMISSIONS } from 'react-native-permissions';
import { useBearStore } from '../Components/zustandstate';
import notifee, { EventType, TriggerType } from '@notifee/react-native';

function Home({ navigation }) {
    const requestPermission = async () => {
        try {
            await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS)

        } catch (error) {
            console.log('Error requesting permission: ', error)
        }
    }
    function ToggleNavigation(Toggle) {
        navigation.setOptions({
            tabBarStyle: {
                display: Toggle ? "none" : "flex"
            },
        })
    }
    useEffect(() => {
        requestPermission();
    }, [])


    const [OpenModal, setOpenModal] = useState(false)
    const Open = () => {
        ToggleNavigation(true);
        setOpenModal(true)
    }
    const Close = () => {
        ToggleNavigation(false);
        setOpenModal(false);
    }

    const data = useBearStore((state) => state.data)
    const deleteHook = useBearStore((state) => state.deleteData)
    const completeHook = useBearStore((state) => state.completeData)
    const active = useBearStore((state) => state.ActiveTodos)
    const [Noti, setNoti] = useState(null)
    const deleteData = async (index, id) => {
        deleteHook(index);
        await notifee.cancelTriggerNotification(id)
    }
    const completeData = async (index, id) => {
        completeHook(index, data[index].Completed)
        await notifee.cancelTriggerNotification(id)

    }
    async function onCreateTriggerNotification(id, title, timestampNotification) {

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


        await notifee.createTriggerNotification(
            {
                id: id,
                title: title,
                body: `Your Task is pending`,
                android: {
                    channelId,
                    smallIcon: 'ic_notification',
                    actions: [
                        {
                            title: 'Snooze for 5 mins',
                            icon: 'https://my-cdn.com/icons/snooze.png',
                            pressAction: {
                                id: 'snooze',
                            },
                        },
                    ],
                },
            },
            trigger,
        );
    }
    notifee.onForegroundEvent(async ({ type, detail }) => {
        setNoti(detail.notification.id);
        if (type === EventType.ACTION_PRESS && detail.pressAction.id && (Noti == null || Noti != detail.notification.id)) {
            let timestamp = new Date(Date.now());
            timestamp.setMinutes(timestamp.getMinutes() + 5);
            var futureTimestamp = timestamp.getTime();
            await onCreateTriggerNotification(detail.notification.id, detail.notification.title, futureTimestamp)
        }
    });


    return (
        <>
            <StatusBar
                barStyle="dark-content"
                backgroundColor={"#FCFCFC"}
            />
            <SafeAreaView style={styles.root}>
                <View style={styles.first}>
                    <Text style={styles.firstTitle}>Immediate Reminder List</Text>
                    <Text>ミリマインダー</Text>
                </View>
                <View style={styles.second}>
                    <Button labelStyle={{ fontFamily: "LED Dot-Matrix 400" }} mode="elevated" buttonColor='white' textColor='grey' onPress={() => Open()} contentStyle={{ height: 80 }}>
                        Add to list
                    </Button>
                    <Text style={{ fontFamily: "LED Dot-Matrix 400", alignSelf: "center", paddingTop: 13, fontSize: 10 }}>Todo Items : {active}</Text>
                </View>
                <View style={styles.third}>
                    <ScrollView contentContainerStyle={styles.content}>
                        {
                            data.map((e, i) => {
                                return e.isDeleted !== true ? <Element data={e.Task} hour={e.Hours} mins={e.Minutes} keyval={i} key={i} AMPM={e.AMPM} deleteElm={() => deleteData(i, e.notificationID)} setCompleteElm={() => completeData(i, e.notificationID)} isComplete={e.Completed} /> : null
                            })
                        }
                    </ScrollView>
                </View>

            </SafeAreaView>
            {OpenModal ? <Modal closeModal={Close} /> : null}
        </>
    );
}
const styles = StyleSheet.create({
    root: {
        flex: 1,
        flexDirection: "column",
        paddingTop: StatusBar.currentHeight,
        backgroundColor: "white"
    },
    first: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    firstTitle: {
        fontSize: 24,
        fontFamily: "LED Dot-Matrix 400"
    },
    second: {
        flex: 2,
        margin: 10,
    },
    third: {
        flex: 10,
    },
    content: {
        padding: 10,
    },
});
export default Home;
