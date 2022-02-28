import {
  GET_APP_DATA_FAILURE,
  GET_APP_DATA_REQUEST,
  GET_APP_DATA_SUCCESS,
  GET_EMAIL_LIST_FAILURE,
  GET_EMAIL_LIST_REQUEST,
  GET_EMAIL_LIST_SUCCESS,
  SET_BODY,
  SET_FAV,
  SET_FILTER,
} from "./actionType";

const inState = {
  isLoading: true,
  isError: false,
  list: [],
    body: "",
    filterList:[]
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
        list: payload,
      };
    case SET_FAV:
      return {
        ...state,
        list: payload,
          };
          case SET_FILTER:
            return {
              ...state,
              filterList:payload,
            };
    default:
      return state;
  }
};
