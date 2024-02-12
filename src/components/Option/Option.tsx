import { type FormEvent } from "react";
import { type OptionType } from "src/stores/option";
import styles from "./styles.module.scss";
import type { ZodObject } from "astro/zod";

export interface OptionProps<Option> {
  /*
   * can this option have an href?
   */
  hasHref?: boolean;
  /**
   * are we in edit mode?
   */
  edit?: boolean;
  /**
   * are we in create mode?
   */
  create?: boolean;
  /**
   * edit the option.
   */
  editOption?: (oldName: string, option: Partial<Option>) => Option[];

  addOption?: (item: Option) => Option[];

  /**
   * given a name of an option remove it
   */
  removeOption?: (name: string) => Option[];
}

export const Option = <T extends OptionType>(props: OptionProps<T> & T) => {
  const {
    desc,
    name,
    edit,
    editOption,
    removeOption,
    addOption,
    img,
    create,
    href,
    hasHref,
  } = props;
  const formMode = edit || create;
  const WrapperName = formMode ? "form" : "article";

  // type FormElements = HTMLFormControlsCollection & {
  //   [key in T]: HTMLInputElement;
  // };
  //
  // interface MyFormElements extends HTMLFormElement {
  //   readonly elements: FormElements;
  // }
  const formOptions = formMode
    ? {
        onSubmit: (e: FormEvent) => {
          // todo pass <MyFormElements> into formEvent
          e.preventDefault();
          const elements = e.currentTarget?.elements;
          const newName = elements.name.value as string;
          const newDesc = elements?.desc.value as string;
          const newImg = elements?.img?.value as string;
          // do we need special things around href?
          const newOption = {
            name: newName,
            desc: newDesc,
            img: newImg,
          } as T;
          if (hasHref) {
            const newHref = elements?.href?.value as string;
            console.log(newHref);
            newOption.href = newHref;
          }
          if (edit && editOption) {
            editOption(name, newOption);
          } else if (create && addOption) {
            addOption(newOption);
          }
        },
      }
    : {};

  const wrapperClick =
    href && !formMode
      ? {
          onClick: () => (window.location.href = href),
        }
      : {};
  return (
    <div
      className={`${styles.wrapper} ${
        !formMode && hasHref ? styles.linkWrapper : ""
      }`}
    >
      <WrapperName
        className={`postcard-article ${formMode ? styles.edit : ""} ${
          styles.wrapper
        }`}
        {...formOptions}
        {...wrapperClick}
      >
        <div className={`postcard-image-container`}>
          <img
            src={props.img}
            alt={`picure of ${name}`}
            width={672}
            height={378}
            sizes="(max-width: 488px) 488px, 672px"
            className={styles.img}
          />
        </div>
        <div
          className="postcard-content  bg-gradient-to-t from-neutral-950 to-transparent
"
        >
          {edit || create ? (
            <div>
              <label>
                <div>name</div>
                <input name="name" type="text" defaultValue={name} />
              </label>
              <label>
                <div>description</div>
                <input
                  name="desc"
                  type="text"
                  defaultValue={edit ? desc : ""}
                />
              </label>
              {hasHref ? (
                <>
                  <label>
                    <div>link</div>
                    <input
                      name="href"
                      type="text"
                      defaultValue={edit ? href : ""}
                    />
                  </label>
                </>
              ) : null}
              <label>
                <div>image</div>
                <input name="img" type="text" defaultValue={edit ? img : ""} />
              </label>
              <button>{edit ? "save" : "add"}</button>
            </div>
          ) : (
            <>
              {href ? (
                <a href={href}>
                  <h2 className="postcard-title">{name}</h2>
                </a>
              ) : (
                <h2 className="postcard-title">{name}</h2>
              )}
              {desc ? <p className="postcard-description">{desc}</p> : ""}
            </>
          )}
        </div>
      </WrapperName>
      {edit ? (
        <button className={styles.remove} onClick={() => removeOption(name)}>
          remove
        </button>
      ) : null}
    </div>
  );
};
