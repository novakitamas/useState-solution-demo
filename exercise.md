# useState gyakorló feladat — „St.Stephen's 7 Pizza” rendelésösszeállító

## A feladat célja

A `useState` hook önálló, összetett használatának gyakorlása egyetlen oldalon. A feladat végére
mind az öt tipikus állapotfajtát használni fogod:

| Állapot fajta       | Példa a feladatból               |
| ------------------- | -------------------------------- |
| szöveg (`string`)   | a vendég neve                    |
| szám (`number`)     | a darabszám                      |
| logikai (`boolean`) | elvitelre kéri-e                 |
| tömb (`array`)      | a kiválasztott feltétek, a kosár |
| objektum (`object`) | egy kosárba tett tétel adatai    |

Emellett gyakorolni fogod a **származtatott érték** (derived value) fogalmát is: az árakat
**nem** állapotban tároljuk, hanem minden rendereléskor újraszámoljuk.

## Játékszabályok

**Használható:**

- egyetlen fájl: `app/page.tsx`, a legelső sorában `"use client";`
- a `useState` hook (akárhány példányban)
- `react-hot-toast` (`import toast from "react-hot-toast";`) — a `<Toaster>` már be van kötve
  az `app/layout.tsx`-ben, csak hívni kell a `toast.success(...)` / `toast.error(...)` függvényt
- Tailwind CSS osztályok

**Nem használható (még nem tanultuk, és nem is kell hozzá):**

- `useEffect`, `useRef`, `useContext`, Zustand vagy bármilyen globális store
- külön komponensekre bontás (szándékosan maradjon egy fájlban, hogy az állapotok együtt látszódjanak)
- backend, API route, adatbázis, `localStorage`
- külső UI könyvtár (a daisyUI osztályai megengedettek, de nem szükségesek)

## A kész alkalmazás felépítése

Egy középre igazított „kártyán” a következők jelennek meg, egymás alatt:

1. **Fejléc:** „🍕 St.Stephen's 7 Pizza” cím és egy rövid alcím.
2. **Vendég neve:** egy szövegbeviteli mező.
3. **Méret:** három gomb egymás mellett (Kicsi / Közepes / Nagy). A kiválasztott gomb
   látványosan kiemelve.
4. **Feltétek:** hat kapcsolható gomb rácsban, mindegyiken a feltét neve és ára. A kiválasztott
   feltétek kiemelve. A blokk címében látszik, hány feltét van kiválasztva
   (pl. „Feltétek (2 kiválasztva)”).
5. **Darabszám:** `−` és `+` gomb között a szám. 1 alá nem mehet, 10 fölé nem mehet.
6. **Elvitel:** egy kapcsoló (checkbox). Ha be van kapcsolva, a tétel árából **10% kedvezmény**
   jár, és ez a kalkulációban is látszik.
7. **Élő árkalkuláció:** az aktuálisan összeállított pizza egységára, a darabszám, a kedvezmény
   és a tétel végösszege — minden kattintásra azonnal frissül.
8. **„Kosárba” gomb.**
9. **Kosár:** a kosárba tett tételek listája (név, méret, feltétek, darabszám, ár), mindegyik
   mellett egy törlés gomb. Ha a kosár üres, egy szürke, dőlt „A kosár üres.” szöveg látszik.
10. **Végösszeg és „Rendelés leadása” gomb.**

## Adatok

Ezek **konstansok**, nem állapotok — a komponens **fölött** definiáld őket, hogy ne
keletkezzenek újra minden rendereléskor:

**Méretek:**

| id        | felirat         | alapár  |
| --------- | --------------- | ------- |
| `kicsi`   | Kicsi (24 cm)   | 1800 Ft |
| `kozepes` | Közepes (32 cm) | 2400 Ft |
| `nagy`    | Nagy (45 cm)    | 3200 Ft |

**Feltétek:**

| id         | felirat    | ár     |
| ---------- | ---------- | ------ |
| `sonka`    | Sonka      | 350 Ft |
| `gomba`    | Gomba      | 250 Ft |
| `kukorica` | Kukorica   | 200 Ft |
| `szalami`  | Szalámi    | 400 Ft |
| `paprika`  | Paprika    | 250 Ft |
| `sajt`     | Extra sajt | 450 Ft |

**Árszámítás:**

```
egységár        = méret alapára + a kiválasztott feltétek árának összege
tétel bruttó    = egységár * darabszám
kedvezmény      = elvitel esetén a tétel bruttó 10%-a (egészre kerekítve), egyébként 0
tétel végösszeg = tétel bruttó − kedvezmény
végösszeg       = a kosárban lévő tételek végösszegeinek összege
```

---

## 1. lépés — Előkészítés

Töröld ki az `app/page.tsx` tartalmát, és hozz létre egy `HomePage` komponenst `"use client";`
direktívával. Importáld a `useState`-et és a `toast`-ot. Vedd fel a fenti két konstans tömböt
(méretek, feltétek) a komponens fölé.

Indítsd a fejlesztői szervert: `npm run dev` → http://localhost:8080

## 2. lépés — A vendég neve (szöveg állapot)

Készíts egy `name` állapotot üres kezdőértékkel, és egy szövegbeviteli mezőt hozzá.

- A mező **kontrollált** legyen: `value={name}` **és** `onChange={(e) => setName(e.target.value)}`.
- Ha csak a `value`-t adod meg, a mezőbe nem lehet írni — próbáld is ki, jó tanulság!
- A cím alatt jelenítsd meg, hogy „Kedves **{name}**, állítsd össze a pizzádat!” — ha a név
  üres, helyette az „Add meg a nevedet!” szöveg jelenjen meg (feltételes megjelenítés).

## 3. lépés — Méret választás

Készíts egy `sizeId` állapotot, kezdőértéke legyen `"kozepes"`.

- A méretek tömbjén `.map()`-pel készíts egy gombot minden mérethez.
- Kattintásra állítsd be az adott méret `id`-ját.
- A `.map()`-ben visszaadott elemnek adj `key` prop-ot (a méret `id`-ját)!
- A gomb feliratában látszódjon a méret neve és az alapára.

## 4. lépés — Feltétek (tömb állapot, módosítás nélküli frissítés)

Készíts egy `toppings` állapotot, ami a kiválasztott feltétek `id`-jait tartalmazó tömb
(kezdőérték: üres tömb).

- Írj egy `toggleTopping(id)` függvényt: ha az `id` már benne van a tömbben, kerüljön ki
  belőle, egyébként kerüljön bele.
- **Fontos:** a `push()` és a `splice()` **tilos**, mert azok a meglévő tömböt módosítják,
  így a React nem érzékeli a változást. Használj helyette `filter()`-t és
  „szétterítést” (`[...prev, id]`).
- Használd a setter függvényalakját: `setToppings((prev) => ...)`.
- A blokk címében írd ki a kiválasztott feltétek számát.

## 5. lépés — Darabszám

Készíts egy `qty` állapotot `1` kezdőértékkel, és két gombot (`−`, `+`).

- A növelést és a csökkentést a `setQty((prev) => ...)` alakkal írd meg.
- A darabszám ne mehessen 1 alá és 10 fölé.
- Ha a felhasználó megpróbálja átlépni a korlátot, ne változzon a szám, hanem jelezd
  `toast.error(...)`-ral (pl. „Legalább 1 darabot kell kérni.”).
- A két gomb itt szándékosan **nincs** letiltva — így gyakorolható a hibás művelet
  visszajelzése. (A „Rendelés leadása” gombnál viszont a `disabled` lesz a megoldás, lásd
  a 10. lépést.)

## 6. lépés — Elvitel kapcsoló

Készíts egy `takeaway` logikai állapotot `false` kezdőértékkel, és egy checkbox-ot hozzá
(`checked={takeaway}` + `onChange`). Felirata: „Elvitelre kérem (−10%)”.

## 7. lépés — Élő árkalkuláció (származtatott értékek)

**Ne** hozz létre új `useState`-et az áraknak! Számold ki őket a komponens törzsében, a `return`
előtt, sima `const` változókba:

- `selectedSize` — a kiválasztott méret objektuma (a méretek tömbjén `find()`-dal)
- `toppingsPrice` — a kiválasztott feltétek árának összege
- `unitPrice` — egységár
- `discount` — kedvezmény (elvitel esetén a bruttó 10%-a, kerekítve)
- `itemTotal` — a tétel végösszege

Jelenítsd meg ezeket egy kis összegző blokkban (egységár, darabszám, kedvezmény, fizetendő).
A kedvezmény sora csak akkor látszódjon, ha van kedvezmény.

> **Miért nem állapot?** Mert az árak mindig kiszámíthatók a meglévő állapotokból. Ha
> állapotban tartanád őket, minden változásnál „kézzel” kellene frissítened, és könnyen
> elavulhatnának.

## 8. lépés — Kosárba tétel (objektumok tömbje)

Készíts egy `cart` állapotot: ez a kosárba tett **tétel-objektumok** tömbje. Egy tétel legalább
ezeket tartalmazza: `id`, `name`, `sizeLabel`, `toppingLabels`, `qty`, `takeaway`, `total`.

A „Kosárba” gomb megnyomásakor:

1. **Ellenőrzés:** ha a név üres (a csak szóközből álló név is üresnek számít — `name.trim()`),
   akkor `toast.error("Add meg a neved!")`, és **ne** kerüljön semmi a kosárba.
2. Egyébként add hozzá az új tételt a kosár **végére** — szétterítéssel, nem `push()`-sal:
   `setCart((prev) => [...prev, newItem])`.
3. Az `id`-hoz használhatod a `Date.now()` értékét.
4. Adj visszajelzést: `toast.success(...)` a tétel nevével és árával.
5. **Ürítsd a formot** a következő pizzához: feltétek üresre, darabszám 1-re, elvitel `false`-ra.
   A vendég nevét **hagyd meg** (ugyanaz a vendég rendel tovább).

## 9. lépés — Kosár lista, törlés, üres állapot

- Jelenítsd meg a kosár tételeit `.map()`-pel (a `key` a tétel `id`-ja legyen).
- Egy tételnél látszódjon: a vendég neve, a méret, a feltétek felsorolása (ha nincs feltét,
  akkor „feltét nélkül”), a darabszám, az „elvitel” jelölés és a tétel végösszege.
- Minden tétel mellett legyen egy törlés gomb (`✕`), ami kiveszi a tételt a kosárból
  (`filter()`), és `toast`-tal visszajelez.
- Ha a kosár üres, a lista helyén az „A kosár üres.” szöveg jelenjen meg.

## 10. lépés — Végösszeg és rendelés leadása

- Számold ki a kosár végösszegét (`reduce()`-szal vagy egy egyszerű ciklussal) — ez is
  **származtatott** érték, nem állapot.
- Írd ki a tételek számát és a fizetendő végösszeget.
- A „Rendelés leadása” gomb üres kosár esetén legyen letiltva. Megnyomásra jelenítsen meg egy
  összegző `toast.success(...)`-t (pl. „3 tétel, 12840 Ft — köszönjük a rendelést!”), majd
  ürítse ki a kosarat.

---

## Tailwind formázási feladatok

### T1. Reszponzív feltét-rács

A feltét-gombok mobilon 2, kis képernyőtől (`sm:`) 3 oszlopban jelenjenek meg, egyenletes
réssel. Használj `grid`, `grid-cols-2`, `sm:grid-cols-3` és `gap-*` osztályokat. Ellenőrizd a
böngésző fejlesztői eszközeivel keskeny és széles ablaknál is.

### T2. Kiválasztott állapot jelzése feltételes osztályokkal

A méret- és feltét-gomboknál az osztálylistát tedd függővé az állapottól, például:

```jsx
className={`rounded-xl border px-4 py-2 transition ${
  aktiv
    ? "border-orange-500 bg-orange-50 font-semibold text-orange-700"
    : "border-gray-200 bg-white hover:bg-gray-50"
}`}
```

Minden kattintható elemen legyen `cursor-pointer`, `transition`, valamint egy `hover:` és egy
`active:` állapot (pl. `active:scale-95`). A letiltott „Rendelés leadása” gomb kapjon
`disabled:cursor-not-allowed disabled:opacity-40` osztályokat.

### T3. Kiemelt végösszeg-sáv

A végösszeg sora legyen látványosan kiemelve a többi szövegtől: nagyobb és félkövér
(`text-2xl font-bold`), zöld színű (`text-emerald-600`), fölötte pedig egy elválasztó vonal
(`border-t pt-4`). Az üres kosár szövege legyen szürke és dőlt (`text-gray-400 italic`). Az árak
jobbra igazítva, egymás alatt egyenlő szélességű számjegyekkel jelenjenek meg
(`text-right tabular-nums`).

---

## Ellenőrző lista

- [ ] Minden állapot `useState`-tel készült, és nincs `useEffect` a kódban.
- [ ] A szövegmező kontrollált (`value` + `onChange`).
- [ ] A tömb-állapotok frissítése szétterítéssel/`filter()`-rel történik, nincs `push()`.
- [ ] A setterek ott, ahol az előző értékből számolunk, `(prev) => ...` alakot használnak.
- [ ] Az árak származtatott értékek, nincsenek külön állapotban.
- [ ] Minden `.map()`-nél van `key`.
- [ ] Üres név esetén nem kerül tétel a kosárba, és minden hibás művelethez tartozik `toast`.
- [ ] A darabszám korlátai (1–10) működnek, és a korlát elérésekor `toast` figyelmeztet.
- [ ] A kosárba tétel után a form (a néven kívül) visszaáll a kezdőállapotba.
- [ ] Üres kosárnál látszik az üres állapot szövege, és a „Rendelés leadása” gomb letiltott.
- [ ] A T1–T3 formázási feladatok elkészültek.

## Gyakori hibák

1. **`count + 1` vs. `(prev) => prev + 1`** — ha egy kattintásra kétszer hívnád ugyanazt a
   settert, a `count + 1` alak mindkét hívásban ugyanazt a régi értéket használja. Az előző
   értékből számolt frissítéshez mindig a függvényalak a biztos.
2. **A tömb/objektum „helyben” módosítása** (`toppings.push(id)`, `item.qty++`) — a React az
   állapot **azonosságát** figyeli, ezért mindig **új** tömböt/objektumot kell átadni.
3. **A setter nem azonnal frissít** — a `setQty(qty + 1)` utáni sorban a `qty` még a régi
   érték. A frissített érték a **következő** rendereléskor látszik.
4. **Származtatott érték állapotban** — ha az egységárat `useState`-ben tartod, elavul, amint
   egy másik állapot megváltozik.
5. **Hiányzó `key`** a `.map()`-ben — a konzolban figyelmeztetés jelenik meg, és a lista elemei
   „összekeveredhetnek”.

## Bónusz (opcionális)

- **Egy objektum-állapot:** próbáld ki, hogy a form összes mezőjét **egyetlen** objektum
  állapotban tartod (`{ name, sizeId, toppings, qty, takeaway }`), és a frissítést
  `setForm((prev) => ({ ...prev, qty: prev.qty + 1 }))` alakban írod. A látható működés
  ugyanaz — hasonlítsd össze, melyik változat olvashatóbb.
- **Mennyiség a kosárban:** a kosár tételeinél is lehessen `−`/`+`-szal módosítani a
  darabszámot (ehhez a tömbön belül **egy** objektumot kell lecserélni `map()`-pel).
- **Kosár ürítése** gomb megerősítő `toast`-tal.
