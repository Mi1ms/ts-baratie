import cluster, { Cluster } from "cluster";
import { close } from "fs";
// import {  Worker, isMainThread, parentPort, workerData} from 'worker_threads';

import  { kitchensCount } from '../helpers/utils';
import { Cooker } from "./Cooker";

export class Kitchen {
    numero: number;
    nbrCooker: number;
    status: any;
    cookers: Object = [];

    constructor(myId: number, nbrCooker: number) {
        this.numero = myId;
        this.nbrCooker = nbrCooker;
        this.status= "pause";

        this.create();
    }
    
    create() {   
            let cooksMap = [];
            
            for (let idx = 0; idx < this.nbrCooker; idx++) {
                cooksMap[idx] = new Cooker(idx+1);
                // new Worker(__filename);
            } 
            this.cookers = cooksMap;    
    }

    getStatus(): string {
        return `Kitchen n°${this.numero} is ${this.status}`;
    }

    letsCook(command: any) {
        const nbrDish = command[2].length;
        console.log(command)

        // calculate nbr kitchen must have
        const countK = kitchensCount(command[command.length-1], this.nbrCooker);


        // for each calcul of kitchen
        Object(countK).map((info: any) => {
            
            if (info.index > 1) {
                process.send!({status: 'overload'})

            } else {
                let nbr= 0;
                for (let index = 1; index < info.nbPlats; index++) {
                    Object(this.cookers).map((cook: any) => {
                        
                        if (command[2][nbr] > 0) {
                            const dishType: string = command[0][nbr];
                            const dishSize: string = command[1][nbr];
                            
                            cook.dishList.push({type: dishType, size: dishSize})

                        } else { 
                            nbr++;
                        }
                        
                        // console.log(command[2][nbr]);
                        
                        // cook.cook();
                    })
                    
                    // - 1 after loop
                    // command[command.length-1]--; 
                } 
            }
        })
        
        
    }

    close() { 
        process.kill(process.pid);
    }


}