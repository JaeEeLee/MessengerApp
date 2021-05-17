export const optionReducer = (state, action) => {
    switch(action.type){
        case 'CHANGE':
            return {
                ...state,
                [action.name]: action.value,
            }
        case 'MULTIPLE_CHANGE':
            return {
                ...state,
                ...action.value,
            }
        default:
            return state;
    }
}