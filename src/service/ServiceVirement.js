import VIREMENT_STATUS from '../model/VirementStatus';

export default class ServiceVirement {

    setPlafond(plafond) {
    }

    effectuerVirement(montant, source, destination) {
        montant = parseInt(montant)

        source.setSolde(source.solde - montant)
        destination.setSolde(destination.solde + montant)
    }

    checkSoldeSuffisant(montant, compte) {
    }

    checkPlafondDepasse(montant) {
    }
}