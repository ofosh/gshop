import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Store from "./components/pages/Store";
import Navbar from "./components/Navbar";
import { ShoppingCartProvider } from "./components/context/UseShoppingCart";

function App() {

  return (
    <ShoppingCartProvider>
      <Navbar/>
      <Container className="mb-4">
        <Routes>
         
          <Route path="/" element={<Store/>}/>
          
        </Routes>
      </Container>
    </ShoppingCartProvider>
    
  )
}

export default App
