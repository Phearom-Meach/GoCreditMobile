import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, FlatList,ActivityIndicator } from "react-native";
import Header1 from "../routes/header/header1";
import Root from "./root";
import NotificationBell from "../components/notification/notificationBell";
import { useQuery, useSubscription } from "@apollo/client";
import {
  GET_HISTORY,
  QUERY_USER,
  GET_TOTALAMOUNT,
  SUBSCRIPTION_DEPOSIT,
  SUBSCRIPTION_INVOICE,
  GEt_NOTIFICATION_PAGENATE,
} from "../gql/userInfo";
import { DataController } from "../context/provider";
import { schedulePushNotification } from "../function/fn";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ACTION } from "../context/reducer";

export default function Notification({ navigation }) {
  const {
    accountDBCtx,
    accountDBCtxDispatch,
  } = useContext(DataController);
  const [dataHistory, setDataHistory] = useState([]);
  

  const {
    data: subScriptionData,
    error,
  } = useSubscription(SUBSCRIPTION_INVOICE, {
    variables: {
      customerId: accountDBCtx._id,
    },
    fetchPolicy: "cache-and-network",
  });
  const {
    data: subScriptionDeposit,
    loading: loadingDeposit,
    error: errorDeposit,
  } = useSubscription(SUBSCRIPTION_DEPOSIT, {
    variables: {
      customerId: accountDBCtx._id,
    },
    fetchPolicy: "cache-and-network",
  });


  // get data by pagenation
  const {data:dataNotification,loading,refetch} = useQuery(GEt_NOTIFICATION_PAGENATE,{
    variables: {
      getPaymentNotificationByCustomerWithPaginationId: accountDBCtx._id,
      page:1 ,
      limit: 50
    },
    fetchPolicy: "cache-and-network"
  })


  const { data: dataUser, refetch: refetchUser } = useQuery(GET_TOTALAMOUNT, {
    variables: {
      getMobileAppUserId: accountDBCtx?._id,
    },
    onCompleted: ({ getMobileAppUser }) => {
      accountDBCtxDispatch({
        type: ACTION.LOGIN_USER,
        payload: {
          ...accountDBCtx,
          totalAmount: getMobileAppUser?.totalAmount,
        },
      });
      setLocalStorageUser({
        ...accountDBCtx,
        totalAmount: getMobileAppUser?.totalAmount,
      });
    },
    fetchPolicy: "cache-and-network",
  });
  // console.log(dataNotification,'jj')

  // const { data,loading, refetch } = useQuery(GET_HISTORY, {
  //   variables: {
  //     getPaymentNotificationByCustomerId: accountDBCtx?._id,
  //   },
  //   fetchPolicy: "cache-and-network",
  // });


  const setLocalStorageUser = async (value) => {
    await AsyncStorage.setItem("@login", JSON.stringify(value));
  };

  useEffect(() => {
    refetch();
    refetchUser();
  }, [dataNotification,subScriptionData, subScriptionDeposit]);

  useEffect(() => {
    setDataHistory(
      dataNotification?.getPaymentNotificationByCustomerWithPagination?.paymentNotification
      )
   
    // setDataHistory(data?.getPaymentNotificationByCustomer);
  }, [dataNotification, subScriptionData, subScriptionDeposit]);

 if(loading){
  return(
    <Root Header={<Header1 title={"Notification"} navigation={navigation} />}>
    <View style={styles.loadingStyle}>
        <ActivityIndicator size="large" color="#EFB419" />
    </View>
    </Root>
  ) 
 }else{
  return (
    <Root Header={<Header1 title={"Notification"} navigation={navigation} />}>
      <View style={styles.container}>
        {dataHistory?.map((load) => (
          <View key={load._id} style={{ marginVertical: 6 }}>
            <NotificationBell {...load} />
          </View>
        ))}
      </View>
    </Root>
  );
 }

}  
const styles = StyleSheet.create({
  container: {
    // height: Dimensions.get("screen").height,
    padding: 10,
    top: 10,
  },
  loadingStyle: {
    flex: 1,
    justifyContent: "center"
  },
});
