import React from 'react';
import { Text, View, StyleSheet } from "react-native";
import { Button, ToggleButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
function Element({ data, keyval, deleteElm, hour, mins, setCompleteElm, isComplete, AMPM }) {
    const [completed, setCompleted] = React.useState(isComplete);

    const onCompleteToggle = value => {
        setCompleteElm()
        setCompleted(!completed);
    };
    const onDelete = value => {
        deleteElm()
        setCompleted(false);
    };


    return (
        <View style={[styles.element, { backgroundColor: completed ? "#66ff99" : "white" }]} key={keyval}>

            <View style={styles.first}>
                <Text style={{
                    textDecorationLine: completed ? "line-through" : null,
                    textDecorationStyle: "solid",
                    textDecorationColor: "#000",
                    fontFamily: "LED Dot-Matrix 400",
                    textTransform: "capitalize"
                }}>{data}</Text>

            </View>
            <View style={styles.second}>
                <ToggleButton
                    icon="check"
                    value="completed"
                    status={completed}
                    onPress={onCompleteToggle}
                    iconColor={completed ? "white" : 'black'}
                    style={{
                        width: "100%",
                        backgroundColor: completed ? "teal" : "#cfcfcf",
                        borderRadius: 20,
                        borderColor: completed ? "white" : "black",
                        borderWidth: completed ? 1 : 0,
                        borderStyle: "solid",
                    }}
                />
                <Button onPress={() => onDelete()}>
                    <Icon name="trash" size={22} color={completed ? "red" : "#cfcfcf"} />
                </Button>
                <Text style={{
                    fontFamily: "LED Dot-Matrix 400",
                }}>{hour}:{mins} {AMPM}</Text>

            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    element: {
        width: "100%",
        height: "auto",
        minHeight: 200,

        marginVertical: 5,
        borderRadius: 20,
        elevation: 5,
        padding: 15,
        display: "flex",
        flexDirection: "row"
    },
    first: {
        flex: 3,
    },
    second: {
        flex: 1,
        marginLeft: 5,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly"
    }

});
export default Element;
