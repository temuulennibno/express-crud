const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const shortid = require("shortid");

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
  {
    id: 2,
    model: "Prius 40",
    brand: "Toyota",
    price: 13_000_000.0,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/0/01/2009_Toyota_Prius_%28ZVW30R%29_liftback_%282011-12-06%29_01.jpg",
  },
  {
    id: 3,
    model: "Prius 41",
    brand: "Toyota",
    price: 15_000_000.0,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/0/01/2009_Toyota_Prius_%28ZVW30R%29_liftback_%282011-12-06%29_01.jpg",
  },
];
let index = cars.length;

const app = express();
app.use(bodyParser.json());
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

app.post("/api/cars", (req, res) => {
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

app.delete("/api/cars", (req, res) => {
  console.log("delete");
  cars = cars.filter((car) => car.id !== Number(req.body.id));
  res.send({ message: "Deleted" });
});

const users = [];
let usersIndex = users.length;

/**
 * Regex that must contain at least one capital and one
 * lower letter and any of this @$!%*#?&. special characters
 * and number
 */
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&.])(?=.*\d)[a-zA-Z@$!%*#?&.\d]{8,}$/;
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

app.post("/api/signin", bodyParser.json(), (req, res) => {
  const { email, password } = req.body;

  console.log(users);
  console.log(email, password);
  const index = users.findIndex(
    (user) => user.email === email && user.password === password
  );
  if (index === -1) {
    res.status(400);
    res.send({ message: "Email and password doesn't match", body: null });
  } else {
    const token = shortid.generate();
    users[index].tokenExpires = new Date(Date.now() + 1000 * 60 * 10);
    users[index].token = token;
    res.status(200);
    res.send({ message: "Success", body: token });
  }
});

app.post("/api/signup", bodyParser.json(), (req, res) => {
  const { email, password, repassword } = req.body;
  console.log("Received");
  if (password !== repassword) {
    res.status(400);
    res.send({ message: "Password doesn't match", body: null });
  } else {
    if (passwordRegex.test(password)) {
      if (emailRegex.test(email)) {
        const emailIndex = users.findIndex((user) => user.email === email);
        if (emailIndex === -1) {
          const user = {
            id: usersIndex,
            email,
            password,
            token: shortid.generate(),
            tokenExpires: new Date(Date.now() + 1000 * 60 * 10),
          };
          users[usersIndex] = user;
          usersIndex++;
          res.send({ message: "Signup success", body: user });
        } else {
          res.status(400);
          res.send({ message: "Email already exists", body: null });
        }
      } else {
        res.status(400);
        res.send({ message: "Email invalid", body: null });
      }
    } else {
      res.status(400);
      res.send({ message: "Password requirement invalid", body: null });
    }
  }
});
app.get("/api/me", (req, res) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    res.status(400);
    res.send({ message: "Auth token not found", body: null });
  } else {
    const filteredUsers = users.filter((user) => user.token === authorization);
    let user;
    if (filteredUsers.length > 0) {
      user = filteredUsers[0];
      if (new Date() - future.getTime() > 0) {
        res.status(403);
        res.send({ message: "Not authorized", body: null });
      } else {
        res.send({ message: "success", body: user });
      }
    } else {
      res.status(400);
      res.send({ message: "User not found", body: null });
    }
  }
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on("error", console.error);
