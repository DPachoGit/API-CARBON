import apiKey from './apiKey.js'

class FetchFromApi {
    /* Guarda toda la información del fetch */
    constructor() {
      
    }
    /* Hace fetch */
    async getEstimates() {
        try {
            let response = await fetch("https://www.carboninterface.com/api/v1/estimates", {
            method: "POST",
            headers: {
                Authorization: apiKey,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                type: "vehicle",
                distance_unit: "km",
                distance_value: 100,
                vehicle_model_id: "7268a9b7-17e8-4c8d-acca-57059252afe9",
            }),
            });
            let data = await response.json();
            console.log(data)
            return data;
        } catch (err) {
            console.error(err);
            return null;
        }
        }
        /* Ejecuta todoslos metodos en la clase para crear la informacion necesaria en el constructor */
        async orderCalls() {
        await this.getEstimates();
    }
}

const qwer = new FetchFromApi();
qwer.orderCalls();