const db = require("./../helpers/db.js");
const query = require("./../helpers/queries");

module.exports.newAirline = async (name, country, id_user) => {
  try {
    const newAirline = db.one(sql.newAirline, [airline, country, id_user]);
    return newAirline.data;
  } catch (e) {
    return e;
  }
};

module.exports.updateAirline = async (name, country, id_airline) => {
  try {
    const data = await db.one(query.updateAirline, [name, country, id_airline]);
    return { status: 200, msg: "airline updated", data };
  } catch (e) {
    return {
      error: e,
      status: 501,
      msg: "Failed at connecting to the data base"
    };
  }
};

// module.exports.getAirline = async name => {
//   try {
//     const data = await db.oneOrNone(query.getAirline, [name]);
//     console.log(data);
//     return { status: 201, msg: "airport gotted", data };
//   } catch (e) {
//     return {
//       error: e,
//       status: 501,
//       msg: "Failed at connecting to the data base"
//     };
//   }
// };

module.exports.getAllAirlines = async () => {
  try {
    const allAirlines = await db.any(query.getAllAirlines);
    console.log(allAirlines);
    return allAirlines;
  } catch (e) {
    return e;
  }
};

module.exports.deleteAirline = async id_airline => {
  try {
    const data = await db.none(query.deleteAirline, [id_airline]);
    return { status: 201, msg: "airline deleted", data };
  } catch (e) {
    return {
      error: e,
      status: 501,
      msg: "Failed at connecting to the data base"
    };
  }
};
