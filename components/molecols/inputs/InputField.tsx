import React, { useRef, useState, useEffect } from "react";
import PrimaryButton from "../../atoms/buttons/PrimaryButtons";

const InputField: React.FC = () => {
  //setup input ref
  const inputRef = useRef<HTMLInputElement>(null);
  //setup input form
  const [input, setInput] = useState<string>("");

  //setup function of the form --> click event form
  const handleClick = () => {
    console.log(input);
    //setup redux --> send data of click
  };

  //setup function of the form --> input add form
  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();

    //setup redux
    setInput("");
  };

  return (
    <div className="flex flex-col items-center justify-center my-[2rem] lg:my-[6rem]">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-[22px] font-bold">Contattami ora!</h1>
        <p className="text-center p-[2rem] lg:px-[10rem]">
          Apri il mio calendario digitale e fissa subito una call insieme a me!{" "}
          <br />
          Io ti risponderò subito, proponendoti alcune domande per cercare di
          risolvere i tuoi problemi digitali
        </p>
      </div>
      {/* TO DO */}
      {/* Collegare form email */}
      <form
        className="input"
        onSubmit={(e) => {
          handleAdd(e);
          inputRef.current?.blur();
        }}
      >
        {/* <input
          type="text"
          ref={inputRef}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          className="w-[15rem]  shadow-lg  rounded-[12px] p-[10px] hover:p-[8px]"
          placeholder="Inserisci qui la tua email "
        /> */}

        <PrimaryButton
          label="Fissa ora una call"
          onClick={() => {
            window.open("https://calendly.com/francescomazzi/15min", "_blank");
          }}
        />
      </form>
    </div>
  );
};

export default InputField;
