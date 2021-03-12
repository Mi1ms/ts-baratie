import cluster from 'cluster';
import os, { cpus } from 'os';

import { Kitchen } from "./Kitchen";
import { userCommand } from '../helpers/command';
import  { kitchensCount } from '../helpers/utils';

export default class Reception {

    static numCPUs: any = cpus().length;
    orders: any;
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

                    // the first kitchen
                    if (msg.id  == 1) {
                        // calculate nbr kitchen must have
                        this.orders = kitchensCount(msg.command[msg.command.length-1], nbrCooks);               
                    }
                    
                    const kitchen = new Kitchen(msg.id, nbrCooks, this.orders[msg.id-1])
                    

                    // status of kitchens
                    console.log(kitchen.getStatus());
                    kitchen.letsCook(msg.command)
                }                  
            });
        }
    }


}