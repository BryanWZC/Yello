const mongoose = require('mongoose');
const { connect } = require('./connect');
const { User, Board } = require('./model');

async function addBoard(){
    await connect();
    const newUser = await User.create({
        userId: 'John647',
        userPassword: 'password',
        userBoards: '{}',
    }, handleError());

    const jsonBoard = {
        items:{},
        cards:{},
        cardOrder: [],
    };

    const sampleBoard = await Board.create({
        boardTitle: 'test board',
        board: JSON.stringify(jsonBoard),
    }, handleError())

    const userBoards = JSON.parse(newUser.userBoards);
    const boardTitle = sampleBoard.boardTitle;
    const boardId = sampleBoard.id;

    const updatedUser = await User.findOneAndUpdate({ userId: 'John647' },{
        userBoards: JSON.stringify({
            ...userBoards, 
            [boardTitle]: boardId
        })
    }, { new: true, useFindAndModify: false } );
}

function handleError(err, obj){
    if(err) console.error(err);
}

addBoard().then(res => console.log('connected'));