import VIREMENT_STATUS from '../model/VirementStatus';

export default class ServiceVirement {

    setPlafond(plafond) {
    }

    effectuerVirement(montant, source, destination) {
        montant = parseInt(montant)

        if (this.checkSoldeSuffisant(montant, source)) return VIREMENT_STATUS.REFUSE_SOLDE_INSUFFISANT;

        source.setSolde(source.solde - montant)
        destination.setSolde(destination.solde + montant)

        return VIREMENT_STATUS.ACCEPTE
    }

    checkSoldeSuffisant(montant, compte) {
        return compte.solde < montant
    }

    checkPlafondDepasse(montant) {
    }
}