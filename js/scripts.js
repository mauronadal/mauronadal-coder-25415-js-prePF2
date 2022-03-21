

const productosCarrito = "carritoproductosId";

document.addEventListener("DOMContentLoaded", () => {
  cargarProductos();
  cargarProductoCarrito();
});

const producto = [
  {"id": 1, "nombre": "Fuente Lnz XT 850-PM 850W", "imagen": "./img/img-pro-01.jpg", "extraInfo": "SALE", "precio": 6099},
  {"id": 2, "nombre": "Silla Gamer Aerocool Admiral", "imagen": "./img/img-pro-02.jpg", "extraInfo": "NEW", "precio": 40999},
  {"id": 3, "nombre": "Auricular Redragon H260", "imagen": "./img/img-pro-03.jpg", "extraInfo": "SALE", "precio": 2369},
  {"id": 4, "nombre": "MotherBoard Gigabyte B450M DS3H", "imagen": "./img/img-pro-04.jpg", "extraInfo": "SALE", "precio": 16879},
  {"id": 5, "nombre": "Monitor Gamer 24 Samsung Curvo C24F390FHL", "imagen": "./img/img-pro-05.jpg", "extraInfo": "SALE", "precio": 31299},
  {"id": 6, "nombre": "Teclado y Mouse Logitech MK235 Inalámbrico Gris", "imagen": "./img/img-pro-06.jpg", "extraInfo": "NEW", "precio": 2249},
  {"id": 7, "nombre": "Cámara Web Logitech C922", "imagen": "./img/img-pro-07.jpg", "extraInfo": "SALE", "precio": 10099},
  {"id": 8, "nombre": "Ups Lyonn CTB-3000 VA", "imagen": "./img/img-pro-08.jpg", "extraInfo": "SALE", "precio": 54499}

]

async function cargarProductos() {
  const productos = producto;

  let html = "";
  productos.forEach(producto => {
    html += `
        <div class="producto-container">
            <div class="card producto">
                <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}" />
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="extraInfo">${producto.extraInfo}</p>
                    <p class="card-text">$ ${producto.precio}</p>
                    <button type="button" class="btn btn-primary btn-cart" onClick=(agregarProductoCarrito(${producto.id}))>Añadir al carrito</button>
                </div>
            </div>
        </div>
      `;
  });

  document.getElementsByClassName("productos")[0].innerHTML = html;
}

function abrirCerrarCarrito() {
  const containerCarrito = document.getElementsByClassName("cart-productos")[0];

  containerCarrito.classList.forEach(item => {
    if (item === "hidden") {
      containerCarrito.classList.remove("hidden");
      containerCarrito.classList.add("active");
    }

    if (item === "active") {
      containerCarrito.classList.remove("active");
      containerCarrito.classList.add("hidden");
    }
  });
}

function agregarProductoCarrito(idProducto) {
  let arrayproductosId = [];

  let localStorageItems = localStorage.getItem(productosCarrito);

  if (localStorageItems === null) {
    arrayproductosId.push(idProducto);
    localStorage.setItem(productosCarrito, arrayproductosId);
  } else {
    let productosId = localStorage.getItem(productosCarrito);
    if (productosId.length > 0) {
      productosId += "," + idProducto;
    } else {
      productosId = productId;
    }
    localStorage.setItem(productosCarrito, productosId);
  }

  cargarProductoCarrito();
}

async function cargarProductoCarrito() {
  const productos = producto;


  const localStorageItems = localStorage.getItem(productosCarrito);

  let html = "";
  if (!localStorageItems) {
    html = `
        <div class="cart-producto empty">
            <p>Carrito vacio.</p>
        </div>
      `;
  } else {
    const idproductosSplit = localStorageItems.split(",");

  
    const idproductosCarrito = Array.from(new Set(idproductosSplit));

    idproductosCarrito.forEach(id => {
      productos.forEach(producto => {
        if (id == producto.id) {
          const cantidad = countDuplicatesId(id, idproductosSplit);
          const precioTotal = producto.precio * cantidad;

          html += `
            <div class="cart-producto">
                <img src="${producto.imagen}" alt="${producto.nombre}" />
                <div class="cart-producto-info">
                    <span class="cantidad">${cantidad}</span>
                    <p>${producto.nombre}</p>
                    <p>$ ${precioTotal.toFixed(2)}</p>
                    <p class="change-cantidad">
                        <button onClick="restarCantidad(${producto.id
            })">-</button>
                        <button onClick="aumentarCantidad(${producto.id
            })">+</button>
                    </p>
                    <p class="cart-producto-borrar">
                        <button onClick=(borrarProductoCarrrito(${producto.id
            }))>Eliminar</button>
                    </p>
                </div>
            </div>
        `;
        }
      });
    });
  }

  document.getElementsByClassName("cart-productos")[0].innerHTML = html;
}

function borrarProductoCarrrito(idProducto) {
  const idproductosCarrito = localStorage.getItem(productosCarrito);
  const arrayIdproductosCarrito = idproductosCarrito.split(",");
  const resultIdDelete = deleteAllIds(idProducto, arrayIdproductosCarrito);

  if (resultIdDelete) {
    let count = 0;
    let idsString = "";

    resultIdDelete.forEach(id => {
      count++;
      if (count < resultIdDelete.length) {
        idsString += id + ",";
      } else {
        idsString += id;
      }
    });
    localStorage.setItem(productosCarrito, idsString);
  }

  const idsLocalStorage = localStorage.getItem(productosCarrito);
  if (!idsLocalStorage) {
    localStorage.removeItem(productosCarrito);
  }

  cargarProductoCarrito();
}

function aumentarCantidad(idProducto) {
  const idproductosCarrito = localStorage.getItem(productosCarrito);
  const arrayIdproductosCarrito = idproductosCarrito.split(",");
  arrayIdproductosCarrito.push(idProducto);

  let count = 0;
  let idsString = "";
  arrayIdproductosCarrito.forEach(id => {
    count++;
    if (count < arrayIdproductosCarrito.length) {
      idsString += id + ",";
    } else {
      idsString += id;
    }
  });
  localStorage.setItem(productosCarrito, idsString);
  cargarProductoCarrito();
}

function restarCantidad(idProducto) {
  const idproductosCarrito = localStorage.getItem(productosCarrito);
  const arrayIdproductosCarrito = idproductosCarrito.split(",");

  const deleteItem = idProducto.toString();
  let index = arrayIdproductosCarrito.indexOf(deleteItem);
  if (index > -1) {
    arrayIdproductosCarrito.splice(index, 1);
  }

  let count = 0;
  let idsString = "";
  arrayIdproductosCarrito.forEach(id => {
    count++;
    if (count < arrayIdproductosCarrito.length) {
      idsString += id + ",";
    } else {
      idsString += id;
    }
  });
  localStorage.setItem(productosCarrito, idsString);
  cargarProductoCarrito();
}

function countDuplicatesId(value, arrayIds) {
  let count = 0;
  arrayIds.forEach(id => {
    if (value == id) {
      count++;
    }
  });
  return count;
}

function deleteAllIds(id, arrayIds) {
  return arrayIds.filter(itemId => {
    return itemId != id;
  });
}




