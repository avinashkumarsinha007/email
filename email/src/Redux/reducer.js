import {
  GET_APP_DATA_FAILURE,
  GET_APP_DATA_REQUEST,
  GET_APP_DATA_SUCCESS,
  GET_EMAIL_LIST_FAILURE,
  GET_EMAIL_LIST_REQUEST,
  GET_EMAIL_LIST_SUCCESS,
  SET_BODY,
} from "./actionType";

const inState = {
  isLoading: false,
  isError: false,
  list: [],
  body: '',
};

export const reducer = (state = inState, { type, payload }) => {
  switch (type) {
    case GET_EMAIL_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_EMAIL_LIST_SUCCESS: {
      let updatedPayload = payload.map((el) => {
          return { ...el, read: false, favorite: false, body: false };
      });
      return {
        ...state,
        isLoading: false,
        list: updatedPayload,
      };
    }

    case GET_EMAIL_LIST_FAILURE:
      return {
        ...state,
        isError: true,
      };
    case GET_APP_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_APP_DATA_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        body: payload,
      };
    }
    case GET_APP_DATA_FAILURE:
      return {
        ...state,
        isError: true,
          };
          case SET_BODY:
            return {
                ...state,
             list:payload   
            };
    default:
      return state;
  }
};
