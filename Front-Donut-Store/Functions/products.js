fetch("../Data/data.json")
  .then((response) => response.json())
  .then((data) => {
    const container = document.getElementById("card-container");
    data.forEach((element) => {
      const card = document.createElement("div");
      card.className = "card mt-3";
      const cardBody = document.createElement("div");
      cardBody.className = "card-body text-center";
      cardBody.innerHTML = `<h2>${element.name}</h2>
      <img src="${element.image}">
      <p>${element.description}</p>
      <p>$${element.price}</p>
      <button class="btn">Add to Cart</button>
      `;
      card.appendChild(cardBody);
      container.appendChild(card);
    });
  })
  .catch((error) => console.error("Error loading JSON file", error));
