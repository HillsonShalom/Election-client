import { useEffect } from 'react'
import './App.css'
import { useAppDispatch, useAppSelector } from './store/store'
import { fetchStates } from './store/slices/stateSlice'

function App() {
  // const states = useAppSelector(s => s.states.state)
  // const dispatch = useAppDispatch()
  // useEffect(()=> {
  //   dispatch(fetchStates())
  // }, [])

  return (
    <>
      <h1>Hello States</h1>
    </>
  )
}

export default App
