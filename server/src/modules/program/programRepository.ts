import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Program = {
  id: number;
  title: string;
  synopsis: string;
  poster: string;
  country: string;
  year: number;
  category_id: number;
};

class ProgramRepository {
  async create(program: Omit<Program, "id">) {
    const [result] = await databaseClient.query<Result>(
      "insert into program (title , synopsis , poster , country , year , category_id) values (? , ? , ? , ? , ? , ?)",
      [program.title , program.synopsis , program.poster , program.country , program.year , program.category_id],
    );
    return result.insertId;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>("select * from Program");
    return rows as Program[];
  }

  async update(program: Program) {
    const [result] = await databaseClient.query<Result>(
      "update program set title = ? , synopsis = ? , poster = ? , country = ? , year = ? , category_id = ? where id = ?",
      [program.title, program.synopsis , program.poster , program.country , program.year , program.category_id , program.id],
    );
    return result.affectedRows;
  }

  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "delete from program where id = ?",
      [id],
    );
    return result.affectedRows;
  }
}

export default new ProgramRepository();
