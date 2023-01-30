// neat/useful commands: 
//   - npx prisma studio: allows you to see db in prisma app

import { PrismaClient } from "@prisma/client";
import tacodelite from './tacodelite.menu.json'
import { getUsers, getCategory, getAnnouncement } from "./seed-utils";

const db = new PrismaClient();

async function main() {    
  await Promise.all(
    [...getUsers().map((user) => {
      return db.user.create({ data: user });
    }), ...getAnnouncement().map((announcement) => {
      return db.announcement.create({ data: announcement });
    }), ...getCategory().map((category) => {
      return db.category.create({data: category})
    }), ...tacodelite.foodItems.map((foodItem) => {
      return db.foodItem.create({data: foodItem})
    })]
  );
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })