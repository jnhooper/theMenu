import { persistentAtom } from "@nanostores/persistent";
import { action } from "nanostores";
import { type FoodItem } from "./foodItem";

export const localStorageKey = "the_breakfast_menu";

export const breakfastMenu = persistentAtom<FoodItem[]>(localStorageKey, [], {
  encode: JSON.stringify,
  decode: JSON.parse,
});

export const addOption = action(
  breakfastMenu,
  "add",
  (store, foodItem: FoodItem) => {
    const options = store.get();
    store.set([...options, foodItem]);
    return store.get();
  }
);

export const removeOption = action(
  breakfastMenu,
  "remove",
  (store, name: FoodItem["name"]) => {
    const options = store.get().filter((item) => item.name !== name);
    console.log(options);
    store.set([...options]);
    return store.get();
  }
);

export const editOption = action(
  breakfastMenu,
  "edit",
  (store, oldName: FoodItem["name"], option: Partial<FoodItem>) => {
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
      alert("you need to have a name");
    }
    return store.get();
  }
);
