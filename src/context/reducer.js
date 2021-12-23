const reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return {...state };
        default:
            throw new Error("No Matching Action types");
    }
};

export default reducer;