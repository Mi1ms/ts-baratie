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
    return answerU;
}

module.exports =  {
    userCommand,
}