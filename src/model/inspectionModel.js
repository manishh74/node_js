const dbConnection = require("../config/dbConfigure");

const createInspection = async (timKey,taimItemKey,updKey,tiimCreatedBy) => {
    const query = "call kodie_new.USP_KODIE_SAVE_INSPECTION_ITEM_DETAILS(?,?,?,?)";
    return new Promise((resolve, reject) => {
      dbConnection.query(
        query,
        [timKey,taimItemKey,updKey,tiimCreatedBy],
        (err, results) => {
          if (err) {
            return reject(err);
          }
          resolve(results);
        }
      );
    });
  };

  const createAreaItemMaster = async (timKey,updKey,tamAreaKey,taimItemName,taimItemType,taimDescription,taimFutureInspection,taimCreatedBy) => {
    const query = "call kodie_new.USP_KODIE_INSERT_INSPECTION_ITEM_MAPPING_MANISH(?,?,?,?,?,?,?,?)";
    return new Promise((resolve, reject) => {
      dbConnection.query(
        query,
        [timKey,updKey,tamAreaKey,taimItemName,taimItemType,taimDescription,taimFutureInspection,taimCreatedBy],
        (err, results) => {
          if (err) {
            return reject(err);
          }
          resolve(results);
        }
      );
    });
  };



  module.exports={
    createInspection,
    createAreaItemMaster
  }