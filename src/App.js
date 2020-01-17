import React, { useState, useEffect } from "react";
import axios from "axios";

import "./App.css";

/*
ASSIGNMENT:
* Allow the user to enter, save, or change the`id` used for the program
* Display the current balance for that user
* Display a list of all transactions for this user, including sender and recipient
*/

function App() {
  const [chain, setChain] = useState();
  const [userId, setUserId] = useState(`tania-keller\n`);
  let transactions = []; // Create new array: `transactions`
  // Map over chain and push transactions to new array: `transactions`
  chain && chain.map(block => transactions.push(block.transactions));
  console.log("transactions: ", transactions);
  let count = 0; // Initiate count at 0
  if (transactions.length > 0) {
    // If new array is empty(starts off empty):
    transactions.map(object => {
      // Map over it
      console.log("trans map: ", object);
      if (object.length > 0) {
        // Want to skip empty genesis blocks (length=0)
        object.map(el => {
          // Map over the array with the objects
          console.log("obj map: ", el);
          // If userId we have in state matches recipient's id:
          if (userId == el.recipient) {
            console.log("after obj map");
            count += el.amount; // Add amount to count
          }
        });
        return count;
      }
    });
  }

  useEffect(() => {
    axios
      .get("http://localhost:5000/chain") // Getting chain from server
      .then(res => {
        console.log("chain: ", res, res.data, res.data.chain);
        setChain(res.data.chain); // Set state of chain
      })
      .catch(err => {
        console.log("error: ", err);
      });
  }, []);

  const handleSubmit = event => {
    event.preventDefault();
  };

  const handleChange = event => {
    console.log("target value: ", event.target.value);
    console.log("target name: ", event.target.name);
    setUserId(event.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>You currently have: {count} coins.</p>
        <h3>Change ID:</h3>
        <form onSubmit={event => handleSubmit(event)}>
          <input
            label="id"
            name="id"
            type="text"
            value={userId}
            onChange={event => handleChange(event)}
          />
        </form>
      </header>
    </div>
  );
}

export default App;
