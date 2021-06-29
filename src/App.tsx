import React, { useEffect, useState } from 'react';
import './App.css';

//variable.map((value) => <li> {value}</li>)

interface Todo {
  id: number;
  name: string;
  erstellt: string;
  ende: number;
  gruppe: string;
  prio: number;  //0 bis 3
  fertig: boolean;
  delete: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[] | null>(null)

  async function loadTodos() {
    const requestOptions = {
      method: 'GET'
    };
    const response = await fetch("http://localhost:3330/", requestOptions)
    const resTodos = await response.json()
    setTodos(resTodos);
  }

  useEffect(() => {
    if (!todos) {
      loadTodos()
    }
  }, [todos])

  return (
    <div className="App">
      <div className="titel">
        <h1>ToDo - Liste</h1>
      </div>
      <div>
        <div className="split liste">
          {
            !todos ? <div>Lade Daten</div> :
              <table>
                <thead>
                  <tr>
                    <th>To-Do</th>
                    <th>Fertig</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    todos.map((value) => <tr key={value.id}>
                      <td> {value.name}</td>
                      <td> {value.id.toString()}</td>
                    </tr>)}
                </tbody>
              </table>
          }
        </div>
      </div>
      <div>
        <div className="split eingabe">
          <h4>Neu erstellen</h4> <br></br>
          <div className="Parameter">
            <label htmlFor="fname"> Name:</label><br></br>
            <input className="input" type="text" id="fname" name="name" placeholder="Aufgabe"></input>
            <br></br><br></br>
            <label htmlFor="lname">Gruppe:</label><br></br>
            <input className="input" type="text" id="lname" name="gruppe" placeholder="Standard"></input>
            <br></br><br></br>
            <label htmlFor="lname">Datum</label><br></br>
            <input className="input" type="text" id="lname" name="datum" placeholder="DD/MM"></input>
            <br></br><br></br>
            <label htmlFor="country">Priorität:</label><br></br>
            <select className="submit" id="country" name="Prio">
              <option value="0">Geringe Priorität</option>
              <option value="1">Normale Priorität</option>
              <option value="2">Hohe Priorität</option>
              <option value="3">Sehr hohe Priorität</option>
            </select>
            <br></br><br></br>
          </div>
          <div>
            <input className="submit" type="submit" value="Erstellen"></input>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;