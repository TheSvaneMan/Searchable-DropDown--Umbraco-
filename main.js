// Define custom element class
class SearchDropDown extends HTMLElement {
    optionsArray = [];
    constructor() {
        // Always call super first in constructor
        super();

        // Create a shadow root
        const shadow = this.attachShadow({ mode: 'open' });

        // Allows us to interact with the DOM from outside its scope

        // Create parent element
        const parentElement = document.createElement('div');
        parentElement.setAttribute('class', 'searchDropDownElementClass');
        parentElement.setAttribute('name', 'searchDropDownElement');

        // Create search input field
        const searchInput = document.createElement('input');
        searchInput.setAttribute('class', 'input');
        searchInput.setAttribute('type', 'text');
        searchInput.setAttribute('placeholder', 'Search dropdown');
        searchInput.setAttribute('id', 'searchDropDownInput');
        searchInput.addEventListener('input', this.searchInputValue);

        // Create option label
        const selectLabel = document.createElement('label');
        selectLabel.setAttribute('for', 'searchableDropDown');
        selectLabel.setAttribute('id', 'searchableDropDownLabel');
        selectLabel.setAttribute('class', 'searchableDropDownClass');
        selectLabel.innerHTML = 'Select an option';

        // Create select elements
        const selectElement = document.createElement('select');
        selectElement.setAttribute('name', 'searchableDropDown');
        selectElement.setAttribute('id', 'searchableDropDown');
        selectElement.setAttribute('class', 'select');

        // Default value data 
        const defaultOptionData = ['Option A', 'Option B', 'Option C', 'Option X', 'Option Z', 'Option M'];

        // Automate population of options
        for (let i = 0; i < defaultOptionData.length; i++) {
            // Create option elements
            const optionElement = document.createElement('option');
            optionElement.setAttribute('value', defaultOptionData[i].toLowerCase());
            optionElement.innerText = defaultOptionData[i];
            selectElement.appendChild(optionElement);
            this.optionsArray.push(optionElement);
        }
        this.optionsLength = this.optionsArray.length;

        // --- Create some CSS to apply to the shadow dom --- //
        const style = document.createElement('style');
        // console.log(style.isConnected);

        style.textContent = `
            .searchDropDownElementClass {
                display: grid;
                min-height: 72px;
                width: 100%;
            }
            .searchableDropDownClass {
                padding: 5px;
                margin-bottom: 5px;
            }
            .errorBoundClass {
                color: red;
                padding: 5px;
                margin-bottom: 5px;
                display: none;
            }
            .input, .select  {
                display: inline-block;
                margin-bottom: 5px;
                border: 1px solid blue;
                padding: 5px;
                border-radius: 10px;
                transition: 0.6s all;
            }
            `;
        // Append children to parent element
        parentElement.appendChild(searchInput);
        parentElement.appendChild(selectLabel);
        parentElement.appendChild(selectElement);
        // attach the created elements to the shadow DOM
        shadow.append(style);
        // console.log(style.isConnected);
        shadow.appendChild(parentElement);
    }
    // Search Drop Down Element methods
    searchInputValue(e) {
        let filter = e.target.value.toUpperCase();
        // Find the custom element on the page.
        var customElement = document.getElementsByTagName("searchable-dropdown")[0];
        // Access the shadowRoot property.
        const selectElement = customElement.shadowRoot.getElementById("searchableDropDown");
        // Access options 
        const optionElements = selectElement.getElementsByTagName("option");
        // Iterate through options
        for (let i = 0; i < optionElements.length; i++) {
            let optionValue = optionElements[i].value || optionElements[i].innerText;
            if (optionValue.toUpperCase().indexOf(filter) > -1) {
                optionElements[i].style.display = "";
                selectElement.options[i].selected = true;
            } else {
                optionElements[i].style.display = "none";
            }
        }
    }
}

// Register custom element
customElements.define('searchable-dropdown', SearchDropDown);
