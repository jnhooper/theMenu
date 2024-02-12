import { useStore } from "@nanostores/react";
import {
  addOption,
  breakfastMenu,
  editOption,
  removeOption,
} from "../../stores/breakfastStore";
import { OptionList } from "../../components/OptionList";

interface BreakfastWrapperProps {
  /**
   * are we in edit mode?
   */
  edit?: boolean;
}

export const BreakfastWrapper = (props: BreakfastWrapperProps) => {
  const { edit } = props;
  const result = useStore(breakfastMenu);
  const showError = (!result || result.length === 0) && !edit;
  return (
    <div>
      <h1>Breakfast Menu</h1>
      {showError ? (
        <div>
          <h2>OOPS! Looks like there's no breakfast available</h2>
          <p>Ask a parent to contact our admin to add some food to the menu</p>
        </div>
      ) : (
        <OptionList
          edit={!!edit}
          options={result}
          addOption={addOption}
          removeOption={removeOption}
          editOption={editOption}
        />
      )}
    </div>
  );
};
