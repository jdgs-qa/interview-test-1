import axios from "axios";
import config from "src/config/env/local/config";
const { API_KEY } = config;

export enum UNITS {
  metric = "metric",
  imperial = "imperial",
  default = ""
}

export async function getNearbyWeather(
  lat = 52.95,
  lon = -1.15,
  count = 50,
  units: UNITS = UNITS.metric
): Promise<Record<string, any>> {
  const response: { success: boolean; body?: object[]; error?: string } = {
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
  city = "Nottingham",
  units: UNITS = UNITS.metric
): Promise<Record<string, any>> {
  const response: { success: boolean; body?: object[]; error?: string } = {
    success: false
  };

  try {
    const axiosResponse = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`
    );
    if (axiosResponse.status === 200) {
      response.success = true;
      response.body = [axiosResponse.data];
      return response;
    }
  } catch (e) {
    response.success = false;
    response.error = e;
    return response;
  }
}
