// src/utils/isValidUUID.js

/**
 * Checks if the provided string is a valid UUID v4 format thast our id fetched for UUID server.
 * @param {string} id - The ID to validate.
 * @returns {boolean} True if valid UUID v4, false otherwise.
 */
export default function isValidUUID(id) {
  const uuidV4Regex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidV4Regex.test(id);
}
