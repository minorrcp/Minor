import processing.pdf.*;

void setup()
{
  size(600, 600, PDF, "2a_5.pdf");
  //size(600, 600);
}

int vierkantAantal = 5;
int vierkantGrootte = (1000/vierkantAantal);
void draw()
{
  
  background(255);
  noStroke();
  translate(width/2,height/2);
  float theta = 0.8;
  rotate(theta);
  rectMode(CENTER);
  for(int i = 0; i <= vierkantAantal; i++)
  {
    fill(i*60, 255, 50);
    rect(0, 0, (1000-(vierkantGrootte*i)), (1000-(vierkantGrootte*i)));
  }
  exit();
}
