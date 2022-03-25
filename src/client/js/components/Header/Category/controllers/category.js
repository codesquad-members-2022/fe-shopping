const handleListMouseOver = ({ target }) => {
  target.classList.add("list-over");
};

const handleListMouseOut = ({ target }) => {
  target.classList.remove("list-over");
};
export { handleListMouseOver, handleListMouseOut };
