import Reception from "./Reception";
// import { checkIsNumber } from '../helpers/utils'
 


const checkTypeParam = process.argv.slice(2).map((k) => {  return /^\d+$/.test(k) })

// Checks args are correct
if (!checkTypeParam.includes(false) && process.argv.length >= 5 && process.argv[4].length == 4) {
  
  
  const home = new Reception();
  const [y, command, timeCooking, nbrCooks, time4Replace] = process.argv;
  
  home.open(timeCooking, parseInt(nbrCooks), time4Replace)


} else {
    if (checkTypeParam.includes(false)) {
      console.error('Args must be an number');       
      // return -1;

  } else if( process.argv.length < 5) {
      console.error('Must give 3 arguments, given '+ (process.argv.length - 2));
      // return -1;
      
  } else if(process.argv[4].length !== 4) {
      console.error('This args must receive milliseconds');       
      // return -1;
  }
}