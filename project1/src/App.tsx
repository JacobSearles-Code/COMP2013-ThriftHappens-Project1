import ThriftHappens from "./Components/ThriftHappens.tsx";
import './styles.css'
import {products} from './Data/data.ts'

function App() {
  return (
    <>
      <ThriftHappens data={products}/>
    </>
  )
}

export default App
