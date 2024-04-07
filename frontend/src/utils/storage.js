export function setInStorage(key, value) {
  localStorage.setItem(
    key,
    typeof value == 'object' ? JSON.stringify(value) : value,
  );
}

export function getFromStorage(key, fallback = null) {
  const res = localStorage.getItem(key);
  try {
    return JSON.parse(res) ?? fallback;
  } catch (err) {
    return res;
  }
}

export function deleteFromStorage(key) {
  localStorage.removeItem(key);
}
