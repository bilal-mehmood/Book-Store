const bookStoreForm = document.getElementById('book-store-form');
let purchaserName = document.querySelector('input[ name="purchaserName" ]');
let dateOfPurchase = document.querySelector('input[ name="dateOfPurchase"]');
let sellBy = document.querySelector('input[ name="sellBy"]');
let bookTitle = document.querySelector('input[name="bookTitle"]');
let tableTbodyData = document.querySelector('#bookStoreData').querySelector('tbody');
// const searchFld = document.getElementById("searchFld");


const ls = window.localStorage;
const bookStores = getData() || [];

bookStoreForm.addEventListener('submit', (event) => {
	event.preventDefault();

	addBookStore(purchaserName.value, dateOfPurchase.value, sellBy.value, bookTitle.value);
	template(bookStores);
	purchaserName.value = '';
	dateOfPurchase.value = '';
	sellBy.value = '';
	bookTitle.value = '';

});

// Local Storage Delete

tableTbodyData.addEventListener('click', (event) => {
	let id = event.target.dataset.id;
	if (event.target.tagName.toLowerCase() == 'button') {
		event.target.parentNode.parentNode.remove();
	};

	let pos;
	bookStores.forEach((object, index) => {
		if (object.id == id) {
			pos = index;
		};
	});

	bookStores.splice(pos, 1,);
	let jsonData = JSON.stringify(bookStores);
	ls.setItem('BookStores', jsonData);
});


// Local Storage Delete

// Search
// search fld
searchFld.addEventListener("keyup", (event) => {
	
	let value = event.target.value;
	let searchBook;
	if ( value.length > 0 ) {
		searchBook = bookStores.filter((object) => {
			if ( object.purchaserName.includes(value) ) {
				return object;
			}
		});
		template(searchBook);
		return;

	} 
	template(bookStores);
	
});
// Search

function getData() {
	return JSON.parse(ls.getItem("BookStores"));
}

function generateId() {
	return Number( (Math.random() * 100).toFixed(3).replace(".", "") );
}

function addBookStore(purchaserName, dateOfPurchase, sellBy, bookTitle){

	let bookStore = {};
	bookStore.id = generateId();
	bookStore.purchaserName = purchaserName;
	bookStore.dateOfPurchase = dateOfPurchase;
	bookStore.sellBy = sellBy;
	bookStore.bookTitle = bookTitle;

	bookStores.push(bookStore);
	let jsonData = JSON.stringify(bookStores);
	ls.setItem("BookStores", jsonData);

}


function template(bookStoreArray) {

	while( tableTbodyData.lastChild ){
		tableTbodyData.lastChild.remove();
	}

	bookStoreArray.forEach((object, index, array) => {

		let tr = document.createElement('tr');
		let tdDel = document.createElement('td');
		let btnDel = document.createElement('button');
		btnDel.setAttribute('class', 'btn btn-danger');
		btnDel.textContent = 'Delete';

		for( let key in object ) {
			let td = document.createElement("td");
			td.textContent = object[key];
			tr.appendChild(td);
		}
		tr.appendChild(tdDel);
		tdDel.appendChild(btnDel);
		tableTbodyData.appendChild(tr);

	});

}

window.onload = () => template(bookStores);
