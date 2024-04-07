const db = require("../../models");
const sequelize = db.sequelize;
const constants = require("../../constants/constants");

createNewOrder = async function (body) {
  try {
    return await db[constants.DB.table.ORDER_MASTER].create(body);
  } catch (err) {
    throw new Error(err);
  }
};

updateOrderStatus = async function (status, id) {
  try {
    return await db[constants.DB.table.ORDER_MASTER].update(
      { status },
      {
        where: { id },
      }
    );
  } catch (err) {
    throw new Error(err);
  }
};

getAllOrdersByStore = async function (store_id) {
  try {
    return await sequelize.query("select om.id, om.store_id, om.image_url, om.order_details, om.status, om.createdAt, om.updatedAt, um.name, um.phone from order_master om left join user_master um on om.user_id = um.id where om.store_id= :store_id;", {
      type: sequelize.QueryTypes.SELECT,
      replacements: {
        store_id
      }
    });
  } catch (err) {
    throw new Error(err);
  }
};

getOrderById = async function (id) {
  try {
    return await db[constants.DB.table.ORDER_MASTER].findOne({
      where: {
        id,
      },
    });
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  createNewOrder,
  updateOrderStatus,
  getAllOrdersByStore,
  getOrderById,
};
