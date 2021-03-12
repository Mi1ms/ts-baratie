
const checkIsNumber = (param: string) => {
    return /^\d+$/.test(param); 
}

let totalCuisine: { index: any; nbPlats: any; }[] | { [x: string]: number; }[] = []

const kitchensCount = (nbPlats: number, nbWorkers: number) => {
    nbPlats > 2 * nbWorkers ? newKitchen(1, 2 * nbWorkers) : newKitchen(1, nbPlats)
    let nbPlatsRestant = nbPlats - 2 * nbWorkers
    let count = 1

    do {
        count++
        if (nbPlatsRestant > 2 * nbWorkers) {
            newKitchen(count, 2 * nbWorkers)
        } else {
            if (nbPlatsRestant < nbWorkers) {
                for (let i = 0; i < totalCuisine.length; i++) {
                    if (totalCuisine[i]['index'] === count - 1) {
                        let workersWithoutDish = nbWorkers - nbPlatsRestant
                        totalCuisine[i]['nbPlats'] = totalCuisine[i]['nbPlats'] - workersWithoutDish
                    }
                }
                newKitchen(count, nbWorkers)
            } else {
                newKitchen(count, nbPlatsRestant)
            }
        }
        nbPlatsRestant = nbPlatsRestant - 2 * nbWorkers
    } while (nbPlatsRestant > 0)

    return totalCuisine
}

const newKitchen = (index: number, nbPlat: number) => {
    const newKitchenObject = { 'index': index, 'nbPlats': nbPlat };
    totalCuisine.push(newKitchenObject);
}

const convertCommandToJson = (command: any) => {
    let arr = [];
    const dish = command[0];

    for (let index = 0; index < dish.length; index++) {
        
        const number = command[2][index];
        for (let nbr = 0; nbr < number; nbr++) {
            const type = command[0][index];
            const size = command[1][index];
            arr.push({type, size})
        }
    }
    return arr;
}

/*
Retourner par la
[
    {1, X},
    {2, X},
    {3, Y},
]
*/

export {
    checkIsNumber,
    kitchensCount,
    convertCommandToJson
}