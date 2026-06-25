document.getElementById("formBienvenida").addEventListener("submit", function(e) {
  e.preventDefault();
  const nombre = document.getElementById("inputNombre").value.trim();

  if (nombre.length >= 3) {
    localStorage.setItem("clienteNombre", nombre);
    window.location.href = "productos.html"; 
  } else {
    alert("El nombre debe tener al menos 3 letras");
  }
});