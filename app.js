/* ============================
  DataBase - importing -section 
  =============================
*/
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';
import { getDatabase , ref, push, onValue, remove} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js'

const appSetting = {
    databaseURL  : 'https://mangalist-database-default-rtdb.asia-southeast1.firebasedatabase.app/'
}

const app = initializeApp(appSetting);
const database = getDatabase(app);
const mangaListDB = ref(database , 'MangaList');



/*================= 
  DOM manipulation
  =================
*/
const mangaInputEl = document.getElementById('manga-input');
const addBtnEl = document.getElementById('addBtn');
const listContainerEl = document.getElementById('list-container');



/* ==============
 Creating Element
================ */

// ul
const listItemEl = document.createElement('ul');
listItemEl.classList.add('list-item')
listContainerEl.appendChild(listItemEl);




/* ===============================
 Adding eventlistner to the addBtn
 ================================ */
addBtnEl.addEventListener('click', () => {
    let inputValue = mangaInputEl.value;

    if(inputValue !== '') {
        push(mangaListDB, inputValue);

        clearinputEl();
    }
    
})

/* =============================
 onValue function using database 
 =============================== */

onValue(mangaListDB , function(snapshot) {

    if(snapshot.exists()) {
        let mangaListArray = Object.entries(snapshot.val());

        clearUlEl();

        mangaListArray.forEach(manga => {
        appendtoListItem(manga);
    }) 

    } else {

        listItemEl.textContent = "Nothing in here ... yet";
    }
})


 /*================ 
  function section
 ================== */

function appendtoListItem(item) {
    let itemID = item[0];
    let itemValue = item[1];

    const newLi = document.createElement('li');
    newLi.textContent = itemValue;
    listItemEl.append(newLi);

    newLi.addEventListener('dblclick', () => {
        let exactLocationInDB = ref(database, `MangaList/${itemID}`);

        remove(exactLocationInDB);
    })
}


function clearinputEl() {
    mangaInputEl.value = '';
}

function clearUlEl() {
    listItemEl.innerHTML = "";
}