import React, { Dispatch, SetStateAction } from "react";
import { FieldValidationMsg } from "@/components/general/error-msg";

//
// Exports types for constructing the data array to be sent to this component
//
export type OptionsGroup = {
  type: "group";
  key: number;
  groupName: string;
  disabled?: boolean;
  groupDesc: {
    key: number;
    value: string;
    disabled?: boolean;
  }[];
};

export type OptionsValue = {
  type: "value";
  key: number;
  value: string;
  disabled?: boolean;
};

export type OptionsType = OptionsGroup | OptionsValue;

//
//
//
interface SelectState {
  selectedValue: string;
  options: OptionsType[];
}

export interface SelectInputStateType {
  [name: string]: SelectState;
}

// Props that can be sent to the Select Input component
interface SelectInputProps {
  name: string;
  title: string;
  label?: string;
  state: SelectState;
  updateState: Dispatch<SetStateAction<SelectInputStateType>>;

  selectInputClass?: string;
  loading: boolean;
  disabled: boolean;
  size?: number;
  emptyDataValue?: string;
  required?: boolean;

  // Error field
  errorMsg?: string;
  errorType?: "fatal" | "warning" | "info";
  errorClass?: string;
}

type AttrsType = {
  className: string;
  id: string;
  name: string;
  title: string;
  value?: string;
  size?: number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  // onFocus: (e: React.FocusEvent<HTMLSelectElement>) => void,
  disabled?: boolean;
  required?: boolean;
};

type ValidationComp = {
  className?: string;
  msgType: "fatal" | "warning" | "info";
  msg: string;
};

//
// SelectInput
//
// This is a component that creates an select element on the page. The following are passed as props
//
//
//  dataTest            The data-test name for testing
//  id                  element id value
//  name                name of the element
//  title               The title is added to the input element
//  label               Displays a label if this is set
//  state               This is the useState value
//  updateState
//  disabled            Sets the select field to read only - when data is loading.
//  value               The value of the field
//  size                Display size
//  required            Set to true if the element is mandatory
//  emptyDataValue      This is displayed if no data is passed in
//  selectInputClass    This is a class to position the element
//
const SelectInput: React.FC<SelectInputProps> = ({
  name,
  title,
  label,
  state,
  updateState,

  selectInputClass,
  loading,
  disabled,
  size,
  emptyDataValue,
  required,

  errorMsg,
  errorClass,
  errorType = "info",
}) => {
  const inputId = `SelectInput_${name}`;
  const cursor = loading
    ? "cursor-wait"
    : disabled
      ? "cursor-not-allowed"
      : "cursor-pointer";

  const divAttrs = {
    className: `w-full ${selectInputClass ? selectInputClass : ""}`,
    "data-cy": `SelectInput${"-" + name}`,
  };
  let validationMsg = null;

  const attrs: AttrsType = {
    className:
      "opacity-100 w-full p-2 bg-white-900 top-0 bottom-0 border border-1 border-input-border rounded-lg cursor-pointer focus:border-blue-dark focus:outline-none focus:ring-0",
    id: inputId,
    name,
    title,
    // The levels handler for its selection
    onChange: (event: React.ChangeEvent<HTMLSelectElement>): void => {
      updateState((prev: SelectInputStateType): SelectInputStateType => {
        return {
          ...prev,
          [name]: { ...prev[name], selectedValue: event.target.value },
        };
      });
    },
  };

  if (state.selectedValue) {
    attrs["value"] = state.selectedValue;
  }
  if (disabled) {
    attrs["disabled"] = true;
  }
  if (size) {
    attrs["size"] = size;
  }
  if (required) {
    attrs["required"] = true;
  }

  let selectOptions: JSX.Element[] = [];
  if (state.options !== undefined && state.options !== null) {
    selectOptions = state.options.map((opt) => {
      if (opt.type === "group") {
        const opts = opt.groupDesc.map((op) => {
          return (
            <option
              disabled={disabled ? disabled : false}
              key={op["key"]}
              value={op["value"]}
            >
              {op["value"]}
            </option>
          );
        });

        return (
          <optgroup key={opt.key} label={opt.groupName}>
            {opts}
          </optgroup>
        );
      }
      return (
        <option
          disabled={disabled ? disabled : false}
          key={opt["key"]}
          value={opt["value"]}
        >
          {opt["value"]}
        </option>
      );
    });
  }

  if (state.options.length === 0) {
    if (emptyDataValue) {
      selectOptions.unshift(
        <option key="0" value={emptyDataValue}>
          {emptyDataValue}
        </option>,
      );
    }
  }

  if (typeof errorMsg === "string" && errorMsg.length > 0) {
    let params: ValidationComp = {
      msg: errorMsg,
      msgType: ["info", "warning", "fatal"].includes(errorType)
        ? errorType
        : "info",
      className: !errorClass ? "mt-1" : errorClass,
    };
    validationMsg = <FieldValidationMsg {...params} />;
  }

  return (
    <div {...divAttrs}>
      {label ? (
        <label htmlFor={inputId} className={cursor + " text-sm"}>
          {label}
        </label>
      ) : null}

      <select {...attrs}>{selectOptions}</select>
      {validationMsg}
    </div>
  );
};

export default SelectInput;
