export const loadState = <T>(key: string): Partial<T> | undefined => {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState) as Partial<T>;
  } catch (err) {
    console.error('Error loading state from localStorage', err);
    return undefined;
  }
};

export const saveState = <T>(key: string, state: T): void => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(key, serializedState);
  } catch (err) {
    console.error('Error saving state to localStorage', err);
  }
};

export const loadStateFromSession = <T>(key: string): Partial<T> | undefined => {
  try {
    const serializedState = sessionStorage.getItem(key);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState) as Partial<T>;
  } catch (err) {
    console.error('Error loading state from sessionStorage', err);
    return undefined;
  }
};

export const saveStateToSession = <T>(key: string, state: T): void => {
  try {
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem(key, serializedState);
  } catch (err) {
    console.error('Error saving state to sessionStorage', err);
  }
};
