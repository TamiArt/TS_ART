export type Pigment = { id: string; name: string; colourIndex: string; hex: string; note: string };
export type StudyTask = "portrait" | "landscape" | "still-life";
export type Recipe = { id: string; task: StudyTask; label: string; description: string; first: string; second: string; ratio: number; third?: string; thirdRatio?: number };

/**
 * Каталог масляных красок «Мастер-Класс» (Невская палитра).
 * HEX — ориентировочные экранные выкраски, а не измеренные значения краски.
 * Номера оттенков приведены по каталогу производителя; состав пигментов
 * следует сверять с маркировкой конкретной тубы и актуальной упаковкой.
 */
export const pigments: Pigment[] = [
  { id: "titanium-white", name: "Белила титановые", colourIndex: "№101", hex: "#f1eee2", note: "Укрывистые белила для высветления и плотных замесов." },
  { id: "zinc-white", name: "Белила цинковые", colourIndex: "№100", hex: "#f4f0df", note: "Более прозрачные белила; учитывай особенности слоёв." },
  { id: "cadmium-lemon", name: "Кадмий лимонный", colourIndex: "№203", hex: "#e8e34a", note: "Холодный яркий жёлтый." },
  { id: "cadmium-yellow", name: "Кадмий жёлтый светлый", colourIndex: "№200", hex: "#f5d52c", note: "Насыщенный тёплый жёлтый." },
  { id: "cadmium-yellow-medium", name: "Кадмий жёлтый средний", colourIndex: "№201", hex: "#efbd24", note: "Средний по теплоте кадмиевый жёлтый." },
  { id: "cadmium-yellow-deep", name: "Кадмий жёлтый тёмный", colourIndex: "№202", hex: "#d99a1d", note: "Глубокий золотистый жёлтый." },
  { id: "naples-yellow", name: "Неаполитанская жёлтая", colourIndex: "№209", hex: "#e8d29a", note: "Сложный приглушённый жёлтый для света и телесных оттенков." },
  { id: "yellow-ochre", name: "Охра жёлтая", colourIndex: "№218", hex: "#c49a45", note: "Землистый жёлтый для кожи, земли и нейтралей." },
  { id: "golden-yellow", name: "Жёлтая золотистая", colourIndex: "№249", hex: "#c99b28", note: "Тёплый золотистый оттенок." },
  { id: "cadmium-orange", name: "Кадмий оранжевый", colourIndex: "№304", hex: "#ed7927", note: "Яркий укрывистый оранжевый." },
  { id: "orange", name: "Оранжевая", colourIndex: "№315", hex: "#e87535", note: "Чистый оранжевый для тёплых акцентов." },
  { id: "pyrrole-scarlet", name: "Пиррол алый", colourIndex: "№397", hex: "#e33d2f", note: "Яркий алый оттенок." },
  { id: "pyrrole-red", name: "Пиррол красный", colourIndex: "№396", hex: "#c92e32", note: "Насыщенный красный." },
  { id: "cadmium-red-dark", name: "Кадмий красный тёмный", colourIndex: "№303", hex: "#b93632", note: "Плотный тёплый красный." },
  { id: "indian-red", name: "Индийская красная", colourIndex: "№301", hex: "#984b42", note: "Землистый красный для теней и телесных полутонов." },
  { id: "english-red", name: "Английская красная", colourIndex: "№300", hex: "#9d4d3e", note: "Приглушённый красно-коричневый." },
  { id: "alizarin", name: "Ализарин малиновый", colourIndex: "№395", hex: "#873e55", note: "Холодный малиновый для красных и фиолетовых смесей." },
  { id: "naples-coral", name: "Неаполитанская коралловая", colourIndex: "№376", hex: "#d99a83", note: "Сложный светлый коралловый оттенок." },
  { id: "raw-sienna", name: "Сиена натуральная", colourIndex: "№405", hex: "#b97845", note: "Тёплый золотисто-коричневый земляной цвет." },
  { id: "burnt-sienna", name: "Сиена жжёная", colourIndex: "№406", hex: "#984b32", note: "Красно-коричневый для полутонов и нейтрализации." },
  { id: "terracotta-ochre", name: "Охра терракотовая", colourIndex: "№435", hex: "#b86b4c", note: "Тёплая терракотовая земля." },
  { id: "light-mars-brown", name: "Марс коричневый светлый", colourIndex: "№402", hex: "#986747", note: "Плотный светлый коричневый." },
  { id: "dark-mars-brown", name: "Марс коричневый тёмный прозрачный", colourIndex: "№404", hex: "#49342d", note: "Глубокий прозрачный коричневый." },
  { id: "raw-umber", name: "Умбра натуральная", colourIndex: "№415", hex: "#756047", note: "Спокойный коричневый для теней и нейтралей." },
  { id: "ultramarine", name: "Ультрамарин светлый", colourIndex: "№501", hex: "#3e58a1", note: "Насыщенный синий для холодных теней и сложных нейтралей." },
  { id: "ultramarine-dark", name: "Ультрамарин тёмный", colourIndex: "№521", hex: "#29356f", note: "Глубокий сине-фиолетовый." },
  { id: "phthalo-blue", name: "Голубая ФЦ", colourIndex: "№500", hex: "#167fa5", note: "Интенсивный холодный голубой; используй небольшими порциями." },
  { id: "cerulean", name: "Церулеум", colourIndex: "№503", hex: "#5796b5", note: "Мягкий небесно-голубой." },
  { id: "cobalt-blue-medium", name: "Кобальт синий средний", colourIndex: "№505", hex: "#416da4", note: "Умеренно насыщенный синий." },
  { id: "cobalt-blue-spectral", name: "Кобальт синий спектральный", colourIndex: "№502", hex: "#267eaa", note: "Чистый яркий синий." },
  { id: "indanthrene-blue", name: "Индантреновый синий", colourIndex: "№524", hex: "#273b67", note: "Глубокий тёмно-синий." },
  { id: "turquoise", name: "Бирюзовая", colourIndex: "№507", hex: "#299b91", note: "Сине-зелёный оттенок для воды и холодных рефлексов." },
  { id: "dioxazine-violet", name: "Фиолетовый диоксазин", colourIndex: "№628", hex: "#593b79", note: "Глубокий фиолетовый; очень сильный в смесях." },
  { id: "cobalt-violet-dark", name: "Кобальт фиолетовый тёмный", colourIndex: "№603", hex: "#654b79", note: "Приглушённый тёмный фиолетовый." },
  { id: "manganese-violet-light", name: "Марганцовая фиолетовая светлая", colourIndex: "№614", hex: "#a184a5", note: "Светлый мягкий фиолетовый." },
  { id: "viridian", name: "Виридоновая зелёная", colourIndex: "№701", hex: "#3c7861", note: "Холодная прозрачная зелёная." },
  { id: "cobalt-green-dark", name: "Кобальт зелёный тёмный", colourIndex: "№705", hex: "#39745a", note: "Глубокий спокойный зелёный." },
  { id: "cobalt-green-light", name: "Кобальт зелёный светлый", colourIndex: "№706", hex: "#78a77a", note: "Светлый мягкий зелёный." },
  { id: "emerald-green", name: "Изумрудная", colourIndex: "№720", hex: "#087c58", note: "Насыщенный холодный зелёный." },
  { id: "gas-soot", name: "Сажа газовая", colourIndex: "№801", hex: "#292927", note: "Глубокий чёрный; добавляй постепенно." },
  { id: "burnt-bone", name: "Кость жжёная", colourIndex: "№811", hex: "#34302d", note: "Тёплый чёрный для сложных теней." },
  { id: "paynes-grey", name: "Серая Пейна", colourIndex: "№812", hex: "#4d5860", note: "Холодный тёмно-серый для теней и нейтралей." },
  { id: "warm-grey", name: "Тёплая серая", colourIndex: "№821", hex: "#958b7d", note: "Готовый тёплый нейтральный оттенок." },
  { id: "toindigo-brown", name: "Тоиндиго розово-коричневая (имитация)", colourIndex: "№394", hex: "#79504c", note: "Сложный розово-коричневый готовый оттенок." }
];

export const taskOptions: { id: StudyTask; label: string; description: string }[] = [
  { id: "portrait", label: "Портрет", description: "Кожа и полутон · губы и румянец · волосы · тени лица" },
  { id: "landscape", label: "Пейзаж", description: "Небо и воздух · листва · земля и горы · вода" },
  { id: "still-life", label: "Натюрморт", description: "Фрукты и овощи · керамика · ткань · стекло и металл" }
];

export const recipes: Recipe[] = [
  { id: "skin", task: "portrait", label: "Кожа и полутон", description: "Начни с охры и белил; красный оксид можно добавить малыми порциями для тепла.", first: "yellow-ochre", second: "titanium-white", ratio: 38, third: "indian-red", thirdRatio: 10 },
  { id: "lips", task: "portrait", label: "Губы и румянец", description: "Малиновый и охра дают отправную точку; белила смягчают смесь.", first: "alizarin", second: "yellow-ochre", ratio: 65, third: "titanium-white", thirdRatio: 12 },
  { id: "hair", task: "portrait", label: "Волосы", description: "Сиена и умбра создают тёплую основу; ультрамарин углубляет холодные участки.", first: "burnt-sienna", second: "raw-umber", ratio: 55, third: "ultramarine", thirdRatio: 8 },
  { id: "face-shadows", task: "portrait", label: "Тени лица", description: "Умбра с ультрамарином — ориентир для приглушённых теней; сверяйся с освещением.", first: "raw-umber", second: "ultramarine", ratio: 62, third: "indian-red", thirdRatio: 8 },
  { id: "sky", task: "landscape", label: "Небо и воздух", description: "Голубой с белилами; небольшая охра может приглушить холодный оттенок у горизонта.", first: "cerulean", second: "titanium-white", ratio: 35, third: "yellow-ochre", thirdRatio: 5 },
  { id: "foliage", task: "landscape", label: "Листва", description: "Зелёный и охра дают природную основу; умбра помогает затемнить без простого добавления чёрного.", first: "viridian", second: "yellow-ochre", ratio: 55, third: "raw-umber", thirdRatio: 10 },
  { id: "earth", task: "landscape", label: "Земля и горы", description: "Сиена с умброй — земляная база; ультрамарин помогает охладить дальний план.", first: "raw-sienna", second: "raw-umber", ratio: 55, third: "ultramarine", thirdRatio: 8 },
  { id: "water", task: "landscape", label: "Вода и отражения", description: "Начни с синего и белил, затем настрой отражение по цвету окружения, а не только воды.", first: "ultramarine", second: "titanium-white", ratio: 40, third: "raw-umber", thirdRatio: 6 },
  { id: "fruit", task: "still-life", label: "Фрукты и овощи", description: "Для красно-оранжевых предметов попробуй пиррол красный с охрой; белила меняют светлоту.", first: "pyrrole-red", second: "yellow-ochre", ratio: 60, third: "titanium-white", thirdRatio: 8 },
  { id: "ceramic", task: "still-life", label: "Керамика", description: "Белила и умбра дают основу для тёплых нейтралей; ультрамарин охлаждает тень.", first: "titanium-white", second: "raw-umber", ratio: 72, third: "ultramarine", thirdRatio: 6 },
  { id: "fabric", task: "still-life", label: "Ткань", description: "Сочетай основной цвет ткани с небольшим количеством дополнительного или земляного пигмента.", first: "ultramarine", second: "alizarin", ratio: 55, third: "titanium-white", thirdRatio: 12 },
  { id: "glass-metal", task: "still-life", label: "Стекло и металл", description: "Для отражений смешивай нейтрали и оттенки окружения; один универсальный серый не подойдёт.", first: "ultramarine", second: "burnt-sienna", ratio: 52, third: "titanium-white", thirdRatio: 10 }
];

export function getPigment(id: string): Pigment {
  return pigments.find((pigment) => pigment.id === id) ?? pigments[0];
}
