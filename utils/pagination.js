const paginate = async (model, page, limit) => {
  const parsePage = parseInt(page);
  const parseLimit = parseInt(limit);
  const skip = (parsePage - 1) * parseLimit;
  const count = await model.estimatedDocumentCount();
  const result = await model.find().skip(skip).limit(parseLimit);
  const totalPages = Math.ceil(count / parseLimit);

  return { ...result, totalPages };
};

module.exports = { paginate };
