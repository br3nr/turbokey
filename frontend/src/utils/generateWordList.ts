import Papa from "papaparse";

export async function generateWordList(): Promise<string> {
  const response = await fetch("/wordlist/wordlist.csv");
  const data = await response.text();

  const parsedData = Papa.parse(data, { header: true }).data;
  // @ts-ignore
  const words = parsedData.map((row) => row.lemma);
  var sentence = "";

  var randomIndexes: number[] = [];

  for (var i = 0; i < 40; i++) {
    let randomIndex = Math.floor(Math.random() * words.length);

    while (randomIndexes.includes(randomIndex)) {
      randomIndex = Math.floor(Math.random() * words.length);
    }

    let randomWord = words[randomIndex];

    randomIndexes.push(randomIndex);

    sentence += randomWord + " ";
  }
  return sentence;
}
