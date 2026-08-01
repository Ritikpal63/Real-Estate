const withImageUrl = (req, item) => ({
  ...item,
  image: item.image ? `${req.protocol}://${req.get("host")}/uploads/${item.image}` : null,
});

// server/utils/imageUrl.js
const toDisplayImageUrl = (req, image) => {
    if (!image) return null;
    // Cloudinary (or any) already-full URL — use as-is
    if (/^https?:\/\//i.test(image)) return image;
    // Legacy local filename saved before the Cloudinary migration
    return `${req.protocol}://${req.get("host")}/uploads/${image}`;
};

module.exports = { withImageUrl, toDisplayImageUrl };
