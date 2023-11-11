export class InputSentence {
  
  private inputChars: string;
  private inputWords: string[];
  private current: string;
  private length: number;
  private wordCount: number;

  constructor() {
    this.inputChars = "";
    this.inputWords = [];
    this.current = "";
    this.length = 0;
    this.wordCount = 0;
  }

  getSentence(): string {
    return this.inputChars;
  }

  getWords(): string[] {
    return this.inputWords
  }

  getWordAtIndex(index: number): string | undefined {
    return this.inputWords[index]
  }

  getLastWord(): string | undefined {
    return this.inputWords[this.inputWords.length - 1]
  }
}
