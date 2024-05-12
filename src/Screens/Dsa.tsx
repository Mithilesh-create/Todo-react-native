import React, { useState } from 'react';
import { useEffect } from "react";
import { Text, View, StyleSheet, SafeAreaView, ScrollView, StatusBar } from "react-native";
import ElementDSA from '../Components/ElementDSA';
import { storage } from '../Components/storage';
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
} from '@tanstack/react-query'
function Example(): React.JSX.Element {
    const [completed, setCompletedData] = useState<any>([])
    const { isPending, error, data } = useQuery({
        queryKey: ['repoData'],
        queryFn: () =>
            fetch('https://mithilesh-create.github.io/datastructures-and-algo/data.json').then((res) =>

                res.json(),


            ),
    })
    // useEffect(() => {
    //     if (data.length > 0) {
    //         setComplete(data);
    //     } else {
    //         setComplete([]);
    //     }
    // }, [data])
    // console.log(, "data here");

    function setComplete(data: any) {
        const arrDataGet = storage.getString("dsaMonitor") || "[]"
        if (arrDataGet) {
            let arr = JSON.parse(arrDataGet);
            let arr2len = data.length - arr.length;
            arr.length = data.length;
            arr = arr.fill(0, arr.length - arr2len, arr.length);
            setCompletedData(arr);
            storage.set("dsaMonitor", JSON.stringify(arr))
        } else {
            const arr = new Array(data.length).fill(0);
            setCompletedData(arr);
            storage.set("dsaMonitor", JSON.stringify(arr))
        }
    }
    return <>
        <StatusBar
            barStyle="dark-content"
            backgroundColor={"#FCFCFC"}
        />
        <SafeAreaView style={styles.root}>
            <View style={styles.first}>
                <Text style={styles.firstTitle}>Personal DSA Tracker</Text>
                <Text>ミリマインダー</Text>
            </View>
            <View style={styles.third}>
                {
                    isPending ?
                        <Text style={{
                            alignSelf: "center", fontSize: 20,
                            fontFamily: "LED Dot-Matrix 400",
                            marginTop: 30
                        }}>Loading...</Text>
                        :
                        data.length > 0 ?
                            <ScrollView contentContainerStyle={styles.content}>
                                {
                                    data.map((e: any, i: any) => {
                                        return <ElementDSA data={e} keyval={i} key={i} isComplete={completed[i]} />

                                    })
                                }
                            </ScrollView>
                            :
                            <Text style={{
                                alignSelf: "center", fontSize: 20,
                                fontFamily: "LED Dot-Matrix 400",
                                marginTop: 30
                            }}>No data</Text>
                }
            </View>

        </SafeAreaView>
    </>
}

function Dsa(): React.JSX.Element {
    const queryClient = new QueryClient()
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <Example />
            </QueryClientProvider>
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
export default Dsa;
