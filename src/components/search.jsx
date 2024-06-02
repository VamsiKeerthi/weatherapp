export default function Search({ search, setSearch, handleSearch }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Enter Location"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}
