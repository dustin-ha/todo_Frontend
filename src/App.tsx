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

  const createMarkFinished = (id: Todo["id"]) => async (): Promise<void> => {
    await fetch(`http://localhost:3330/fertig?id=${id}`, { method: "GET" });
    loadTodos();
  };

  const erstellen = (name: HTMLElement | null, gruppe: HTMLElement | null, prio: HTMLElement | null, ende: HTMLElement | null) => async (): Promise<void> => {
    await fetch(`http://localhost:3330/new?name=${name}gruppe=${gruppe}prio=${prio}ende=${ende}`, { method: "POST" });
    loadTodos();
  };

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
                    <th>Gruppe</th>
                    <th>Priorität</th>
                    <th>Endzeit</th>
                    <th>Erstellt</th>
                    <th>Fertig</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    todos.map((value) => <tr key={value.id}>
                      <td> {value.name}</td>
                      <td> {value.gruppe.toString()}</td>
                      <td> {value.prio.toString()}</td>
                      <td> {value.ende.toString()}</td>
                      <td> {value.erstellt.toString()}</td>
                      <td> {value.fertig ? <>&#9745;</> : <button onClick={createMarkFinished(value.id)}>Fertig</button>}</td>
                    </tr>)}
                </tbody>
              </table>
          }
        </div>
      </div>
      <div>
        <div className="split eingabe">
          <h4>Neu erstellen</h4> <br />
          <div className="Parameter">
            <label htmlFor="name"> Name:</label><br />
            <input className="input" type="text" id="name" name="name" placeholder="Aufgabe" />
            <br /><br />
            <label htmlFor="gruppe">Gruppe:</label><br />
            <input className="input" type="text" id="gruppe" name="gruppe" placeholder="Standard" />
            <br /><br />
            <label htmlFor="datum">Datum</label><br />
            <input className="input" type="text" id="Datum" name="datum" placeholder="DD/MM" />
            <br /><br />
            <label htmlFor="prio">Priorität:</label><br />
            <select className="submit" id="prio" name="Prio">
              <option value="0">Geringe Priorität</option>
              <option value="1">Normale Priorität</option>
              <option value="2">Hohe Priorität</option>
              <option value="3">Sehr hohe Priorität</option>
            </select>
            <br /><br />
          </div>
          <div>
            <input onClick={erstellen(document.getElementById("name"), document.getElementById("gruppe"),document.getElementById("prio"),document.getElementById("ende"))} className="submit" type="submit" value="Erstellen" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
