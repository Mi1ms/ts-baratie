
export class Cooker {
    numero: number;
    status: string;
    dishList: any;

    constructor(nId: number) {
        this.numero = nId;
        this.status = 'inactive';
        this.dishList = [];
    }

    cook(): any {
        if (this.dishList.length > 0) {
            
        } else {
            console.log('No dish in my TODO list');
        }
    }

    
}