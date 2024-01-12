const itemInput = document.getElementById('item-input');
const list = document.querySelector('ul');
const filteritem = document.getElementById('filter');
const priorityinput = document.getElementById('priority-input');
const form = document.getElementById('form-items');
const itemlist = document.getElementById('item-list');
const clearButton = document.querySelector('#clear');
const themeIcon = document.querySelector('.theme');

// Load items from local storage when the page loads
document.addEventListener('DOMContentLoaded', () => {
  const storedItems = JSON.parse(localStorage.getItem('items')) || [];
  storedItems.forEach((item) => {
    additemtolistonsubmit(item);
  });
  checkUI();
});

// Function to save items to local storage
function saveItemsToLocalStorage(items) {
  localStorage.setItem('items', JSON.stringify(items));
}

// Clear the items in the list
function clearItems() {
  list.innerHTML = '';
  itemInput.value = '';
  filteritem.value = '';
  checkUI();
  saveItemsToLocalStorage([]);
  console.log('Cleared items');
}

// Toggle dark mode
function toggleDarkMode(e) {
  e.stopPropagation();
  document.body.classList.toggle('dark-mode');
}

// Function to clear all items with a confirmation dialog
function clearItemsWithConfirmation() {
  if (confirm('Are you sure you want to clear all items?')) {
    clearItems();
  }
}

// focus on input buttons
function onfocus() {
  console.log('input focus');
  itemInput.style.outlineStyle = 'solid';
  itemInput.style.outlineWidth = '2px';
  itemInput.style.outlineColor = 'red';
}

function onblur() {
  itemInput.style.outlineStyle = 'none';
}

// alert message before entering input
function onsubmit2(e) {
  e.preventDefault();
  const formdata = new FormData(form);
  const item = formdata.get('item');
  const type = formdata.get('priority');

  if (item === '') {
    alert('Please enter something');
    return;
  }

  additemtolistonsubmit(item);
  itemInput.value = '';
  const enteries = formdata.entries();
  for (let entry of enteries) {
    console.log(entry);
  }
}

// Add item
function additemtolistonsubmit(itemname) {
  const ul = document.querySelector('ul');
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(itemname));
  const btn = document.createElement('button');
  btn.className = 'remove-item btn-link text-red';
  const icon = document.createElement('i');
  icon.className = 'fa-solid fa-xmark';
  btn.appendChild(icon);
  li.appendChild(btn);
  ul.appendChild(li);
  checkUI();

  // Save the updated items to local storage
  const storedItems = JSON.parse(localStorage.getItem('items')) || [];
  storedItems.push(itemname);
  saveItemsToLocalStorage(storedItems);
}

// Change color of list on hovering
list.addEventListener('mouseover', (e) => {
  if (e.target.tagName === 'LI') {
    e.target.style.color = 'red';
  }
});

list.addEventListener('mouseout', (e) => {
  if (e.target.tagName === 'LI') {
    e.target.style.color = '';
  }
});

// Remove item
function removeitem(e) {
  if (e.target.parentElement.classList.contains('remove-item')) {
    if (confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove();
      checkUI();

      // Remove the item from local storage
      const itemToRemove = e.target.parentElement.parentElement.textContent;
      const storedItems = JSON.parse(localStorage.getItem('items')) || [];
      const updatedItems = storedItems.filter((item) => item !== itemToRemove);
      saveItemsToLocalStorage(updatedItems);
    }
  }



  else {
    // e.target.style.color='grey';
   itemInput.value=e.target.textContent.trim();
   updatebutton();
  }



}

//update button
function onupdate(e){
  
}

// Event listeners
clearButton.addEventListener('click', clearItemsWithConfirmation);
themeIcon.addEventListener('click', toggleDarkMode);
itemInput.addEventListener('focus', onfocus);
itemInput.addEventListener('blur', onblur);
form.addEventListener('submit', onsubmit2);
itemlist.addEventListener('click', removeitem);

// Filter items
function itemfilter(e) {
  const items = itemlist.querySelectorAll('li');
  const text = e.target.value.toLowerCase();
  items.forEach((item) => {
    const itemname = item.firstChild.textContent.toLowerCase();
    if (itemname.indexOf(text) !== -1) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}

filteritem.addEventListener('input', itemfilter);

// Function to update UI based on item list
function checkUI() {
  const items = itemlist.querySelectorAll('li');
  if (items.length === 0) {
    clearButton.style.display = 'none';
    filteritem.style.display = 'none';
  } else {
    clearButton.style.display = 'block';
    filteritem.style.display = 'block';
  }
}
checkUI()




