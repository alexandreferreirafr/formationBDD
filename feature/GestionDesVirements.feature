Feature: Gestion de Virements
  Dans le but de pouvoir gérer mes comptes
  En tant que client de compte
  Je souhaite pouvoir effectuer des virements entre mes comptes

  RG1 : virement simple, je vire X€ d'un compte A vers le compte B, le solde est impacté dans les deux comptes.
  RG2 : virement hors provision, solde A insuffisant
  RG3 : virement plafonné


  @RG1
  Scenario Outline: Virement simple
    Given j'ai un compte cheque avec un solde de <soldeCompteCheque>€
    Given j'ai un compte épargne avec un solde de <soldeCompteEpargne>€
    When j'effectue un virement de <montantVirement>€ du compte cheque vers le compte épargne
    Then le solde du compte cheque est de <soldeFinalCompteCheque>€
    Then le solde du compte épargne est de <soldeFinalCompteEpargne>€
    Then le virement est accepté

    Examples:

    | soldeCompteCheque | soldeCompteEpargne | montantVirement | soldeFinalCompteCheque | soldeFinalCompteEpargne |
    | 500               | 0                  | 100             | 400                    | 100                     |
    | 1000              | 2000               | 1000            | 0                      | 3000                    |


  @RG2
  Scenario: Virement hors provision
    Given j'ai un compte cheque avec un solde de 100€
    Given j'ai un compte épargne avec un solde de 0€
    When j'effectue un virement de 1000€ du compte cheque vers le compte épargne
    Then le solde du compte cheque est de 100€
    Then le solde du compte épargne est de 0€
    Then le virement est réfusé motif provision insuffisante


@RG3
Scenario: Virement plafonné
  Given j'ai un compte cheque avec un solde de 1000€
  Given j'ai un compte épargne avec un solde de 0€
  Given j'ai un plafond sur le compte cheque de 500€
  When j'effectue un virement de 501€ du compte cheque vers le compte épargne
  Then le solde du compte cheque est de 1000€
  Then le solde du compte épargne est de 0€
  Then le virement est réfusé motif plafond dépassé