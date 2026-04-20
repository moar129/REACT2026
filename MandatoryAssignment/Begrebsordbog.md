# Begrebsordbog — AniTrack React App

Alle begreber forklaret i et sprog en studerende kan forstå.

---

# REACT BEGREBER

---

## Komponent
En komponent er en JavaScript funktion der returnerer noget HTML (JSX).
Tænk på det som en LEGO klods — du bygger appen ved at sætte komponenter sammen.

```tsx
// En simpel komponent
function LoadingSpinner() {
    return <p>Henter data...</p>
}

// En komponent der bruger en anden komponent
function HomePage() {
    return (
        <div>
            <LoadingSpinner /> ← bruger LoadingSpinner komponenten
        </div>
    )
}
```

**Hvornår laver man en ny komponent?**
- Når den samme kode bruges flere steder → `AnimeCard`, `LoadingSpinner`
- Når en del af koden bliver for stor og kompliceret → `GenreList`, `StatBadge`

---

## TSX
TSX er en syntaks der lader os skrive HTML inde i TypeScript.
Det ser ud som HTML men er faktisk TypeScript som bliver lavet om til JavaScript filer.
Det kan dermed bruges på en hjemmeside, alt dette sker bag scenen.

```tsx
// TSX — ligner HTML
const element = <h1 className="text-white">Hej verden</h1>

// Bag scenen kompileres det til dette JavaScript
const element = React.createElement('h1', { className: 'text-white' }, 'Hej verden')
```

**Vigtige forskelle fra HTML:**
```tsx
// I HTML skriver man:    I TSX skriver man:
class="..."          →   className="..."
for="..."            →   htmlFor="..."
onclick="..."        →   onClick={...}
style="color:red"    →   style={{ color: 'red' }}
```

**Krøllede parenteser `{}` i TSX:**
```tsx
// {} betyder "her kommer TypeScript"
<h1>{anime.title}</h1>           // Vis variabel
<p>{2 + 2}</p>                   // Regnestykke → viser 4
{isLoading && <Spinner />}       // Konditionel rendering
```
**Krøllede parenteser `&&` i TSX:**
```tsx
{isLoading && <Spinner />} // && i eksemplet siger bare at hvis isLoading er true kør <Spinner />
```
---

## Props
Props er data der sendes fra en parent-komponent til en child-komponent.
Tænk på props som argumenter til en funktion.

```tsx
// Parent sender data med som props
<AnimeCard anime={anime} />

// Child modtager data via props
function AnimeCard({ anime }: { anime: IAnime }) {
    return <h3>{anime.title}</h3>
}
```

**Vigtige regler om props:**
- Props flyder kun én vej — fra parent til child og ikke den anden vej.
- Props kan ikke ændres af barnet — de er read-only
- Vil man sende data opad, sender man en funktion som prop

---

## useState
useState er en hook der gemmer lokal data i en komponent.
Når data opdateres med setState funktionen, gentegner React komponenten.

```tsx
// Syntaks:
const [værdi, setVærdi] = useState(startværdi)

// Eksempler fra vores app:
const [filter, setFilter] = useState('')        // Tom string som start
const [page, setPage] = useState(1)             // Tal som start
const [inputValue, setInputValue] = useState('') // Tom string som start

// Opdater state
setFilter('tv')                    // Sæt til ny værdi
setPage(prev => prev + 1)         // Brug forrige værdi
```

**Hvornår bruges useState?**
- Lokal data der kun bruges i én komponent
- Data der IKKE skal deles med andre sider

**Hvornår bruges Redux i stedet?**
- Data der skal deles på tværs af sider (fx favoritter)

---

## Hook
En hook er en special React funktion der starter med `use`.
Hooks giver komponenter adgang til React features.

```tsx
useState()      // Gem lokal data
useSelector()   // Læs fra Redux store
useDispatch()   // Send handling til Redux store
useParams()     // Hent URL parametre
useLocation()   // Hent URL information
useNavigate()   // Naviger programmatisk
```

**Regler for hooks:**
- Kan kun bruges i React komponenter
- Kan kun bruges øverst i komponenten — ikke inde i if-sætninger eller loops

---

## Konditionel rendering
Vis kun elementer på skærmen når en bestemt betingelse er opfyldt.

```tsx
// Måde 1 — && operatoren
// Vis LoadingSpinner KUN hvis isLoading er true
{isLoading && <LoadingSpinner />}

// Måde 2 — Ternary operator
// Vælg mellem to elementer baseret på betingelse
{isFavorite ? 'Fjern favorit' : 'Tilføj favorit'}

// Måde 3 — Tidlig return
// Stop rendering helt og returner noget andet
if (isLoading) return <LoadingSpinner />
if (!data) return null
```

---

## Genbrugelig komponent
En komponent der er designet til at bruges flere steder med forskelligt indhold.

```tsx
// PageHeader bruges på ALLE sider med forskelligt ikon og titel
<PageHeader icon={TrendingUp} title="Top Anime" />     // HomePage
<PageHeader icon={Search} title="Søg efter anime" />   // SearchPage
<PageHeader icon={Heart} title="Favoritter" />         // FavoritesPage
<PageHeader icon={Tag} title={genreName} />            // GenrePage

// Komponenten selv
function PageHeader({ icon: Icon, title }: { icon: LucideIcon, title: string }) {
    return (
        <div className="flex items-center gap-3 mb-6">
            <Icon size={28} className="text-rose-accent" />
            <h1 className="text-3xl font-bold text-white">{title}</h1>
        </div>
    )
}
```

---

# REACT ROUTER BEGREBER

---

## SPA (Single Page Application)
En webapplikation der kun indlæser én HTML side.
Navigation sker ved at JavaScript opdaterer indholdet — ikke ved at indlæse nye sider.

```
Traditionel hjemmeside:
Bruger klikker "Søg"    → Browser beder server om /search.html
                        → Server sender ny HTML fil
                        → Browser genindlæser alt fra bunden
                        → Alt data tabt, alt skal hentes igen

SPA med React Router:
Bruger klikker "Søg"    → JavaScript opdaterer URL til /search
                        → React viser SearchPage komponenten
                        → Ingen server kontakt, ingen reload
                        → Redux data og RTK-Query cache bevares
```

---

## Routing
Routing bestemmer hvilken komponent der vises baseret på URL'en.

```tsx
// Når URL er /          → vis HomePage
// Når URL er /search    → vis SearchPage
// Når URL er /anime/21  → vis AnimeDetailPage med id=21
// Når URL er /xyz       → vis NotFoundPage (catch-all)

<Routes>
    <Route path="/"          element={<HomePage />} />
    <Route path="/search"    element={<SearchPage />} />
    <Route path="/anime/:id" element={<AnimeDetailPage />} />
    <Route path="*"          element={<NotFoundPage />} />
</Routes>
```

---

## Dynamisk route med `:id`
`:id` er en placeholder i URL'en — den kan være hvad som helst.

```tsx
// Route definition
<Route path="/anime/:id" element={<AnimeDetailPage />} />

// Hvis URL er /anime/21  → id = "21"
// Hvis URL er /anime/456 → id = "456"

// Hent id i komponenten med useParams
const { id } = useParams()
```

---

## Link
Link navigerer mellem sider uden page reload.
Det renderes til et `<a>` tag i HTML men forhindrer den normale browser navigation.

```tsx
// Normal navigation — ingen reload
<Link to="/search">Søg</Link>

// Dynamisk URL
<Link to={`/anime/${anime.mal_id}`}>Se detaljer</Link>

// Med state — send ekstra data uden at vise det i URL
<Link to={`/genre/${genre.mal_id}`} state={{ genreName: genre.name }}>
    {genre.name}
</Link>
```

---

## useParams
Henter dynamiske værdier fra URL'en.
Værdier er altid strings — konverter til number hvis nødvendigt.

```tsx
// URL: /anime/21
const { id } = useParams()
// id = "21" (string!)

// Konverter til number
useFetchAnimeByIdQuery(Number(id))
// Number("21") = 21
```

---

## useLocation
Giver information om den nuværende URL.
Bruges til at hente state sendt med Link og til at fremhæve aktivt navbar link.

```tsx
const location = useLocation()

location.pathname        // "/genre/1"
location.state           // { genreName: "Action" }
location.state?.genreName // "Action"

// Bruges i Navbar til at fremhæve aktivt link
const isActive = location.pathname === '/search' // true/false
```

---

## useNavigate
Navigerer programmatisk — uden at bruge et Link element.
Bruges når navigation sker som resultat af en handling (fx klik på en knap).

```tsx
const navigate = useNavigate()

navigate('/')       // Gå til forsiden
navigate('/search') // Gå til søgesiden
navigate(-1)        // Gå én side tilbage
                    // -1 = én side tilbage
                    // -2 = to sider tilbage
```

---

# REDUX BEGREBER

---

## Redux
Redux er et globalt datalager som alle komponenter kan tilgå.
Det løser problemet med at sende data op og ned gennem mange komponenter.

```
Problem uden Redux (prop drilling):
App → Page → Section → List → Item → (vil tilføje favorit?)
Skal sende funktion ned ALLE lag 

Løsning med Redux:
Item → dispatch(addFavorite) → Redux Store
FavoritesPage → useSelector → Redux Store
Ingen mellemmænd! 
```

---

## Store
Store er selve datalageret — det centrale sted al data er gemt.
Der er kun en store i hele appen.

```ts
export const store = configureStore({
    reducer: {
        // RTK-Query gemmer sin cache her
        [animeApi.reducerPath]: animeApi.reducer,
        // Vores favoritter gemmes her
        favorites: favoritesReducer,
    },
    // RTK-Query middleware håndterer async API kald
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(animeApi.middleware),
})
```

---

## Reducer
En reducer er en funktion der bestemmer hvordan store opdateres.
Den tager den nuværende state og en action og returnerer den nye state.

```ts
// Reducer logik
addFavorite: (state, action) => {
    // state = nuværende data i store
    // action.payload = data sendt med dispatchen (anime objektet)
    const exists = state.animeItem.find(a => a.mal_id === action.payload.mal_id)
    if (!exists) {
        state.animeItem.push(action.payload)
    }
},
```

---

## Action
En action er en besked vi sender til Redux store.
Den beskriver hvad der skal ske — reduceren bestemmer hvordan.

```tsx
// Action = "tilføj denne anime til favoritter"
dispatch(addFavorite(anime))

// Action = "fjern anime med dette id"
dispatch(removeFavorite(anime.mal_id))
```

---

## Slice
En slice er en samling af reducer logik og actions for én del af store.
`createSlice` genererer automatisk action creators fra reducers.

```ts
const favoritesSlice = createSlice({
    name: 'favorites',                        // Navn på slice
    initialState: { animeItems: [] as IAnime[] }, // Startdata
    reducers: {                               // Handlinger der kan udføres
        addFavorite: (state, action) => { ... },
        removeFavorite: (state, action) => { ... },
    }
})

// createSlice genererer disse automatisk:
export const { addFavorite, removeFavorite } = favoritesSlice.actions
```

---

## useSelector
Læser data fra Redux store.
Komponenten opdateres automatisk når den valgte data ændrer sig.

```tsx
// Hent ALLE favoritter
const favorites = useSelector((state: RootState) => state.favorites.animeItem)

// Hent kun ét bestemt felt
const count = useSelector((state: RootState) => state.favorites.animeItem.length)
```

---

## useDispatch
Giver os en funktion til at sende actions til Redux store.

```tsx
const dispatch = useDispatch()

// Send action til store
dispatch(addFavorite(anime))
//        ↑ action creator  ↑ data der sendes med (payload)
```

---

## Provider
Gør Redux store tilgængeligt for alle komponenter i appen.
Skal placeres øverst i komponenttræet — i `main.tsx`.

```tsx
// main.tsx
<Provider store={store}>
    <App />
    {/* Alle komponenter inde i Provider kan tilgå store */}
</Provider>
```

---

## RootState
TypeScript typen på hele Redux store.
Bruges til at typesikre `useSelector` så TypeScript ved hvad der er i store.

```ts
// Automatisk udledt fra store konfigurationen
export type RootState = ReturnType<typeof store.getState>

// RootState ser sådan ud bag scenen:
// {
//   animeApi: { ... },
//   favorites: { animeItem: IAnime[] }
// }

// Bruges i useSelector
const favorites = useSelector((state: RootState) => state.favorites.animeItem)
```

---

# RTK-QUERY BEGREBER

---

## RTK-Query
RTK-Query er et data-fetching bibliotek der er en del af Redux Toolkit.
Det håndterer API kald, loading states, fejlhåndtering og caching automatisk.

```
Uden RTK-Query — manuel håndtering:
const [data, setData] = useState(null)
const [isLoading, setIsLoading] = useState(false)
const [isError, setIsError] = useState(false)

useEffect(() => {
    setIsLoading(true)
    fetch('https://api.jikan.moe/v4/top/anime')
        .then(res => res.json())
        .then(data => { setData(data); setIsLoading(false) })
        .catch(() => { setIsError(true); setIsLoading(false) })
}, [])

Med RTK-Query — automatisk håndtering:
const { data, isLoading, isError } = useFetchTopAnimeQuery()
// Færdig! RTK-Query håndterer alt.
```

---

## createApi
Opretter et API med endpoints og konfiguration.

```ts
export const animeApi = createApi({
    reducerPath: 'animeApi',     // Navn i Redux store
    baseQuery: fetchBaseQuery({   // Alle kald starter med denne URL
        baseUrl: 'https://api.jikan.moe/v4/'
    }),
    endpoints: (builder) => ({    // Definer endpoints her
        fetchTopAnime: builder.query({ ... }),
        fetchSearchAnime: builder.query({ ... }),
    }),
})
```

---

## Endpoint
Et endpoint definerer ét bestemt API kald.

```ts
fetchTopAnime: builder.query<IAnimeListResponse, string>({
//             ↑ GET request   ↑ hvad returneres   ↑ hvad modtages

    query: (filter) => ({        // filter = det vi sender med
        url: 'top/anime',        // Fuld URL: https://api.jikan.moe/v4/top/anime
        params: {
            type: filter || undefined, // ?type=tv (hvis filter er sat)
            limit: 25,                 // ?limit=25
        },
    }),
}),
```

---

## Auto-genererede hooks
RTK-Query genererer automatisk en hook for hvert endpoint.
Hook navne følger mønsteret: `use` + endpoint navn + `Query`.

```ts
// Endpoint navn     → Auto-genereret hook
fetchTopAnime      → useFetchTopAnimeQuery
fetchSearchAnime   → useFetchSearchAnimeQuery
fetchAnimeById     → useFetchAnimeByIdQuery
fetchAnimeGenres   → useFetchAnimeGenresQuery
fetchAnimeByGenre  → useFetchAnimeByGenreQuery
```

---

## isLoading vs isFetching
To forskellige loading states i RTK-Query.

```tsx
const { data, isLoading, isFetching } = useFetchTopAnimeQuery(filter)

// isLoading
// → true KUN første gang — når der ingen cache er
// → false hvis data allerede er cachet

// isFetching
// → true HVER gang der hentes data
// → også når vi refetcher cachet data

// Eksempel:
// Første besøg på siden:
//   isLoading = true, isFetching = true

// Skift filter og kom tilbage:
//   isLoading = false (data er cachet)
//   isFetching = true (henter nyt data)
```

---

## skip
Forhindrer RTK-Query i at sende et API kald.

```tsx
const { data } = useFetchSearchAnimeQuery(
    { searchTerm, genreId },
    {
        skip: searchTerm === '' && genreId === ''
        // Send ikke kald hvis BEGGE er tomme
        // Forhindrer et tomt API kald når siden loades
    }
)
```

---

## Caching
RTK-Query gemmer automatisk API svar i 60 sekunder.
Samme kald inden for 60 sekunder returnerer cached data — ingen ny netværksanmodning.

```
Bruger går til HomePage:
    → RTK-Query sender API kald → gemmer i cache

Bruger går til SearchPage og tilbage til HomePage:
    → RTK-Query returnerer cached data
    → Ingen spinner, ingen ventetid!

Efter 60 sekunder:
    → Cache udløber
    → Næste besøg sender nyt API kald
```

---

## params
Lader RTK-Query bygge URL parametre automatisk.
`undefined` værdier sendes IKKE med i URL'en.

```ts
params: {
    q: searchTerm || undefined,    // '' → undefined → sendes ikke med || q er fra api'en og står for query, som bruges til fritekstsøgning
    genres: genreId || undefined,  // '' → undefined → sendes ikke med
    limit: 25,                     // Sendes altid med
}

// Hvis searchTerm = "naruto" og genreId = "":
// URL: /anime?q=naruto&limit=25
// (genres sendes ikke med fordi den er undefined)

// Hvis searchTerm = "" og genreId = "1":
// URL: /anime?genres=1&limit=25
// (q sendes ikke med fordi den er undefined)
```

---

# TYPESCRIPT BEGREBER

---

## TypeScript
TypeScript er JavaScript med et typesystem ovenpå.
Det hjælper os med at fange fejl FØR koden kører.

```ts
// JavaScript — ingen fejl opdages
function visScore(anime) {
    return anime.score.toFixed(1)
}
visScore(null) // Crasher når det kører

// TypeScript — fejl opdages med det samme
function visScore(anime: IAnime) {
    return anime.score.toFixed(1)
}
visScore(null) // TypeScript fejl: null er ikke IAnime
```

---

## Interface
En interface beskriver strukturen på et objekt — hvilke felter det har og deres typer.
Det er en "kontrakt" der garanterer at objektet har de rigtige felter.

```ts
interface IAnime {
    mal_id: number      // Hele tal (1, 21, 456)
    title: string       // Tekst ("Naruto", "One Piece")
    score: number       // Decimaltal (8.5, 9.1)
    episodes: number    // Hele tal (500, 12)
    status: string      // Tekst ("Currently Airing")
    images: IAnimeImage // Et andet interface objekt
    genres: IGenre[]    // Array af IGenre objekter
}

// TypeScript fejler hvis et felt mangler eller har forkert type
const anime: IAnime = {
    mal_id: 21,
    title: "Naruto",
    // Fejl! score mangler
}
```

---

## Valgfri felt med `?`
`?` efter feltnavnet betyder at feltet ikke er påkrævet.

```ts
function StatBadge({ icon: Icon, value, iconClass }: {
    icon: LucideIcon    // Påkrævet — skal sendes med
    value: string       // Påkrævet — skal sendes med
    iconClass?: string  // Valgfri — behøver ikke sendes med
}) { ... }

// Begge er gyldige:
<StatBadge icon={Star} value="8.5" iconClass="text-yellow-400" />
<StatBadge icon={Star} value="8.5" /> // iconClass er udeladt
```

---

## Generics `<T>`
En pladsholder for en type der specificeres senere.
Bruges til at lave fleksible funktioner og typer der virker med mange typer.

```ts
// builder.query<HvadReturneres, HvadModtages>
// Vi specificerer typerne når vi definerer endpoint

// Returnerer IAnimeListResponse, modtager string
fetchTopAnime: builder.query<IAnimeListResponse, string>({ ... })

// Returnerer IAnimeDetailResponse, modtager number
fetchAnimeById: builder.query<IAnimeDetailResponse, number>({ ... })

// Returnerer IGenreListResponse, modtager ingenting (void)
fetchAnimeGenres: builder.query<IGenreListResponse, void>({ ... })
```

---

## import type
Fortæller TypeScript at vi kun importerer en type — ikke en faktisk JavaScript værdi.
Kræves i nyere TypeScript projekter.

```ts
// Type — eksisterer kun på kompileringstidspunktet
import type { IAnime } from '../types/animeType'
import type { PayloadAction } from '@reduxjs/toolkit'

// Værdi — eksisterer i den færdige JavaScript kode
import { createSlice } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
```

---

## Type inferens
TypeScript kan ofte selv gætte typen uden at vi skriver den eksplicit.

```ts
// Vi skriver typen eksplicit
const filter: string = 'tv'

// TypeScript gætter typen fra startværdien
const filter = 'tv'
// TypeScript ved automatisk at filter er string

// RTK-Query infererer action.payload typen fra reduceren
addFavorite: (state, action) => {
    state.animeItem.push(action.payload) // TypeScript ved det er IAnime
},
```

---

# JAVASCRIPT OPERATORER

---

## `&&` — OG / vis dette
Viser noget kun hvis betingelsen til venstre er sand (truthy).

```tsx
// Vis LoadingSpinner KUN hvis isLoading er true
{isLoading && <LoadingSpinner />}

// Vis tekst KUN hvis begge betingelser er sande
{searchTerm && selectedGenre && <span> — </span>}

// Sådan evalueres det:
// false && <Spinner /> → false (intet vises)
// true && <Spinner />  → <Spinner /> (vises!)
```

---

## `||` — ELLER / fallback
Returnerer den første "truthy" værdi — eller den sidste hvis ingen er truthy.

```ts
filter || undefined
// filter = 'tv'  → returnerer 'tv'
// filter = ''    → '' er falsy → returnerer undefined

// Falsy værdier i JavaScript:
// false, 0, '', null, undefined, NaN
```

---

## `??` — Nullish coalescing
Som `||` men reagerer KUN på `null` og `undefined` — ikke på `0` eller `''`.

```ts
// Med ||
0 || 'ingen score'    // → 'ingen score' (0 er falsy)
'' || 'ingen titel'   // → 'ingen titel' ('' er falsy)

// Med ??
0 ?? 'ingen score'    // → 0 ✅ (0 er ikke null/undefined)
'' ?? 'ingen titel'   // → '' ✅ ('' er ikke null/undefined)
null ?? 'ingen data'  // → 'ingen data' ✅

// I vores app:
anime.synopsis ?? 'Ingen synopsis tilgængelig.'
// Vis fallback KUN hvis synopsis er null eller undefined
// Ikke hvis synopsis er en tom string
```

---

## `?.` — Optional chaining
Stopper og returnerer `undefined` hvis en værdi er `null` eller `undefined`.
Forhindrer app crash ved manglende data.
Vi tillader `undefined` og `null`

```ts
// Uden optional chaining — kan crashe
location.state.genreName // crash hvis state er null

// Med optional chaining — sikker
location.state?.genreName // undefined hvis state er null

// Kædet optional chaining
genreData?.data?.find(g => g.mal_id === id)?.name
// Stopper ved første null/undefined i kæden
```

---

## Ternary operator `? :`
En kortform for if/else på én linje.
Bruges meget i JSX til konditionel rendering.

```ts
// Syntaks: betingelse ? hvad hvis true : hvad hvis false

// Tekst
isFavorite ? 'Fjern favorit' : 'Tilføj favorit'

// CSS klasser
filter === f.value ? 'bg-rose-accent text-white' : 'text-gray-400'

// JSX elementer
isFetching ? <Loader className="animate-spin" /> : 'Load flere'
```

---

## Template literals (backticks)
Lader os sætte variabler og udtryk ind i strings.

```ts
// Gammel måde
'top/anime?type=' + filter + '&limit=25'

// Template literal — mere læsbar
`top/anime?type=${filter}&limit=25`

// Udtryk inde i ${}
`/anime/${anime.mal_id}`          // /anime/21
`${anime.episodes} episoder`      // "500 episoder"
`Rank #${anime.rank}`             // "Rank #1"
`${anime.members.toLocaleString()} medlemmer` // "1.000.000 medlemmer"
```

---

## Array metoder

### `.map()`
Laver et nyt array ved at transformere hvert element.
Bruges meget i JSX til at lave lister af komponenter.

```tsx
// Lav en AnimeCard for hvert anime i listen
{animes.map(anime => (
    <AnimeCard key={anime.mal_id} anime={anime} />
))}

// key er påkrævet — hjælper React med at holde styr på elementer
```

### `.filter()`
Laver et nyt array med kun de elementer der opfylder betingelsen.

```ts
// Fjern anime med dette id fra listen
state.animeItem = state.animeItem.filter(a => a.mal_id !== action.payload)
// Returnerer alle anime UNDTAGEN den med det matchende id
```

### `.find()`
Returnerer det FØRSTE element der opfylder betingelsen — eller `undefined`.

```ts
// Find genre med dette id
genreData?.data.find(g => String(g.mal_id) === selectedGenre)
// Returnerer genre objektet — eller undefined hvis ikke fundet
```

### `.some()`
Returnerer `true` hvis MINDST ÉT element opfylder betingelsen.

```ts
// Er denne anime allerede i favoritter?
const isFavorite = favorites.some(fav => fav.mal_id === anime.mal_id)
// true  → anime er i favoritter
// false → anime er ikke i favoritter
```

### `.push(...array)`
Tilføjer elementer til et eksisterende array.
`...` (spread operator) pakker arrayet ud.

```ts
state.animeItem.push(action.payload)    // Tilføj ét element
currentCache.data.push(...newItems.data) // Tilføj mange elementer
```

---

## `e.preventDefault()`
Forhindrer browserens standard opførsel for en hændelse.

```tsx
const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    // Standard opførsel for klik inde i et <Link>:
    // → navigere til linkets destination

    // Med preventDefault():
    // → navigation forhindres
    // → vores favorit logik kører i stedet
}
```

---

## `e.stopPropagation()`
Forhindrer at en hændelse "bobler op" til forælderelementet.

```tsx
// Problem: Genre tag er inde i AnimeCard's Link
// Klik på genre tag → trigger BEGGE klik handlers

<Link to={`/anime/${anime.mal_id}`}>  ← AnimeCard link
    <GenreList genres={anime.genres} />
        <Link onClick={(e) => e.stopPropagation()} ...>  ← Genre link
            {genre.name}
        </Link>
</Link>

// Med stopPropagation:
// Klik på genre → kun genre link kører
// Klik på resten af kortet → kun AnimeCard link kører
```

---

## Destructuring
Udpak værdier fra objekter og arrays direkte.

```tsx
// Objekt destructuring
const { data, isLoading, isError } = useFetchTopAnimeQuery(filter)
// I stedet for:
// const result = useFetchTopAnimeQuery(filter)
// const data = result.data
// const isLoading = result.isLoading

// Props destructuring
function AnimeCard({ anime }: { anime: IAnime }) { ... }
// I stedet for:
// function AnimeCard(props: { anime: IAnime }) {
//     const anime = props.anime

// URL params destructuring
const { id } = useParams()
```

---

## Spread operator `...`
Pakker et array eller objekt ud.

```ts
// Array spread — kopier og tilføj elementer
state.animeItem.push(...action.payload)
// action.payload = [anime1, anime2, anime3]
// push(...) tilføjer dem én ad gangen i stedet for som et array

// Array spread — kombiner arrays
const combined = [...existingAnime, ...newAnime]
```

---

# TAILWIND CSS BEGREBER

---

## Utility-first CSS
Tailwind bruger mange små klasser, der hver gør én ting.
Du kombinerer dem til at style elementer.

```tsx
// Én klasse = én CSS regel
bg-rose-accent     // background-color: #f43f5e
text-white         // color: white
p-4                // padding: 1rem (alle sider)
px-4               // padding-left og padding-right: 1rem
py-2               // padding-top og padding-bottom: 0.5rem
rounded-xl         // border-radius: 0.75rem
flex               // display: flex
items-center       // align-items: center
justify-between    // justify-content: space-between
gap-4              // gap: 1rem (afstand mellem flex/grid elementer)
hover:bg-gray-800  // background-color: #1f2937 ved hover
transition-colors  // Animér farveændringer
animate-spin       // Rotationsanimation
line-clamp-2       // Maks 2 linjer tekst, derefter "..."
```

---

## Responsive klasser
Tailwind klasser kan have et prefix der bestemmer ved hvilken skærmstørrelse de aktiveres.

```tsx
// Ingen prefix = altid aktiv (mobil først)
// sm: = small skærm og opefter (640px+)
// md: = medium skærm og opefter (768px+)
// lg: = large skærm og opefter (1024px+)

<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
//                    ↑ mobil        ↑ tablet       ↑ laptop      ↑ desktop
//                    2 kolonner     3 kolonner     4 kolonner    5 kolonner
```

---

## Egne farver med `@theme`
I Tailwind v4 definerer vi egne farver i `index.css` med `@theme`.
De kan herefter bruges som normale Tailwind klasser.

```css
/* index.css */
@theme {
    --color-bg-primary: #0f0a0a;    /* Bruges som: bg-bg-primary */
    --color-bg-surface: #1a1015;    /* Bruges som: bg-bg-surface */
    --color-rose-accent: #f43f5e;   /* Bruges som: bg-rose-accent, text-rose-accent */
    --color-rose-hover: #fb7185;    /* Bruges som: bg-rose-hover */
    --color-border: #2a1a20;        /* Bruges som: border-border */
}
```

**Fordel:** Alle farver er samlet ét sted.
Vil du ændre accentfarven? Ret ét sted → slår igennem i hele appen.

---

# ARKITEKTUR BEGREBER

---

## Separation of concerns
Del koden op så hver fil har ét klart ansvar.

```
animeApi.ts         → Kun API kald
favoritesSlice.ts   → Kun favorit logik
animeType.ts        → Kun TypeScript typer
AnimeCard.tsx       → Kun visning af ét anime kort
HomePage.tsx        → Kun sammensætning af hjemmesiden
```

---

## DRY — Don't Repeat Yourself
Undgå at skrive den samme kode flere steder.
Lav en komponent eller funktion i stedet og brug den.

```tsx
// Kopieret kode — rodet og svært at vedligeholde
// I HomePage:
<div className="flex items-center gap-3 mb-6">
    <TrendingUp size={28} className="text-rose-accent" />
    <h1 className="text-3xl font-bold">Top Anime</h1>
</div>

// I SearchPage:
<div className="flex items-center gap-3 mb-6">
    <Search size={28} className="text-rose-accent" />
    <h1 className="text-3xl font-bold">Søg</h1>
</div>

// Genbrugelig komponent — rent og nemt at vedligeholde
<PageHeader icon={TrendingUp} title="Top Anime" />
<PageHeader icon={Search} title="Søg" />
```

---

## Single source of truth
Data har ét sted den "lever" — alle andre steder henter den derfra.

```
Favoritter lever i Redux store → ét sted

AnimeCard læser fra Redux (isFavorite)
FavoritesPage læser fra Redux (liste af favoritter)
Navbar læser fra Redux (antal favoritter som badge)

Alle ser de SAMME favoritter
Ingen forvirring om hvad der er "rigtigt"
```

---

# GODE FORKLARINGER AT HUSKE PÅ:

---

**"Hvad er en SPA og hvorfor bruger vi det?"**
> En Single Page Application indlæser kun én HTML side.
> Navigation sker ved at JavaScript opdaterer indholdet.
> Fordelen er at siden aldrig genindlæses — det giver en hurtig og flydende oplevelse
> ligesom en app på telefonen. React Router håndterer navigation og URL'er for os.

**"Hvad er Redux og hvornår bruger man det?"**
> Redux er et globalt datalager som alle komponenter kan tilgå direkte.
> Vi bruger det til data der skal deles på tværs af sider, dette kunne være fx favoritter.
> Lokal data der kun bruges i én komponent gemmer vi i useState i stedet.

**"Hvad er RTK-Query og hvad giver det os?"**
> RTK-Query er et bibliotek til API kald der giver os loading states,
> fejlhåndtering og caching helt automatisk.

**"Hvad er forskellen på Link og a-tag?"**
> Et a-tag laver en fuld side reload, browseren henter en ny HTML side fra serveren.
> Link fra React Router skifter URL uden reload, JavaScript opdaterer indholdet.
> I en SPA bruger vi Link fordi vi aldrig vil genindlæse siden.

**"Hvad er TypeScript interfaces?"**
> Interfaces beskriver strukturen på vores data, hvilke felter et objekt har og deres typer.
> Det hjælper os med at fange fejl tidligt og giver bedre autocomplete i VS Code.
> Fx garanterer IAnime at et anime objekt altid har mal_id, title, score og genres.

**"Hvad er forskellen på ?? og ||?"**
> || reagerer på alle falsy værdier: null, undefined, 0, tom string og false.
> ?? reagerer KUN på null og undefined.
> Hvis anime.score er 0 vil || fejlagtigt vise en fallback tekst,
> mens ?? korrekt viser 0.

**"Hvad er forskellen på isLoading og isFetching?"**
> isLoading er kun true første gang data hentes, altså når der ingen cache er.
> isFetching er true hver gang RTK-Query henter data også ved refetch.
> Vi bruger isFetching til at vise en spinner på "Load mere" knappen.

**"Hvorfor bruger vi e.preventDefault() på favorit knappen?"**
> Favorit knappen sidder inde i et Link element på AnimeCard.
> Normalt ville et klik inde i et Link navigere til detailsiden.
> preventDefault() forhindrer denne navigation så kun favorit logikken kører.