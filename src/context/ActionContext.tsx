import React, { createContext } from "react";

export const ActionContext = createContext<{
  addOption: Function;
  editOption: Function;
  hideOption: Function;
  removeOption: Function;
} | null>(null);
type Props = {
  children?: React.ReactNode;
  addOption: Function;
  editOption: Function;
  hideOption: Function;
  removeOption: Function;
};
export const ActionContextProvider: React.FC<Props> = (props: Props) => {
  const { children, addOption, editOption, hideOption, removeOption } = props;
  return (
    <ActionContext.Provider
      value={{
        addOption,
        editOption,
        hideOption,
        removeOption,
      }}
    >
      {children}
    </ActionContext.Provider>
  );
};
