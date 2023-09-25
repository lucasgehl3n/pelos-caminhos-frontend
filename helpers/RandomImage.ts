export default class RandomImage {
  private imageUrls: string[];

  constructor(imageUrls: string[]) {
    this.imageUrls = imageUrls;
  }

  public randomImage(): string {
    const randomIndex = Math.floor(Math.random() * this.imageUrls.length);
    return this.imageUrls[randomIndex];
  }
}