import React from 'react';
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

const todos: Todo[] = [{ id: 1, name: "Wäsche waschen", erstellt: "heute", ende: 1200, gruppe: "Haushalt", prio: 0, fertig: false, delete: false },
{ id: 2, name: "Mit dem Hung raus gehen", erstellt: "heute", ende: 1315, gruppe: "Egal", prio: 2, fertig: true, delete: false }
]

function App() {
  return (
    <body>
      <div className="App">
        <div className="titel">
          <h1>ToDo - Liste</h1>
        </div>
        <div>
          <div className="split liste">
            <table>
              <tr>
                <th>To-DO</th>
                <th>Fertig</th>
              </tr>
              <tr>
                {
                  todos.map((value) => <tr>
                    <td> {value.name}</td>
                    <td> {value.fertig.toString()}</td>
                  </tr>)
                }
              </tr>
            </table>
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
    </body >
  );
}

export default App;