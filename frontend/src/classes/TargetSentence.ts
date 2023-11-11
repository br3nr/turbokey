export class TargetSentence {
  private targetChars: string;
  private targetWords: string[];
  private length: number;

  constructor(inputSentence: string) {
    this.targetChars = inputSentence;
    this.targetWords = inputSentence.split(' ');
    this.length = this.targetWords.length;
  }

  getSentence(): string {
    return this.targetChars;
  }

  getWords(): string[] {
    return this.targetWords;
  }

  getLength(): number {
    return this.length;
  }

  getWordAtIndex(index: number): string | undefined {
    return this.targetWords[index];
  }

  getLastWord(): string | undefined {
    return this.targetWords[this.targetWords.length - 1];
  }
}
