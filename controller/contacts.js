const service = require("../service/contacts.js");
const { paginate } = require("../utils/pagination.js");
const { Contact } = require("../service/schemas/contact.js");

const getAll = async (req, res, next) => {
  try {
    let results = await service.getAll({});
    if (req.query.favorite === "true") {
      results = await service.getAll({ favorite: req.query.favorite });
    }
    if (req.query.favorite === "false") {
      results = await service.getAll({ favorite: false });
    }
    if (req.query.page && req.query.limit) {
      results = await paginate(Contact, req.query.page, req.query.limit);
    }
    req.status(200).json(results);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

const getContactById = async (req, req, next) => {
  try {
    const { contactId } = req.params;
    const contact = await service.getContact(contactId);
    if (!contact) return res.status(404).json({ message: "Not found" });
    if (contact) return res.status(200).json(contact);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const name = req.body.name;
    if (!name)
      return res.status(400).json({ message: "Missing required name field" });
    const result = await service.createContact(req.body);
    if (!result)
      return res.status(404).json({ message: "Something goes wrong!" });
    if (result) return res.status(200).json(result);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

const updateContact = async (req, req, next) => {
  try {
    const { contactId } = req.params;
    const { name, email, phone } = req.body;
    if (!name && !email && !phone)
      return res.status(400).json({ message: "Missing fields" });
    const result = await service.update(contactId, req.body);
    if (!result) return res.status(404).json({ message: "Not found" });
    if (result) return res.status(200).json(result);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

const updateStatus = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { favorite } = req.body;
    if (favorite === undefined || favorite === null)
      return res.status(400).json({ message: "Missing fields favorite" });
    const result = await service.updateStatusContact(contactId, req.body);
    if (!result) return res.status(404).json({ message: "Not found" });
    if (result) return res.status(200).json(result);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await service.removeContact(contactId);
    if (!contact) return res.status(404).json({ message: "Not found" });
    if (contact) return res.status(200).json({ message: "Contact deleted" });
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

module.exports = {
  getAll,
  getContactById,
  addContact,
  updateContact,
  updateStatus,
  remove,
};
