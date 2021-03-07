import cluster from 'cluster';
import os, { cpus } from 'os';

import { Kitchen } from "./Kitchen";
import { userCommand } from '../helpers/command';
import  { kitchensCount } from '../helpers/utils';

export default class Reception {

    static numCPUs: any = cpus().length;
    kitchenMap:Object = [];
    
    open(timeCooking: number|string, nbrCooks: number, timeReplace: number|string ): any {
        
        if (cluster.isMaster) {
            let nbrId = 1;
            const command = userCommand();
            const kitchen = cluster.fork({ kitchenId: nbrId})
                    
            kitchen.send({status: 'start', id: 1, command})

            // Kitchen send message
            kitchen.on('message', (payload: any) => {
                
                if ( payload.status == 'overload') {
                    cluster.fork({kitchenId: nbrId})
                } else if ( payload.status == 'finish') {


                }
            })
            nbrId++
        } else {
            process.on('message', (msg) => {
                if (msg.status == 'start') {
                    const kitchen = new Kitchen(msg.id, nbrCooks)
                    
                    // status of kitchens
                    console.log(kitchen.getStatus());
                    kitchen.letsCook(msg.command)
                }                  
            });
        }
    }


}