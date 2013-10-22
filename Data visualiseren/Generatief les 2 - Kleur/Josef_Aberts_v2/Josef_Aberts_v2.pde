void setup()
{
  size(600, 600);
  noStroke();
}

void draw()
{
  int size = 450;
  float verkleining = 1;
  int stap = 40;
  int type = int(random(1,3));
  int h = int(random(1, 360));
  int s = (type == 2 ? 125 : 100);
  int b = (type == 2 ? 360 : 100);
  
  println(type);
  
  colorMode(HSB, 360, 100, 100);
  background(h, s, b);
  
  for (int i = 1; i <= 3 ; i++)
  {
    if(i == 1)
    { 
      h = h + 10;
      b = (type == 1 ? b - 6 : h + 6);
    }
    else if(i == 2)
    {
      h = h + 15;
      b = (type == 1 ? b - 12 : h + 12);
    }
     else if(i == 3)
    {
      h = h + 20;
      b = (type == 1 ? b - 18 : h + 18);
    }
    fill(h, s, b);
    rect((i * 60), (i * 90), (width - (i * 60 * 2)), (height - (i * 90) - (i * 30)));
    verkleining = verkleining + 0.2;
    stap = stap + 10;
  }
}
