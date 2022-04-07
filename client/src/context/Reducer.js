const Reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        ...state,
        user: null,
        isFetching: true,
        error: false,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload,
        isFetching: false,
        error: false,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        user: null,
        isFetching: false,
        error: true,
      };
      case "UPDATE_START":
        return {
          ...state,
          isFetching:true
        };
      case "UPDATE_SUCCESS":
        return {
          ...state,
          user: action.payload,
          isFetching: false,
          error: false,
        };
      case "UPDATE_FAILURE":
        return {
          ...state,
          user: state.user,
          isFetching: false,
          error: true,
        };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        isFetching: false,
        error: false,
      };
    case "GET_STAFF_SUCCESS":
      return{
        ...state,
        staff: action.payload,
        isFetching: false,
        error: false,
      }
    case "GET_STAFF_START":
      return {
        ...state,
        isFetching: true,
      }
    case "GET_STAFF_FAILURE":
      return {
        ...state,
        staff: state.staff,
        isFetching: false,
        error: true,
      }
      case "GET_ALL_BUT_STAFF_SUCCESS":
      return{
        ...state,
        nonStaffMembers: action.payload,
        isFetching: false,
        error: false,
      }
    case "GET_ALL_BUT_STAFF_START":
      return {
        ...state,
        isFetching: true,
      }
    case "GET_ALL_BUT_STAFF_FAILURE":
      return {
        ...state,
        nonStaffMembers: state.nonStaffMembers,
        isFetching: false,
        error: true,
      }
      case "AUTH":
        state = { authData: null }
        localStorage.setItem('profile', JSON.stringify({ ...action?.data }));

        return { ...state, authData: action.data, loading: false, errors: null };
      case "LOGOUT" :
        localStorage.clear();
  
        return { ...state, authData: null, loading: false, errors: null };
      
    default:
      return state;
  }
 
};

export default Reducer;
