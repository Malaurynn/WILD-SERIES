import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Program = {
  id: number;
  name: string;
};

class ProgramRepository {
  async readAll() {
    // Execute the SQL SELECT query to retrieve all categories from the "Program" table
    const [rows] = await databaseClient.query<Rows>("select * from Program");

    // Return the array of categories
    return rows as Program[];
  }
}

export default new ProgramRepository();
