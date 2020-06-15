const initialState = {
    id: '',
    username: '',
    profile_pic: ''
}

//action constant
const ACTIVE_USER = 'ACTIVE_USER'

//action builder
export function user(id, username, profile_pic){
    return {
        type: ACTIVE_USER,
        payload: {id, username, profile_pic}
    }
}

//reducer function
export default function reducer(state = initialState, action){
    switch (action.type){
        case ACTIVE_USER:
            return{...state, ...action.payload}
        default: 
            return state
    }
}