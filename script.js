const budgetDisplay = document.getElementById('budget-display');
const budgetRemaining = document.getElementById('budget-remaining');
const budgetInput = document.getElementById('budget-input');
const budgetForm = document.getElementById('available-budget-form');

const groceryForm = document.getElementById('grocery-entry-form');
const groceryList = document.getElementById('grocery-list');
const itemNameInput = document.getElementById('item');
const itemPriceInput = document.getElementById('price');

let groceryListData = [];
let totalBudget = 0;

const updateBudget = () => {
	const currentTotal = groceryListData.reduce(
		(acc, cur) => cur.price + acc,
		0
	);

	let currentBudget = totalBudget - currentTotal;

	budgetRemaining.innerHTML = currentBudget.toFixed(2);

	budgetDisplay.style.backgroundColor = currentBudget >= 0 ? 'green' : 'red';
};

const addGroceryItem = (name, price) => {
	const groceryItem = document.createElement('div');
	const itemNameSpan = document.createElement('span');
	const itemPriceSpan = document.createElement('span');

	groceryItem.className = 'grocery-item';
	itemNameSpan.className = 'item-name';
	itemPriceSpan.className = 'item-price';

	itemNameSpan.innerHTML = name;
	itemPriceSpan.innerHTML = `$${price.toFixed(2)}`;

	groceryItem.appendChild(itemNameSpan);
	groceryItem.appendChild(itemPriceSpan);

	groceryList.appendChild(groceryItem);

	groceryListData.push({ name, price });

	updateBudget();
};

budgetForm.addEventListener('submit', (e) => {
	e.preventDefault();

	totalBudget = Number(budgetInput.value);
	budgetInput.value = '';

	updateBudget();

	budgetDisplay.style.backgroundColor = 'green';

	itemNameInput.focus();
});

groceryForm.addEventListener('submit', (e) => {
	e.preventDefault();

	const itemName = itemNameInput.value;
	const itemPrice = Number(itemPriceInput.value);

	console.log({ itemName, itemPrice });
	addGroceryItem(itemName, itemPrice);
});
