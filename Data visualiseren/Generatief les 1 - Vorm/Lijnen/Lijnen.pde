void setup()
{
  size(600, 600);
  noStroke(); 
}

void draw()
{
  // Variabelen aanmaken, hiermee kan het hele figuur veranderd worden qua kleuren en afmetingen.
  int balkDikte = 10;
  int balkTussenRuimte = 108;
  int balkTussenRuimte2 = 36;
  int[] rood = {149,237,87,235,53,87,201,249,190};
  int[] groen = {123,123,199,59,74,151,184,208,216};
  int[] blauw = {182,3,199,36,154,46,217,171,217};
  int[] afstand = {7,25};
  int i = 0;
  
  background(255);
  
  // De eerste reeks verticale lijnen
  for(; i < 3; i++)
  {
    fill(rood[i], groen[i], blauw[i]);
    for(int j = 0; j < 6; j++)
    {
      rect((j*balkTussenRuimte)+(i*balkTussenRuimte2)+afstand[0], 0, balkDikte, displayHeight);
    }
  }
  // De eerste reeks horizontale lijnen
  for(; i < 6; i++)
  {
    fill(rood[i], groen[i], blauw[i]);
    for(int j = 0; j < 6; j++)
    {
      rect(0, (j*balkTussenRuimte)+((i-3)*balkTussenRuimte2)+afstand[0], displayWidth, balkDikte);
    }
  }
  // De tweede reeks verticale lijnen
  for(; i < 9; i++)
  {
    fill(rood[(i-3)], groen[(i-3)], blauw[(i-3)]);
    for(int j = 0; j < 6; j++)
    {
      rect((j*balkTussenRuimte)+((i-6)*balkTussenRuimte2)+afstand[1], 0, balkDikte, displayHeight);
    }
  }
  // De tweede reeks horizontale lijnen
  for(; i < 12; i++)
  {
    fill(rood[(i-3)], groen[(i-3)], blauw[(i-3)]);
    for(int j = 0; j < 7; j++)
    {
      rect(0, (j*balkTussenRuimte)+((i-12)*balkTussenRuimte2)+afstand[1], displayWidth, balkDikte);
    }
  }
}
