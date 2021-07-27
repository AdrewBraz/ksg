export default async (db, config, str) => {
  let connection;

  try {
    connection = await db.getConnection(config);
    const result = await connection.execute(
      str,
    );
    console.log(result.rows.length);
    return result.rows;
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
};
