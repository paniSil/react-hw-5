import axios from 'axios'

const API_URL = 'https://jsonplaceholder.typicode.com/albums'

const DataFetcher = async (userId: number) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    const response = await axios.get(`${API_URL}?userId=${userId}`)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Error fetching data: ${error.message}`)
    } else {
      throw new Error(`Unknown error: ${error}`)
    }
  }
}

export default DataFetcher
