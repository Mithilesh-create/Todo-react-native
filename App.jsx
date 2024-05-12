import React, { useState } from 'react';
import { useEffect } from "react";
import BootSplash from "react-native-bootsplash";
import Home from './src/Screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dsa from './src/Screens/Dsa';
import ICON from 'react-native-vector-icons/Octicons';
import Trash from './src/Screens/Trash';

function App() {
  const Tab = createBottomTabNavigator();
  useEffect(() => {
    const init = async () => {
    };

    init().finally(async () => {
      await BootSplash.hide({ fade: true });
    });
  }, []);



  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}>
        <Tab.Screen name="Reminder" component={Home} options={{
          tabBarLabelStyle: {
            fontSize: 10,
          },

          tabBarActiveTintColor: "black",
          tabBarInactiveTintColor: "#cfcfcf",
          tabBarIcon: ({ focused }) => (
            <ICON
              name="clock"
              size={focused ? 24 : 22}
              color={focused ? "black" : "#cfcfcf"}
            />
          ),

        }
        }
        />
        <Tab.Screen name="DSA" component={Dsa} options={{

          tabBarLabelStyle: {
            fontSize: 10,
          },
          tabBarActiveTintColor: "black",
          tabBarInactiveTintColor: "#cfcfcf",
          tabBarIcon: ({ focused }) => (
            <ICON
              name="book"
              size={focused ? 24 : 22}
              color={focused ? "black" : "#cfcfcf"}
            />
          ),
        }
        } />
        <Tab.Screen name="Trash" component={Trash} options={{
          tabBarLabelStyle: {
            fontSize: 10,
          },
          tabBarActiveTintColor: "black",
          tabBarInactiveTintColor: "#cfcfcf",
          tabBarIcon: ({ focused }) => (
            <ICON
              name="trash"
              size={focused ? 24 : 22}
              color={focused ? "black" : "#cfcfcf"}
            />
          ),

        }
        }
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
