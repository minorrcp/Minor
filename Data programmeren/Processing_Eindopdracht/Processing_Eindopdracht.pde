void setup() {
  noStroke();
  textAlign(CENTER);
  textFont(loadFont("data/Helvetica-12.vlw"));
  textFont(loadFont("data/Helvetica-13.vlw"));
  textFont(loadFont("data/Helvetica-24.vlw"));
  size(630, 693);
}

void draw() {
  // Variabelen om de temperatuur te berekenen.
  int minTemperatuur = 0;
  int maxTemperatuur = 0;
  int berekenMinGemiddelde = 0;
  int berekenMaxGemiddelde = 0;
  int minGemiddelde = 0;
  int gemiddelde = 0;
  int maxGemiddelde = 0;
  
  // Mouse over
  int currentDay = 0;
  
  // Variabelen voor de layout.
  int layoutX = 80;
  int layoutY = 93;
  
  // Variabelen voor de cirkels.
  int cirkelGrootte = 14;
  int cirkelAfstand = 18;
  int miniCirkel = 6;
  
  // Variabelen voor de kleuren van de cirkels.
  int[] rood = {51, 55, 59, 64, 68, 72, 76, 80, 85, 89, 93, 97, 101, 106, 110, 114, 118, 123, 127, 131, 135, 139, 144, 148, 152, 156, 160, 165, 169, 173};
  int[] groen = {114, 112, 110, 107, 105, 103, 101, 99, 97, 94, 92, 90, 88, 86, 84, 81, 79, 77, 75, 73, 71, 68, 66, 64, 62, 60, 58, 55, 53, 51};
  int[] blauw = {173, 169, 164, 160, 156, 151, 147, 143, 139, 134, 130, 126, 121, 117, 113, 108, 104, 100, 95, 91, 87, 82, 78, 74, 70, 65, 61, 57, 52, 48};
  
  // Haal de data op uit het .txt bestand.
  String lines[] = loadStrings("data/KNMI_20130831.txt");
  
  background(220);
  
  // Titel.
  fill(255);
  rect(0, 0, width, 43);
  fill(0);
  textSize(24);
  text("Temperaturen Volkel periode augustus 2013", (layoutX*4)-1, 29);
  
  // Bron.
  fill(255);
  rect(0, height-17, width, 17);
  fill(128);
  textSize(12);
  text("Bron: KNMI", (layoutX*4)-5, layoutY+38+((lines.length-1)*18));
  
  // Gemiddelden berekenen.
  for(int i = 1; i < lines.length; i++) {
    String[] temperaturen = split(lines[i], ',');
    minTemperatuur = int(round(float(trim(temperaturen[2]))/10));
    maxTemperatuur = int(round(float(trim(temperaturen[3]))/10));
    berekenMinGemiddelde += minTemperatuur;
    berekenMaxGemiddelde += maxTemperatuur;
  }
  
  // Uitkomst gemiddelden.
  minGemiddelde = berekenMinGemiddelde / (lines.length-1);
  gemiddelde = ((berekenMinGemiddelde+berekenMaxGemiddelde) / (lines.length-1)) / 2;
  maxGemiddelde = berekenMaxGemiddelde / (lines.length-1);
  
  // Kleine cirkels voor gemiddelde min. / gemiddelde / gemiddelde max. temperatuur.
  for(int i = 1; i < lines.length; i++)
  {  
    fill(rood[minGemiddelde-8], groen[minGemiddelde-8], blauw[minGemiddelde-8], 64);
    ellipse((cirkelAfstand*minGemiddelde)-layoutX, (cirkelAfstand*i)+layoutY, miniCirkel, miniCirkel);
    
    fill(rood[gemiddelde-8], groen[gemiddelde-8], blauw[gemiddelde-8], 64);
    ellipse((cirkelAfstand*gemiddelde)-layoutX, (cirkelAfstand*i)+layoutY, miniCirkel, miniCirkel);
    
    fill(rood[maxGemiddelde-8], groen[maxGemiddelde-8], blauw[maxGemiddelde-8], 64);
    ellipse((cirkelAfstand*maxGemiddelde)-layoutX, (cirkelAfstand*i)+layoutY, miniCirkel, miniCirkel);
  }
  
  // Mouse-over effecten toevoegen.
  for(int i = 1; i <= 30; i++) {
    if(mouseX > (18*i)+35 && mouseX < (18*i)+54 && mouseY > layoutX+23 && mouseY < layoutY+10+((lines.length-1)*18)) {
      // Verticale mouse-over lijnen.
      fill(220);
      rect((18*i)+43, layoutY+9, 6, (lines.length-1)*cirkelAfstand, 3, 3, 3, 3);
      fill(rood[i-1], groen[i-1], blauw[i-1], 64);
      rect((18*i)+43, layoutY+9, 6, (lines.length-1)*cirkelAfstand, 3, 3, 3, 3);
      
      // Horizontale mouse-over lijnen.
      for(int p = 1; p < lines.length; p++)
      {
        // Horizontale lijnen
        if(mouseX > layoutX-27 && mouseX < (layoutX-44)+((lines.length-1)*18) && mouseY > (p*18)+layoutX+5 && mouseY < (p*18)+layoutX+24)
        {
          fill(220);
          rect(layoutX-25, (18*p)+layoutX+10, (lines.length-1)*cirkelAfstand-18, 6, 3, 3, 3, 3);
          fill(rood[i-1], groen[i-1], blauw[i-1], 64);
          rect(layoutX-25, (18*p)+layoutX+10, (lines.length-1)*cirkelAfstand-18, 6, 3, 3, 3, 3);
          currentDay = p;
        }  
      }
      
      // Tekstballon gemiddelde min. temperatuur.
      if(i == minGemiddelde-7) {
        fill(255);
        triangle(115, layoutY-24, 121, layoutY-24, 118, layoutY-20);
        rect(29, layoutY-42, 178, 18, 8, 8, 8, 8);
        fill(128,128,128);
        textSize(12);
        text("Gemiddelde min. temperatuur", 118, layoutY-29);
      }
      
      // Tekstbalon gemiddelde temperatuur.
      if(i == gemiddelde-7) {
        fill(255);
        triangle(241, layoutY-24, 247, layoutY-24, 244, layoutY-20);
        rect(168, layoutY-42, 152, 18, 8, 8, 8, 8);
        fill(128,128,128);
        textSize(12);
        text("Gemiddelde temperatuur", 244, layoutY-29);
      }
      
      // Tekstbalon gemiddelde max. temperatuur.
      if(i == maxGemiddelde-7) {
        fill(255);
        triangle(349, layoutY-24, 355, layoutY-24, 352, layoutY-20);
        rect(262, layoutY-42, 181, 18, 8, 8, 8, 8);
        fill(128,128,128);
        textSize(12);
        text("Gemiddelde max. temperatuur", 353, layoutY-29);
      }
      
      // Temperaturen.
      fill(255);
      triangle((i*18)+43, layoutY+1, (i*18)+49, layoutY+1, (i*18)+46, layoutY+5);
      rect((i*18)+7, layoutY-16, 78, 17, 8, 8, 8, 8);
      fill(128,128,128);
      textSize(12);
      text((i+7) + "º Celcius", (i*18)+46, layoutY-3);
    }
  }
  
  // Verticale balk met dagen.
  fill(255);
  rect(27, layoutY+9, cirkelAfstand+4, (lines.length-1)*cirkelAfstand, 8, 8, 8, 8);
  
  for(int i = 1; i < lines.length; i++)
  {
    if(currentDay == i)
    {
      fill(0);
      textSize(13);
    }else{
      fill(128);
      textSize(12);
    }
    
    text(i, 39, (i*cirkelAfstand) + layoutY + 4);  
  }
  
  // Cirkels.
  for(int i = 1; i < lines.length; i++) {
    String[] temperaturen = split(lines[i], ',');
    minTemperatuur = int(round(float(trim(temperaturen[2]))/10));
    maxTemperatuur = int(round(float(trim(temperaturen[3]))/10));
    berekenMinGemiddelde += minTemperatuur;
    berekenMaxGemiddelde += maxTemperatuur;
    
    for(int j = 0; j <= maxTemperatuur-minTemperatuur; j++) {
      cirkelGrootte = 14;
      
      // Witte rand om de min. gemiddelde temperatuur cirkels.
      if((minTemperatuur+j) == minGemiddelde) {
        fill(255);
        ellipse((minTemperatuur*cirkelAfstand)+(cirkelAfstand*j)-layoutX, (cirkelAfstand*i)+layoutY, cirkelGrootte+4, cirkelGrootte+4);
      }
      
      // Witte rand om de gemiddelde temperatuur cirkels.
      if((minTemperatuur+j) == gemiddelde) {
        fill(255);
        ellipse((minTemperatuur*cirkelAfstand)+(cirkelAfstand*j)-layoutX, (cirkelAfstand*i)+layoutY, cirkelGrootte+4, cirkelGrootte+4);
      }
      
      // Witte rand om de max. gemiddelde temperatuur cirkels.
      if((minTemperatuur+j) == maxGemiddelde) {
        fill(255);
        ellipse((minTemperatuur*cirkelAfstand)+(cirkelAfstand*j)-layoutX, (cirkelAfstand*i)+layoutY, cirkelGrootte+4, cirkelGrootte+4);
      }
      
      // Extra mouse-over "halftone effect" toevoegen.
      float disX = ((minTemperatuur*cirkelAfstand)+(cirkelAfstand*j)-layoutX) - mouseX;
      float disY = (cirkelAfstand*i)+layoutY - mouseY;
      
      if(sqrt(sq(disX) + sq(disY)) < (cirkelAfstand+2)/2) {
        cirkelGrootte = 17;
      }
      
      else if(sqrt(sq(disX) + sq(disY)) < (cirkelAfstand*3)/2) {
        cirkelGrootte = 16;
      }
      
      else if(sqrt(sq(disX) + sq(disY)) < (cirkelAfstand*6)/2) {
        cirkelGrootte = 15;
      }
      
      // Cirkels aanmaken, gebaseerd op de minimum en maximum temperaturen.
      fill(rood[minTemperatuur-8+j], groen[minTemperatuur-8+j], blauw[minTemperatuur-8+j]);
      ellipse((minTemperatuur*cirkelAfstand)+(cirkelAfstand*j)-layoutX, (cirkelAfstand*i)+layoutY, cirkelGrootte, cirkelGrootte);
    }
  }
}
