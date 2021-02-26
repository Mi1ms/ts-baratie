const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

const { userCommand } = require('./helpers/command');

// relocaliser
String.prototype.isNumber = function(){return /^\d+$/.test(this);}
const checkTypeParam = process.argv.slice(2).map((k) => {  return  k.isNumber() })


if (!checkTypeParam.includes(false) && process.argv.length >= 5 && process.argv[4].length == 4) {
    const timeCooking = process.argv[2];
    const nbrCooks = process.argv[3];
    const time4Replace = process.argv[4];
    
    // console.log(timeCooking, nbrCooks, time4Replace)
    if (cluster.isMaster) {
        console.log(`Master ${process.pid} is running`);
      
    }
    
} else {
    if( process.argv.length < 5) {
        console.error('Must give 3 arguments, given '+ (process.argv.length - 2));
        return -1;

    } else if (checkTypeParam) {
        console.error('Args must be an number');       
        return -1;

    } else if(process.argv[4].length !== 4) {
        console.error('This args must receive milliseconds');       
        return -1;
    }
}