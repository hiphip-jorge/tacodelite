// neat/useful commands: 
//   - npx prisma studio: allows you to see db in prisma app

import { PrismaClient } from "@prisma/client";
import fetch from "node-fetch";
const db = new PrismaClient();
import tacodelite from './tacodelite.menu.json'

// type foodItem = {
//   id: number;
//   title: string;
//   description: string;
//   price: string;
//   category: string;
//   image: string;
//   alt: string;
//   active: boolean;
// };

async function seed() {    
  await Promise.all(
    [...getUsers().map((user) => {
      return db.user.create({ data: user });
    }), ...getAnnouncement().map((announcement) => {
      return db.announcement.create({ data: announcement });
    }), ...tacodelite.foodItems.map((foodItem) => {
      return db.foodItem.create({data: foodItem})
    }), ...getCategory().map((category) => {
      return db.category.create({data: category})
    })]
  );
}

seed();

function getUsers() {
  return [
   {name: "Javier Garcia", password: 'tacoDManager89!', email: 'tacodelitewestplano@gmail.com'},
   {name: "Jorge Perez", password: 'here4support*', email: 'jorgeperez.dev@gmail.com'}
  ];
}

function getCategory() {
    return [
        {name: "Breakfast", foodItems: {}},
        {name: "Tacos", foodItems: {}},
        {name: "Burritos", foodItems: {}},
        {name: "Nachos", foodItems: {}},
        {name: "Salads", foodItems: {}},
        {name: "Quesadillas", foodItems: {}},
        {name: "Tostadas", foodItems: {}},
        {name: "Sides", foodItems: {}},
        {name: "Extras", foodItems: {}},
        {name: "Chips-n-Stuff", foodItems: {}},
        {name: "Dinners", foodItems: {}},
        {name: "Family", foodItems: {}},
        {name: "Desserts", foodItems: {}},
        {name: "Drinks", foodItems: {}},
    ]
}

function getAnnouncement() {
  return [
    {startDate: new Date(),
      endDate:  new Date('January 30, 2023'),
      message: "First Announcement of Taco Delite",
    }
  ]
}

