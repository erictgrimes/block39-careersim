import db from "#db/client";


export async function createTask(title, done, userId) {
  const sql = `
    INSERT INTO tasks(title, done, user_id)
    values ($1, $2, $3)
    RETURNING *`;
  const {
    rows: [task],
  } = await db.query(sql, [title, done, userId]);
  return task;
}

export async function getTasks(userId) {
  const sql = `
    SELECT * FROM tasks
    WHERE user_id = $1`;
  const { rows: tasks } = await db.query(sql, [userId]);
  return tasks;
}

export async function getTasksByUserId(userId) {
    const sql = `
    SELECT * FROM tasks
    WHERE user_id = $1`;
    const {
        rows: [tasks],
    } = await db.query(sql, [userId]);
    return tasks;
}