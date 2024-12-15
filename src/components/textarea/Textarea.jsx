import React from "react";
import {useController} from "react-hook-form";

const Textarea = ({name = "", type = "text", children, control, ...props}) => {
    const {field} = useController({
        control,
        name,
        defaultValue: "",
    });


    const inputClassNames = `w-full p-5 bg-grayLight rounded-md min-h-[200px] font-medium transition-all duration-200 ease-linear border resize-none border-solid border-grayLight border-transparent focus:bg-white focus:border-primary placeholder-grayDark`;

    return (
        <div className="relative w-full">
      <textarea
          className={inputClassNames}
          id={name}
          type={type}
          {...field}
          {...props}
      />
            {children ? (
                <div className="absolute transform -translate-y-1/2 cursor-pointer right-5 top-1/2">
                    {children}
                </div>
            ) : null}
        </div>
    );
};

export default Textarea;
