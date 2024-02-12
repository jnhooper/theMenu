import { useStore } from "@nanostores/react";
import {
  addOption,
  editOption,
  movieMenu,
  removeOption,
} from "src/stores/movieStore";
import { OptionList } from "src/components/OptionList";

interface MovieWrapperProps {
  /**
   * are we in edit mode?
   */
  edit?: boolean;
}

export const MovieWrapper = (props: MovieWrapperProps) => {
  const { edit } = props;
  const result = useStore(movieMenu);
  const showError = (!result || result.length === 0) && !edit;
  return (
    <div>
      <h1>Movie Menu</h1>
      {showError ? (
        <div>
          <h2>OOPS! Looks like there's no movies available</h2>
          <p>Ask a parent to contact our admin to add a movie to watch</p>
        </div>
      ) : (
        <OptionList
          hasHref
          options={result}
          addOption={addOption}
          removeOption={removeOption}
          editOption={editOption}
          edit={!!edit}
        />
      )}
    </div>
  );
};
