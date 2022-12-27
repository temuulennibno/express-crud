const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

let cars = [
  {
    id: 0,
    model: "Prius 20",
    brand: "Toyota",
    price: 10_000_000.0,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/2/2b/2nd_Toyota_Prius.jpg",
  },
  {
    id: 1,
    model: "Prius 30",
    brand: "Toyota",
    price: 12_000_000.0,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/0/01/2009_Toyota_Prius_%28ZVW30R%29_liftback_%282011-12-06%29_01.jpg",
  },
];
let index = cars.length;

const app = express();

app.use(cors());

app.get("/api/cars", (req, res) => {
  res.send(cars);
});

app.get("/api/cars/:id", (req, res) => {
  const car = cars.filter((c) => c.id === Number(req.params.id));
  if (car.length > 0) {
    res.send(car[0]);
  } else {
    res.send("Car not found");
  }
});

app.post("/api/cars", bodyParser.json(), (req, res) => {
  const car = { id: index, ...req.body };
  index++;
  cars.push(car);
  res.send(car);
});

app.put("/api/cars", bodyParser.json(), (req, res) => {
  const { id, model, brand, price, imageUrl } = req.body;
  const index = cars.findIndex((car) => car.id === id);
  if (index === -1) {
    res.send("Car not found");
  } else {
    const car = { id, model, brand, price, imageUrl };
    cars[index] = car;
    res.send(car);
  }
});

app.delete("/api/cars", bodyParser.json(), (req, res) => {
  cars = cars.filter((car) => car.id !== Number(req.body.id));
  res.send(`Car with given id: ${req.body.id} deleted successfully`);
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on("error", console.error);
