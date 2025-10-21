import React, { Fragment, useRef, useState } from "react";
import { v4 as uuid } from 'uuid';
import { Postit } from "./postit";
import "../css/style.css";

export function Pizarra() {

    const [listadoPostits, setPostit] = useState([]);

    const titulo = useRef();
    const descripcion = useRef();

    const agregarPostit = () => {
        const tituloTexto = titulo.current.value;
        const descripcionTexto = descripcion.current.value;
        setPostit((prevPostits) => {
            const nuevoPostit = {
                id: uuid(),
                titulo: tituloTexto,
                descripcion: descripcionTexto
            }

            titulo.current.value = "";
            descripcion.current.value = "";
            return [...prevPostits, nuevoPostit];
        });
    };

    const eliminarPostit = (id) => {
        setPostit((prevPostits) => {
            return prevPostits.filter((postitActual) => postitActual.id !== id);
        });
    };

    return (
        <Fragment>
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <h1>Post It Simulator!</h1>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-3">
                        <input ref={titulo} className="form-control" type="text" placeholder="Título"></input>
                    </div>
                    <div className="col-md-4">
                        <input ref={descripcion} className="form-control" type="text" placeholder="Descripción"></input>
                    </div>
                    <div className="col-md-2">
                        <button onClick={agregarPostit} className="btn btn-dark" type="button">AGREGAR</button>
                    </div>
                </div>

            </div>
            <ul>
                {listadoPostits.map((postitActual) => (
                    <Postit
                        props={postitActual}
                        key={postitActual.id}
                        funcionEliminar={eliminarPostit}
                    ></Postit>
                ))}
            </ul>
        </Fragment>
    )
}
