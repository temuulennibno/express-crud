const allcars = document.getElementById("allcars");
const carField = document.getElementById("carfield");

allcars.onclick = function () {
  fetch("http://localhost:3333/api/cars")
    .then((res) => res.json())
    .then(async (res) => {
      const cars = filterCars(res, "All");
      showcars(cars);
    });
};

function filterCars(res, filter) {
  switch (filter) {
    case "Toyota":
      return res.filter((car) => car.brand == "Toyota");
    case "Lexus":
      return res.filter((car) => car.brand == "Lexus");
    default:
      return res;
  }
}

function showcars(cars) {
  let carCards = document.createElement("div");
  carCards.style.display = "flex";
  carCards.style.flexWrap = "wrap";
  carCards.style.gap = "10px";

  cars.forEach((car) => {
    let newCar = document.createElement("div");

    newCar.innerHTML = `<div class="card" style="width: 18rem;">
    <button type="button" class="btn-close" aria-label="Close" onclick="deleteCar(${car.id})"></button>
    <img src="${car.imageUrl}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${car.model}</h5>
      <p class="card-text">${car.brand}</p>
      <p class="card-text">${car.price}</p>
      <!-- Button trigger modal -->
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Edit
        </button>

        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">${car.model}</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form onsubmit="updateCar(event)">
                    <div class="modal-body">
                        <div class="mb-2">
                            <label for="recipient-name" class="col-form-label">Model</label>
                            <input type="text" name="carModel" class="form-control" value="${car.model}">
                        </div>
                        <div class="mb-2">
                            <label for="recipient-name" class="col-form-label">Brand</label>
                            <input type="text" class="form-control" name="carBrand" value="${car.brand}">
                        </div>
                        <div class="mb-2">
                            <label for="recipient-name" class="col-form-label">Price</label>
                            <input type="text" class="form-control" name="carPrice" value="${car.price}">
                        </div>
                        </div>
                        <div class="modal-footer">
                            <input type="button" class="btn btn-secondary" data-bs-dismiss="modal" value="Close"/>
                            <input type="submit" class="btn btn-primary" data-bs-dismiss="modal" value="Save changes"/>
                        </div>
                    </form>
            </div>
        </div>
        </div>
    </div>
  </div>`;
    carCards.appendChild(newCar);
  });
  carField.appendChild(carCards);
}
function deleteCar(id) {
  fetch("http://localhost:3333/api/cars", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
    }),
  });
  window.location.reload();
}

function updateCar(event) {
  event.preventDefault();
  console.log(event.target.carModel.value);
  console.log(event.target.carBrand.value);
  console.log(event.target.carPrice.value);
}
