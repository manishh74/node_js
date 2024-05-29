const dbConnection = require("../../config/dbConfigure");

const create = async (companyName, companyEmail, contactNumber) => {
  const query = "CALL kodie.USP_KODIE_INSERT_COMPANY_INFORMATION(?, ?, ?)";
  return new Promise((resolve, reject) => {
    dbConnection.query(
      query,
      [companyName, companyEmail, contactNumber],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      }
    );
  });
};

const getAll = () => {
  return new Promise((resolve, reject) => {
    const query = `CALL kodie.USP_KODIE_GET_COMPANY_INFORMATION()`;
    dbConnection.query(query, (err, results) => {
      if (err) {
        console.error("Error executing query:", err.stack);
        return reject(err);
      }
      resolve(results);
    });
  });
};

const getByid = (userId) => {
  return new Promise((resolve, reject) => {
    const query = `call kodie.USP_KODIE_GET_BYID_COMPANY_INFORMATION(${userId})`;
    dbConnection.query(query, (err, results) => {
      if (err) {
        console.error("Error executing query:", err.stack);
        return reject(err);
      }
      resolve(results);
    });
  });
};

const deletedById = (userId) => {
  return new Promise((resolve, reject) => {
    const query = `call kodie.USP_KODIE_DELETE_COMPANY_INFORMATION(${userId})`;

    dbConnection.query(query, (err, results) => {
      if (err) {
        console.error("Error executing query:", err.stack);
        return reject(err);
      }

      resolve(results);
    });
  });
};

const updatedById = (userId, companyName, companyEmail, contactNumber) => {
  return new Promise((resolve, reject) => {
    const query =
      "CALL kodie.USP_KODIE_UPDATE_COMPANY_INFORMATION( ?, ?, ?, ?)";
    dbConnection.query(
      query,
      [userId, companyName, companyEmail, contactNumber],
      (err, results) => {
        if (err) {
          console.error("Error executing query:", err.stack);
          return reject(err);
        }
        resolve(results);
      }
    );
  });
};

module.exports = {
  create,
  getAll,
  getByid,
  deletedById,
  updatedById,
};
