const readline = require('readline');


const userCommand = () => {
    const answerU 
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    rl.question('What u want ? ', (answer) => {
        // TODO: Log the answer in a database
        console.log(`Thank : ${answer}`);
        answerU = answer;
        
        let returnedFromGetEachCommandsParts = () => {
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
        let dishs = returnedFromGetEachCommandsParts[0]
        let sizes = returnedFromGetEachCommandsParts[1]
        let countPerDish = returnedFromGetEachCommandsParts[2]
        let dishsCount = returnedFromGetEachCommandsParts[3]
        rl.close();
        //return[dishs, sizes, countPerDish, dishsCount]
    });
    // return answerU;
    
}

function getEachCommandsParts(answerU) {
    
}

export default {
    userCommand,
}