import { View, Text, TouchableOpacity,StyleSheet } from "react-native";
import React,{useContext,useState,useEffect} from "react";
import Header1 from "../routes/header/header1";
import Root from "./root";
import AccountSummary from '../components/account/accountSummary'
import { Divider } from "react-native-paper";
import { DataController } from "../context/provider";
import ModalQR from "../components/account/modal/modalQR";
import { useQuery, useSubscription } from "@apollo/client";
import { GET_TOTALAMOUNT, SUBSCRIPTION_DEPOSIT, SUBSCRIPTION_INVOICE } from "../gql/userInfo";
import { ACTION } from "../context/reducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { schedulePushNotification } from "../function/fn";
import AlertModal from "../components/account/modal/alertModal";

const Account = ({ navigation }) => {
  const {
    user,
    logined,
    accountDBCtxDispatch,
    language,
    accountDBCtx,
    notiNumDispatch,
  } = useContext(DataController);

  const [invoiceSub, setInvoiceSub] = useState(null);
  const [depositSub, setDepositSub] = useState(null);
  const [countNoti, setCountNoti] = useState([]);

  const {
    data: subScriptionData,
    loading,
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

  const setLocalStorageUser = async (value) => {
    await AsyncStorage.setItem("@login", JSON.stringify(value));
  };
  useEffect(() => {
    refetchUser();
  }, [subScriptionData, subScriptionDeposit]);

  const pushAndRefetch = () => {
    schedulePushNotification(
      "Go Credit App",
      "New Notification",
      "transaction"
    );
  };

  useEffect(() => {
    if (subScriptionData) {
      setInvoiceSub(subScriptionData);
      setDepositSub(null);
    }
    if (subScriptionDeposit) {
      setDepositSub(subScriptionDeposit);
      setInvoiceSub(null);
    }
  }, [subScriptionData, subScriptionDeposit]);

  useEffect(() => {
    if (invoiceSub) {
      pushAndRefetch();
      setCountNoti([...countNoti, invoiceSub]);
      notiNumDispatch({
        type: ACTION.NOTINUM,
        payload: invoiceSub,
      });
      // setLocalStorage(invoiceSub)
      setInvoiceSub(null);
      setDepositSub(null);
    }

    if (depositSub) {
      pushAndRefetch();
      setCountNoti([...countNoti, depositSub]);

      notiNumDispatch({
        type: ACTION.NOTINUM,
        payload: depositSub,
      });
      // setLocalStorage(depositSub)
      setInvoiceSub(null);
      setDepositSub(null);
    }
  }, [invoiceSub, depositSub]);

  const setLocalStorage = async () => {
    let loginUser = await AsyncStorage.getItem("@login");
    let newLogin = loginUser === null ? {} : JSON.parse(loginUser);
    // console.log(newLogin,"HEllo")
    if (logined) {
      accountDBCtxDispatch({
        type: ACTION.LOGIN_USER,
        payload: newLogin,
      });
    }
  };

  useEffect(() => {
    setLocalStorage();
  }, [navigation]);

  return (
    <Root Header={<Header1 title={"GO CREDIT"} navigation={navigation} />}>
      <View>
        <AccountSummary navigation={navigation} />
      </View> 
      <Divider />
      {/* <AlertModal/> */}
      {language?.english ? (
        <Text style={styles.title}>GO CREDIT CARD</Text>
      ) : (
        <Text style={styles.titleKh}>ប័ណ្ណ ហ្គោក្រេឌីត</Text>
      )}
      <ModalQR navigation={navigation} />
    </Root>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    minHeight: 100,
    // height: Dimensions.get("screen").height,
  },
  iconAccount: {
    width: 40,
    height: 40,
    backgroundColor: "white",
    margin: 10,
    left: 10,
    borderRadius: 20,
    shadowColor: "rgba(0,0,0,0.20)",
    shadowOpacity: 0.2,
  },
  subText: {
    left: 20,
    top: 5,
    opacity: 0.5,
  },
  money: {
    left: 20,
    top: 10,
    fontSize: 22,
    fontWeight: "bold",
    opacity: 0.7,
  },
  title: {
    left: 10,
    padding: 10,
    fontSize: 16,
  },
  titleKh: {
    left: 10,
    padding: 10,
    fontSize: 20,
  },
});

