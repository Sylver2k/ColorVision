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

## Verwendete Technologien

Die Webanwendung wurde mit dem Framework [React](https://reactjs.org/) erstellt und in Typescript geschrieben. Für die Simulation wurde die build-in [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) verwendet
Die React App besteht aus verschiedenen Komponenten, die alle miteinander zusammenwirken. Die Funktionalität für die Simulation findet sich beispielsweise in der `Player.tsx` Komponente wieder

## Installationsanleitung
Für die Anwendung wird [Node.js](https://nodejs.org/en/) benötigt und eine IDE

1. Git Repository clonen / forken
2. Repository in IDE öffnen
3. Im Terminal `npm install` ausführen
4. Nach der Installation aller Dependencies`npm run start`ausführen
5. Die Anwendung ist nun unter [http://localhost:3000](http://localhost:3000) erreichbar

## Benutzeranleitung
Nach dem Start der Anwendung sieht man einen Player mit verschiedenen Buttons. Die Buttons sollten in der Regel durch ihre aussagekräftigen Bezeichnungen bzw. ihren erwartungskonformen Icons, keine großen Erklärungen mehr benötigen (Selbstbeschreibungsfähigkeit). Sofern kein eigenes Video hochgeladen worden ist, wird ein Standardvideo verwendet, mit dem sich die Farbfehlsichtigkeit/Farbblindheit simulieren lässt. Dafür wählt man bei dem hierzu vorgesehenen Dropdown Menu die gewünschte Farbfehlsichtigkeit bzw. Farbblindheit aus. Standardmäßig wird die Rotblindheit verwendet. Um nun das simulierte Video sehen zu können, muss dafür der View-Mode geändert werden. Dafür existiert in der unteren rechten Ecke des Videoplayers ein entsprechender Button, der zwischen Singleview und Splitscreen wechselt. Nun sollte das Original synchronisiert mit dem daneben liegenden simulierten Video laufen. Über die Steuerelemente kann das Video pausiert, an eine bestimmte Stelle im Video gesprungen oder die Lautstärke angepasst werden. Sollte man sich für ein eigenes Video entscheiden, muss dafür über den Upload-Button ein Video ausgewählt werden. Dies ist ebenfalls per Drag and Drop möglich. Über den Download-Button lässt sich das simulierte Video auch downloaden. Sofern man feststellt, dass man im Splitscreen bei den beiden Videos keinen bzw. kaum einen Unterschied sehen kann, kann man sich über den zweiten Button in der unteren rechten Ecke des Videoplayers, einem gängigen Farbsehtest unterziehen. Für den Test werden sogenannte Ishihara Bilder verwendet.  Diese sind speziell für die verschiedenen Farbfehlsichtigkeit angefertigt. Durch die vom User eingegebene Zahl, die dieser wahrgenommen bzw. nicht wahrgenommen hat, lässt sich ermitteln welche Farbfehlsichtigkeit der User hat. Sofern eine Farbfehlsichtigkeit ermittelt worden ist, wird diese automatisch für den Player ausgewählt, sodass andere Personen die Farbfehlsichtigkeit nachempfinden können. Im Idealfall wird die Webanwendung zu zweit mit einer Person, die eine Farbfehlsichtigkeit besitzt, verwendet. 