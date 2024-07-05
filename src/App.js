import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const baseURL = 'https://csc-31800-homework-3.vercel.app/';

function App() {
  const [items, setItems] = useState([]);
  const [newItemName, setNewItemName] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/items`);
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const addItem = async () => {
    if (newItemName.trim() === '') {
      alert('Item name cannot be empty');
      return;
    }
    try {
      const response = await axios.post(`${baseURL}/api/items`, {
        name: newItemName,
        quantity: 1,
      });
      setNewItemName('');
      fetchItems();
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`${baseURL}/api/items/${id}`);
      fetchItems();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div className="container">
      <h1>Items</h1>
      <input
        type="text"
        value={newItemName}
        onChange={(e) => setNewItemName(e.target.value)}
        placeholder="Add a new item"
      />
      <button onClick={addItem}>Add Item</button>
      <ul>
        {items.map((item) => (
          <li key={item._id}>
            {item.name} (Quantity: {item.quantity})
            <button onClick={() => deleteItem(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <div className="description">
        <p>
          This simple application allows you to manage a list of items. You can add new items to the list,
          view all existing items, and delete items you no longer need. The frontend is built with React,
          and it interacts with a RESTful API created with Express.js running on a Node.js server.
        </p>
      </div>
      <ul>
        <li>
          <strong>Get Items:</strong>
          <ul>
            <li>Method: GET</li>
            <li>URL: {`${baseURL}/api/items`}</li>
          </ul>
        </li>
        <li>
          <strong>Create Item:</strong>
          <ul>
            <li>Method: POST</li>
            <li>URL: {`${baseURL}/api/items`}</li>
            <li>Sample Body:
              <pre>
                {`{
  "name": "Sample Item",
  "quantity": 10
}`}
              </pre>
            </li>
          </ul>
        </li>
        <li>
          <strong>Update Item:</strong>
          <ul>
            <li>Method: PUT</li>
            <li>URL: {`${baseURL}/api/items/{_id}`}</li>
            <li>Sample Body:
              <pre>
                {`{
  "name": "Updated Item",
  "quantity": 5
}`}
              </pre>
            </li>
          </ul>
        </li>
        <li>
          <strong>Delete Item:</strong>
          <ul>
            <li>Method: DELETE</li>
            <li>URL: {`${baseURL}/api/items/{_id}`}</li>
          </ul>
        </li>
      </ul>
    </div>
  );
}

export default App;
