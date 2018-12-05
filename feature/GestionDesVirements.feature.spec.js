import { defineFeature, loadFeature } from 'jest-cucumber'

import Compte from '../src/model/Compte'
import VIREMENT_STATUS from '../src/model/VirementStatus'
import ServiceVirement from '../src/service/ServiceVirement'

const feature = loadFeature('./feature/GestionDesVirements.feature')

defineFeature(feature, test => {

    let compteCheque;
    let compteEpargne;
    let serviceVirement;
    let statusVirement;

    beforeEach(() => {
        compteCheque = new Compte();
        compteEpargne = new Compte();
        serviceVirement = new ServiceVirement();
    })

    const givenJaiUnCompteChequeAvecUnSoldeDeX = given => {
        given(/^j'ai un compte cheque avec un solde de (.*)€$/, (solde) => {
            compteCheque.setSolde(parseInt(solde))
        });
    }

    const givenJaiUnCompteEpargneAvecUnSoldeDeX = given => {
        given(/^j'ai un compte épargne avec un solde de (.*)€$/, (solde) => {
            compteEpargne.setSolde(parseInt(solde))
        });
    }

    const givenJaiUnPlafondSurLeCompteChequeDeX = given => {
        given(/^j'ai un plafond sur le compte cheque de (.*)€$/, (plafond) => {
            compteCheque.setPlafond(parseInt(plafond))
        });
    }

    const whenJEffectueUnVirementDeXDuCompteChequeVersLeCompteEpargne = when => {
        when(/^j'effectue un virement de (.*)€ du compte cheque vers le compte épargne$/, (virement) => {
            statusVirement = serviceVirement.effectuerVirement(virement, compteCheque, compteEpargne)
        });
    }

    const thenLeSoldeDuCompteChequeEstDeX = then => {
        then(/^le solde du compte cheque est de (.*)€$/, (nouveauSolde) => {
            expect(compteCheque.solde).toBe(parseInt(nouveauSolde))
        });
    }

    const thenLeSoldeDuCompteEpargneEstDeX = then => {
        then(/^le solde du compte épargne est de (.*)€$/, (nouveauSolde) => {
            expect(compteEpargne.solde).toBe(parseInt(nouveauSolde))
        });
    }

    const thenLeVirementEstAccepte = then => {
        then(/^le virement est accepté$/, () => {
            expect(statusVirement).toBe(VIREMENT_STATUS.ACCEPTE)
        })
    }

    const thenLeVirementEstRefuseMotifSoldeInsiffisant = then => {
        then('le virement est réfusé motif provision insuffisante', () => {
            expect(statusVirement).toBe(VIREMENT_STATUS.REFUSE_SOLDE_INSUFFISANT)
        });
    }

    const thenLeVirementEstRefuseMotifPlafondDepasse = then => {
        then('le virement est réfusé motif plafond dépassé', () => {
            expect(statusVirement).toBe(VIREMENT_STATUS.REFUSE_PLAFOND_DEPASSE)
        });
    }

    test('Virement simple', ({ given, when, then, pending }) => {
        givenJaiUnCompteChequeAvecUnSoldeDeX(given);

        givenJaiUnCompteEpargneAvecUnSoldeDeX(given);

        whenJEffectueUnVirementDeXDuCompteChequeVersLeCompteEpargne(when);

        thenLeSoldeDuCompteChequeEstDeX(then);

        thenLeSoldeDuCompteEpargneEstDeX(then);

        thenLeVirementEstAccepte(then);
    });

    test('Virement hors provision', ({ given, when, then, pending }) => {
        givenJaiUnCompteChequeAvecUnSoldeDeX(given);

        givenJaiUnCompteEpargneAvecUnSoldeDeX(given);

        whenJEffectueUnVirementDeXDuCompteChequeVersLeCompteEpargne(when);

        thenLeSoldeDuCompteChequeEstDeX(then);

        thenLeSoldeDuCompteEpargneEstDeX(then);

        thenLeVirementEstRefuseMotifSoldeInsiffisant(then);
    });

    test('Virement plafonné', ({ given, when, then, pending }) => {
        givenJaiUnCompteChequeAvecUnSoldeDeX(given);

        givenJaiUnCompteEpargneAvecUnSoldeDeX(given);

        givenJaiUnPlafondSurLeCompteChequeDeX(given);

        whenJEffectueUnVirementDeXDuCompteChequeVersLeCompteEpargne(when);

        thenLeSoldeDuCompteChequeEstDeX(then);

        thenLeSoldeDuCompteEpargneEstDeX(then);

        thenLeVirementEstRefuseMotifPlafondDepasse(then);
    });


})