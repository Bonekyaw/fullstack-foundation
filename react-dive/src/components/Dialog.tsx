import { forwardRef } from "react";

type DialogProps = {
  title: string;
};

const Dialog = forwardRef<HTMLDialogElement, DialogProps>(({ title }, ref) => {
  return (
    <dialog ref={ref}>
      <h3>{title}</h3>
      <form method="dialog">
        <button>Close</button>
      </form>
    </dialog>
  );
});

export default Dialog;
