const saveBtn = document.getElementById("save-btn")
const deleteBtn = document.getElementById("delete-btn")
const cancelBtn = document.getElementById("cancel-btn")
const cancelBtn2 = document.getElementById("cancel-btn-2")
const editBtn = document.getElementById("edit-btn")
const controlBtns = document.getElementById("control-btns")

saveBtn.style.display = "none"
deleteBtn.style.display = "none"
cancelBtn.style.display = "none"
cancelBtn2.style.display = "none"
editBtn.style.display = "none"




const searchInput = document.getElementById("search-input")
const suggestionsList = document.getElementById('suggestions');

searchInput.addEventListener('input', () => {
    const inputValue = searchInput.value;
    if (inputValue.length >= 3) {



        const suggestedKeywords = ['parrot', 'parrot special', 'cat', 'catwwsss', 'elderberry'];
        const filteredKeywords = suggestedKeywords.filter(keyword => keyword.includes(inputValue));
        const html = filteredKeywords.map(keyword => `<li>${keyword} </li>`).join('');
        suggestionsList.innerHTML = html;
        suggestionsList.style.display = 'block';
        controlBtns.style.display="block"
        editBtn.style.display="none"
    } else {

        suggestionsList.style.display = 'none';
    }
});



const selectedItems = document.getElementById('selected-items');

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
            if (!isVisible(selectedItems)) {
                saveBtn.style.display = "none"
                cancelBtn.style.display = "none"
            }
        });

        // Add the new element to the selected-items div
        selectedItems.appendChild(selectedElement);


    }
}


const addAllItems = () => {
    const items = suggestionsList.querySelectorAll('li');
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
            if (!isVisible(selectedItems)) {
                saveBtn.style.display = "none"
                cancelBtn.style.display = "none"
            } else {
                saveBtn.style.display = "block"
                cancelBtn.style.display = "block"

            }
        });

        // Add the new element to the selected-items div
        selectedItems.appendChild(selectedElement);
    });
}

function isVisible(element) {
    const style = window.getComputedStyle(element);
    return (style.display !== 'none');

}

suggestionsList.addEventListener('click', (event) => {
    addItem(event)
    if (isVisible(selectedItems)) {
        saveBtn.style.display = "inline-block"
        cancelBtn.style.display = "inline-block"
    }
});

const selectAllButton = document.getElementById("select-all-btn")

selectAllButton.addEventListener('click', () => {
    addAllItems()
    if (isVisible(selectedItems)) {
        saveBtn.style.display = "inline-block"
        cancelBtn.style.display = "inline-block"
    }
})


const clearButton = document.getElementById("clear-btn")

clearButton.addEventListener('click', () => {

    searchInput.value = ""
    suggestionsList.innerHTML = ""
    suggestionsList.style.display = "none"

})

cancelBtn.addEventListener('click', () => {
    selectedItems.innerHTML = ""
    if (!isVisible(selectedItems)) {
        saveBtn.style.display = "none"
        cancelBtn.style.display = "none"
    }
})

const savedItemsContainer = document.getElementById("saved-items")

const savedItems = []; // initialize an empty array to store saved items
saveBtn.addEventListener("click", function () {
    const selectedItems = document.querySelectorAll("#selected-items .selected-item");
    selectedItems.forEach(function (item) {
        const textContent = item.textContent.replace(/\n/g, "").trim(); // remove all newline characters and leading/trailing whitespace
        if (!savedItems.includes(textContent)) { // check if the saved items array already includes the text content
            savedItems.push(textContent); // add the trimmed text content to saved items
        }

    });


    showSavedItems()
    if (isVisible(savedItemsContainer)) {
        saveBtn.style.display = "none"
        cancelBtn.click() //removing all the selected items
        cancelBtn.style.display = "none"
        editBtn.style.display = "inline-block"
        // searchInput.style.display = "none"
        clearButton.click()
        controlBtns.style.display = "none"
    }


});

const showSavedItems = () => {

    savedItemsContainer.innerHTML = ""
    // loop through the saved items array and generate the HTML for each item
    savedItems.forEach(function (item, index) {
        // create a new div element for the item
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("saved-item");

        // create a new checkbox input element for the item
        const checkbox = document.createElement("input");
        checkbox.classList.add("saved-items-checkbox")
        checkbox.type = "checkbox";
        checkbox.value = item;
        checkbox.id = "checkbox-" + index;

        // create a new label element for the checkbox
        const label = document.createElement("label");
        label.htmlFor = checkbox.id;
        label.textContent = item;

        // append the checkbox and label to the item div
        itemDiv.appendChild(checkbox);
        itemDiv.appendChild(label);

        // append the item div to the saved items container
        savedItemsContainer.appendChild(itemDiv);

        checkbox.style.display = "none"
    });

    console.log(savedItems);


}

editBtn.addEventListener("click", () => {
    const savedItemsCheckbox = document.getElementsByClassName("saved-items-checkbox")
    for (let checkbox of savedItemsCheckbox) {
        checkbox.style.display = "block"
    }
    editBtn.style.display = "none"
    deleteBtn.style.display = "block"
    cancelBtn2.style.display = "block"
})


cancelBtn2.addEventListener('click', () => {
    const savedItemsCheckbox = document.getElementsByClassName("saved-items-checkbox")
    for (let checkbox of savedItemsCheckbox) {
        checkbox.checked = false
        checkbox.style.display = "none"
        editBtn.style.display = "block"
        deleteBtn.style.display = "none"
        cancelBtn2.style.display = "none"
    }
})

// Add event listener to the delete button
deleteBtn.addEventListener('click', () => {
    // Get a list of all the checkboxes that are checked
    const checkboxes = savedItemsContainer.querySelectorAll('input[type="checkbox"]:checked');

    // Remove each checked item from the savedItemsContainer
    checkboxes.forEach((checkbox) => {
        const savedItem = checkbox.parentNode;
        const indexOfSavedItem = savedItems.indexOf(savedItem.textContent)
        savedItems.splice(indexOfSavedItem, 1)
        savedItemsContainer.removeChild(savedItem);
    });

    console.log(savedItems);
    if (savedItems.length == 0) {
        searchInput.style.display = "block"
        controlBtns.style.display = "block"
        deleteBtn.style.display = "none"
        cancelBtn2.style.display = "none"
    }

});