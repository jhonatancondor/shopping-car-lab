/**
 * Funcion para crear un String aleatorio segun el tamaño enviado
 * @param {*} length Tamaño del String a retornar
 * @returns String aleatorio
 */
function generateCode(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

module.exports = {
  generateCode,
};
