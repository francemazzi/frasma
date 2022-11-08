import React, { useRef, useState, useEffect } from "react";
import PrimaryButton from "../../atoms/buttons/PrimaryButtons";

const InputField: React.FC = () => {
  //setup input ref
  const inputRef = useRef<HTMLInputElement>(null);
  //setup input form
  const [input, setInput] = useState<string>("");

  //setup function of the form --> click event form
  const handleClick = () => {
    //setup redux --> send data of click
  };

  //setup function of the form --> input add form
  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    //setup redux
    setInput("");
  };

  return (
    <div>
      <form
        className="input"
        onSubmit={(e) => {
          handleAdd(e);
          inputRef.current?.blur();
        }}
      >
        <input
          type="text"
          ref={inputRef}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          className="input__box"
          placeholder="Insert a placeholder "
        />

        <PrimaryButton label="Add your label" />
      </form>
    </div>
  );
};

export default InputField;
