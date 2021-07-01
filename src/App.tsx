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
  const [Xname, setName] = useState('')
  const [Xgruppe, setGruppe] = useState('')
  const [editingTodo, setEditingTodo] = useState <Todo["id"] | null>(null)
  const [Xprio, setPrio] = useState('')
  const [Xende, setEnde] = useState('')
  const [Xsort, setSor] = useState('')
  const [Xricht, setRicht] = useState('')
  const [edit, setEdit] = useState('')

  async function loadTodos() {
    const requestOptions = {
      method: 'GET'
    };
    const response = await fetch("http://localhost:3330/?sortieren=" + Xsort + "&richtung=" + Xricht, requestOptions)
    const resTodos = await response.json()
    setTodos(resTodos);
  }

  useEffect(() => {
    if (!todos) {
      loadTodos()
    }
  }, [todos])

  const toggleDarkmode = () => async (): Promise<void> => {
    let element = document.body;
    element.classList.toggle("light-mode");
  }

  const createMarkFinished = (id: Todo["id"]) => async (): Promise<void> => {
    await fetch(`http://localhost:3330/fertig?id=${id}`, { method: "GET" });
    loadTodos();
  };

  const deleteTodo = (id: Todo["id"]) => async (): Promise<void> => {
    await fetch(`http://localhost:3330/delete?id=${id}`, { method: "DELETE" });
    loadTodos();
  };

  const editTodo = (id: Todo["id"]) => async (): Promise<void> => {
    setEditingTodo(id)
  }

  const sendEditTodo = () => async (): Promise<void> => {
    console.log("Send Update")
    setEditingTodo(0)
    loadTodos()
  }

  const erstellen = () => async (): Promise<void> => {
    await fetch("http://localhost:3330/new?name=" + Xname + "&gruppe=" + Xgruppe + "&prio=" + Xprio + "&ende=" + Xende, { method: "POST" });
    loadTodos();
  };

  return (
    <div className="App">
      <div className="titel">
        <div>
          <button className="darkmodebutton" onClick={toggleDarkmode()}> &#127774; / &#127769; </button>
        </div>
        <h1>ToDo - Liste</h1>
        <div className="splitTitel">
          <div className="sortArea">
            <br></br><br></br><br></br>
            <select className="sortierButton" onChange={event => setSor(event.target.value)} onClick={event => loadTodos()} id="SortierungDerListe" name="SortierungDerListe">
              <option value="name">ToDo-Name</option>
              <option value="gruppe">Gruppe</option>
              <option value="prio">Priorität</option>
              <option value="erstellt">Erstellt</option>
            </select>
            <select className="sortierButton" onChange={event => setRicht(event.target.value)} onClick={event => loadTodos()} id="aufAbSteigend" name="aufAbSteigend">
              <option value="auf">Aufsteigend</option>
              <option value="ab">Absteigend</option>
            </select>
          </div>
        </div>
      </div>
      <div>
        <div className="split liste">
          {
            !todos ? <div>Lade Daten</div> :
              <table>
                <thead>
                  <tr>
                    <th style={{width:"30%"}}>To-Do</th>
                    <th style={{width:"19%"}}>Gruppe</th>
                    <th style={{width:"1%"}}>Priorität</th>
                    <th style={{width:"10%"}}>Enddatum</th>
                    <th style={{width:"30%"}}>Erstellt</th>
                    <th style={{width:"5%"}}>Fertig</th>
                    <th style={{width:"5%"}}>Löschen</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    todos.map((value) => <tr key={value.id}>
                      <td onDoubleClick={editTodo(value.id)}> {editingTodo ===  value.id ? <input onDoubleClick={sendEditTodo()} onChange={event => setEdit(event.target.value)} type="text" id="editName" name="editName" placeholder={value.name}/> : value.name}</td>
                      <td> {value.gruppe.toString()}</td>
                      <td> {value.prio.toString()}</td>
                      <td> {value.ende.toString()}</td>
                      <td> {value.erstellt.toString()}</td>
                      <td> {value.fertig ? <>&#9745;</> : <button onClick={createMarkFinished(value.id)}>Fertig</button>}</td>
                      <td> {<button onClick={deleteTodo(value.id)}>Löschen</button>}</td>
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
            <input onChange={event => setName(event.target.value)} className="input" type="text" id="name" name="name" placeholder="Aufgabe" />
            <br /><br />
            <label htmlFor="gruppe">Gruppe:</label><br />
            <input onChange={event => setGruppe(event.target.value)} className="input" type="text" id="gruppe" name="gruppe" placeholder="Standard" />
            <br /><br />
            <label htmlFor="datum">Datum</label><br />
            <input onChange={event => setEnde(event.target.value)} className="input" type="text" id="Datum" name="datum" placeholder="DD/MM" />
            <br /><br />
            <label htmlFor="prio">Priorität:</label><br />
            <select onChange={event => setPrio(event.target.value)} className="submit" id="prio" name="Prio">
              <option value="0">Geringe Priorität</option>
              <option value="1">Normale Priorität</option>
              <option value="2">Hohe Priorität</option>
              <option value="3">Sehr hohe Priorität</option>
            </select>
            <br /><br />
          </div>
          <div>
            <input onClick={erstellen()} className="submit" type="submit" value="Erstellen" />
          </div>
        </div>
      </div>
    </div>

  );
}

export default App;
