const budgetDisplay = document.getElementById('budget-display');
const budgetRemaining = document.getElementById('budget-remaining');
const budgetInput = document.getElementById('budget-input');
const budgetForm = document.getElementById('available-budget-form');

const groceryForm = document.getElementById('grocery-entry-form');
const groceryList = document.getElementById('grocery-list');
const itemNameInput = document.getElementById('item');
const itemPriceInput = document.getElementById('price');

let groceryListData = {};
let totalBudget = 0;

const displayGroceryList = () => {
	while (groceryList.firstChild) {
		groceryList.firstChild.remove();
	}

	let groceryItems = Object.keys(groceryListData);
	groceryItems.forEach((item) => {
		const groceryItem = document.createElement('div');
		const itemNameSpan = document.createElement('span');
		const itemPriceSpan = document.createElement('span');
		const removeItemBtn = document.createElement('button');

		groceryItem.classList.add('grocery-item');
		itemNameSpan.className = 'item-name';
		itemPriceSpan.className = 'item-price';
		removeItemBtn.classList.add('delete-item-btn');

		itemNameSpan.innerHTML = item;
		itemPriceSpan.innerHTML = `$${groceryListData[item].toFixed(2)}`;
		removeItemBtn.innerHTML = 'Remove';

		groceryItem.appendChild(itemNameSpan);
		groceryItem.appendChild(itemPriceSpan);
		groceryItem.appendChild(removeItemBtn);
		groceryList.appendChild(groceryItem);

		// ! Always targets the last item name
		removeItemBtn.addEventListener('click', (e) => {
			e.preventDefault();
			console.log(item);

			delete groceryListData[item];

			updateBudget();
			displayGroceryList();
		});
	});
};

const updateBudget = () => {
	const currentTotal = Object.values(groceryListData).reduce(
		(acc, cur) => cur + acc,
		0
	);

	let currentBudget = totalBudget - currentTotal;

	budgetRemaining.innerHTML = currentBudget.toFixed(2);

	budgetDisplay.style.backgroundColor = currentBudget >= 0 ? 'green' : 'red';
};

const addGroceryItem = (name, price) => {
	groceryListData[name] = price;

	displayGroceryList();

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

	addGroceryItem(itemName, itemPrice);
});
