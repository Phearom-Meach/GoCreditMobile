export const ACTION = {
    LOGIN_USER: "LOGIN_USER",
    LOGOUT_USER: "LOGOUT_USER",
    GET_DATA: "GET_DATA",
    UPDATE_OBJ: "UPDATE_OBJ",
    UPDATE_DATA_BY_ID: "UPDATE_DATA_BY_ID",
    SUB_USER: "SUB_USER",
    LOCK_SCREEN: "LOCK_SCREEN",
    LANGUAGE: "LANGUAGE",
    NOTINUM: "NOTINUM"
  };
     
  export const reducer = (state, action) => {
  
    switch (action.type) {
      case ACTION.LOGIN_USER:
        return action.payload;
      case ACTION.SUB_USER:
        return action.payload;
      case ACTION.LOCK_SCREEN:
        return action.payload;
      case ACTION.LANGUAGE:
        return action.payload;
      case ACTION.NOTINUM:
        // console.log(action.payload.length ,"Heool")
        if(action.payload.length === 0){
          return action.payload ;
        }else{
          return  [...state,action.payload];
        }
       
      case ACTION.LOGOUT_USER:
        return {};
      case ACTION.GET_DATA:
        return state;
      case ACTION.UPDATE_OBJ:
        return { ...state, ...action.payload };
      case ACTION.UPDATE_DATA_BY_ID:
        let data = [...state];
        let index = data.findIndex((ele) => ele.id === action.payload.id);
        data[index] = { ...data[index], ...action.payload };
        return data;
  
      default:
        throw new Error();
    }
  };
  