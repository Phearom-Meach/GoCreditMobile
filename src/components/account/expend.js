import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import Root from "../../page/root";
import { COLORS } from "../../../color";
import { StyleController } from "../../context/provider/styleProvider";
import { Dimensions } from "react-native";
import Invoice from "./modal/invoice";
import Header2 from "../../routes/header/header2";
import { GoButton } from "../../static/own-comp";
import {
  EXPEND_AFTER_PAID,
  SUBSCRIPTION_INVOICE,
  UPDATE_EXPEND_PER_DAY,
} from "../../gql/userInfo";
import { useMutation, useQuery, useSubscription } from "@apollo/client";
import { DataController } from "../../context/provider";
import AlertModal from "./modal/alertModal";

export default function Expend({ navigation, route }) {
  const { language, accountDBCtx } = useContext(DataController);
  const { styleState, height, width } = useContext(StyleController);
  const [subData, setSubData] = useState({});
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState();
  const [message, setMessage] = useState();
  const [khMessage, setKhMessage] = useState();

  const { data } = route.params;
  const screenWidth = Dimensions.get("window").width;
  const select = data;
  const [changeLimit, setChangeLimit] = useState("");
  const [updateExpendPerDay, { loading }] = useMutation(UPDATE_EXPEND_PER_DAY, {
    onError: (e) => {
      console.log(e.message);
    },
  });
  const {
    data: userPaid,
    loading: loadingExpend,
    refetch,
  } = useQuery(EXPEND_AFTER_PAID, {
    variables: {
      id: select?._id,
    },
    onError: (e) => {
      console.log(e.message);
    },
  });
  // console.log(userPaid, 'after-paid')

  const { data: subScriptionData } = useSubscription(SUBSCRIPTION_INVOICE, {
    variables: {
      customerId: accountDBCtx._id,
    },
    fetchPolicy: "cache-and-network",
  });

  const UpdateLimit = async () => {
    if (changeLimit === "") {
      Alert.alert("Please input the value");
    } else {
      await updateExpendPerDay({
        variables: {
          input: {
            subCustomerOjectId: select?.id,
            expendPerDay: parseFloat(changeLimit),
          },
        },
        update(_, result) {
          // console.log(result?.data?.updateExpendPerDay?.khMessage)
          if (result?.data?.updateExpendPerDay?.success) {
            setSuccess(!success);
            setMessage(result?.data?.updateExpendPerDay?.message);
            setError(result?.data?.updateExpendPerDay?.success);
            setKhMessage(result?.data?.updateExpendPerDay?.khMessage);
            setSubData({
              ...subData,
              expendPerDay:
                result?.data?.updateExpendPerDay?.data?.expendPerDay,
              amountAfterPaidPerDay:
                result?.data?.updateExpendPerDay?.data?.amountAfterPaidPerDay,
            });
            setChangeLimit("");
            refetch();
            // console.log(result?.data?.updateExpendPerDay?.data?.expendPerDay,)
          } else {
            setError(result?.data?.updateExpendPerDay?.success);
            setSuccess(!success);
            setMessage(result?.data?.updateExpendPerDay?.message);
            setKhMessage(result?.data?.updateExpendPerDay?.khMessage);
          }
        },
      });
    } // EndIF
  };

  // console.log(typeof(changeLimit));
  useEffect(() => {
    setSubData(select);
  }, [select]);
  // console.log(loadingExpend,'ggg')
  useEffect(() => {
    refetch();
  }, [subScriptionData, userPaid]);

  if (loadingExpend) {
    return (
      <View style={styles.loadingStyle}>
        <ActivityIndicator size="large" color="#EFB419" />
      </View>
    );
  } else {
    return (
      <Root
        Header={
          language?.english ? (
            <Header2 navigation={navigation} title={"Account"} />
          ) : (
            <Header2 navigation={navigation} title={"គណនី"} />
          )
        }
      >
        <AlertModal
          success={success}
          setSuccess={setSuccess}
          error={error}
          message={message}
          khMessage={khMessage}
        />

        <View
          style={{
            height: Platform.OS === "ios" ? height * 0.38 : height * 0.35,
            backgroundColor: "white",
            elevation: 3,
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View>
              <Text
                style={{
                  color: COLORS.YELLOW,
                  fontSize: 16,
                  left: 20,
                  top: 10,
                  fontWeight: "bold",
                }}
              >
                {subData?.lastName + " " + subData?.firstName}
              </Text>
            </View>
            <View>
              <Text
                style={{
                  top: 10,
                  fontSize: 20,
                  fontWeight: "bold",
                  color: COLORS.YELLOW,
                  right: 20,
                }}
              >
                {subData?.expendPerDay + " $"}
                {/* {changeLimit} */}
              </Text>
            </View>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text
              style={{ color: COLORS.YELLOW, fontSize: 14, left: 20, top: 15 }}
            >
              {subData?.englishName}
            </Text>
            {language?.english ? (
              <Text
                style={{
                  color: COLORS.YELLOW,
                  fontSize: 14,
                  top: 15,
                  right: 20,
                }}
              >
                Amount limit/day
              </Text>
            ) : (
              <Text
                style={{
                  color: COLORS.YELLOW,
                  fontSize: 16,
                  top: 15,
                  right: 20,
                }}
              >
                ចំនួនកំណត់ក្នុងមួយថ្ងៃ
              </Text>
            )}
          </View>
          <View style={{ top: Platform.OS === "ios" ? 35 : 30 }}>
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontSize: 40 }}>
                {Number.parseFloat(userPaid?.getAmountAfterPaidPerDay).toFixed(
                  2
                ) + " $"}
                {/* 0.50 $ */}
              </Text>
              {language?.english ? (
                <Text style={{ fontSize: 14 }}>Remaining money/day</Text>
              ) : (
                <Text style={{ fontSize: 16 }}>លុយសល់ក្នុងមួយថ្ងៃ</Text>
              )}
            </View>
            <View
              style={{
                top: Platform.OS === "ios" ? 10 : 8,
                flexDirection: "row",
                padding: 20,
                justifyContent: "space-between",
              }}
            >
              {language?.english ? (
                <TextInput
                  style={styles.input}
                  placeholder="Input amount here..."
                  keyboardType="numeric"
                  value={changeLimit}
                  // onChangeText={(e) => setLimit(e)}
                  onChangeText={(e) => setChangeLimit(e)}
                />
              ) : (
                <TextInput
                  style={styles.input}
                  placeholder="បញ្ចូលចំនួនកំណត់..."
                  keyboardType="numeric"
                  value={changeLimit}
                  // onChangeText={(e) => setLimit(e)}
                  onChangeText={(e) => setChangeLimit(e)}
                />
              )}
              {language?.english ? (
                <GoButton
                  style={{
                    backgroundColor: COLORS.PRIMARY,
                    width: "30%",
                    borderRadius: 7,
                    height: 45,
                  }}
                  color="white"
                  title="OK"
                  size={18}
                  align="center"
                  font={styleState.headKh}
                  bottom={3}
                  onPress={() => UpdateLimit()}
                />
              ) : (
                <GoButton
                  style={{
                    backgroundColor: COLORS.PRIMARY,
                    width: "30%",
                    borderRadius: 7,
                    height: 45,
                  }}
                  color="white"
                  title="យល់ព្រម"
                  size={16}
                  align="center"
                  font={styleState.bodyKh}
                  bottom={3}
                  onPress={() => UpdateLimit()}
                />
              )}
            </View>
          </View>
        </View>
        <Invoice navigation={navigation} ID={select} />
      </Root>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    minHeight: 100,
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
  history: {
    width: Dimensions.get("screen").width,
  },
  date: {
    width: "100%",
    height: 25,
    backgroundColor: "rgba(228,228,228,0.60)",
    shadowOpacity: 0.5,
    shadowColor: "#e4e4e4",
  },
  controllSlider: {
    padding: 15,
    alignItems: "center",
    top: Platform.OS === "ios" ? 20 : 15,
  },
  slider: {
    width: Platform.OS === "ios" ? "100%" : "105%",
    height: 20,
  },
  result: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: Platform.OS === "ios" ? 8 : 5,
    width: "100%",
    alignSelf: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "rgba(171,171,171,0.24)",
    padding: Platform.OS === "ios" ? 8 : 6,
    fontSize: 16,
    borderRadius: 7,
    width: "65%",
    height: 45,
    fontFamily: "SegoeUI",
    alignSelf: "center",
    color: "black",
  },
  loadingStyle: {
    flex: 1,
    justifyContent: "center",
  },
});
