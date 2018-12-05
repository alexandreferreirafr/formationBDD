import { defineFeature, loadFeature } from 'jest-cucumber'

import Compte from '../src/model/Compte'
import ServiceVirement from '../src/service/ServiceVirement'

const feature = loadFeature('./feature/GestionDesVirements.feature')

defineFeature(feature, test => {

    let compteCheque;
    let compteEpargne;
    let serviceVirement;

    beforeEach(() => {
        compteCheque = new Compte();
        compteEpargne = new Compte();
        serviceVirement = new ServiceVirement();
    })

    test('Virement simple', ({ given, when, then, pending }) => {
        given(/^j'ai un compte cheque avec un solde de (.*)€$/, (solde) => {
            compteCheque.setSolde(parseInt(solde))
        });

        given(/^j'ai un compte épargne avec un solde de (.*)€$/, (solde) => {
            compteEpargne.setSolde(parseInt(solde))
        });

        when(/^j'effectue un virement de (.*)€ du compte cheque vers le compte épargne$/, (virement) => {
            serviceVirement.effectuerVirement(virement, compteCheque, compteEpargne)
        });

        then(/^le solde du comte cheque est de (.*)€$/, (nouveauSolde) => {
            expect(compteCheque.solde).toBe(parseInt(nouveauSolde))
        });

        then(/^le solde du compte épargne est de (.*)€$/, (nouveauSolde) => {
            expect(compteEpargne.solde).toBe(parseInt(nouveauSolde))
        });
    });

})