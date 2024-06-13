import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import './App.css'
import {Main} from "./pages/main/Main";
import {Login} from "./pages/Login";
import {Navbar} from "./components/navbar/Navbar";
import {CreateMyRecipes} from "./pages/createMyRecipes/CreateMyRecipes";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Navbar/>
                <Routes>
                    <Route path="/" element={<Main/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/myRecipes" element={<CreateMyRecipes/>}/>
                </Routes>
            </BrowserRouter>

        </div>
    );
}

export default App;
