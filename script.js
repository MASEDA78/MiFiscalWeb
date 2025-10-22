function enviarWhatsApp() {
  if (!validarCampos()) return;

  const boton = document.getElementById('btnEnviar');
  if (boton) boton.disabled = true; // evitar doble clic

  let mensaje = construirMensaje();

  // Agregar timestamp
  const ahora = new Date().toLocaleString('es-AR');
  mensaje += `\n🕒 Cargado: ${ahora}`;

  document.getElementById('resumen').textContent = mensaje;

  if (!confirm("¿Deseás enviar los datos por WhatsApp?")) {
    if (boton) boton.disabled = false;
    return;
  }

  const numeroDestino = '542245477140'; // tu número fijo
  const url = `https://api.whatsapp.com/send?phone=${numeroDestino}&text=${encodeURIComponent(mensaje)}`;

  setTimeout(() => {
    window.open(url, '_blank');
  }, 500);

  limpiarFormulario();
  setTimeout(() => {
    goHome();
    if (boton) boton.disabled = false;
  }, 1000);
}
