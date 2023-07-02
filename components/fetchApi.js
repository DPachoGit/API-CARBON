import apiKey from "./apiKey.js";

class FetchFromApi {
  /* Guarda toda la información de los fetch */
  constructor() {
    this.brand = [];
    this.models = [];
    this.emisions = "";
  }
  /* Hace fetch para guardar todos las marcas en brand */
  async getBrand() {
    try {
      let response = await fetch(
        "https://www.carboninterface.com/api/v1/vehicle_makes",
        {
          method: "GET",
          headers: {
            Authorization: apiKey,
            "Content-Type": "application/json",
          },
        }
      );
      let data = await response.json();

      // Guardar los nombres y los IDs de las marcas de vehículos en this.brand
      data.forEach((item) => {
        const id = item.data.id;
        const name = item.data.attributes.name;
        this.brand.push({ id, name });
      });
      return this.brand;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
  /* Hace fetch para guardar todos los modelos */
  async getModel(id) {
    try {
      let response = await fetch(
        `https://www.carboninterface.com/api/v1/vehicle_makes/${id}/vehicle_models`,
        {
          method: "GET",
          headers: {
            Authorization: apiKey,
            "Content-Type": "application/json",
          },
        }
      );
      let data = await response.json();

      // Guardar los nombres y los IDs de las marcas de vehículos en this.brand
      data.forEach((item) => {
        const id = item.data.id;
        const name = item.data.attributes.name;
        const year = item.data.attributes.year;
        this.models.push({ id, name, year });
      });

      console.log(this.models);
      return this.models;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
  /* Hace fetch para consegir la cantidad de emisiones */
  async getEstimates(id, km) {
    try {
      let response = await fetch(
        "https://www.carboninterface.com/api/v1/estimates",
        {
          method: "POST",
          headers: {
            Authorization: apiKey,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: "vehicle",
            distance_unit: "km",
            distance_value: km,
            vehicle_model_id: id,
          }),
        }
      );
      let data = await response.json();
      this.emisions = data.data.attributes.carbon_kg;
      return this.emisions;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}
export default FetchFromApi;