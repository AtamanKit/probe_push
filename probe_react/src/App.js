import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

import AddProduct from './components/addProduct';

function App() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/store/categories/');
      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/store/products');
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div
          style={{
            display: 'flex',
          }}
        >
          {
            categories.map(category =>
              <div
                key={category.id}
                style={{
                  margin: '0 2em 0 2em',
                  textAlign: 'left',
                }}
              >
                <h3>{category.name}</h3>
                {
                  products.map(product =>
                    <p
                      key={product.id}
                      style={{
                        margin: '0 0 0 .5em',
                        fontSize: '18px'
                      }}
                    >
                      {category.id === product.category_id ? product.name : ''}
                    </p>
                  )
                }
              </div>
            )
          }
        </div>
        <AddProduct />
      </header>
    </div>
  );
}

export default App;
