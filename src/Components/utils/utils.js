// src/utils/utils.js
/**
 * Utility function to extract the '_id' from an object if it exists,
 * otherwise returns the input as is (assuming it's already an ID string).
 * @param {string|object} id - The ID or an object containing the ID.
 * @returns {string} The extracted ID.
 */
export const extractId = (id) => {
  return typeof id === "object" && id !== null ? id._id : id;
};

/**
 * Helper function to return a valid image source.
 * If the provided image string is empty or contains only whitespace, it returns a default avatar path.
 * @param {string} img - The image source URL or path.
 * @returns {string} A valid image source URL or the default avatar path.
 */
export const getValidImgSrc = (img) => {
  return img && img.trim() !== "" ? img : "/avatar.png";
};
