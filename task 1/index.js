const searchInput = document.getElementById('search');
const suggestionsList = document.getElementById('suggestions');

//initialize the suggestions list function
const initSuggestionsList = () => {
    if (suggestionsList.childNodes.length < 1) {
        suggestionsList.style.display = "none"
    }

}

//hide toolkit menu
const hideToolkitMenu = () => {
    cancelBtn.style.display = "none"
    saveBtn.style.display = "none"
}

//show toolkit menu
const showToolkitMenu = () => {
    cancelBtn.style.display = "block"
    saveBtn.style.display = "block"
}

//hide saved-items container
const hideSavedItemsContainer = () => {
    savedItems.style.display = "none"
}


//suggestions list initialized 
initSuggestionsList()

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
hideToolkitMenu()


cancelBtn.addEventListener('click', () => {
    selectedItems.innerHTML = ""
    hideToolkitMenu()
})



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
        hideIfEmpty()

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
        hideIfEmpty()
    });
}


list.addEventListener('click', (event) => {
    addItem(event)
    showToolkitMenu()
});

selectAllButton.addEventListener('click', () => {
    addAllItems()
    showToolkitMenu()
})

clearButton.addEventListener('click', () => {
    searchInput.value = ""
    suggestionsList.innerHTML = ""
    initSuggestionsList()
})





// saving the items
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
    hideIfEmpty()
    emptySelectedItems()
    hideForm()
    hideToolkitMenu()
    if (!isVisible(savedItemsContainer)) {
        addMoreBtn.style.display = "none"
    }
    else {
        addMoreBtn.style.display = "inline-block"
        deleteButton.style.display = "inline-block"
        cancelButton2.style.display = "inline-block"

    }

});


//showing saved items function
const savedItemsContainer = document.getElementById("saved-items");
const showSavedItems = () => {

    savedItemsContainer.innerHTML = ""
    // loop through the saved items array and generate the HTML for each item
    savedItems.forEach(function (item, index) {
        // create a new div element for the item
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("saved-item");

        // create a new checkbox input element for the item
        const checkbox = document.createElement("input");
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
    });
}

const emptySelectedItems = () => {
    const selectedItems = document.getElementById('selected-items');
    selectedItems.innerHTML = ''; // remove all child elements

}

// Check if saved-items div has any child elements
const hideIfEmpty = () => {
    if (savedItemsContainer.childElementCount === 0) {
        savedItemsContainer.style.display = 'none';
    } else {
        savedItemsContainer.style.display = 'flex';
    }

    // Check if selected-items div has any child elements
    if (selectedItems.childElementCount === 0) {
        selectedItems.style.display = 'none';
    } else {
        selectedItems.style.display = 'flex';
    }
}

hideIfEmpty()

//hide form
const form = document.getElementById("form")
const hideForm = () => {
    form.style.display = "none"
}
const showForm = () => {
    form.style.display = "block"
}

//adding more items
const addMoreBtn = document.getElementById("add-more-btn")
addMoreBtn.addEventListener('click', () => {
    showForm()

})



function isVisible(element) {
    const style = window.getComputedStyle(element);
    return (style.display !== 'none');

}

if (!isVisible(savedItemsContainer)) {
    addMoreBtn.style.display = "none"
}
else {
    addMoreBtn.style.display = "inline-block"

}


const checkboxes = savedItemsContainer.querySelectorAll('input[type="checkbox"]');
const deleteButton = document.getElementById("delete-btn")
const cancelButton2 = document.getElementById('cancel-btn-2');




// Add event listener to the delete button
deleteButton.addEventListener('click', () => {
    // Get a list of all the checkboxes that are checked
    const checkboxes = savedItemsContainer.querySelectorAll('input[type="checkbox"]:checked');

    // Remove each checked item from the savedItemsContainer
    checkboxes.forEach((checkbox) => {
        const savedItem = checkbox.parentNode;
        const indexOfSavedItem = savedItems.indexOf(savedItem.textContent)
        savedItems.splice(indexOfSavedItem)
        savedItemsContainer.removeChild(savedItem);
    });
});

// Add event listener to the cancel button
cancelButton2.addEventListener('click', () => {
    // Uncheck all checkboxes inside the savedItemsContainer
    const checkboxes = savedItemsContainer.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
    });
});