type StoredData<T> = {
  value: T;
  expiry: number;
};

export function setItemWithExpiry<T>(key: string, value: T, ttl: number): void {
  const now = new Date();

  // `ttl` is the time-to-live in milliseconds
  const item: StoredData<T> = {
    value: value,
    expiry: now.getTime() + ttl,
  };

  sessionStorage.setItem(key, JSON.stringify(item));
}

export function getItemWithExpiry<T>(key: string): T | null {
  const itemStr = sessionStorage.getItem(key);

  // If the item doesn't exist, return null
  if (!itemStr) {
    return null;
  }

  const item: StoredData<T> = JSON.parse(itemStr);
  const now = new Date();

  // Compare the expiry time of the item with the current time
  if (now.getTime() > item.expiry) {
    // If the item is expired, delete the item from storage and return null
    sessionStorage.removeItem(key);
    return null;
  }

  return item.value;
}

export function removeItem<T>(key: string): T | null {
  const itemStr = sessionStorage.getItem(key);

  // If the item doesn't exist, return null
  if (itemStr) {
    sessionStorage.removeItem(key);
  }

  return null;
}
