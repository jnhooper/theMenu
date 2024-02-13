import { persistentAtom } from "@nanostores/persistent";
import { action } from "nanostores";
import { type EntertainmentItem } from "./entertainment";
import { hideAction } from "./option";

export const localStorageKey = "the_movie_menu";

export const movieMenu = persistentAtom<EntertainmentItem[]>(
  localStorageKey,
  [],
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  }
);

export const addOption = action(
  movieMenu,
  "add movie",
  (store, movie: EntertainmentItem) => {
    const options = store.get();
    store.set([...options, movie]);
    return store.get();
  }
);

export const hideOption = hideAction(movieMenu);

export const removeOption = action(
  movieMenu,
  "remove movie",
  (store, name: EntertainmentItem["name"]) => {
    const options = store.get().filter((item) => item.name !== name);
    store.set([...options]);
    return store.get();
  }
);

export const editOption = action(
  movieMenu,
  "edit movie",
  (
    store,
    oldName: EntertainmentItem["name"],
    option: Partial<EntertainmentItem>
  ) => {
    if (option.name && option.name.trim().length > 0) {
      const options = store.get().map((item) => {
        if (item.name === oldName) {
          return {
            ...item,
            ...option,
          };
        } else {
          return item;
        }
      });
      store.set([...options]);
    } else {
      alert("entertainment needs to have a name");
    }
    return store.get();
  }
);
