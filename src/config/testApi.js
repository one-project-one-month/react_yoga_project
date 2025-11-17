import api from "./api.js";

export async function testBackendConnection(endpoint = "") {
  try {
    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
