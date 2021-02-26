const readline = require('readline');


const userCommand = () => {
    let answerU; 
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    rl.question('What u want ? ', (answer) => {
        // TODO: Log the answer in a database
        console.log(`Thank : ${answer}`);
        answerU = answer;

        rl.close();
    });
    // return answerU;
    
    if(answerU.indexOf(';') !== 0) {
        let splittedAnswerU = answerU.split(';')
        let nbCommands = splittedAnswerU.length
        let dishs = []
        let sizes = []
        let count = []
        for(var i = 0; i < nbCommands; i ++) {
            if(splittedAnswerU[i] === '') {
                splittedAnswerU.splice(i,1)
            }
            var currentCommand = splittedAnswerU[i].split(' ')
            if(currentCommand[0] === '') {
                currentCommand.splice(0,1)
            }
            console.log(currentCommand)
            if(currentCommand.length === 3) {
                dishs.push(currentCommand[0])
                sizes.push(currentCommand[1])
                var countNumber = currentCommand[2].replace('x','')
                count.push(countNumber)
                console.log(`Validé pour la commande ${i+1} contenant : ${countNumber} x ${currentCommand[0]} de taille ${currentCommand[1]}`)
            
            } else {
                console.log(`Error: your command ${i+1} need a name, a size and a count`)
            }
        }
        return [dishs, sizes, count]
    } else {
        console.log('You answer need a ; at the end or between each dish')
    }
}

module.exports =  {
    userCommand,
}