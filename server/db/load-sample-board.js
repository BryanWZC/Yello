const mongoose = require('mongoose')
const { connect } = require('./connect')
const { User, Board, Card, List } = require('./model')

// TODO reformat function to match updated db models
async function addBoard() {
    await connect()

    // Remove previous
    await User.deleteMany({})
    await Board.deleteMany({})
    await Card.deleteMany({})
    await List.deleteMany({})

    // Load new sample data
    const sampleListItem = await List.create({ title: 'test list' })
    
    const sampleCard = await Card.create({
        title: 'test card',
        listIds: [sampleListItem._id],
    })
    
    const sampleBoard = await Board.create({
        title: 'test board',
        cardIds: [sampleCard._id],
    })
    
    const newUser = await User.create({
        userId: 'John Doe',
        userPassword: 'password',
        userBoards: JSON.stringify({ [sampleBoard.title]: sampleBoard._id }),
    })

    // Return board id to be copy and pasted into code
    return sampleBoard._id
}

addBoard().then((res) => console.log(`connected. boardId: ${res}`))
