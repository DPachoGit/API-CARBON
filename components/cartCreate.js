import FetchFromApi from "./fetchApi.js";

class FormCreate {
  /* El contructor guarda tags seleccionados por id y event liseners de la propia clase creada*/
  constructor() {
    /* Creo una instancia de la clase FetchFromApi()*/
    this.newFetch = new FetchFromApi();
    /* Selecciono por id el selector y le añado un event lisener con un bind apuntando a la clase misma */
    this.brandSelector = document.getElementById("brandSelector");
    this.brandSelector.addEventListener(
      "change",
      this.handleBrandSelection.bind(this)
    );
    /* Selecciono por id el selector y le añado un event lisener con un bind apuntando a la clase misma */
    this.modelSelector = document.getElementById("modelSelector");
    this.modelSelector.addEventListener(
      "change",
      this.handleModelSelection.bind(this)
    );
    /* Selecciono por id el tag p */
    this.emissionsResult = document.getElementById("emissionsResult");
    /* Selecciono por id el input y el tag p y le añado un event lisener con un bind apuntando a la clase misma */
    this.kmInput = document.getElementById("kmInput");
    this.kmValueInput = document.getElementById("kmValueInput");
    this.kmInput.addEventListener("input", this.handleKmInputChange.bind(this));
    this.kmValueInput.addEventListener(
      "input",
      this.handleKmValueInputChange.bind(this)
    );
    this.kmValue = this.kmInput.value;
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
  /* Con el event lisener que hay en constructor cuando cambie el selector de brand */
  async handleBrandSelection(event) {
    /* Guardamos en una variable la id "value" haciendo target a la opcion que esta siendo seleccionada */
    const selectedBrandId = event.target.value;
    /* Limpiamos el selector de modelos cada vez que seleccionemos otra marca esperamos al fetch y rellenamos la seccion con los nuevos modelosa */
    this.clearModelSelector();
    const modelList = await this.newFetch.getModel(selectedBrandId);
    this.fillModelSelector(modelList);
  }
  /* Cuando recibamos la lista de modelos por cada uno */
  fillModelSelector(modelList) {
    modelList.forEach((model) => {
      const option = document.createElement("option");
      option.value = model.id;
      option.textContent = `${model.name} / ${model.year}`;
      this.modelSelector.appendChild(option);
    });
  }
  /* Cuando selecionas un modelo se hace un fetch para sacar una estimacion de co2 y pegarla en el tag p */
  handleModelSelection(event) {
    const selectedModelId = event.target.value;

    this.newFetch
      .getEstimates(selectedModelId, this.kmValue)
      .then((emissions) => {
        this.emissionsResult.textContent = emissions + "kg";
      })
      .catch((err) => {
        console.error(err);
      });
  }
  /* Mientras que en el modelSelector tengamos opciones elimina opciones */
  clearModelSelector() {
    while (this.modelSelector.firstChild) {
      this.modelSelector.removeChild(this.modelSelector.firstChild);
    }
  }
  /* actualiza el valor de kmInput cuando el event lisener del contructor recive un input luego actualiza el valor de kmValueInput */
  handleKmInputChange() {
    this.kmValue = this.kmInput.value;
    this.kmValueInput.value = this.kmValue;
  }
  /* actualiza el valor de kmValueInput cuando el event lisener del contructor recive un input luego actualiza el valor de kmInput */
  handleKmValueInputChange() {
    this.kmValue = this.kmValueInput.value;
    this.kmInput.value = this.kmValue;
  }
}
export default FormCreate;