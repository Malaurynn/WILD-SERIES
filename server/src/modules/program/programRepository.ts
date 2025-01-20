import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Program = {
  id: number;
  name: string;
};

class ProgramRepository {

  async create(program: Omit<Program, "id">) {
    // Execute the SQL INSERT query to add a new program to the "program" table
    const [result] = await databaseClient.query<Result>(
      "insert into program (name) values (?)",
      [program.name],
    );
  
    // Return the ID of the newly inserted item
    return result.insertId;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all programs from the "Program" table
    const [rows] = await databaseClient.query<Rows>("select * from Program");

    // Return the array of programs
    return rows as Program[];
  }

  async update(program: Program) {
    // Execute the SQL UPDATE query to update an existing program in the "program" table
    const [result] = await databaseClient.query<Result>(
      "update program set name = ? where id = ?",
      [program.name, program.id],
    );
  
    // Return how many rows were affected
    return result.affectedRows;
  }
  async delete(id: number) {
    // Execute the SQL DELETE query to delete an existing program from the "program" table
    const [result] = await databaseClient.query<Result>(
      "delete from program where id = ?",
      [id],
    );
  
    // Return how many rows were affected
    return result.affectedRows;
  }
}

export default new ProgramRepository();
