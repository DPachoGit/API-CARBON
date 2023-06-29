import FetchFromApi from "./fetchApi.js";

class FormCreate {
    /* El contructor guarda tags seleccionados por id y event liseners de la propia clase creada*/
    constructor() {
    /* Creo una instancia de la clase FetchFromApi()*/
    this.newFetch = new FetchFromApi();
    /* Selecciono por id el selector y le añado un event lisener con un bind apuntando a la clase misma */
    this.brandSelector = document.getElementById("brandSelector");
    this.brandSelector.addEventListener("change", this.handleBrandSelection.bind(this));
    /* Selecciono por id el selector y le añado un event lisener con un bind apuntando a la clase misma */
    this.modelSelector = document.getElementById("modelSelector");
    this.modelSelector.addEventListener("change", this.handleModelSelection.bind(this));
    /* Selecciono por id el tag p */
    this.emissionsResult = document.getElementById("emissionsResult");
    /* Selecciono por id el input y el tag p y le añado un event lisener con un bind apuntando a la clase misma */
    this.kmInput = document.getElementById("kmInput");
    this.kmValue = document.getElementById("kmValue");
    this.kmInput.addEventListener("input", this.handleKmInput.bind(this));
    }
    /* Añade a brandSelector los nombres que salen de hacer un fetch con el metodo getBrand */
    async fillBrandSelector() {
    /* Por cada marca crea una opcion para el selector brandSelector. Como nombre le pone el name y como valor la id */
    const brandList = await this.newFetch.getBrand();
    brandList.forEach((brand) => {
    const option = document.createElement("option");
    option.value = brand.id;
    option.textContent = brand.name;
    this.brandSelector.appendChild(option);
    });
    }
    /* Con el event lisener que hay en constructor cuando cambie el selector de brand  */
    async handleBrandSelection(event) {
    /* Guardamos en una variable la id "value" haciendo target a la opcion que esta siendo seleccionada */
    const selectedBrandId = event.target.value;
    /* Limpiamos el selector de modelos cada vez que seleccionemos otra marca esperamos al fetch y rellenamos la seccion con los nuevos modelosa */
    this.clearModelSelector()
    const modelList = await this.newFetch.getModel(selectedBrandId);
    this.fillModelSelector(modelList);
    }
    /* Cuando recibamos la lista de modelos por cada uno  */
    fillModelSelector(modelList) {
    modelList.forEach((model) => {
    const option = document.createElement("option");
    option.value = model.id;
    option.textContent = `${model.name} / ${model.year}`;
    this.modelSelector.appendChild(option);
    });
    }
    clearModelSelector() {
    while (this.modelSelector.firstChild) {
    this.modelSelector.removeChild(this.modelSelector.firstChild);
    }
    }
    handleModelSelection(event) {
    const selectedModelId = event.target.value;

    this.newFetch.getEstimates(selectedModelId, this.kmValue.textContent) // Llamar al método getEstimates
    .then((emissions) => {
    // Actualizar el elemento HTML con el resultado de las emisiones
    this.emissionsResult.textContent = emissions + " kg.";
    })
    .catch((err) => {
    console.error(err);
    });
    }
    handleKmInput() {
    this.kmValue.textContent = this.kmInput.value; // Actualizar el valor mostrado en tiempo real
    }
}

export default FormCreate;
