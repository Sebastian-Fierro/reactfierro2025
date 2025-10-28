import React, { Fragment, useEffect, useRef, useState } from "react";
import "../css/bootstrap.min.css";
import {db} from "../firebaseConfig.js";
import {collection, onSnapshot, addDoc} from "firebase/firestore";

export function Usuario(){
    const [usuarios, setUsuarios] = useState([]);
    const [nuevoUsuario, setNuevoUsuario] = useState("");

    useEffect(() => {
        const usuariosRef = collection(db, "usuarios");
        const unsuscribe = onSnapshot(usuariosRef, (snapshot) => {
            const lista = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setUsuarios(lista);
        });
        return () => unsuscribe();
    }, []);

    const agregarUsuario = async () => {
        if (nuevoUsuario.trim() === "") return;
        await addDoc(collection(db, "usuarios"), {nombre: nuevoUsuario});
        setNuevoUsuario("");
        alert("Usuario agregado con éxito");
    };

    return(
        <Fragment>
            <div className="container">
                <h1 style={{textAlign: "center"}}>Lista de usuarios</h1>
                <hr/>
                <div className="input-group">
                    <input
                        value={nuevoUsuario}
                        onChange={e => setNuevoUsuario(e.target.value)}
                        className="form-control"
                        type="text"
                        placeholder="Ingrese nombre del usuario"></input>
                    <button onClick={agregarUsuario} className="btn btn-success">+</button>
                </div>
                <ul className="list-group mt-2">
                    {usuarios.map((usuario) => (
                        <li key={usuario.id} className="list-group-item">{usuario.nombre}</li>
                    ))}
                </ul>
            </div>
        </Fragment>
    )
}