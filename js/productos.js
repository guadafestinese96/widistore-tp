fetch("../js/productos.json")
  .then((res) => res.json())
  .then((productos) => {
    const contenedor = document.getElementById("productos-container");
    productos.forEach((p) => {
      const card = `
        <div class="col-sm-12 col-md-6 col-lg-4 mb-4 d-flex justify-content-center align-items-center">
        <div class="card h-100">
        <img src="../imagenes/${p.id}.jpg" class="card-img-top" alt="${p.nombre}">
        <div class="card-body">
        <h6 class="card-title">${p.nombre}</h6>
        <p class="card-text">Precio: ${p.precio}</p>
        <p class="card-text">Stock: ${p.stock}</p>
        <button class="btn btn-primary">Agregar al carrito</button>
        </div>
        </div>
        </div>
        `;
      contenedor.innerHTML += card;
    });
  });
