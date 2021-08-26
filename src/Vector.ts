

export default class Vector {

  public x: number;
  public y: number;

  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }

  public get magnitude(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }

  public get angle(): number {
    return Math.atan2(this.y, this.x);
  }

}