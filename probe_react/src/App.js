import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts()
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get()
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello World!</h1>
      </header>
    </div>
  );
}

export default App;
