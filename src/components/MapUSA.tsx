import { USAMap } from "@mirawision/usa-map-react"
import { useAppDispatch, useAppSelector } from "../store/store"
import { useEffect } from "react"
import { fetchColors } from "../store/slices/colorsSlice"

const MapUSA = () => {
  const custom = useAppSelector(s => s.colors.colors)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchColors())
  },[])


  return (
    <div>
      <USAMap customStates={custom}/>
    </div>
  )
}

export default MapUSA

