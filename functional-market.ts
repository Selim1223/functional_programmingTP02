// En programmation fonctionnelle, il est recommandé d'utiliser des structures immuables.
// Ici, fruitsStock pourrait être un tableau constant auquel on applique des transformations pures.
let fruitsStock = [
  { id: 1, name: "Pomme", quantity: 10 },
  { id: 2, name: "Poire", quantity: 5 },
  { id: 3, name: "Ananas", quantity: 8 }
];

// Cette fonction modifie le stock directement, ce qui n'est pas recommandé en programmation fonctionnelle.
// Une alternative serait de retourner un nouveau tableau avec le fruit ajouté ou modifié.
function addFruitToStock(name: string, quantity: number) {
  const existingProduct = fruitsStock.find((p) => p.name === name);

  if (existingProduct) {
    // La quantité est directement modifiée ici. On pourrait retourner un nouveau fruit pour préserver l'immutabilité.
    existingProduct.quantity += quantity;
  } else {
    // fruitsStock est directement modifié, il serait préférable de retourner un nouveau tableau.
    fruitsStock.push({ id: fruitsStock.length + 1, name, quantity });
  }
}

// Cette fonction est relativement correcte d'un point de vue fonctionnel car elle renvoie un nouveau tableau filtré, mais la variable fruitsStock est toujours mutée.
function deleteFruit(name: string) {
  fruitsStock = fruitsStock.filter((p) => p.name !== name);
  console.log(`${name} deleted from stock`);
}

// Cette fonction affiche l'état du stock, mais elle ne devrait pas faire partie de la logique métier.
// En programmation fonctionnelle, il est conseillé de séparer la logique métier de l'affichage.
function showStock() {
  fruitsStock.forEach((fruit) => {
    console.log(`Fruit : ${fruit.name} | Quantity : ${fruit.quantity}`);
  });
}

// Cette fonction a plusieurs responsabilités : elle modifie le stock ET affiche un message.
// Il serait mieux de scinder cette logique en deux : une fonction pure pour la vente et une autre pour l'affichage.
function sellFruit(name: string, quantity: number) {
  const fruit = fruitsStock.find((p) => p.name === name);

  if (fruit && fruit.quantity >= quantity) {
    // Même problème que précédemment : la quantité est directement modifiée, une approche plus fonctionnelle
    // consisterait à retourner un nouvel objet fruit avec la quantité mise à jour.
    fruit.quantity -= quantity;
    console.log(`${quantity} ${name} sold`);
  } else {
    console.log(`Not enough ${name} or unknown fruit`);
  }
}

// Tests des fonctions
addFruitToStock("Pomme", 5);
addFruitToStock("Citron", 10);
sellFruit("Ananas", 2);
showStock();
deleteFruit("Ananas");
showStock();

/*
2 Ananas sold
Fruit : Pomme | Quantity : 15
Fruit : Poire | Quantity : 5
Fruit : Ananas | Quantity : 6
Fruit : Citron | Quantity : 10
Ananas deleted from stock
Fruit : Pomme | Quantity : 15
Fruit : Poire | Quantity : 5
Fruit : Citron | Quantity : 10
*/
