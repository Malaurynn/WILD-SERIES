import { useEffect, useState } from "react";

interface Program {
  id: number;
  title: string;
  poster: string;
}

const program = () => {
  const [programs, setPrograms] = useState<Program[]>([]); // Ajout du state

  useEffect(() => {
    fetch("http://localhost:3310/api/programs")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setPrograms(data); // Stockage des données dans le state
      });
  }, []);

  return (
    <div>
      <h1>Program</h1>
      {}
      {programs.map((program) => (
        <div key={program.id}>
          <h2>{program.title}</h2>
          <img src={program.poster} alt={program.title} />
        </div>
      ))}
    </div>
  );
};

export default program;
