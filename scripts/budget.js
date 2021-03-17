let incomeList = [];
let outcomeList = [];
let nextItemId = 0;
const addIncomeBtn = document.getElementById('add-income');
const addOutcomeBtn = document.getElementById('add-outcome');

function addIncomeItem() {
  let incTitle = document.getElementById('inc-title').value;
  let incValue = document.getElementById('inc-value').value;
  incValue = incValue.replace(",", ".");
  incValue = Number.parseFloat(incValue);
  incValue = Math.round(incValue * 100) / 100;

  if (incTitle === "") {
    alert("Wprowadź poprawną nazwę");
  }
  else if (isNaN(incValue)) {
    alert("Wprowadź poprawną kwotę")
  }
  else {
    let incomeItem = {
      title: incTitle,
      value: incValue,
      id: nextItemId,
    };

    incomeList.push(incomeItem);
    nextItemId++;
    refreshIncomeList();
    document.getElementById('inc-title').value = '';
    document.getElementById('inc-value').value = '';
  };
};

function addOutcomeItem() {
  let outcTitle = document.getElementById('outc-title').value;
  let outcValue = document.getElementById('outc-value').value;
  outcValue = outcValue.replace(",", ".");
  outcValue = Number.parseFloat(outcValue);
  outcValue = Math.round(outcValue * 100) / 100;

  if (outcTitle === "") {
    alert("Wprowadź poprawną nazwę");
  }
  else if (isNaN(outcValue)) {
    alert("Wprowadź poprawną kwotę")
  }
  else {
    let outcomeItem = {
      title: outcTitle,
      value: outcValue,
      id: nextItemId,
    };

    outcomeList.push(outcomeItem);
    nextItemId++;
    refreshOutcomeList();
    document.getElementById('outc-title').value = '';
    document.getElementById('outc-value').value = '';
  };
};

function refreshIncomeList(itemToEditId) {
  const incItemsList = document.querySelector('.inc-items-list');
  incItemsList.innerHTML = '';

  incomeList.forEach(function (incomeItem) {

    if (itemToEditId == incomeItem.id) {
      const incItemBox = createEditableListElement(incomeItem);
      incItemsList.appendChild(incItemBox);
    }
    else {
      const incItemBox = createListElement(incomeItem);
      incItemsList.appendChild(incItemBox);
    };
  })
  updateBalance();
};

function refreshOutcomeList(outcItemToEditId) {
  const outcItemsList = document.querySelector('.outc-items-list');
  outcItemsList.innerHTML = '';

  outcomeList.forEach(function (outcomeItem) {
    if (outcItemToEditId == outcomeItem.id) {
      const outcItemBox = createEditableOutcListElement(outcomeItem);
      outcItemsList.appendChild(outcItemBox);
    }
    else {
      const outcItemBox = createOutcListElement(outcomeItem);
      outcItemsList.appendChild(outcItemBox);
    };
  })
  updateBalance();
};

function cancelIncChanges(event) {
  refreshIncomeList();
};

function cancelOutcChanges(event) {
  refreshOutcomeList();
};

function saveIncChanges(event) {
  const newIncTitle = document.getElementById('editIncTitFld').value;
  let newIncValue = document.getElementById('editIncValFld').value;
  newIncValue = newIncValue.replace(",", ".");
  newIncValue = Number.parseFloat(newIncValue);
  newIncValue = Math.round(newIncValue * 100) / 100;

  if (newIncTitle === "") {
    alert("Wprowadź poprawną nazwę");
  }
  else if (isNaN(newIncValue)) {
    alert("Wprowadź poprawną kwotę")
  }
  else {
    const idToSave = Number(event.target.id);
    const itemToSave = incomeList.find(item => {
      return item.id == idToSave;
    });
    itemToSave.title = newIncTitle;
    itemToSave.value = newIncValue;
    refreshIncomeList();
  };
};

function saveOutcChanges(event) {
  const newOutcTitle = document.getElementById('editOutcTitFld').value;
  let newOutcValue = document.getElementById('editOutcValFld').value;
  newOutcValue = newOutcValue.replace(",", ".");
  newOutcValue = Number.parseFloat(newOutcValue);
  newOutcValue = Math.round(newOutcValue * 100) / 100;

  if (newOutcTitle === "") {
    alert("Wprowadź poprawną nazwę");
  }
  else if (isNaN(newOutcValue)) {
    alert("Wprowadź poprawną kwotę")
  }
  else {
    const idToSave = Number(event.target.id);
    const itemToSave = outcomeList.find(item => {
      return item.id == idToSave;
    });
    itemToSave.title = newOutcTitle;
    itemToSave.value = newOutcValue;
    refreshOutcomeList();
  };
};

function editIncItem(event) {
  refreshIncomeList(event.target.id)
};

function deleteIncItem(event) {
  const idToDel = Number(event.target.id);
  incomeList = incomeList.filter(item => item.id !== idToDel);
  refreshIncomeList();
};

function editOutcItem(event) {
  console.log("edit")
  refreshOutcomeList(event.target.id)
};

function deleteOutcItem(event) {
  const idToDel = Number(event.target.id);
  console.log(idToDel)
  outcomeList = outcomeList.filter(item => item.id !== idToDel);
  refreshOutcomeList();
};

addIncomeBtn.addEventListener('click', addIncomeItem);
addOutcomeBtn.addEventListener('click', addOutcomeItem);

function updateBalance() {
  const totalIncomeElem = document.getElementById('total-income');
  const totalOutcomeElem = document.getElementById('total-outcome');
  let titlePanel = document.querySelector('.title-panel');

  const totalIncValue = incomeList.reduce((prevTotal, item) => {
    return prevTotal + item.value;
  }, 0);
  totalIncomeElem.innerText = totalIncValue.toFixed(2);

  const totalOutcValue = outcomeList.reduce((prevTotal, item) => {
    return prevTotal + item.value;
  }, 0);
  totalOutcomeElem.innerText = totalOutcValue.toFixed(2);

  let totalValue = totalIncValue - totalOutcValue;

  if (totalValue < 0) {
    titlePanel.innerText = `Bilans jest ujemny. Jesteś na minusie ${totalValue.toFixed(2)} złotych`;
  }
  else if (totalValue === 0) {
    titlePanel.innerText = 'Bilans wynosi zero';
  }
  else {
    titlePanel.innerText = `Możesz jeszcze wydać ${totalValue.toFixed(2)} złotych`
  }
};

function createEditableListElement(incomeItem) {
  const incItemBox = document.createElement('div');
  incItemBox.id = 'inc-item-box';

  const incButtons = document.createElement('div');
  incButtons.id = 'inc-buttons';

  const saveIncBtn = document.createElement('button');
  saveIncBtn.id = incomeItem.id;
  saveIncBtn.innerText = 'zapisz';
  saveIncBtn.addEventListener('click', saveIncChanges);

  const cancIncBtn = document.createElement('button');
  cancIncBtn.id = 'cancel-inc-btn';
  cancIncBtn.innerText = 'anuluj';
  cancIncBtn.addEventListener('click', cancelIncChanges);

  const editIncTitlFld = document.createElement('input');
  editIncTitlFld.id = 'editIncTitFld';
  editIncTitlFld.setAttribute('value', incomeItem.title)

  const editIncValFld = document.createElement('input');
  editIncValFld.id = 'editIncValFld';
  editIncValFld.setAttribute('value', incomeItem.value.toFixed(2) + ' PLN')

  incButtons.appendChild(saveIncBtn);
  incButtons.appendChild(cancIncBtn);
  incItemBox.appendChild(editIncTitlFld);
  incItemBox.appendChild(editIncValFld);
  incItemBox.appendChild(incButtons)
  return incItemBox;
};

function createEditableOutcListElement(outcomeItem) {
  const outcItemBox = document.createElement('div');
  outcItemBox.id = 'outc-item-box';

  const outcButtons = document.createElement('div');
  outcButtons.id = 'outc-buttons';

  const saveOutcBtn = document.createElement('button');
  saveOutcBtn.id = outcomeItem.id;
  saveOutcBtn.innerText = 'zapisz';
  saveOutcBtn.addEventListener('click', saveOutcChanges);

  const cancOutcBtn = document.createElement('button');
  cancOutcBtn.id = 'cancel-outc-btn';
  cancOutcBtn.innerText = 'anuluj';
  cancOutcBtn.addEventListener('click', cancelOutcChanges);

  const editOutcTitlFld = document.createElement('input');
  editOutcTitlFld.id = 'editOutcTitFld';
  editOutcTitlFld.setAttribute('value', outcomeItem.title)

  const editOutcValFld = document.createElement('input');
  editOutcValFld.id = 'editOutcValFld';
  editOutcValFld.setAttribute('value', outcomeItem.value.toFixed(2) + ' PLN')

  outcButtons.appendChild(saveOutcBtn);
  outcButtons.appendChild(cancOutcBtn);
  outcItemBox.appendChild(editOutcTitlFld);
  outcItemBox.appendChild(editOutcValFld);
  outcItemBox.appendChild(outcButtons)
  return outcItemBox;
};

function createListElement(incomeItem) {
  const incItemBox = document.createElement('div');
  incItemBox.id = 'inc-item-box';

  const incButtons = document.createElement('div');
  incButtons.id = 'inc-buttons';

  const incItem = document.createElement('div');
  incItem.id = ('inc-item');
  incItem.innerText = incomeItem.title;

  const incVal = document.createElement('div');
  incVal.id = ('inc-val');
  incVal.innerText = incomeItem.value.toFixed(2) + ' PLN';

  const editIncBtn = document.createElement('button');
  editIncBtn.id = incomeItem.id;
  editIncBtn.innerText = 'edytuj';
  editIncBtn.addEventListener('click', editIncItem);

  const delIncBtn = document.createElement('button');
  delIncBtn.id = incomeItem.id;
  delIncBtn.innerText = 'usuń';
  delIncBtn.addEventListener('click', deleteIncItem);

  incButtons.appendChild(editIncBtn);
  incButtons.appendChild(delIncBtn);
  incItemBox.appendChild(incItem);
  incItemBox.appendChild(incVal);
  incItemBox.appendChild(incButtons);
  return incItemBox;
};


function createOutcListElement(outcomeItem) {
  const outcItemBox = document.createElement('div');
  outcItemBox.id = 'outc-item-box';

  const outcButtons = document.createElement('div');
  outcButtons.id = 'outc-buttons';

  const outcItem = document.createElement('div');
  outcItem.id = ('outc-item');
  outcItem.innerText = outcomeItem.title;

  const outcVal = document.createElement('div');
  outcVal.id = ('outc-val');
  outcVal.innerText = outcomeItem.value.toFixed(2) + ' PLN';

  const editOutcBtn = document.createElement('button');
  editOutcBtn.id = outcomeItem.id;
  editOutcBtn.innerText = 'edytuj';
  editOutcBtn.addEventListener('click', editOutcItem);

  const delOutcBtn = document.createElement('button');
  delOutcBtn.id = outcomeItem.id;
  delOutcBtn.innerText = 'usuń';
  delOutcBtn.addEventListener('click', deleteOutcItem);

  outcButtons.appendChild(editOutcBtn);
  outcButtons.appendChild(delOutcBtn);
  outcItemBox.appendChild(outcItem);
  outcItemBox.appendChild(outcVal);
  outcItemBox.appendChild(outcButtons);
  return outcItemBox;
};