# ColorVision 🎨
#### Ein Tool zur Simulation von Farbfehlsichtigkeit und Farbblindheit

Das menschliche Auge ist ein echter Alleskönner! Es ist in der Lage, Formen, Farben und Bewegungen wahrzunehmen. Dabei ist das Sehen ein hochkomplexer Vorgang, bei dem nicht nur das Auge, sondern auch das Gehirn beteiligt ist. Besonders die Wahrnehmung von Farben ist eine erstaunliche Leistung. Sie beruht auf der Fähigkeit, die drei Grundfarben Rot, Grün und Blau zu unterscheiden. Alle anderen Farben mischt der Mensch aus diesen Grundfarben zusammen. Zuständig für die Farbwahrnehmung sind spezielle lichtempfindliche Zellen, sogenannte Zapfen. Sie liegen zusammen mit den Stäbchen, die für die Helligkeitswahrnehmung zuständig sind, in der Netzhaut.
Menschen besitzen normalerweise drei verschiedene Arten von Zapfen, die auf unterschiedliche Wellenlängen reagieren - auf kurzwelliges (blaues), mittelwelliges (grünes) oder langwelliges (rotes) Licht. Deshalb liest man oft auch den Begriff LMS-Zapfen für die verschiedenen Zapfenarten. Jeder Zapfentyp ist also für eine Grundfarbe zuständig. Bei einem Teil der Bevölkerung funktionieren diese Zapfen nicht immer korrekt, dann entsteht eine Farbschwäche. Sind ein oder mehrere Zapfentypen gar nicht vorhanden, entsteht eine teilweise oder vollständige Farbenblindheit. Die beiden Begriffe "Farbfehlsichtigkeit" und "Farbblindheit" meinen somit also nicht das Gleiche. 

Von Farbenblindheit ist etwa 1 von 12 Männern (8 %) und 1 von 200 Frauen betroffen. Weltweit gibt es schätzungsweise 300 Millionen Menschen mit Farbenblindheit, was verhältnismäßig betrachtet fast der gesamten Bevölkerung der USA entspricht! 
###### (Quellen: [colourblindawareness](https://www.colourblindawareness.org/colour-blindness/types-of-colour-blindness/), [FOCUS](https://focus-arztsuche.de/magazin/gesundheitswissen/farbfehlsichtigkeit-und-farbenblindheit-erkennen))

## Wie funktioniert die Simulation?

In diesem Projekt ist es möglich die folgenden **Farbblindheiten** zu simulieren:
- Protanopia (Rotblindheit)
- Deuteranopia (Grünblindheit)
- Tritanopia (Blaublindheit)

sowie die folgenden **Farbschwächen**:

- Protanomaly (Rotschwäche)
- Deuteranomaly (Grünschwäche)
- Tritanomaly (Blauschwäche)

Zur Umwandlung der Farbwerte des Videomaterials in die entsprechende Farbblindheit wurden zwei verschiedene Quellen verwendet, die unterschiedliche Farb-Matrizen lieferten. 

> **Quelle 1: http://www.colorjack.com/labs/colormatrix/ _leider nur noch unter_ http://web.archive.org/web/20081014161121/http://www.colorjack.com/labs/colormatrix/ _erreichbar_)
Quelle 2: https://www.inf.ufrgs.br/~oliveira/pubs_files/CVD_Simulation/CVD_Simulation.html**

Die 1. Quelle liefert für diese Anwendung die Farb-Matrizen für die oben aufgelisteten **Farbblindheiten**. Pro Farbblindheit existiert eine 3x3 Farb-Matrix, die jeweils für jede Grundfarbe 3 Werte für Rot, Grün und Blau enthält. 
Für die Rotblindheit (Protanopia) sieht die Matrix wie folgt aus:
> |0.567 ⠀0.433 ⠀⠀⠀0⠀⠀|  ⠀⠀⠀=> Rot
|0.558 ⠀0.442 ⠀⠀⠀0⠀⠀|⠀⠀  ⠀=> Grün
|⠀⠀0 ⠀⠀0.242 ⠀⠀0.758| ⠀⠀⠀=> Blau

Für den Rot-Kanal würden wir also den Rot-Wert um 56,667 % nach oben verschieben (von der Standardposition aus), und den Grün-Wert um 43,333 % nach oben. Da der letzte Wert Null ist, ändern wir den Blau-Wert nicht. Für den grünen & blauen Kanal sieht die Vorgehensweise ebenso aus. Diese Methode nennt sich auch _Matrix Shifting Algorithm_. 

Die 2. Quelle ist eine Studie aus dem Jahre 2009 von [Machado et al.](https://www.inf.ufrgs.br/~oliveira/pubs_files/CVD_Simulation/CVD_Simulation.html). Deren Modell basiert auf der Stufentheorie des menschlichen Farbsehens und wird aus Daten abgeleitet, die in elektrophysiologischen Studien ermittelt wurden. Das entwickelte Modell wurde durch eine experimentelle Auswertung mit Gruppen von Personen mit Farbsehschwäche und solchen mit normalem Farbsehvermögen validiert, weshalb es uns als vertrauliche Quelle für unsere Webanwendung dient.
Das Modell unterscheidet sich von der ersten Quelle vor allem darin, dass man hier mit unterschiedlichen Schweregraden hantiert, weshalb sich hieraus die Farbschwächen verwenden. Farb-Matrixen mit dem Schweregrad 1 müssten somit Farbblindheit liefern