function iniciarSesion() {
  const usuario = document.getElementById('usuario').value.trim().toLowerCase();
  const clave = document.getElementById('clave').value.trim();
  if (usuario === 'fiscal' && clave === 'f2025') {
    document.getElementById('login').style.display = 'none';
    document.getElementById('home').style.display = 'block';
  } else {
    alert("Usuario o contraseña incorrectos");
  }
}

function openIframe(url) {
  document.getElementById('home').style.display = 'none';
  document.getElementById('voteForm').style.display = 'none';
  document.getElementById('iframeView').style.display = 'block';
  document.getElementById('iframeBox').src = url;
}

function goHome() {
  document.getElementById('home').style.display = 'block';
  document.getElementById('iframeView').style.display = 'none';
  document.getElementById('voteForm').style.display = 'none';
  document.getElementById('resumen').textContent = '';
}

function showForm() {
  document.getElementById('home').style.display = 'none';
  document.getElementById('iframeView').style.display = 'none';
  document.getElementById('voteForm').style.display = 'block';
}

function validarCampos() {
  const mesa = document.getElementById('mesa').value.trim();
  const fiscal = document.getElementById('fiscal').value.trim();
  const campos = ['cand1', 'cand2', 'blanco', 'nulo', 'impugnado'];

  if (!mesa || !fiscal) {
    alert("Completá el nombre del fiscal y número de mesa.");
    return false;
  }

  for (let campo of campos) {
    const valor = document.getElementById(campo).value.trim();
    if (valor === '' || isNaN(valor) || Number(valor) < 0) {
      alert(`Campo inválido: ${campo}`);
      return false;
    }
  }

  return true;
}

function construirMensaje() {
  const fiscal = document.getElementById('fiscal').value.trim();
  const mesa = document.getElementById('mesa').value.trim();
  const cand1 = parseInt(document.getElementById('cand1').value) || 0;
  const cand2 = parseInt(document.getElementById('cand2').value) || 0;
  const blanco = parseInt(document.getElementById('blanco').value) || 0;
  const nulo = parseInt(document.getElementById('nulo').value) || 0;
  const impugnado = parseInt(document.getElementById('impugnado').value) || 0;
  const total = cand1 + cand2 + blanco + nulo + impugnado;

  return (
    `📊 ELECCIONES 2025 CASTELLI\n\n` +
    `📌 Mesa N°: ${mesa}\n` +
    `👤 Fiscal: *${fiscal}*\n\n` +
    `🗳️ Votos:\n` +
    `🔷 Jorge Taiana: ${cand1}\n` +
    `🔶 Diego Santilli: ${cand2}\n\n` +
    `⬜ En blanco: ${blanco}\n` +
    `❌ Nulos: ${nulo}\n` +
    `⚠️ Impugnados: ${impugnado}\n\n` +
    `🔢 Total de votos: ${total}`
  );
}

function enviarWhatsApp() {
  if (!validarCampos()) return;
  const mensaje = construirMensaje();
  document.getElementById('resumen').textContent = mensaje;

  if (!confirm("¿Deseás enviar los datos por WhatsApp?")) return;

  const numeroDestino = '541168650195';
  const url = `https://wa.me/${numeroDestino}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, '_blank');

  limpiarFormulario();
  setTimeout(goHome, 1000);
}

function copiarAlPortapapeles() {
  if (!validarCampos()) return;
  const mensaje = construirMensaje();
  document.getElementById('resumen').textContent = mensaje;

  if (!confirm("¿Deseás copiar los datos al portapapeles?")) return;

  navigator.clipboard.writeText(mensaje)
    .then(() => alert("Mensaje copiado al portapapeles"))
    .catch(err => alert("Error al copiar: " + err));
}

function limpiarFormulario() {
  ['fiscal', 'mesa', 'cand1', 'cand2', 'blanco', 'nulo', 'impugnado'].forEach(id => {
    document.getElementById(id).value = '';
  });
  document.getElementById('resumen').textContent = '';
}
