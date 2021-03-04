

const checkIsNumber = (param) => {
    return /^\d+$/.test(param); 
}

const kitchensCount = (nbPlats, nbWorkers) => {
    let totalCuisine = []
    nbPlats > 2 * nbWorkers ? newKitchen(1, 2 * nbWorkers) : newKitchen(1, nbPlats)
    let nbPlatsRestant = nbPlats - 2 * nbWorkers
    let count = 1


    //TODO: Si il y a des cuisinier dans une cuisine qui ne travaille pas alors que d'autres ont des plats en attente, il faudrait les dispatcher
    do {
        count++
        if (nbPlatsRestant > 2 * nbWorkers) {
            newKitchen(count, 2 * nbWorkers)
        } else {
            newKitchen(count, nbPlatsRestant)
        }
        nbPlatsRestant = nbPlatsRestant - 2 * nbWorkers
    } while (nbPlatsRestant > 0)

    return totalCuisine
}

function newKitchen(index, nbPlat) {
    const newKitchenObject = { 'index': index, 'nbPlats': nbPlat };
    totalCuisine.push(newKitchenObject);
}

/*
Retourner par la
[
    {1, X},
    {2, X},
    {3, Y},
]
*/

module.exports = {
    checkIsNumber,
    kitchensCount,
}