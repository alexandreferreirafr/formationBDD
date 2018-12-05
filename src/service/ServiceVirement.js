import VIREMENT_STATUS from '../model/VirementStatus';

export default class ServiceVirement {

    effectuerVirement(montant, source, destination) {
        montant = parseInt(montant)

        if (this.checkSoldeSuffisant(montant, source)) return VIREMENT_STATUS.REFUSE_SOLDE_INSUFFISANT;

        if (this.checkPlafondDepasse(montant, source)) return VIREMENT_STATUS.REFUSE_PLAFOND_DEPASSE;

        source.setSolde(source.solde - montant)
        destination.setSolde(destination.solde + montant)

        return VIREMENT_STATUS.ACCEPTE
    }

    checkSoldeSuffisant(montant, compte) {
        return compte.solde < montant
    }

    checkPlafondDepasse(montant, compte) {
        return compte.plafond && compte.plafond < montant
    }
}