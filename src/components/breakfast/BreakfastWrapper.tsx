import { useStore } from "@nanostores/react";
import {
  addOption,
  breakfastMenu,
  editOption,
  removeOption,
} from "src/stores/breakfastStore";
import { OptionList } from "src/components/OptionList";

interface BreakfastWrapperProps {
  /**
   * are we in edit mode?
   */
  edit?: boolean;
}

export const BreakfastWrapper = (props: BreakfastWrapperProps) => {
  const { edit } = props;
  const result = useStore(breakfastMenu);
  return (
    <div>
      {result && result.length > 0 ? (
        <OptionList
          edit={!!edit}
          options={result}
          addOption={addOption}
          removeOption={removeOption}
          editOption={editOption}
        />
      ) : (
        <div>
          <h2>OOPS! Looks like there's no breakfast available</h2>
          <p>Ask a parent to contact our admin to add some food to the menu</p>
        </div>
      )}
    </div>
  );
};
