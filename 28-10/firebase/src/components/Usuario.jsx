import React, {useState, useEffect, Fragment} from "react";
import {db} from "../firebaseConfig.js";
import {collection, getDocs, addDoc, deleteDoc, doc, updateDoc, onSnapshot} from "firebase/firestore";

export function Usuario(){
    const [usuarios, setUsuarios] = useState([]);
    const [nuevoUsuario, setNuevoUsuario] = useState("");
    useEffect (()=>{
        const usuariosRef = collection (db, "usuarios");
        const unsubscribe = onSnapshot(usuariosRef, (snapshot) => {
            const lista = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setUsuarios(lista);
        });
        return () => unsubscribe();
    }, []);

    const agregarUsuario = async () => {
        if(nuevoUsuario.trim() === "") return;
        await addDoc(collection(db, "usuarios"), {nombre: nuevoUsuario});
        setNuevoUsuario("");
        alert("Usuario agregado");
    }

    return {
        <Fragment>
        <div className="container">
            <h1 style={{textAlign: "center"}}>Lista de Usuarios</h1>
            <hr/>

            <div className="input-group">
                <input
                    value={nuevoUsuario}
                    onChange={e => setNuevoUsuario(e.target.value)}
                    className="form-control"
                    type="text"
                    placeholder="Ingrese el nombre del usuario"></input>
                    <button onClick={agregarUsuario} className="btn btn-success">+</button>
            </div>
        </div>
        </Fragment>
    };
}