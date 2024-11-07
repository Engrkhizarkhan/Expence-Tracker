let lists = JSON.parse(localStorage.getItem('lists')) || [];
let isFirstEntry = true;

const header = document.getElementById('header');
const container = document.getElementById('container');

// Create the DOM elements
const content = document.createElement('div');
header.appendChild(content);
content.innerHTML = `
  <h1>Expence Tracker</h1>
  `;
content.className = 'content';

// Create the form
const nameText = document.createElement('div');
nameText.id = 'nameForEnter';
nameText.className = 'name-form';
nameText.innerHTML = 'Item Name:';
container.appendChild(nameText);
const nameInput = document.createElement('input');
nameInput.placeholder = 'Enter the item name';
nameInput.type = 'text';
nameInput.required = true;
nameText.appendChild(nameInput);

const amountText = document.createElement('div');
amountText.id = 'amountForEnter';
container.appendChild(amountText);
const amountInput = document.createElement('input');
amountText.className = 'amount-form';
amountInput.placeholder = 'Enter the amount';
amountInput.type = 'number';
amountInput.min = 0;
amountInput.required = true;
amountInput.tabIndex = 0;
amountText.innerHTML = 'Amount:';
amountText.appendChild(amountInput);

// Create the buttons
const listBtn = document.getElementById('btn');

const addBtn = document.createElement('button');
addBtn.innerHTML = 'Add';
listBtn.appendChild(addBtn);
addBtn.className = 'add-btn';

const clearBtn = document.createElement('button');
clearBtn.innerHTML = 'Clear';
listBtn.appendChild(clearBtn);
clearBtn.className = 'clear-btn';

// Create the total amount analouge
const totalArea = document.getElementById('total');
const totalAmount = document.createElement('div');
totalAmount.innerHTML = `<p>Total Amount: 0$</p>`;
totalAmount.className = 'total-amount';
totalArea.appendChild(totalAmount);


// Add the values
const addValue = () => {
const namevalue = nameInput.value;
const amountvalue = parseFloat(amountInput.value);

if (namevalue && !isNaN(amountvalue)) {
    lists.push({name: namevalue, amount: amountvalue});
    localStorage.setItem('lists', JSON.stringify(lists));
    nameInput.value = '';
    amountInput.value = '';
    displayList();
} else {
alert('Please enter the item name and amount');
}
}

const displayList = () => {
    
    const listContainer = document.getElementById('list');
    listContainer.innerHTML = ""; // Clear previous list

    const total = lists.reduce((acc, item) => acc + item.amount, 0);
    totalAmount.innerHTML = `<p>Total Amount: ${total}$</p>`;

    lists.forEach((item, index) => {
        const list = document.createElement('div');
        list.className = 'list';
        list.id = 'listId';
        list.innerHTML = `
        <h2>Expense List #${index + 1}</h2>
        <p>Item Name: ${item.name}</p>
        <p>Amount: ${item.amount}$</p>
        `;
        listContainer.appendChild(list);

        if (isFirstEntry || lists.length == 1) {
            setTimeout(() => {
              list.classList.add('show');
            }, 10);
            isFirstEntry = false;
          }else{
            list.style.opacity = 1;
            list.style.transform = 'scale(1)';
          }
      

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.innerHTML = 'Delete';
        list.appendChild(deleteBtn);
        deleteBtn.addEventListener('click', () => {
            
            list.classList.add('fade-out');
            setTimeout(() => {
                lists.splice(index, 1);
                displayList();
                localStorage.setItem('lists', JSON.stringify(lists));
            }, 500);
        });
    });
}

const clearList = () => {
    lists = [];
    isFirstEntry = true;
    displayList();
    localStorage.clear();
};

addBtn.addEventListener('click', addValue);
clearBtn.addEventListener('click', clearList);

// Enter funtionality

document.getElementById('nameForEnter').addEventListener('keypress', function (e) {
  if (e.key === 'Enter'){
    addValue();
    return;
  } 
  else if (e.key === 'ArrowDown'){
    amountInput.focus();
  }
});
document.getElementById('amountForEnter').addEventListener('keypress', function (e) {
    if (e.key === 'Enter'){
        addValue();
    }
});

displayList();