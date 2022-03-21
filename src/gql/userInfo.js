import { gql } from "@apollo/client";
// vutey make it
export const GET_TOTALAMOUNT = gql`
  query getMobileAppUser($getMobileAppUserId: ID!) {
    getMobileAppUser(id: $getMobileAppUserId) {
      totalAmount
    }
  }
`;
export const QUERY_USER = gql`
  query getMobileAppUser($getMobileAppUserId: ID!) {
    getMobileAppUser(id: $getMobileAppUserId) {
      _id
      accountNumber
      pin
      setcretWord
      firstName
      lastName
      gender
      dateOfBirth
      nationality
      nationalityID
      phoneNumber
      totalAmount
      createdAt
      lastSeenAt
      location {
        lang
        long
        country
        city
        province
        district
        commune
        village
      }
    }
  }
`;
export const QUERY_SUB_ACC = gql`
  query Query($getSubCustomerByAccIdId: ID!) {
    getSubCustomerByAccId(id: $getSubCustomerByAccIdId) {
      _id
      id
      firstName
      lastName
      englishName
      gender
      personalId
      dataOfBirth
      expendPerDay
      amountAfterPaidPerDay
      occupation
      position
      mobileAppUser {
        _id
        pin
        accountNumber
        setcretWord
        firstName
        lastName
      }
    }
  }
`;

export const QUERY_INVOICE_BY_SUB_USER = gql`
  query getInvoiceBySubCustomer($getInvoiceBySubCustomerId: ID!) {
    getInvoiceBySubCustomer(id: $getInvoiceBySubCustomerId) {
      _id
      id
      code
      transactionFrom
      bussinessName
      transactionTo
      subTotal
      transactionDate
      grandTotal
      items {
        id
        description
        qty
        unitPrice
        total
        remark
      }
      feedback
      tax
      discount
      other
    }
  }
`;

export const COMPANY_CONTACT = gql`
  query CompanyContact {
    getCompanyContact {
      success
      message
      data {
        phoneNumber
        facebook
      }
    }
  }
`;

export const CREATE_ACC_LOGIN = gql`
  mutation Mutation($input: loginMobileUser) {
    loginMobileUser(input: $input) {
    success
    message
    khMessage
    userData {
      _id
      pin
      token
      accountNumber
      setcretWord
      firstName
      lastName
      gender
      nationalityID
      dateOfBirth
      nationality
      currency
      phoneNumber
      totalAmount
      status
      createdAt
      lastSeenAt
      updatedAt
      createdBy
      updatedBy
      location {
        lang
        long
        country
        city
        province
        district
        commune
        village
        houseNo
        streetNo
      }
    }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateMobileUser($input: UpdateMobileUser) {
    updateMobileUser(input: $input) {
      success
      message
      userData {
        _id
        pin
        accountNumber
        setcretWord
        firstName
        lastName
        gender
        nationalityID
        dateOfBirth
        nationality
        status
        currency
        phoneNumber
        totalAmount
        createdAt
        lastSeenAt
        updatedAt
        createdBy
        updatedBy
        location {
          lang
          long
          country
          city
          province
          district
          commune
          village
          houseNo
          streetNo
        }
      }
    }
  }
`;

export const UPDATE_SUB_USER = gql`
  mutation Mutation($input: updateSubCustomerInput) {
    updateSubCustomer(input: $input) {
      id
      firstName
      lastName
      englishName
      gender
      dataOfBirth
      id
      expendPerDay
      amountAfterPaidPerDay
      occupation
      position
      createdAt
      updatedAt
      createBy
      updateBy
      mobileAppUser {
        _id
        accountNumber
        setcretWord
        firstName
        lastName
        gender
        nationalityID
        dateOfBirth
        nationality
        status
        currency
        phoneNumber
        totalAmount
        createdAt
        lastSeenAt
        updatedAt
        createdBy
        updatedBy
        location {
          lang
          long
          country
          city
          province
          district
          commune
          village
          houseNo
          streetNo
        }
      }
    }
  }
`;
export const UPDATE_EXPEND_PER_DAY = gql`
  mutation Mutation($input: updateExpendPerDay) {
    updateExpendPerDay(input: $input) {
    success
    message
    khMessage
    data {
      _id
      id
      firstName
      lastName
      englishName
      gender
      personalId
      dataOfBirth
      expendPerDay
      amountAfterPaidPerDay
      occupation
      position
    }
    }
  }
`;
export const GET_HISTORY = gql`
  query getPaymentNotificationByCustomer(
    $getPaymentNotificationByCustomerId: ID!
  ) {
    getPaymentNotificationByCustomer(id: $getPaymentNotificationByCustomerId) {
      _id
      paymentTitle
      dateTime
      grandTotal
      transactionFrom
      transactionTo
      subCustomerName
    }
  }
`;
export const SUBSCRIPTION_INVOICE = gql`
  subscription createPaymentNotification($customerId: ID!) {
    createPaymentNotification(customerID: $customerId) {
      _id
      paymentTitle
      dateTime
      grandTotal
      transactionFrom
      transactionTo
      subCustomerName
    }
  }
`;
export const SUBSCRIPTION_DEPOSIT = gql`
  subscription depositTransaction($customerId: ID!) {
    depositTransaction(customerID: $customerId) {
      _id
      paymentTitle
      dateTime
      grandTotal
      transactionFrom
      transactionTo
      subCustomerName
    }
  }
`;
export const EXPEND_AFTER_PAID = gql`
  query getAmountAfterPaidPerDay($id: ID) {
    getAmountAfterPaidPerDay(_id: $id)
  }
`;

export const GEt_NOTIFICATION_PAGENATE = gql`
 query GetPaymentNotificationByCustomerWithPagination($getPaymentNotificationByCustomerWithPaginationId: ID!, $page: Int, $limit: Int, $keyword: String) {
  getPaymentNotificationByCustomerWithPagination(id: $getPaymentNotificationByCustomerWithPaginationId, page: $page, limit: $limit, keyword: $keyword) {
    paymentNotification {
      _id
      paymentTitle
      dateTime
      grandTotal
      transactionFrom
      transactionTo
      subCustomerName
      mobileAppUser {
        _id
      }
      invoice {
        _id
      }
    }
  }
}
`;

export const GET_INVOIE_BY_SUBCUSTOMERID_PAGENATE = gql`
  query GetsubCustomerWithPagination($getInvoiceBySubCustomerWithPaginationId: ID!, $page: Int, $limit: Int, $keyword: String) {
  getInvoiceBySubCustomerWithPagination(id: $getInvoiceBySubCustomerWithPaginationId, page: $page, limit: $limit, keyword: $keyword) {
    invoice {
      id
      code
      transactionFrom
      bussinessName
      transactionTo
      subTotal
      transactionDate
      tax
      discount
      other
      grandTotal
      items {
        id
        description
        qty
        unitPrice
        total
        remark
      }
      feedback
      sellerName
      subCustomer {
        _id
      }
    }
  }
}
`;