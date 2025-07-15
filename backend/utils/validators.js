exports.validateTags = (tags) => {
  if (!tags) return true;
  if (!Array.isArray(tags)) return false;
  return tags.every(tag => typeof tag === 'string' && tag.trim().length > 0);
};