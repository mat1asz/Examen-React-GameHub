import { Fragment } from "react";
import { useGames } from "../hooks/useGames.js";
import { GameCard } from "../components/GameCard.jsx";

function agrupar(lista, campo) {
  const nombres = [...new Set(lista.map((x) => x[campo]))].sort();
  return nombres.map((nombre) => [
    nombre,
    lista.filter((x) => x[campo] === nombre),
  ]);
}

export function HomePage() {
  const { datos, loading, error } = useGames();

  if (loading) {
    return (
      <article className="container loading">
        <div className="loader"></div>
      </article>
    );
  }

  if (error) {
    return (
      <div className="error">
        <h1>Error al cargar los datos</h1>
        <p>{error.message}</p>
      </div>
    );
  }

  const grupos = Object.entries(datos || {});
  const conDatos = grupos.filter(([, items]) => items.length > 0);
  if (conDatos.length === 0) {
    return (
      <div className="error">
        <p>No hay datos para mostrar.</p>
      </div>
    );
  }

  return (
    <>
      <div className="container">
        {conDatos.map(([grupo, items]) => {
          const tarjetas = items.map((x) => (
            <GameCard key={x.id} juego={x} grupo={grupo} />
          ));
          return (
            <Fragment key={grupo}>
              <article className="categoria">
                <h2>🎮 {grupo}</h2>
                <div className="clases-grid" >{tarjetas}</div>
              </article>
              <section>
                <h2>{grupo}</h2>
                <div>{tarjetas}</div>
              </section>
            </Fragment>
          );
        })}
      </div>
    </>
  );
}
