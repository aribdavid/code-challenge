const INITIAL_STATE = {
    paredes: [],
}

const wallReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SAVE_WALL':
            return { paredes: [...state.paredes, action.state] }
        default:
            return state
    }
};

export default wallReducer;