import db from "#db/client";
import { faker } from "@faker-js/faker"

import { createTask } from "#db/queries/tasks";
import { createUser } from "#db/queries/users";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  for (let i = 1; i <= 3; i++) {
    const username = faker.internet.username();
    const password = faker.internet.password();
    await createUser(username, password);
  }
  for (let i = 1; i < 7; i++) {
    const title = faker.lorem.sentence({ min:2, max: 5 });
    const done = faker.datatype.boolean();
    const userId = faker.number.int({ min: 1, max: 3 });
    await createTask(title, done, userId);
  }
}
