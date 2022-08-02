export const Data_UPDATE = (state, action) => {
    return {
        ...state,
        data: action.payload.data,
    };
};
