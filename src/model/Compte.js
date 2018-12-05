export default class Compte {
    constructor(solde) {
    }

    setSolde(solde) {
        this.solde = parseInt(solde)
    }

    setPlafond(plafond) {
        this.plafond = parseInt(plafond)
    }
}