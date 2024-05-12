import React from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, StatusBar } from "react-native";
import TrashElement from '../Components/TrashElement';
import { useBearStore } from '../Components/zustandstate';

function Trash(): React.JSX.Element {
    const data = useBearStore((state) => state.data)
    const hiddenHook = useBearStore((state) => state.hiddenData)
    const revertHook = useBearStore((state) => state.revertDeleteData)
    const DeletedTodoCountHook = useBearStore((state) => state.DeletedTodos)

    return (
        <>
            <StatusBar
                barStyle="dark-content"
                backgroundColor={"#FCFCFC"}
            />
            <SafeAreaView style={styles.root}>
                <View style={styles.first}>
                    <Text style={styles.firstTitle}>Deleted Tasks</Text>
                    <Text>ミリマインダー</Text>
                </View>
                <View style={styles.third}>
                    <Text style={{
                        alignSelf: "center",
                        fontFamily: "LED Dot-Matrix 400",
                        marginTop: 30, textAlign: "center"
                    }}>Trash automatically gets empty every 30 days </Text>
                    {DeletedTodoCountHook === 0 ?
                        <Text style={{
                            alignSelf: "center", fontSize: 20,
                            fontFamily: "LED Dot-Matrix 400",
                            marginTop: 30
                        }}>Trash is empty</Text> :

                        data.length > 0 ?

                            <ScrollView contentContainerStyle={styles.content}>
                                {
                                    data.map((e: any, i: any) => {
                                        const timestamp = Date.now()

                                        return (e.isDeleted === true && e.isHidden === false
                                            && e.deletionDate < timestamp
                                        ) ? <TrashElement data={e.Task} keyval={i} key={i} createdAT={e.creationDate}
                                            setDelete={() => {
                                                hiddenHook(i)
                                            }}
                                            setRevert={() => {
                                                revertHook(i)
                                            }}
                                        /> : null;

                                    })
                                }
                            </ScrollView>
                            :
                            <Text style={{
                                alignSelf: "center", fontSize: 20,
                                fontFamily: "LED Dot-Matrix 400",
                                marginTop: 30
                            }}>Loading...</Text>

                    }

                </View>

            </SafeAreaView>
        </>
    );
}
const styles = StyleSheet.create({
    root: {
        flex: 1,
        flexDirection: "column",
        paddingTop: StatusBar.currentHeight,
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
export default Trash;
