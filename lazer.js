class Laser {
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.r = 5;  //radius 
    this.diam = this.r * 2;  //diameter
    this.toDelete = false; //flag
  }
  show(){
    noStroke();
    fill(255,255,0);  //lazer color
    ellipse(this.x, this.y, this.diam, this.diam);
  }
  move(){
    this.y = this.y - 20; //lazer movement upwards
        
  }
  hits(alien){
    // dist() functions measures distance between two points
    var d = dist(this.x, this.y, alien.x, alien.y);
    if(d < this.r + alien.radius) {
      return true;
    }
    else {
      return false;
    }
  }
  
  remove() {
    this.toDelete = true;
  }
}