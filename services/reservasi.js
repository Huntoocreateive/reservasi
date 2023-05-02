const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id, name, phone, message, date 
    FROM message LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function create(reservasi){
  const result = await db.query(
    `INSERT INTO message 
    (name, phone, message, date) 
    VALUES 
    (${reservasi.name}, ${reservasi.phone}, ${reservasi.message}, ${reservasi.date})`
  );

  let message = 'Error in creating message';

  if (result.affectedRows) {
    message = 'Message created successfully';
  }

  return {message};
}

module.exports = {
  getMultiple,
  create
}