const withImageUrl = (req, item) => ({
  ...item,
  image: item.image ? `${req.protocol}://${req.get("host")}/uploads/${item.image}` : null
});


const toDisplayImageUrl = (req, image) => {
  if (!image) return null;

  if (/^https?:\/\//i.test(image)) return image;

  return `${req.protocol}://${req.get("host")}/uploads/${image}`;
};

module.exports = { withImageUrl, toDisplayImageUrl };
