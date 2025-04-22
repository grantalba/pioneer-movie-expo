import React from "react";

const Each = ({ render, of = [] }: any) => {
  // Render each element using the 'render' prop
  return (
    <>
      {of.map((item: any, index: any) =>
        // Pass the item to the render function
        render(item, index)
      )}
    </>
  );
};

export default Each;
