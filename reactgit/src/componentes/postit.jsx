import "../css/style.css";

export function Postit({ props: post, funcionEliminar }) {
    return(
        <li className="post-it">
                <div>
                    <button onClick={() => funcionEliminar(post.id)} className="btn-close btn-close position-absolute top-0 end-0 m-2"></button>
                    <h2>{post.titulo}</h2>
                    <p>{post.descripcion}</p>
                </div>
            </li>
    )
}