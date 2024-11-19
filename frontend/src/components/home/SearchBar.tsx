import useForm from "../../hooks/useForm";

function SearchBar() {
  const searchInput = useForm("text");

  return (
    <form>
      <input {...searchInput} aria-label="Search input." />
    </form>
  );
}

export default SearchBar;
