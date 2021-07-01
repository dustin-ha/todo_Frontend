import React, { KeyboardEvent, useEffect, useState } from 'react';
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
  const [todos, setTodos] = useState<Todo[]>([])
  const [Xname, setName] = useState('')
  const [Xgruppe, setGruppe] = useState('')
  const [editingTodo, setEditingTodo] = useState <Todo["id"] | null>(null)
  const [Xprio, setPrio] = useState('')
  const [Xende, setEnde] = useState('')
  const [Xsort, setSor] = useState('')
  const [Xricht, setRicht] = useState('')
  const [editName, setEditName] = useState('')
  const [editGruppe, setEditGruppe] = useState('')
  const [editPrio, setEditPrio] = useState('')
  const [editEnde, setEditEnde] = useState('')

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

  const deleteFinished = (id: Todo["id"]) => async (): Promise<void> =>{
    await fetch(`http://localhost:3330/edit?id=${editingTodo}&fertig=${false}`, { method: "PATCH" });
    loadTodos()
  }

  const deleteTodo = (id: Todo["id"]) => async (): Promise<void> => {
    await fetch(`http://localhost:3330/delete?id=${id}`, { method: "DELETE" });
    loadTodos();
  };

  const editTodo = (id: Todo["id"]) => async (): Promise<void> => {
    setEditingTodo(id)
    setEditName(todos[id].name)
    setEditGruppe(todos[id].name)
    setEditEnde(todos[id].name)
    setEditPrio(todos[id].name)
  }

  const sendEditTodo = async (event: KeyboardEvent<HTMLInputElement>) => {
    if(event.key === "Enter"){
      await fetch(`http://localhost:3330/edit?id=${editingTodo}&name=${editName}&gruppe=${editGruppe}&prio=${editPrio}&ende=${editEnde}`, { method: "PATCH" });
      setEditingTodo(null)
      setEditName("")
      setEditGruppe("")
      setEditEnde("")
      setEditPrio("")
      loadTodos()
    }
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
                      <td onDoubleClick={editTodo(value.id)}> {editingTodo ===  value.id ? <input onKeyPress={sendEditTodo} onChange={event => setEditName(event.target.value)} type="text" id="editName" name="editName" placeholder={value.name}/> : value.name}</td>
                      <td onDoubleClick={editTodo(value.id)}> {editingTodo ===  value.id ? <input onKeyPress={sendEditTodo} onChange={event => setEditGruppe(event.target.value)} type="text" id="editGruppe" name="editGruppe" placeholder={value.gruppe}/> : value.gruppe}</td>
                      <td onDoubleClick={editTodo(value.id)}> {editingTodo ===  value.id ? <input onKeyPress={sendEditTodo} onChange={event => setEditPrio(event.target.value)} type="number" id="editPrio" name="editPrio" placeholder={value.prio?.toString()}/> : value.prio}</td>
                      <td onDoubleClick={editTodo(value.id)}> {editingTodo ===  value.id ? <input onKeyPress={sendEditTodo} onChange={event => setEditEnde(event.target.value)} type="number" id="editEnde" name="editEnde" placeholder={value.ende?.toString()}/> : value.ende}</td>
                      <td  onDoubleClick={editTodo(value.id)}> {value.erstellt.toString()}</td>
                      <td onDoubleClick={deleteFinished(value.id)}> {value.fertig ? <>&#9745;</> : <button onClick={createMarkFinished(value.id)}>Fertig</button>}</td>
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
