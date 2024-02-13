import type { OptionType } from "src/stores/option";
import { Option, type OptionProps } from "../Option";
import style from "./styles.module.scss";

interface OptionListProps<T> {
  /**
   * are we in edit mode
   */
  edit?: boolean;

  /**
   * todo update to use the food option thing
   */
  options: T[];

  /*
   * can this option have an href?
   */
  hasHref?: boolean;
}

export const OptionList = <T extends OptionType>(props: OptionListProps<T>) => {
  const { options, edit, hasHref } = props;
  const renderedOptions = edit
    ? options
    : options.filter((option) => !option.isHidden);
  return (
    <ul
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-4 mb-4 ${style.optionList}`}
    >
      {renderedOptions.map((option) => (
        <li>
          <Option
            hasHref={!!hasHref}
            href={option.href}
            edit={!!edit}
            isHidden={option.isHidden}
            key={option.name}
            name={option.name}
            desc={option.desc}
            img={option.img}
          />
        </li>
      ))}
      {edit ? (
        <li>
          <Option
            create
            hasHref={!!hasHref}
            name={"New Option"}
            desc={"Description"}
            img={
              "https://pm1.aminoapps.com/7593/72235e9613e13dfb8bd35c38d30d0f1462456c8fr1-2048-2048v2_hq.jpg"
            }
          />
        </li>
      ) : null}
    </ul>
  );
};
