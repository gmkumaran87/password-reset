const reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return {...state };
        case "ADD_USER":
            return {...state, user: action.payload };
        default:
            throw new Error("No Matching Action types");
    }
};

export default reducer;