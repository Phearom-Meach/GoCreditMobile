import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
  Modal,
  TouchableOpacity,
} from "react-native";
import History from "../history";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import {
  GET_INVOIE_BY_SUBCUSTOMERID_PAGENATE,
  QUERY_INVOICE_BY_SUB_USER,
  SUBSCRIPTION_INVOICE,
} from "../../../gql/userInfo";
import { useQuery, useSubscription } from "@apollo/client";
import { DataController } from "../../../context/provider";
import { ACTION } from "../../../context/reducer";
import moment from "moment";

export default function Invoice(props) {
  // const { styleState, height, width } = useContext(StyleController);
  const screenWidth = Dimensions.get("window").width;
  const [modalInvoice, setModalInvoice] = useState(false);
  const { cardDBCtxDispatch, accountDBCtx, cardDBCtx } =
    useContext(DataController);
  //  console.log(navigation
  const [selectData, setSelectData] = useState({});
  const openModalQR = (e, data) => {
    setModalInvoice(e);
    setSelectData(data);
    setProduct(data.items);
  };

  const [product, setProduct] = useState([]);
  const {
    data: InvoiceDB,
    loading,
    error,
  } = useQuery(QUERY_INVOICE_BY_SUB_USER, {
    variables: {
      getInvoiceBySubCustomerId: props?.ID?.id,
    },
  });

  // subsription
  const { data: subScriptionData } = useSubscription(SUBSCRIPTION_INVOICE, {
    variables: {
      customerId: accountDBCtx._id,
    },
    fetchPolicy: "cache-and-network",
  });
  //End
  //GET_DATA_PAGENATION
  const { data, refetch } = useQuery(GET_INVOIE_BY_SUBCUSTOMERID_PAGENATE, {
    variables: {
      getInvoiceBySubCustomerWithPaginationId: props?.ID?.id,
      page: 1,
      limit: 50,
    },
    fetchPolicy: "cache-and-network",
  });

  // console.log(data?.getInvoiceBySubCustomerWithPagination?.invoice)

  useEffect(() => {
    if (data) {
      cardDBCtxDispatch({
        type: ACTION.SUB_USER,
        payload: data?.getInvoiceBySubCustomerWithPagination?.invoice,
      });
    }
  }, [modalInvoice, InvoiceDB, subScriptionData]);
  //refetch data
  useEffect(() => {
    refetch();
  }, [subScriptionData]);

  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalInvoice}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModal(!modalInvoice);
        }}
      >
        <View style={styles.bgModal} />
        <TouchableWithoutFeedback
          onPress={() => setModalInvoice(!modalInvoice)}
        >
          <View style={styles.centerModal}>
            <View style={styles.modalBox}>
              <View style={styles.invoice}>
                <View style={styles.icon}>
                  <MaterialCommunityIcons
                    name="arrow-top-right"
                    size={32}
                    color="#EFB419"
                    style={{ left: 23, top: 11 }}
                  />
                  <FontAwesome
                    name="circle-thin"
                    size={45}
                    color="#EFB419"
                    style={{ position: "absolute", padding: 5, left: 15 }}
                  />
                </View>
                <View
                  style={styles.head}
                  onPress={() => setSelectData({ data: selectData })}
                >
                  <Text style={styles.text}>
                    {selectData?.__typename?.toUpperCase()}
                  </Text>
                </View>
              </View>
              <View style={styles.header}>
                <View style={styles.textheader}>
                  <Text>Transaction Number:</Text>
                  <Text>{selectData.transactionFrom}</Text>
                </View>
                <View style={styles.textheader}>
                  <Text>Transaction date:</Text>
                  <Text>
                    {moment(selectData.transactionDate).format(
                      "DD/MMM/YYYY HH:mm:ss"
                    )}
                  </Text>
                </View>
                <View style={styles.textheader}>
                  <Text>To account:</Text>
                  <Text>{selectData.transactionTo}</Text>
                </View>
              </View>

              <View style={styles.ttable}>
                <Text>Description</Text>
                <Text>Qty</Text>
                {/* <Text>Untit Price</Text> */}
                <Text>Total Price</Text>
              </View>
              {product?.map((load) => {
                return (
                  <View style={styles.menuStyle} key={load.id}>
                    <Text>{load.description}</Text>
                    <Text>{load.qty}</Text>
                    {/* <Text>{load?.unitPrice}</Text> */}
                    <Text>{load.total}</Text>
                  </View>
                );
              })}

              <View style={styles.menuStyle}>
                <View
                  style={{
                    borderBottomColor: "black",
                    borderBottomWidth: 1,
                    width: "100%",
                  }}
                />
              </View>
              <View style={styles.menuStyle}>
                <Text style={{ fontWeight: "bold" }}>Total Amount:</Text>
                <Text style={{ fontWeight: "bold" }}>
                  {selectData.grandTotal}
                </Text>
              </View>
              <View style={{ marginTop: 40, marginBottom: 10 }}>
                <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                  Thanks you !
                </Text>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      {data?.getInvoiceBySubCustomerWithPagination?.invoice?.map((e) => (
        <TouchableOpacity key={e.id} onPress={() => openModalQR(true, e)}>
          <History {...e} />
        </TouchableOpacity>
      ))}
    </View>
  );
}
const styles = StyleSheet.create({
  centerModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: Platform.OS === "ios" ? 350 : 350,
    // height: Platform.OS === "ios" ? 430 : 450,
    height: "auto",
    backgroundColor: "white",
    borderRadius: 6,
    alignItems: "center",
    shadowColor: "#000",
  },
  bgModal: {
    height: Dimensions.get("screen").height,
    width: Dimensions.get("screen").width,
    backgroundColor: "black",
    opacity: 0.6,
    position: "absolute",
  },
  invoice: {
    width: "100%",
    // height: 50,
  },
  head: {
    height: 50,
    position: "relative",
    top: 20,
    // backgroundColor: 'yellow',
  },
  text: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 0.5,
    top: 5,
  },
  icon: {
    height: 50,
    shadowOpacity: 0.5,
    shadowColor: "#e4e4e4",
    top: 10,
    position: "absolute",
    flexDirection: "row",
  },
  header: {
    width: "100%",
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 30,
  },
  textheader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 5,
  },
  thead: {
    width: "100%",
    backgroundColor: "yellow",
  },
  ttable: {
    width: "90%",
    height: 25,
    backgroundColor: "#ECECEC",
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 3,
  },
  menuStyle: {
    width: "90%",
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
  },
});
