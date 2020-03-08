import axios from "axios";
import config from "src/config/env/local/config";
const { API_KEY } = config;

export enum UNITS {
  metric = "metric",
  imperial = "imperial",
  default = ""
}

export async function getNearbyWeather(
  lat: number = 52.95,
  lon: number = -1.15,
  count: number = 50,
  units: UNITS = UNITS.metric
): Promise<Object> {
  let response: { success: boolean; body?: object[]; error?: string } = {
    success: false
  };

  try {
    const axiosResponse = await axios.get(
      `http://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${lon}&cnt=${count}&appid=${API_KEY}&units=${units}`
    );
    if (axiosResponse.status === 200) {
      response.success = true;
      response.body = axiosResponse.data.list;
      return response;
    }
  } catch (e) {
    response.success = false;
    response.error = e;
    return response;
  }
}

export async function getSingleCity(
  city: string = "Nottingham"
): Promise<Object> {
  let response: { success: boolean; body?: object[]; error?: string } = {
    success: false
  };

  try {
    const axiosResponse = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
    );
    if (axiosResponse.status === 200) {
      response.success = true;
      response.body = axiosResponse.data;
      return response;
    }
  } catch (e) {
    response.success = false;
    response.error = e;
    return response;
  }
}
