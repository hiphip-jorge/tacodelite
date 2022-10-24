import { PrismaClient } from "@prisma/client";
import fetch from "node-fetch";
const db = new PrismaClient();

type menuItem = {
    id: number;
    title: string;
    description: string;
    price: string;
    category: string;
    image: string;
    alt: string;
    active: boolean;
  };

async function seed() {
    const food:any = await fetch(
        "https://tacodelite.herokuapp.com/products/"
      ).then((res) => res.json()
      ).then((res) => res.sort((a:menuItem,b:menuItem) => a.id - b.id)
      ).then((res) => res.map(({image, category, ...rest}) => {
        return rest;
    })).then((res) => res.map(old => {
            return {id: old.id, name: old.title, description: old.description, price: old.price, alt: old.alt, active: old.active};
        })
    )

    console.log('food :>> ', food);
    
    await Promise.all(food.map((item) => db.foodItem.create({ data: item})));
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
        {name: "Breakfast", foodItems: []},
        {name: "Tacos", foodItems: []},
        {name: "Burritos", foodItems: []},
        {name: "Nachos", foodItems: []},
        {name: "Salads", foodItems: []},
        {name: "Quesadillas", foodItems: []},
        {name: "Tostadas", foodItems: []},
        {name: "Sides", foodItems: []},
        {name: "Extras", foodItems: []},
        {name: "Chips-n-Stuff", foodItems: []},
        {name: "Dinners", foodItems: []},
        {name: "Family", foodItems: []},
        {name: "Desserts", foodItems: []},
        {name: "Drinks", foodItems: []},
    ]
}