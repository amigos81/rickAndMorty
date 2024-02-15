import { useState, useEffect, useRef } from 'react'
import './App.css'
import useFetch from './hooks/useFetch'
import LocationCard from './components/LocationCard'
import ResidentCard from './components/Residentcard'
import Pagination from './components/pagination'

function App() {
  const [location, getLocation, isLoading, hasError] = useFetch()
  const [finder, setFinder] = useState(Math.floor(Math.random() * 126 + 1))
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // const randomLocation = Math.floor(Math.random() * 126 + 1)
    const url = 'https://rickandmortyapi.com/api/location/' + finder
    getLocation(url)
    // console.log(url)
  }, [finder])

  const textInput = useRef()

  const handleSubmit = event => {
    event.preventDefault()
    setFinder(textInput.current.value.trim())
  }

  const quantity = 5
  const second = currentPage * quantity
  const first = second - quantity

  const residentsPart = location && location.residents.slice(first, second)
  const totalPages = location && Math.floor(location.residents.length / quantity) + 1

  return (
    <div className='app'>
      <figure>
        <img src="/image/banner.jpg" alt="" />
      </figure>
      {
        isLoading ?
          <h2>Loading...</h2>
          :
          <>
            <h1>Rick and Morty</h1>
            <form onSubmit={handleSubmit} className='app__form'>
              <input className='app__text' type="number" ref={textInput} placeholder='type a number (a to 126)' />
              <button className='app__btn'>Search</button>
            </form>
            {
              hasError || finder === '0' ?
                <h2>this location do not exist</h2>
                :
                <>
                  <LocationCard
                    location={location}
                  />
                  <Pagination
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPages={totalPages}
                  />
                  <div className='app__container'>
                    {
                      // location?.residents.map(resident => (
                      residentsPart.map(resident => (
                        <ResidentCard
                          key={resident}
                          url={resident}
                        />
                      )
                      )
                    }
                  </div>
                  <Pagination
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPages={totalPages}
                  />
                </>
            }
          </>
      }
    </div>
  )
}

export default App
