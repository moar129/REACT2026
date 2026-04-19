# Huskeliste — AniTrack React App

---

## React

### useState
Gemmer lokal data i en komponent. Når den opdateres, gentegnes komponenten.
```tsx
const [filter, setFilter] = useState('')
// filter = den nuværende værdi
// setFilter = funktionen der opdaterer værdien
```

### useEffect (ikke brugt endnu men godt at kende)
Kører kode når komponenten loades eller når en værdi ændrer sig.
```tsx
useEffect(() => {
    console.log('filter ændret!')
}, [filter]) // Kører hver gang filter ændrer sig
```

### Props
Data der sendes fra en forælderkomponent til en børnekomponent.
```tsx
// Sender anime som prop
<AnimeCard anime={anime} />

// Modtager anime som prop
function AnimeCard({ anime }: { anime: IAnime }) { ... }
```

### Komponent
En funktion der returnerer JSX (det der vises på skærmen).
```tsx
function MinKomponent() {
    return <h1>Hej verden</h1>
}
```

---

## 🔀 React Router

### BrowserRouter
Wrapper der giver hele appen adgang til routing.
```tsx
<BrowserRouter>
    <App />
</BrowserRouter>
```

### Routes + Route
Bestemmer hvilken komponent der vises baseret på URL'en.
```tsx
<Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/anime/:id" element={<AnimeDetailPage />} />
</Routes>
```

### Link
Navigerer mellem sider uden at genindlæse siden (i modsætning til `<a>`).
```tsx
<Link to="/search">Gå til søgning</Link>
```

### useParams
Henter dynamiske værdier fra URL'en.
```tsx
// URL: /anime/21
const { id } = useParams() // id = "21"
```

### useLocation
Fortæller hvilken URL vi er på lige nu.
```tsx
const location = useLocation()
location.pathname // fx "/search"
```

---

## 🗃️ Redux

### Hvad er Redux?
Redux er et globalt lager (store) der gemmer data som alle komponenter kan tilgå.
```
Uden Redux: data sendes fra komponent til komponent via props (rodet)
Med Redux:  alle komponenter kan hente og opdatere data direkte fra store
```

### Store
Det centrale datalager i Redux. Defineret i `store/index.ts`.
```tsx
export const store = configureStore({
    reducer: {
        favorites: favoritesReducer,
        animeApi: animeApi.reducer,
    }
})
```

### Slice
En del af Redux store med tilhørende handlinger (actions) og reducers.
```tsx
const favoritesSlice = createSlice({
    name: 'favorites',        // Navn på slice
    initialState: { ... },    // Startværdier
    reducers: {               // Handlinger der kan udføres
        addFavorite: (state, action) => { ... },
        removeFavorite: (state, action) => { ... },
    }
})
```

### Action
En handling der sendes til Redux store for at ændre data.
```tsx
dispatch(addFavorite(anime))    // Tilføj favorit
dispatch(removeFavorite(id))    // Fjern favorit
```

### useDispatch
Hook der giver os mulighed for at sende handlinger til Redux store.
```tsx
const dispatch = useDispatch()
dispatch(addFavorite(anime)) // Send handling til store
```

### useSelector
Hook der læser data fra Redux store.
```tsx
const favorites = useSelector((state: RootState) => state.favorites.animeItem)
// Henter animeItem arrayet fra favorites slice
```

### PayloadAction
TypeScript type der beskriver hvad en action medbringer af data.
```tsx
addFavorite: (state, action: PayloadAction<IAnime>) => {
    state.items.push(action.payload) // action.payload = den anime der sendes med
}
```

---

## 🌐 RTK-Query

### Hvad er RTK-Query?
Et værktøj i Redux Toolkit der håndterer API kald automatisk — inkl. loading, fejl og caching.

### createApi
Opretter et API med endpoints.
```tsx
export const animeApi = createApi({
    reducerPath: 'animeApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.jikan.moe/v4/' }),
    endpoints: (builder) => ({
        fetchTopAnime: builder.query<IAnimeListResponse, string>({
            query: (filter) => `top/anime?limit=20`,
        }),
    }),
})
```

### builder.query\<ReturnType, ArgType\>
Definerer et endpoint der henter data (GET request).
```tsx
// <IAnimeListResponse, string> betyder:
// - Returnerer IAnimeListResponse
// - Modtager en string som argument
fetchTopAnime: builder.query<IAnimeListResponse, string>({ ... })
```

### Query hooks (auto-genereret)
RTK-Query genererer automatisk hooks ud fra dine endpoints.
```tsx
// fetchTopAnime → useFetchTopAnimeQuery
// fetchSearchAnime → useFetchSearchAnimeQuery
// fetchAnimeById → useFetchAnimeByIdQuery

const { data, isLoading, isError } = useFetchTopAnimeQuery(filter)
// data      = det API'et returnerer
// isLoading = true mens data hentes
// isError   = true hvis noget gik galt
```

### skip
Forhindrer RTK-Query i at sende et API kald.
```tsx
const { data } = useFetchSearchAnimeQuery(searchTerm, {
    skip: searchTerm === '' // Send ikke kald hvis searchTerm er tom
})
```

### params (objekt-style query)
Lader RTK-Query bygge URL parametrene for dig.
```tsx
query: (filter) => ({
    url: 'top/anime',
    params: {
        type: filter || undefined, // Sendes ikke med hvis undefined
        limit: 20,
    },
    method: 'GET',
})
// Resultat: top/anime?type=tv&limit=20
```

---

## 📝 TypeScript

### Interface
Beskriver strukturen på et objekt — hvad felter det har og hvilke typer de er.
```ts
interface IAnime {
    mal_id: number
    title: string
    score: number
}
```

### Type
Næsten det samme som interface men kan også bruges til primitive typer og kombinationer.
```ts
type AnimeCardProps = {
    anime: IAnime
    showScore?: boolean // ? betyder valgfri
}
```

### Generics \<T\>
En pladsholder for en type der bestemmes senere.
```ts
// <IAnimeListResponse, string> udfylder T med konkrete typer
builder.query<IAnimeListResponse, string>
```

### Valgfri prop med ?
Betyder at prop'en ikke er påkrævet.
```ts
iconClass?: string // Behøver ikke sendes med
```

### RootState
TypeScript typen på hele vores Redux store — bruges til at typesikre useSelector.
```ts
const favorites = useSelector((state: RootState) => state.favorites.animeItem)
```

---

## 🔤 JavaScript / TypeScript operatorer

### Ternary operator (? :)
En kortform for if/else på én linje.
```ts
// condition ? hvad hvis true : hvad hvis false
isFavorite ? 'Fjern favorit' : 'Tilføj favorit'
```

### && (AND / og vis dette)
Viser noget kun hvis betingelsen til venstre er sand.
```tsx
{isLoading && <LoadingSpinner />}
// Vis LoadingSpinner KUN hvis isLoading er true
```

### || (OR / eller)
Bruges som fallback — hvis venstre er falsy, brug højre.
```ts
filter || undefined
// Hvis filter er tom string → undefined
// Ellers → filter værdien
```

### ?? (Nullish coalescing)
Som || men reagerer KUN på null/undefined (ikke 0 eller tom string).
```ts
anime.synopsis ?? 'Ingen synopsis tilgængelig.'
// Hvis synopsis er null/undefined → vis fallback teksten
// Hvis synopsis er "" (tom) → vis tom string (ikke fallback!)
```

### Optional chaining ?.
Stopper hvis værdien er null/undefined i stedet for at crashe.
```ts
data?.data.title
// Hvis data er undefined → returner undefined
// Hvis data eksisterer → returner data.data.title
```

### .map()
Looper igennem et array og returnerer et nyt array.
```tsx
{FILTERS.map(f => (
    <button key={f.value}>{f.label}</button>
))}
```

### .some()
Returnerer true hvis mindst ét element i arrayet matcher betingelsen.
```ts
favorites.some(fav => fav.mal_id === anime.mal_id)
// Er denne anime i favoritter?
```

### .filter()
Returnerer et nyt array med kun de elementer der matcher betingelsen.
```ts
state.items.filter(a => a.mal_id !== action.payload)
// Returnerer alle anime UNDTAGEN den med dette id
```

### .find()
Returnerer det første element der matcher — eller undefined.
```ts
state.items.find(anime => anime.mal_id === action.payload.mal_id)
// Find anime med dette id
```

### .trim()
Fjerner mellemrum i starten og slutningen af en string.
```ts
'  naruto  '.trim() // → 'naruto'
```

### .toLocaleString()
Formaterer tal med tusindtalsseparator.
```ts
1000000.toLocaleString() // → '1.000.000'
```

### Template literals (backticks)
Lader dig sætte variabler ind i strings.
```ts
`top/anime?limit=20${filter ? `&type=${filter}` : ''}`
// Hvis filter = "tv" → "top/anime?limit=20&type=tv"
// Hvis filter = ""   → "top/anime?limit=20"
```

---

## 🎨 Tailwind CSS

### Utility klasser
Tailwind bruger små klasser der hver gør én ting.
```
bg-bg-surface     → baggrundfarve (surface)
text-white        → hvid tekst
p-4               → padding på alle sider (1rem)
px-4 py-2         → padding vandret/lodret
rounded-xl        → afrundede hjørner
flex              → flexbox
items-center      → centrer lodret i flexbox
justify-between   → fordel med plads imellem
gap-4             → afstand mellem flex/grid elementer
border            → kant rundt om element
hover:bg-gray-800 → baggrund ved hover
transition-colors → animér farveændringer
animate-spin      → rotation animation
line-clamp-2      → maks 2 linjer tekst
```

### Responsive klasser
Tilpasser layout til skærmstørrelse.
```
grid-cols-2           → 2 kolonner (mobil)
sm:grid-cols-3        → 3 kolonner (small skærm)
md:grid-cols-4        → 4 kolonner (medium skærm)
lg:grid-cols-5        → 5 kolonner (large skærm)
```

### @theme i index.css
Definerer egne farver der kan bruges som Tailwind klasser.
```css
@theme {
    --color-bg-primary: #0f0a0a;
    --color-rose-accent: #f43f5e;
}
/* Bruges som: bg-bg-primary, text-rose-accent */
```

---

## 📁 Mappestruktur

```
src/
├── components/       Genbrugelige komponenter
│   ├── animeCard.tsx
│   ├── AnimeGrid.tsx
│   ├── navbar.tsx
│   ├── PageHeader.tsx
│   ├── StatBadge.tsx
│   ├── GenreList.tsx
│   ├── LoadingSpinner.tsx
│   └── ErrorMessage.tsx
├── pages/            Én fil per side/route
│   ├── HomePage.tsx
│   ├── SearchPage.tsx
│   ├── AnimeDetailPage.tsx
│   └── FavoritesPage.tsx
├── store/            Alt Redux relateret
│   ├── index.ts      Redux store
│   ├── apis/
│   │   └── animeApi.ts
│   └── slices/
│       └── favoritesSlice.ts
├── types/            TypeScript interfaces
│   └── animeType.ts
├── App.tsx           Routing
└── main.tsx          Entry point + Redux Provider
```

---

## ✅ Opgavekrav — status

| Krav | Løsning |
|---|---|
| 5+ egne komponenter | AnimeCard, AnimeGrid, Navbar, PageHeader, StatBadge, GenreList, LoadingSpinner, ErrorMessage |
| Fælles Redux store | store/index.ts med favorites slice |
| RTK-Query | animeApi med fetchTopAnime, fetchSearchAnime, fetchAnimeById |
| Route og Link | BrowserRouter med 4 routes i App.tsx |
| TypeScript interfaces | IAnime, IGenre, IAnimeImage, IAnimeListResponse, IAnimeDetailResponse |
| CSS framework | Tailwind CSS med egne farver i index.css |