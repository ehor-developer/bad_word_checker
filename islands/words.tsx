import { useEffect, useState } from "preact/hooks";

interface WordsType {
  name: string;
  id: string;
}

interface SaizencodeTypes {
  word: WordsType[];
}

export default function Words({ word }: SaizencodeTypes) {
  const [searchWords, setSearchWords] = useState("");
  const [filteredWords, setFilteredWords] = useState<WordsType[]>([]);

  const search = (value: string) => {
    const keywords = word.map((wordItem) => wordItem.name);
    const regex = new RegExp(keywords.join("|"), "gi");
    const matches = value.match(regex);
    if (matches) {
      const filtered = word.filter((wordItem) => matches.includes(wordItem.name));
      setFilteredWords(filtered);
    } else {
      setFilteredWords([]);
    }
  };

  useEffect(() => {
    search(searchWords);
  }, [searchWords]);

  return (
    <div>
      <div class="w-full border-2 border-gray-200 rounded-lg">
        <div class="m-4">
          <textarea
            type="text"
            placeholder="文を入力してください。"
            value={searchWords}
            onInput={(e) =>
              setSearchWords((e.target as HTMLTextAreaElement).value)
            }
            class="border-2 border-gray-400 rounded-md h-40 p-3 block w-full appearance-none leading-normal focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>
      <div class="items-center">
        {filteredWords.map((wordItem) => (
          <div key={wordItem.id} class="m-1">
            <p class="text-2xl font-bold text-white rounded-md bg-red-500 px-3 inline">{wordItem.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}