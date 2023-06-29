import FetchFromApi from "./fetchApi.js";

class FormCreate {
  /* Creo una instancia de la clase FetchFromApi() */
  constructor() {
    this.newFetch = new FetchFromApi();
    this.brandSelector = document.getElementById("brandSelector");
    this.modelSelector = document.getElementById("modelSelector");
    this.brandSelector.addEventListener("change", this.handleBrandSelection.bind(this));
    this.modelSelector.addEventListener("change", this.handleModelSelection.bind(this));
    this.emissionsResult = document.getElementById("emissionsResult");
    this.kmInput = document.getElementById("kmInput");
    this.kmValue = document.getElementById("kmValue");
    this.kmInput.addEventListener("input", this.handleKmInput.bind(this));
  }

  async createBrands() {
    const brandList = await this.newFetch.getBrand();

    brandList.forEach((brand) => {
      const option = document.createElement("option");
      option.value = brand.id;
      option.textContent = brand.name;
      this.brandSelector.appendChild(option);
    });
  }

  async handleBrandSelection(event) {
    const selectedBrandId = event.target.value;

    // Limpiar la lista de modelos antes de llenarla nuevamente
    this.clearModelSelector();

    // Hacer el fetch de los modelos usando el ID de la marca seleccionada
    const modelList = await this.newFetch.getModel(selectedBrandId);

    // Llamar al método para rellenar el selector de modelos
    this.fillModelSelector(modelList);
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
}

export default FormCreate;
