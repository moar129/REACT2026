# 📚 AniTrack React App

---

# TEKNOLOGIER

---

## React
React er et JavaScript bibliotek til at bygge brugergrænseflader.
I stedet for at manipulere HTML direkte, beskriver vi hvordan UI'et skal se ud,
og React sørger for at opdatere det når data ændrer sig.

**Grundprincip:**
```
Data ændrer sig → React gentegner kun det der er ændret, Hurtig og effektiv UI
```

---

## TypeScript
TypeScript er JavaScript med typer ovenpå.
Det hjælper os med at fange fejl inden koden kører.

```ts
// JavaScript — ingen fejl før det kører
const anime = null
anime.title // 💥 crasher når det kører

// TypeScript — fejl med det samme i VS Code
const anime: IAnime | null = null
anime.title // ❌ TypeScript advarer os inden vi kører koden
```

---

## Vite
Vite er det værktøj der starter og bygger vores React app.
Det erstatter Create React App og er meget hurtigere.

```bash
npm create vite@latest appName -- --template react-ts
npm run dev    # Start udviklingsserver
npm run build  # Byg til produktion
```

---

## React Router DOM
React Router håndterer navigation i vores SPA uden at genindlæse siden.

**Hvorfor ikke bare `<a href>`?**
```
<a href="/search">    → Browser genindlæser siden fra bunden ❌
                        Redux store nulstilles
                        Al data skal hentes igen

<Link to="/search">   → URL skifter uden reload ✅
                        Redux store bevares
                        Data bevares i cache
```

---

## Redux Toolkit
Redux er et globalt datalager som alle komponenter kan tilgå.
Redux Toolkit er den moderne og anbefalede måde at bruge Redux på.

**Hvorfor Redux?**
```
Uden Redux — data sendes via props:
App → HomePage → AnimeGrid → AnimeCard → (vil tilføje favorit?) 
→ send besked op til App → send ned igen til FavoritesPage.

Med Redux — alle komponenter tilgår store direkte:
AnimeCard → dispatch(addFavorite) → Redux Store ✅
FavoritesPage → useSelector → Redux Store ✅
```

---

## RTK-Query
RTK-Query er en del af Redux Toolkit og håndterer API kald automatisk.
Den giver os loading states, fejlhåndtering og caching gratis.

**Hvad RTK-Query giver os gratis:**
```
isLoading  — er vi ved at hente data?
isError    — gik noget galt?
data       — det API'et returnerede
isFetching — henter vi nyt data?
Caching    — samme kald inden for 60 sek. henter ikke igen
```

---

## Tailwind CSS
Tailwind er et utility-first CSS framework.
I stedet for færdige komponenter bygger vi selv med små klasser.

```tsx
// Bootstrap (færdige komponenter)
<button class="btn btn-primary btn-lg">Klik</button>

// Tailwind (byg selv)
<button class="bg-rose-accent text-white px-6 py-3 rounded-lg hover:bg-rose-hover">
    Klik
</button>
```

**Egne farver i `index.css` med `@theme`:**
```css
@theme {
    --color-bg-primary: #0f0a0a;
    --color-rose-accent: #f43f5e;
}
/* Bruges som: bg-bg-primary, text-rose-accent */
```

---

## Jikan API
Jikan er et gratis uofficielt MyAnimeList API.
Ingen API-nøgle kræves.

**Base URL:** `https://api.jikan.moe/v4/`

**Endpoints vi bruger:**
```
GET /top/anime              → Top anime liste
GET /anime?q=naruto         → Søg efter anime
GET /anime/{id}             → Én specifik anime
GET /genres/anime           → Alle genre kategorier
GET /anime?genres=1         → Anime inden for en genre
```

---

---

# REACT KONCEPTER

---

## Komponent
En funktion der returnerer JSX — det der vises på skærmen.

```tsx
// Simpel komponent
function LoadingSpinner() {
    return (
        <div className="flex items-center justify-center py-20">
            <span>Henter anime...</span>
        </div>
    )
}

// Komponent med props
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

## Props
Data der sendes fra en forælderkomponent til en børnekomponent.
Props flyder kun én vej — fra forælder til barn.

```tsx
// Sender props
<AnimeCard anime={anime} />

// Modtager og destrukturerer props
function AnimeCard({ anime }: { anime: IAnime }) {
    return <h3>{anime.title}</h3>
}
```

---

## useState
Gemmer lokal data i en komponent.
Når staten opdateres, gentegnes komponenten automatisk.

```tsx
const [filter, setFilter] = useState('')
//     ↑               ↑              ↑
//     værdi     opdater funktion   startværdi

// Opdater
setFilter('tv')

// Baseret på tidligere værdi
setPage(prev => prev + 1)
```

---

## TSX
TSX er en syntaks der lader os skrive HTML-lignende kode i TypeScript.

```tsx
// JSX — ligner HTML men er TypeScript
const element = <h1 className="text-white">{anime.title}</h1>

// Kompileres til TypeScript bag scenen
const element = React.createElement('h1', { className: 'text-white' }, anime.title)
```

**Vigtige forskelle fra HTML:**
```tsx
// HTML        → TSX
class           → className
for             → htmlFor
onclick         → onClick
```

---

## Konditionel rendering
Vis kun elementer når en betingelse er opfyldt.

```tsx
// && — vis hvis betingelse er sand
{isLoading && <LoadingSpinner />}

// Ternary — vælg mellem to elementer
{isFavorite ? 'Fjern favorit' : 'Tilføj favorit'}

// Tidlig return — stop rendering helt
if (isLoading) return <LoadingSpinner />
if (!data) return null
```

---

## .map() i JSX
Loop igennem et array og lav et TSX element for hvert element.
`key` er påkrævet så React kan holde styr på elementerne.

```tsx
{animes.map(anime => (
    <AnimeCard key={anime.mal_id} anime={anime} />
))}
```

---

---

# REACT ROUTER KONCEPTER

---

## BrowserRouter
Wrapper der aktiverer routing i hele appen.
Skal placeres højt i komponenttræet — typisk i `main.tsx`.

```tsx
<BrowserRouter>
    <App />
</BrowserRouter>
```

---

## Routes og Route
`Routes` er en container der tjekker URL'en og viser den rigtige komponent.
`Route` definerer én URL-sti og hvilken komponent der skal vises.

```tsx
<Routes>
    <Route path="/"          element={<HomePage />} />
    <Route path="/search"    element={<SearchPage />} />
    <Route path="/anime/:id" element={<AnimeDetailPage />} />
    <Route path="*"          element={<NotFoundPage />} />
    {/* * skal ALTID være den sidste route */}
</Routes>
```

---

## Link
Navigerer mellem sider uden page reload.
Renderes til et `<a>` tag i HTML men intercepter klikket.

```tsx
<Link to="/search">Søg</Link>
<Link to={`/anime/${anime.mal_id}`}>Se detaljer</Link>

// Med state — send ekstra data med uden at vise det i URL
<Link to={`/genre/${genre.mal_id}`} state={{ genreName: genre.name }}>
    {genre.name}
</Link>
```

---

## useParams
Henter dynamiske værdier fra URL'en.

```tsx
// Route: /anime/:id
// URL:   /anime/21

const { id } = useParams()
// id = "21" (altid en string!)

// Konverter til number hvis nødvendigt
useFetchAnimeByIdQuery(Number(id))
```

---

## useLocation
Giver information om den nuværende URL og eventuel state.

```tsx
const location = useLocation()

location.pathname        // "/genre/1"
location.state?.genreName // "Action" (sendt med Link state)
```

---

## useNavigate
Navigerer programmatisk — uden at bruge et Link element.

```tsx
const navigate = useNavigate()

navigate('/')      // Gå til forsiden
navigate(-1)       // Gå én side tilbage (som browser tilbage knap)
navigate('/search') // Gå til søgesiden
```

---

---

# REDUX KONCEPTER

---

## Store
Det centrale datalager. Defineret i `store/index.ts`.
Alle komponenter kan læse fra og skrive til store.

```ts
export const store = configureStore({
    reducer: {
        [animeApi.reducerPath]: animeApi.reducer, // RTK-Query cache
        favorites: favoritesReducer,              // Vores favoritter
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(animeApi.middleware),
})
```

---

## Slice
En del af Redux store med tilhørende actions og reducers.
`createSlice` genererer automatisk action creators.

```ts
const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: { animeItem: [] as IAnime[] },
    reducers: {
        // state = nuværende data
        // action.payload = data sendt med dispatchen
        addFavorite: (state, action) => {
            const exists = state.animeItem.find(a => a.mal_id === action.payload.mal_id)
            if (!exists) {
                state.animeItem.push(action.payload)
            }
        },
        removeFavorite: (state, action) => {
            state.animeItem = state.animeItem.filter(a => a.mal_id !== action.payload)
        },
    }
})
```

---

## useDispatch
Hook der giver os mulighed for at sende actions til Redux store.
"Dispatch" = send en handling.

```tsx
const dispatch = useDispatch()

// Send handling til store
dispatch(addFavorite(anime))     // Tilføj anime til favoritter
dispatch(removeFavorite(mal_id)) // Fjern anime fra favoritter
```

---

## useSelector
Hook der læser data fra Redux store.
Komponenten opdateres automatisk når den valgte data ændrer sig.

```tsx
// Hent favoritter fra store
const favorites = useSelector((state: RootState) => state.favorites.animeItem)

// Tjek om én anime er favorit
const isFavorite = favorites.some(fav => fav.mal_id === anime.mal_id)
```

---

## Provider
Gør Redux store tilgængeligt for hele React appen.
Placeres i `main.tsx` og wrapper hele appen.

```tsx
<Provider store={store}>
    <App />
</Provider>
```

---

---

# 🌐 RTK-QUERY KONCEPTER

---

## createApi
Opretter et API med endpoints og base URL.
RTK-Query genererer automatisk hooks til hvert endpoint.

```ts
export const animeApi = createApi({
    reducerPath: 'animeApi',          // Navn i Redux store
    baseQuery: fetchBaseQuery({        // Base URL for alle kald
        baseUrl: 'https://api.jikan.moe/v4/'
    }),
    endpoints: (builder) => ({ ... })
})
```

---

## builder.query
Definerer et GET endpoint.

```ts
// builder.query<HvadReturneres, HvadModtages>
fetchTopAnime: builder.query<IAnimeListResponse, string>({
    query: (filter) => ({
        url: 'top/anime',
        params: {
            type: filter || undefined,
            limit: 25,
        },
    }),
}),
```

---

## Auto-genererede hooks
RTK-Query genererer automatisk en hook for hvert endpoint.

```ts
// Endpoint navn    → Hook navn
fetchTopAnime      → useFetchTopAnimeQuery
fetchSearchAnime   → useFetchSearchAnimeQuery
fetchAnimeById     → useFetchAnimeByIdQuery
fetchAnimeGenres   → useFetchAnimeGenresQuery
fetchAnimeByGenre  → useFetchAnimeByGenreQuery
```

---

## Query hook værdier
Hvad en RTK-Query hook returnerer:

```tsx
const { data, isLoading, isError, isFetching } = useFetchTopAnimeQuery(filter)

// data        → API response (undefined mens den loader)
// isLoading   → true første gang data hentes
// isError     → true hvis kald fejlede
// isFetching  → true når den henter (også ved refetch)
```

---

## skip
Forhindrer RTK-Query i at sende et API kald.

```tsx
const { data } = useFetchSearchAnimeQuery(
    { searchTerm, genreId },
    { skip: searchTerm === '' && genreId === '' }
    // Send ikke kald hvis hverken søgeterm eller genre er valgt
)
```

---

## params (objekt-style query)
Lader RTK-Query bygge URL parametrene.
`undefined` værdier sendes ikke med i URL'en.

```ts
// Sender: /anime?q=naruto&limit=25
// (genres sendes ikke med fordi den er undefined)
query: ({ searchTerm, genreId }) => ({
    url: 'anime',
    params: {
        q: searchTerm || undefined,    // undefined → sendes ikke med
        genres: genreId || undefined,  // undefined → sendes ikke med
        limit: 25,
    },
})
```

---

## Caching
RTK-Query cacher automatisk API svar.
Samme kald inden for 60 sekunder henter ikke igen.

```
Første kald: useFetchTopAnimeQuery('tv')
    → Sender API kald → gemmer i cache

Andet kald (inden for 60 sek): useFetchTopAnimeQuery('tv')
    → Returnerer cached data ✅ (ingen API kald!)

Navigation væk og tilbage:
    → Returnerer cached data ✅ (ingen spinner!)
```

---

---

# 📝 TYPESCRIPT KONCEPTER

---

## Interface
Beskriver strukturen på et objekt.

```ts
interface IAnime {
    mal_id: number        // Unikt ID
    title: string         // Anime titel
    score: number         // Karakter (fx 8.5)
    episodes: number      // Antal episoder
    status: string        // "Currently Airing" eller "Finished Airing"
    images: IAnimeImage   // Billeder (en anden interface)
    genres: IGenre[]      // Array af genre objekter
}
```

---

## Valgfri prop med ?
`?` betyder at feltet ikke er påkrævet.

```ts
interface IProps {
    title: string      // Påkrævet — skal altid sendes med
    iconClass?: string // Valgfri — behøver ikke sendes med
}

// iconClass ?? 'text-rose-accent' bruges som fallback
```

---

## Generics \<T\>
En pladsholder for en type der bestemmes når den bruges.

```ts
// <HvadReturneres, HvadModtages>
builder.query<IAnimeListResponse, string>

// <HvadErIStore, HvadVælges>
useSelector((state: RootState) => state.favorites.animeItem)
```

---

## import type
Fortæller TypeScript at vi kun importerer en type — ikke en værdi.
Kræves i nyere TypeScript projekter med `verbatimModuleSyntax`.

```ts
import type { IAnime } from '../types/animeType'
// IAnime eksisterer kun på kompileringstidspunktet
// Den forsvinder fra den færdige JavaScript kode
```

---

## RootState
TypeScript typen på hele vores Redux store.
Bruges til at typesikre `useSelector`.

```ts
// Automatisk genereret fra store strukturen
export type RootState = ReturnType<typeof store.getState>

// Bruges i useSelector
const favorites = useSelector((state: RootState) => state.favorites.animeItem)
//                                    ↑
//                         TypeScript ved præcis hvad der er i store
```

---

---

# 🔤 JAVASCRIPT OPERATORER

---

## && (og / vis dette)
```ts
{isLoading && <LoadingSpinner />}
// Vis LoadingSpinner KUN hvis isLoading er true

{searchTerm && selectedGenre && <span> — </span>}
// Vis kun hvis BEGGE er sande
```

---

## || (eller / fallback)
```ts
filter || undefined
// Hvis filter er tom string ('') → undefined
// Ellers → filter værdien
```

---

## ?? (nullish coalescing)
Bruges KUN hvis værdien er `null` eller `undefined`.
Modsat `||` som også reagerer på `0` og `''`.

```ts
anime.synopsis ?? 'Ingen synopsis'
// null/undefined → 'Ingen synopsis'
// '' (tom string) → '' (vises som tom — ikke fallback!)

anime.score ?? 'Ingen score'
// 0 → 0 (vises som 0 — ikke 'Ingen score'!)
```

---

## ?. (optional chaining)
Stopper hvis værdien er `null` eller `undefined` i stedet for at crashe.

```ts
location.state?.genreName
// Hvis state er undefined → returner undefined (ingen crash)
// Hvis state eksisterer → returner genreName

genreData?.data.find(g => g.mal_id === id)
// Hvis genreData ikke er loaded endnu → undefined (ingen crash)
```

---

## Ternary operator (? :)
If/else på én linje.

```ts
// condition ? hvad hvis true : hvad hvis false
isFavorite ? 'Fjern favorit' : 'Tilføj favorit'

anime.episodes ? `${anime.episodes} ep.` : 'Ukendt'
```

---

## Array metoder

```ts
// .map() — lav nyt array af transformerede elementer
animes.map(anime => <AnimeCard key={anime.mal_id} anime={anime} />)

// .filter() — lav nyt array med kun matchende elementer
state.items.filter(a => a.mal_id !== action.payload)

// .find() — returner første matchende element (eller undefined)
favorites.find(fav => fav.mal_id === anime.mal_id)

// .some() — returner true hvis mindst ét element matcher
favorites.some(fav => fav.mal_id === anime.mal_id)

// .push(...array) — tilføj elementer til eksisterende array
state.topAnime.push(...action.payload)
```

---

## e.preventDefault()
Forhindrer standard browser adfærd.

```tsx
const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    // Uden denne ville Link navigere til anime detailside
    // når man klikker hjerte-ikonet på AnimeCard
}
```

---

## e.stopPropagation()
Forhindrer at et klik "bobler op" til forælderelementet.

```tsx
<Link
    to={`/genre/${genre.mal_id}`}
    onClick={(e) => e.stopPropagation()}
>
    // Uden denne ville klik på genre tag også
    // trigger AnimeCard's Link navigation
</Link>
```

---

---

# 📁 MAPPESTRUKTUR OG ARKITEKTUR

---

## Mappestruktur
```
src/
├── components/       Genbrugelige UI komponenter
│   ├── animeCard.tsx      Anime kort med favorit knap
│   ├── animeGrid.tsx      Grid af anime kort
│   ├── navbar.tsx         Navigation
│   ├── pageHeader.tsx     Side overskrift med ikon
│   ├── statBadge.tsx      Info badge (score, episoder)
│   ├── genreList.tsx      Klikbare genre tags
│   ├── backButton.tsx     Tilbage knap
│   ├── loading.tsx        Loading spinner
│   └── errorMessage.tsx   Fejlbesked
├── pages/            Én fil per route/side
│   ├── HomePage.tsx       Top anime med filter
│   ├── SearchPage.tsx     Søg med titel og genre
│   ├── AnimeDetailPage.tsx Detaljevisning
│   ├── FavoritesPage.tsx  Gemte favoritter
│   ├── GenrePage.tsx      Anime inden for en genre
│   └── NotFoundPage.tsx   404 side
├── store/            Alt Redux relateret
│   ├── index.ts           Redux store konfiguration
│   ├── apis/
│   │   └── animeApi.ts    RTK-Query API definition
│   └── slices/
│       └── favoritesSlice.ts Redux slice for favoritter
├── types/            TypeScript interfaces
│   └── animeType.ts       IAnime, IGenre, IAnimeImage osv.
├── App.tsx           Router og side layout
└── main.tsx          Entry point og Redux Provider
```

---

## Ansvarsopdeling
```
RTK-Query  → henter data fra Jikan API
Redux      → gemmer favoritter lokalt
useState   → lokal komponent state (filter, søgeterm)
Components → genbrugelige UI byggeklodser
Pages      → samler komponenter til komplette sider
Types      → TypeScript interfaces for dataobjekter
```

---

---

# ✅ OPGAVEKRAV

| Krav | Løsning i projektet |
|---|---|
| 5+ egne komponenter | AnimeCard, AnimeGrid, Navbar, PageHeader, StatBadge, GenreList, BackButton, LoadingSpinner, ErrorMessage |
| Fælles Redux store | store/index.ts med favoritesSlice |
| RTK-Query (Thunk middleware) | animeApi med 5 endpoints |
| Route og Link | BrowserRouter med 6 routes i App.tsx |
| TypeScript interfaces | IAnime, IGenre, IAnimeImage, IAnimeListResponse, IAnimeDetailResponse, IGenreListResponse |
| CSS framework | Tailwind CSS med egne farver defineret i index.css |

---

# 💡 GODE SVAR TIL EKSAMEN

**"Hvorfor Redux frem for useState til favoritter?"**
> useState er lokal — den nulstilles når komponenten forsvinder. 
> Favoritter skal bevares på tværs af sider, så Redux er det rigtige valg.

**"Hvad er forskellen på isLoading og isFetching?"**
> isLoading er kun true første gang data hentes — når der ingen cache er.
> isFetching er true hver gang der hentes, også ved refetch.

**"Hvorfor Link frem for a tags?"**
> a tags laver en fuld side reload og nulstiller Redux store og RTK-Query cache.
> Link skifter URL uden reload og bevarer al data — det er pointen med en SPA.

**"Hvad er en SPA?"**
> Single Page Application — én HTML side der dynamisk opdaterer indholdet
> via JavaScript i stedet for at indlæse nye sider fra serveren.

**"Hvad gør RTK-Query's skip parameter?"**
> Den forhindrer API kaldet i at blive sendt.
> Vi bruger det på SearchPage så der ikke sendes et tomt kald
> til Jikan API før brugeren har søgt på noget.

**"Hvad er forskellen på ?? og ||?"**
> || reagerer på alle falsy værdier: null, undefined, 0, '', false.
> ?? reagerer kun på null og undefined.
> Hvis anime.score er 0, vil || give fallback men ?? vil vise 0 korrekt.