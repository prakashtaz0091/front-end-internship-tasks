const searchInput = document.getElementById('search');
const suggestionsList = document.getElementById('suggestions');

const initSuggestionsList = ()=>{
    if(suggestionsList.childNodes.length<1){
        suggestionsList.style.display="none"
    }
    
}

searchInput.addEventListener('input', () => {
    const inputValue = searchInput.value;
    if (inputValue.length >= 3) {

        const suggestedKeywords = ['parrot', 'parrot special', 'cat', 'catwwsss', 'elderberry'];
        const filteredKeywords = suggestedKeywords.filter(keyword => keyword.includes(inputValue));
        const html = filteredKeywords.map(keyword => `<li>${keyword} </li>`).join('');
        suggestionsList.innerHTML = html;
        suggestionsList.style.display = 'block';
    } else {

        suggestionsList.style.display = 'none';
    }
});



const saveBtn = document.getElementById("save-btn")
const cancelBtn = document.getElementById("cancel-btn")
const expandBtn = document.getElementById("expand-btn")

expandBtn.addEventListener('click', () => {
    saveBtn.style.display = saveBtn.style.display === 'none' ? 'block' : 'none';
    cancelBtn.style.display = cancelBtn.style.display === 'none' ? 'block' : 'none';
});



const list = document.getElementById('suggestions');
const selectedItems = document.getElementById('selected-items');
const selectAllButton = document.getElementById('select-all');
const clearButton = document.getElementById('clear');

const addItem = (event) => {
    if (event.target.tagName === 'LI') {
        const selectedItemText = event.target.textContent;

        // Check for duplicates
        const selectedItemsTexts = Array.from(selectedItems.children)
            .map(item => item.querySelector('span').textContent);
        if (selectedItemsTexts.includes(selectedItemText)) {
            return;
        }

        // Create the new element for the selected item
        const selectedElement = document.createElement('div');
        selectedElement.classList.add('selected-item');
        selectedElement.innerHTML = `
          <span>${selectedItemText}</span>
          <i class="fa fa-times"></i>
        `;

        // Add click event listener to the cross icon
        selectedElement.querySelector('i').addEventListener('click', () => {
            selectedElement.remove();
        });

        // Add the new element to the selected-items div
        selectedItems.appendChild(selectedElement);
    }
}

const addAllItems = () => {
    const items = list.querySelectorAll('li');
    items.forEach(item => {
        const selectedItemText = item.textContent;

        // Check for duplicates
        const selectedItemsTexts = Array.from(selectedItems.children)
            .map(item => item.querySelector('span').textContent);
        if (selectedItemsTexts.includes(selectedItemText)) {
            return;
        }

        // Create the new element for the selected item
        const selectedElement = document.createElement('div');
        selectedElement.classList.add('selected-item');
        selectedElement.innerHTML = `
        <span>${selectedItemText}</span>
        <i class="fa fa-times"></i>
      `;

        // Add click event listener to the cross icon
        selectedElement.querySelector('i').addEventListener('click', () => {
            selectedElement.remove();
        });

        // Add the new element to the selected-items div
        selectedItems.appendChild(selectedElement);
    });
}


list.addEventListener('click', (event) => {
    addItem(event)
});

selectAllButton.addEventListener('click', () => {
    addAllItems()
})

clearButton.addEventListener('click',()=>{
    searchInput.value=""
    suggestionsList.innerHTML=""
    initSuggestionsList()
})


