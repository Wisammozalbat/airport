const config = require("./../helpers/config");
const instapago = require("instapago");
const i = instapago(config.privateKey, config.publicKey);

module.exports.payTicket = async (
  amount,
  description,
  cardholder,
  cardholderid,
  cardnumber,
  cvc,
  expirationdate,
  statusid,
  ip
) => {
  try {
    const data = await i.pay({
      amount,
      description,
      cardholder,
      cardholderid,
      cardnumber,
      cvc,
      expirationdate,
      statusid,
      ip
    });
    return data;
  } catch (e) {
    return { ...e };
  }
};
