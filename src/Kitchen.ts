import cluster, { Cluster } from "cluster";
import { close } from "fs";
// import {  Worker, isMainThread, parentPort, workerData} from 'worker_threads';
// const worker = require('worker_threads');

import  { kitchensCount, convertCommandToJson } from '../helpers/utils';
import { Cooker } from "./Cooker";

export class Kitchen {
    numero: number;
    nbrCooker: number;
    status: any;
    cookers: Object = [];
    nbrOrder: number;

    constructor(myId: number, nbrCooker: number, order: any) {
        this.numero = myId;
        this.nbrCooker = nbrCooker;
        this.status= "pause";
        this.nbrOrder= order;

        this.create();
    }
    
    create() {   
            let cooksMap = [];
            
            for (let idx = 0; idx < this.nbrCooker; idx++) {
                cooksMap[idx] = new Cooker(idx+1);
                // fix error worker
                // new Worker(__filename);
            } 
            this.cookers = cooksMap;    
    }

    getStatus(): string {
        return `Kitchen n°${this.numero} is ${this.status}`;
    }

    letsCook(command: any) {
        const nbrDish = command[2].length;
        let orderList = convertCommandToJson(command);

        console.log(this.cookers);
       
        // // for each calcul of kitchen
        Object(this.cookers).map((cooker: Cooker) => {
            if (cooker.status == 'inactive') {
                // change status
                cooker.cook()
                
                // set dish to cooker
                const dishs = orderList.splice(0, 2)
                cooker.dishList = dishs;
                cooker.cook()
            }
        });
        
    }

    close() { 
        process.kill(process.pid);
    }


}