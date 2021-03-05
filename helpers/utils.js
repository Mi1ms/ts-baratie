

const checkIsNumber = (param) => {
    return /^\d+$/.test(param);
}

let totalCuisine = []

const kitchensCount = (nbPlats, nbWorkers) => {
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