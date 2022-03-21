import React, { useEffect, useState, useContext } from "react";
import { View, Text,ActivityIndicator, StyleSheet } from "react-native";
import Root from "./root";
import Header1 from "../routes/header/header1";
// import { cardDB } from "../assets/data/cardDB";
import Card from "../components/card/card";
import Accordion from "react-native-collapsible/Accordion";
import DropDown from "../components/QRcode/dropDown";
import { DataController } from "../context/provider";
import { QUERY_SUB_ACC } from "../gql/userInfo";
import { useQuery } from "@apollo/client";
import { ACTION } from "../context/reducer";

export default function QRcode({ navigation }) {
  const { cardDBCtx, cardDBCtxDispatch, accountDBCtx, language } =
    useContext(DataController);
  const [activeSections, setActiveSection] = useState([]);
  const [activeSelection, setActiveSelection] = useState({});

  const [dataSubUser, setDataSubUser] = useState([]);
  const { data: userDB,loading } = useQuery(QUERY_SUB_ACC, {
    variables: {
      getSubCustomerByAccIdId: accountDBCtx._id,
    },
  });

  useEffect(() => {
    if (userDB) {
      cardDBCtxDispatch({
        type: ACTION.SUB_USER,
        payload: userDB?.getSubCustomerByAccId,
      });
      setDataSubUser(userDB?.getSubCustomerByAccId);
    }
  }, [userDB, accountDBCtx]);

  function renderHeader(section) {
    return (
      <View key={section.id} style={{ top: 10 }}>
        <Card {...section} />
      </View>
    );
  }

  function renderContent(section) {
   
    return (
      <View>
        <DropDown data={activeSelection} />
      </View>
    );
  }

  const updateSections = (activeSections) => {
    setActiveSelection(dataSubUser[activeSections[0]]);
    setActiveSection(activeSections);
  };
 if(loading){
 return( <View style={styles.loadingStyle}>
    <Text>Loading</Text>
  </View>)
 }else{
  return (
    <Root Header={<Header1 title={"QR Code"} navigation={navigation} />}>
      <Accordion
        sections={dataSubUser}
        activeSections={activeSections}
        renderHeader={renderHeader}
        renderContent={renderContent}
        onChange={updateSections}
        underlayColor={"transparent"}
      />
    </Root>
  );
 }
} 

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    backgroundColor: "pink",
  },
  loadingStyle: {
    flex: 1,
    justifyContent: "center"
  },
});
