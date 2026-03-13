import { useStore } from "@nanostores/react";
import { useContext } from "react";
import {
  addOption,
  editOption,
  hideOption,
  movieMenu,
  removeOption,
  seedMovies,
} from "src/stores/movieStore";
import { OptionList } from "src/components/OptionList";
import { ActionContextProvider } from "src/context/ActionContext";

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
  const showSeed = !showError && result.length === 0;
  return (
    <div>
      <h1>Movie Menu</h1>
      {showError
        ? (
          <div>
            <h2>OOPS! Looks like there's no movies available</h2>
            <p>Ask a parent to contact our admin to add a movie to watch</p>
          </div>
        )
        : (
          <ActionContextProvider
            addOption={addOption}
            editOption={editOption}
            removeOption={removeOption}
            hideOption={hideOption}
            seedOptions={seedMovies}
          >
            <OptionList
              hasHref
              options={result}
              addOption={addOption}
              removeOption={removeOption}
              editOption={editOption}
              edit={!!edit}
            />
          </ActionContextProvider>
        )}
    </div>
  );
};
