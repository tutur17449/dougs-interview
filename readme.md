# Dougs interview

## Description de l'algo

L'algo de la fonction `checkSynchronisation` permet de vérifier des flux en prenant en paramètre des mouvements bancaires ainsi que des balances.

Fonctionnement:

- pour chaque balance de la liste
- on identifie le montant à contrôler et les flux sur la période
- on calcul un montant à partir des flux
- on contrôle l'égalite entre la somme des flux et le contrôle au niveau de la balance
  - si erreur, on ajoute une `reason` avec le type d'erreur et les flux concernés
- on contrôle les doublons dans les flux
  - si erreur, on ajoute une `reason` avec le type d'erreur et les flux concernés
- finalement, on retourne l'état du contrôle en fonction des `reasons`

Le format des raisons d'erreur est le suivant :

```ts
export type Reason = {
  message: string;
  type: 'AMOUNT_MISMATCH' | 'DUPLICATE_MOVEMENT';
  movements: Movement[];
};
```

Avec ce format, le comptable peut identifier la nature de l'erreur ainsi que récupérer une liste des flux associés dans le but de l'aider dans son analyse.

## Lancement de l'algo

Deux solutions:

- via node `yarn start`
- via vitest `yarn test`
