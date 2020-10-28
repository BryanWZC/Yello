const initialUser = {
    userId: '',
    userPassword: '',
    userBoards: {},
};

const initialBoard  = {
    boardTitle: '',
    board: {
        items: {},
        cards: {},
        cardOrder: [],
    }
};

export { initialUser, initialBoard }