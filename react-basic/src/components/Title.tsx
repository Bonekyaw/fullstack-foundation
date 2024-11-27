import React, { memo } from "react";

interface onChangeModeProps {
  onChangeMode: () => void;
}

function Title({ onChangeMode }: onChangeModeProps) {
  console.log("Title rendered");

  return (
    <>
      <h1>Optimization: memo, useMemo, useCallback</h1>
      <button onClick={onChangeMode}>Toggle Mode</button>
    </>
  );
}

export default memo(Title);
