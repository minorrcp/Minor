import processing.pdf.*;

void setup()
{
  //size(600, 600, PDF, "2b5.pdf");
  size(600, 600);
  frameRate(1);
}

int vierkantAantal = 7;
int vierkantGrootte = (1000/vierkantAantal);
void draw()
{
  
  background(255);
  noStroke();
  translate(width/2,height/2);
  //float theta = PI*mouseY / width;
  float theta = random(1,10);
  rotate(theta);
  rectMode(CENTER);
  int k = 25;
  int kleur = int(random(20,40));
  int opacity = 240;
  for(int i = 0; i < vierkantAantal; i++)
  {
    k = k + 5;
    opacity = opacity - 10;
    theta = PI*(i*10) / width;
    rotate(theta);
    fill(255, (i*kleur), 50);
    rect(0, 0, (1000-(vierkantGrootte*i)), (1000-(vierkantGrootte*i)));
    for(int j = 0; j < k; j++)
    {
      fill(255, (i*35), 50, opacity);
      rect(random(-400,400), random(-400,400), random(20,100), random(20,100));
    }
    //println((90+(i*vierkantGrootte)));
  }
  //println("Finished.");
  //exit();
}
