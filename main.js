// Define custom element class
class SearchDropDown extends HTMLElement {
    selectElement = null;
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

        // Method A: Bind the function ref to 'this' so it has the instance of the class
        searchInput.addEventListener('input', this.searchInputValue.bind(this));

        /*
         * Method B: Pass on the reference to selectElement (remember to create selectElement first)
         * This method creates handles searchInputValue as a factory and only invokes the outer function
         * on each callback from the 'input' event
        */
        //searchInput.addEventListener('input', (e) => this.searchInputValue(e, selectElement));

        // Create option label
        const selectLabel = document.createElement('label');
        selectLabel.setAttribute('for', 'searchableDropDown');
        selectLabel.setAttribute('id', 'searchableDropDownLabel');
        selectLabel.setAttribute('class', 'searchableDropDownClass');
        selectLabel.innerHTML = 'Select an option';

        // Create select elements
        this.selectElement = document.createElement('select');
        this.selectElement.setAttribute('name', 'searchableDropDown');
        this.selectElement.setAttribute('id', 'searchableDropDown');
        this.selectElement.setAttribute('class', 'select');

        // Default value data
        const defaultOptionData = ['Option A', 'Option B', 'Option C', 'Option X', 'Option Z', 'Option M'];

        // Automate population of options
        for (let i = 0; i < defaultOptionData.length; i++) {
            // Create option elements
            const optionElement = document.createElement('option');
            optionElement.setAttribute('value', defaultOptionData[i].toLowerCase());
            optionElement.innerText = defaultOptionData[i];
            this.selectElement.appendChild(optionElement);
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
        parentElement.appendChild(this.selectElement);
        // attach the created elements to the shadow DOM
        shadow.append(style);
        // console.log(style.isConnected);
        shadow.appendChild(parentElement);
    }
    // Search Drop Down Element methods
    searchInputValue(e) {
        let filter = e.target.value.toUpperCase();
        // Access options
        const optionElements = this.selectElement.getElementsByTagName("option");
        // Iterate through options
        for (let i = 0; i < optionElements.length; i++) {
            let optionValue = optionElements[i].value || optionElements[i].innerText;
            if (optionValue.toUpperCase().indexOf(filter) > -1) {
                optionElements[i].style.display = "";
                this.selectElement.options[i].selected = true;
            } else {
                optionElements[i].style.display = "none";
            }
        }
    }
}

// Register custom element
customElements.define('searchable-dropdown', SearchDropDown);
