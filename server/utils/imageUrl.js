const withImageUrl = (req, item) => ({
  ...item,
  image: item.image ? `${req.protocol}://${req.get("host")}/uploads/${item.image}` : null,
});
module.exports = { withImageUrl };