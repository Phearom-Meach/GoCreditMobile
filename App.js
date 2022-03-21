import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import StyleProvider from "./src/context/provider/styleProvider";
import Provider from "./src/context/provider";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  split,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import * as Notifications from "expo-notifications";
import { pushNotification } from "./src/function/fn";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Navigator from "./navigator";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});


export default function App() {
  const URI = "gocreditendpoint.go-globalschool.com/graphql"
  const [token, setToken] = useState("");


  const getToken = async () => {
    const user = await AsyncStorage.getItem("@login");
    
    const newToken = JSON.parse(user);
    setToken(newToken?.token);

    return newToken?.token 

  };

  const httpLink = new HttpLink({
    uri: `https://${URI}`,
    // uri:"http://192.168.2.183:5000/graphql", 
  });

  const wsLink = new WebSocketLink({
    uri: `wss://${URI}`,
    // uri: "ws://192.168.2.183:5000/graphql",
    options: {
      reconnect: true,
    },
  });
  
  useEffect(async() => {
    await pushNotification();
    let getNewToken = getToken();
  }, []);
  const authLink = setContext((_, { headers }) => {
    

    return {
      headers: {
        ...headers,
        authorization: token ? `${token}` : getToken(),  
      }
    }
  });
  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink,
    authLink.concat(httpLink)
  );
  const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          getAllPosts: {
            merge: true,
          },
        },
      },
    },
  });

  const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
  });




  return (
    
    <StyleProvider>
      <ApolloProvider client={client}>
      <Provider>
        <NavigationContainer>
          <Navigator />
        </NavigationContainer>
      </Provider>
      </ApolloProvider>
    </StyleProvider>
    
  );
}

