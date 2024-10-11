/* eslint-disable react/prop-types */
const TabButton = ({ children, ...props }) => (
  <>
    {children}
    <button {...props}>Submit</button>
  </>
);

export default TabButton;
