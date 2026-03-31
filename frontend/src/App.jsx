import { useState } from "react";
import "./App.css";

function App() {
  const [searchWord, setSearchWord] = useState("");
  const [addWord, setAddWord] = useState("");
  const [searchResult, setSearchResult] = useState("");
  const [wordAdded, setWordAdded] = useState("");
  const [suggestVal, setSuggestVal] = useState(1);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const wordRes = await fetch(
        `http://localhost:5000/api/word?word=${searchWord}&k=${suggestVal}`,
      );
      const data = await wordRes.json();
      setSearchResult({ word: data.word, frequency: data.frequency });
    } catch (error) {
      console.log(`Error ${error.message}`);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const AddWordRes = await fetch("http://localhost:5000/api/word", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          word: addWord,
        }),
      });
      const data = await AddWordRes.json();
      console.log(data.word);
      setWordAdded(data.word);
      if (!data.ok) {
        alert("Word already exist");
      } else {
        alert(`${data.word} added successfully to dictionary`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section>
        <h1>Dictionary Search & Auto-Suggestion System</h1>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            name="word"
            id="word"
            placeholder="Search a word"
            value={searchWord}
            onChange={(e) => {
              setSearchWord(e.target.value);
            }}
          />
          <label htmlFor="suggest">
            <span>Suggestions</span>
            <input
              type="number"
              id="number"
              value={suggestVal}
              onChange={(e) => {
                setSuggestVal(e.target.value);
              }}
            />
          </label>
          <button type="submit">Search</button>
        </form>
        {searchResult && (
          <div>
            <h3>Word Found</h3>
            <span>Searched Word: {searchResult.word}</span>
            <span>Frequency: {searchResult.frequency}</span>
          </div>
        )}

        <div>
          <h2>Add New word </h2>
          <form onSubmit={handleAdd}>
            <input
              type="text"
              name="add-word"
              placeholder="New Word"
              value={addWord}
              onChange={(e) => {
                setAddWord(e.target.value);
              }}
            />
            <button>Add Word</button>
          </form>
        </div>
      </section>
    </>
  );
}

export default App;
