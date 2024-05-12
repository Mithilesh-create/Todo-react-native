import React from 'react';
import { Text, View, StyleSheet } from "react-native";
import { ToggleButton } from 'react-native-paper';
import { storage } from './storage';
function ElementDSA({ data, keyval, isComplete }) {
    const [completed, setCompleted] = React.useState(isComplete);

    const onCompleteToggle = value => {
        const arrDataGet = storage.getString("dsaMonitor") || "[]"
        if (arrDataGet) {
            let arr = JSON.parse(arrDataGet);
            arr[keyval] = !arr[keyval];
            storage.set("dsaMonitor", JSON.stringify(arr))
        }

        setCompleted(!completed);
    };


    return (
        <View style={[styles.element, { backgroundColor: completed ? "#66ff99" : "white" }]} key={keyval}>

            <View style={styles.first}>
                <Text style={{
                    textDecorationLine: completed ? "line-through" : null,
                    textDecorationStyle: "solid",
                    textDecorationColor: "#000",
                    letterSpacing: 0.7
                }}>{data}</Text>

            </View>
            <View style={styles.second}>
                <ToggleButton
                    icon={completed ? "arrow-u-left-top" : "check"}
                    value="completed"
                    status={completed}
                    onPress={onCompleteToggle}
                    iconColor={completed ? "white" : 'black'}
                    style={{
                        width: "100%",
                        backgroundColor: completed ? "orange" : "#cfcfcf",
                        borderRadius: 20,
                        borderColor: completed ? "white" : "black",
                        borderWidth: completed ? 1 : 0,
                        borderStyle: "solid",
                    }}
                />
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    element: {
        width: "100%",
        height: "auto",
        minHeight: 100,
        marginVertical: 5,
        borderRadius: 20,
        elevation: 5,
        padding: 15,
        display: "flex",
        flexDirection: "row"
    },
    first: {
        flex: 3,
        paddingRight: 1
    },
    second: {
        flex: 1,
        marginLeft: 5,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",

    }

});
export default ElementDSA;
