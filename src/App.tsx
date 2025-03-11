import { useEffect, useState } from 'react'
import './App.css'
import { AlbumInterface } from './types/Album.interface'
import DataFetcher from './components/DataFetcher'

function App() {
  const [albums, setAlbums] = useState<AlbumInterface[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [userId, setId] = useState<number>(1)

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        setIsLoading(true)
        const data = await DataFetcher(userId)
        setAlbums(data)
      } catch (error) {
        setError((error as Error).message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchHandler()
  }, [userId])

  return (
    <>
      <h1>UseEffect() + Axios</h1>
      <button onClick={() => setId((prevId) => (userId === 1 ? prevId + 9 : prevId - 1))}>Prev</button>
      <u>Albums by user {userId}</u>
      <button onClick={() => setId((prevId) => (userId === 10 ? prevId - 9 : prevId + 1))}>Next</button>

      {isLoading && <p style={{ fontSize: '30px' }}>Loading in process...</p>}
      {error && <p style={{ fontSize: '30px', color: 'red' }}>{error}</p>}
      {!isLoading && !error && (
        <div>
          <ol>
            {albums.map((album) => (
              <li key={album.id}>{album.title}</li>
            ))}
          </ol>
        </div>
      )}
    </>
  )
}

export default App
