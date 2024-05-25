"use client";
import React, { useState, useEffect, Dispatch, SetStateAction } from "react";

//
// InputDropDown
//
// This component displays a dropdown if the entered text does not specifically match.
//
//  name                name of the element
//  disabled            Set to true if the element is disabled
//  loading             Set to true if the elements data is loading
//  dataTest            The data-test name for testing
//  InputDropDownClass
//  placeholder         The fields placeholder text
//  label               The label name
//  dropdownMinLength   This is the minimum number of characters entered before the dropdown is displayed
//  arrayList           This si the list of allowed values
//  value               The current entered text
//  setMatchedValue     A function to allow the text to be set if the dropdown is clicked on
//  valueMatched        If the value matches an item in the array
//  onChangeHandler
//
// interface InputDropDownProps<T> {

//     name: string
//     placeholder: string
//     dropdownMinLength: string

//     listItems: T,
//     listKey: string,

//     InputDropDownClass: string,

//     label?: string,

//     value: string,
//     setMatchedValue: ( name: string, value: string) => void,
//     valueMatched: boolean,

//     onChangehandler: ( e: React.ChangeEvent<HTMLInputElement>) => void

//     disabled: boolean,
//     loading: boolean

// }
export interface DropdownItem {
  lookupId: number;
  lookup: string;
  disabled?: boolean;
}

export interface DropdownState {
  dropdownItems: DropdownItem[];
  value: string;
  matchedItem: boolean;
}

export interface DropdownStateType {
  [name: string]: DropdownState;
}

// interface ListItemType {
//   lookupId: number;
//   lookup: string;
//   disabled?: boolean;
// }

interface InputDropDownProps {
  name: string;
  placeholder: string;
  label?: string;
  InputDropDownClass?: string;
  dropdownMinLength: number;

  // listItems: ListItemType[];
  // value: string;
  // setMatchedValue: (name: string, value: string) => void;
  valueMatched: boolean;

  // onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  state: DropdownState;
  updateState: Dispatch<SetStateAction<DropdownStateType>>;

  disabled: boolean;
  loading: boolean;
}

interface dropdownState {
  dropdownList: DropdownItem[];
  selectedItem: number;
  focused: boolean;
}

export const InputDropDown: React.FC<InputDropDownProps> = ({
  name,
  placeholder,
  dropdownMinLength,
  // listItems,
  InputDropDownClass,
  label,
  // value,
  // setMatchedValue,
  valueMatched,
  // onChangeHandler,
  state,
  updateState,
  disabled,
  loading,
}): JSX.Element => {
  // console.log ('listItems')
  // console.log (listItems)

  const [dropdownList, setDropdownList] = useState<DropdownItem[]>([]);
  const [selectedItem, setSelectedItem] = useState(-1);
  const [focused, setFocused] = useState(false);

  console.log("Here");
  console.log(dropdownList);
  console.log(selectedItem);
  console.log(focused);

  //
  // Set the dropdownList
  //
  useEffect(() => {
    if (!valueMatched) {
      const valLen = state.value.length;
      if (valLen > 0) {
        if (state.value.length >= dropdownMinLength) {
          const list = state.dropdownItems.filter((item) => {
            return (
              item.lookup.toLowerCase().indexOf(state.value.toLowerCase()) !==
              -1
            );
          });
          setDropdownList(list);
          setFocused(true);
          setSelectedItem(-1);
        } else if (dropdownList.length > 0) {
          setFocused(false);
        }
      }
    }
  }, [
    dropdownList.length,
    dropdownMinLength,
    state.dropdownItems,
    state.value,
    valueMatched,
  ]);

  //
  // Add event listener, this handles the up arrow (38), down arrow (40) and the enter key
  //
  useEffect(() => {
    const onKeydown = (event: KeyboardEvent) => {
      // console.log ('ONKEYDOWN FN ................................')
      // const { keyCode } = event;
      const { key } = event;

      const noDropdowns = dropdownList.length;

      if (key === "ArrowDown") {
        event.preventDefault();
        if (selectedItem < noDropdowns - 1) {
          setSelectedItem((prev) => prev + 1);
        }
      } else if (key === "ArrowUp") {
        event.preventDefault();
        if (selectedItem > 0) {
          setSelectedItem((prev) => prev - 1);
        }
      } else if (key === "Enter") {
        event.preventDefault();

        if (selectedItem !== -1) {
          if (!dropdownList[selectedItem].disabled) {
            // setMatchedValue(name, dropdownList[selectedItem].lookup);
            updateState((prev: DropdownStateType): DropdownStateType => {
              return {
                ...prev,
                [name]: {
                  ...prev[name],
                  value: dropdownList[selectedItem].lookup,
                },
              };
            });
            setDropdownList([]);
            setSelectedItem(-1);
          }
        }
      } else if (key === "Escape") {
        event.preventDefault();
        setFocused(false);
      }
    };

    window.addEventListener("keydown", onKeydown);

    return () => {
      window.removeEventListener("keydown", onKeydown);
    };
  }, [
    dropdownList,
    selectedItem,
    setDropdownList,
    setSelectedItem,
    updateState,
    name,
  ]);

  //
  // Add listener for creating the dropdown list. If InputDropdown has focus and value not matched then show options.
  //
  useEffect(() => {
    const onInput = (e: any) => {
      const myElem = document.querySelector(`#InputDropDownDiv_${name}`);

      if (!(myElem !== null && myElem.contains(e.target))) {
        setFocused(false);
      }
    };

    window.addEventListener("click", onInput);

    return () => {
      window.removeEventListener("click", onInput);
    };
  }, [name]);

  //
  // When the input dropdown receives focus. Check to the entered lookup data is one of the lookups.
  //
  const focusFn = (event: React.FocusEvent) => {
    // console.log ('FOCUS FN ................................')
    if (!valueMatched) {
      if (state.value.length >= dropdownMinLength) {
        setFocused(true);
      }
    }
  };

  const inputId = `InputDropDown_${name}`;
  const cursor = loading ? "cursor-wait" : !disabled ? "cursor-pointer" : "";
  const divAttrs = {
    className: `relative ${InputDropDownClass ? InputDropDownClass : ""}`,
    id: `InputDropDownDiv_${name}`,
    "data-cy": `InputDropDown${"-" + name}`,
  };

  const attrs = {
    id: inputId,
    name,
    placeholder,
    type: "text",
    className: `w-full p-2 border border-1 border-input-border rounded-lg cursor-pointer focus:border-blue-dark focus:outline-none focus:ring-0`,
    onChange: onChangeHandler,
    onFocus: focusFn,
    value: state.value,
    autoComplete: "off",
    disabled: false,
  };

  if (disabled) {
    attrs["disabled"] = true;
  }

  const dropdownClick = (name: string, value: string, disabled: boolean) => {
    if (!disabled) {
      setMatchedValue(name, value);
      updateState((prev: DropdownStateType): DropdownStateType => {
        return {
          ...prev,
          [name]: { ...prev[name], value: dropdownList[selectedItem].lookup },
        };
      });

      setFocused(false);
      setSelectedItem(-1);
    }
  };

  // console.log ('dropdownList')
  // console.log (dropdownList)
  // console.log (`selectedItem ${selectedItem}`)
  const itemLength = value.length;
  let dropdown: JSX.Element | null = (
    <div
      id="subjectDropdownID"
      className="absolute rounded-lg  bg-white-900 border border-1 border-input-border py-2 w-full overflow-y-auto max-h-64"
      data-cy={`InputDropDown${"-" + name + "-items"}`}
    >
      {dropdownList.map((item, idx) => {
        const className =
          (idx === selectedItem ? "bg-input-border " : "") +
          "px-2" +
          (item.disabled ? ` line-through` : "");
        const prefixPos = item.lookup
          .toLowerCase()
          .indexOf(value.toLowerCase());
        const subjectLen = item.lookup.length;

        return (
          <div
            className={className}
            onMouseEnter={(e) => {
              setSelectedItem(idx);
            }}
            onClick={(e) => {
              e.preventDefault();
              dropdownClick(name, item.lookup, item.disabled === true);
            }}
            key={idx}
          >
            {prefixPos > 0 ? item.lookup.substring(0, prefixPos) : ""}
            <strong>
              {item.lookup.substring(prefixPos, prefixPos + itemLength)}
            </strong>
            {prefixPos + itemLength < subjectLen
              ? item.lookup.substring(prefixPos + itemLength)
              : ""}
            {item.disabled ? " (selected)" : ""}
            <input type="hidden" value={item.lookup} />
          </div>
        );
      })}
    </div>
  );

  if (dropdownList.length === 0) {
    dropdown = null;
  }

  return (
    <div {...divAttrs}>
      {label ? (
        <label htmlFor={inputId} className={"text-sm " + cursor}>
          {label}
        </label>
      ) : null}
      <input {...attrs} />
      {focused ? dropdown : null}
    </div>
  );
};

export default InputDropDown;
