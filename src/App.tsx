import React from 'react';
import './App.css';

function App() {
  const variable: number[]= [1,2,3,4,5];
  return (
    <body>
      <div className="App">
        <div className="titel">
          <h1>ToDo - Liste</h1>
        </div>
        <div>
          <div className="split liste">
            <p>Todos</p>
            <div className="split todos">
              <p>Namen</p>
              <ul>
                { 
                 variable.map((value) => <li> {value}</li>)
                }
              </ul>
            </div>
            <div className="split fertig">
              <p>Fertig</p>
            </div>
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