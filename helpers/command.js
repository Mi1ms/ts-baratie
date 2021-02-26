const readline = require('readline-sync');


const userCommand = () => {
    const answer = readline.question('What u want ? ' );
    
    let returnFromGetEachCommandsParts = getEachCommandsParts(answer)
    let dishs = returnFromGetEachCommandsParts[0]
    let sizes = returnFromGetEachCommandsParts[1]
    let count = returnFromGetEachCommandsParts[2]
    let dishsCount = returnFromGetEachCommandsParts[3]
    return [dishs, sizes, count, dishsCount];
}

function getEachCommandsParts(answerU) {
    if(answerU.indexOf(';') !== 0) {
        let splittedAnswerU = answerU.split(';')
        let nbCommands = splittedAnswerU.length
        let dishs = []
        let sizes = []
        let count = []
        let dishsCount = 0
        for(let i = 0; i < nbCommands; i ++) {
            if(splittedAnswerU[i] === '') {
                splittedAnswerU.splice(i,1)
            }
            let currentCommand = splittedAnswerU[i].split(' ')
            if(currentCommand[0] === '') {
                currentCommand.splice(0,1)
            }
            console.log(currentCommand)
            if(currentCommand.length === 3) {
                dishs.push(currentCommand[0])
                sizes.push(currentCommand[1])
                let countNumber = currentCommand[2].replace('x','')
                count.push(countNumber)
                dishsCount = dishsCount + parseInt(countNumber)
                console.log(`Validé pour la commande ${i+1} contenant : ${countNumber} x ${currentCommand[0]} de taille ${currentCommand[1]}`)
            
            } else {
                console.log(`Error: your command ${i+1} need a name, a size and a count`)
            }
        }
        return [dishs, sizes, count, dishsCount]
    } else {
        console.log('You answer need a ; at the end or between each dish')
    }
}

module.exports = {
    userCommand,
}