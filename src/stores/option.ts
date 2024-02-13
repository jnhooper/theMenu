import { z } from "zod";
import type { WritableAtom } from "nanostores";
import { action } from "nanostores";

// type WritableAtom = ReturnType<typeof persistentAtom>;

export const optionSchema = z.object({
  name: z.string(),
  img: z.string(),
  desc: z.string().optional(),
  href: z.string().url().optional(),
  isHidden: z.boolean().optional(),
});

export type OptionType = z.infer<typeof optionSchema>;

export const hideAction = <T extends OptionType[]>(menu: WritableAtom<T>) =>
  action(menu, "hide", (store, name: T[number]["name"], isHidden: boolean) => {
    const options = store.get() as T;
    console.log("in action");
    console.log(name);

    const updatedOptions = options.map((option) => {
      return option.name === name
        ? {
            ...option,
            isHidden,
          }
        : option;
    }) as T;
    console.log(updatedOptions, options);
    store.set(updatedOptions);
    return store.get();
  });
