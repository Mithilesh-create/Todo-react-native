import React from 'react';
import { Text, View, StyleSheet } from "react-native";
import { Button, ToggleButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
function Element({ data, keyval, setDelete, setRevert, createdAT }) {
    let dateDay = new Date(createdAT);

    return (
        <View style={[styles.element, { backgroundColor: "white" }]} key={keyval}>
            <View style={styles.first}>
                <Text style={{
                    letterSpacing: 0.7
                }}>{data}</Text>
            </View>
            <View style={styles.second}>
                <ToggleButton
                    icon={"arrow-u-left-top"}
                    value="completed"
                    onPress={setRevert}
                    iconColor={'black'}
                    style={{
                        width: "100%",
                        backgroundColor: "white",
                        borderRadius: 20,
                        borderColor: "black",
                        borderWidth: 1,
                        borderStyle: "solid",
                    }}
                />
                <Button onPress={setDelete}>
                    <Icon name="trash" size={22} color={"#cfcfcf"} />
                </Button>
                <Text style={{
                    fontFamily: "LED Dot-Matrix 400",
                    fontSize: 12,
                    textAlign: "center"
                }}>{dateDay.toUTCString()}</Text>

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
