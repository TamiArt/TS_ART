export type Pigment = { id: string; name: string; colourIndex: string; hex: string; note: string };
export type StudyTask = "portrait" | "landscape" | "still-life";
export type Recipe = { id: string; task: StudyTask; label: string; description: string; first: string; second: string; ratio: number; third?: string; thirdRatio?: number };

export const pigments: Pigment[] = [
  { id: "titanium-white", name: "Титановые белила", colourIndex: "PW6", hex: "#f0e8d7", note: "Осветляют смесь; могут снижать насыщенность." },
  { id: "yellow-ochre", name: "Жёлтая охра", colourIndex: "PY43", hex: "#c49a45", note: "Приглушённый землистый жёлтый." },
  { id: "cadmium-yellow", name: "Кадмиевый жёлтый", colourIndex: "PY35", hex: "#f2c52d", note: "Тёплый жёлтый; соблюдай маркировку безопасности." },
  { id: "raw-sienna", name: "Сиена натуральная", colourIndex: "PBr7", hex: "#b97845", note: "Тёплый золотисто-коричневый земляной пигмент." },
  { id: "burnt-sienna", name: "Сиена жжёная", colourIndex: "PBr7", hex: "#984b32", note: "Красно-коричневый для полутонов и нейтрализации." },
  { id: "burnt-umber", name: "Умбра жжёная", colourIndex: "PBr7", hex: "#594033", note: "Глубокий тёмный земляной цвет." },
  { id: "raw-umber", name: "Умбра натуральная", colourIndex: "PBr7", hex: "#756047", note: "Спокойный коричневый для теней и нейтралей." },
  { id: "ultramarine", name: "Ультрамарин", colourIndex: "PB29", hex: "#344b91", note: "Синий для холодных теней и сложных нейтралей." },
  { id: "cerulean", name: "Церулеум", colourIndex: "PB35 / PB36", hex: "#558ba4", note: "Мягкий небесно-голубой; индекс зависит от краски." },
  { id: "viridian", name: "Виридоновая зелёная", colourIndex: "PG18", hex: "#3c7861", note: "Холодная зелёная; сверяй индекс с этикеткой." },
  { id: "sap-green", name: "Сок зелёный (имитация)", colourIndex: "смесь", hex: "#627348", note: "Название часто обозначает готовую смесь." },
  { id: "alizarin", name: "Ализариновый малиновый", colourIndex: "PR83 / замены", hex: "#873e55", note: "Состав и светостойкость зависят от конкретной версии." },
  { id: "red-oxide", name: "Красный оксид железа", colourIndex: "PR101", hex: "#a64c3d", note: "Землистый красный для тёплых полутонов." },
  { id: "ivory-black", name: "Слоновая кость (чёрная)", colourIndex: "PBk9", hex: "#302f2b", note: "Сильно снижает светлоту; добавляй понемногу." },
  { id: "cadmium-lemon", name: "Кадмий лимонный", colourIndex: "по этикетке производителя", hex: "#f3e34a", note: "Холодный светлый жёлтый; оттенок на экране условный." },
  { id: "cadmium-yellow-light", name: "Кадмий жёлтый светлый", colourIndex: "по этикетке производителя", hex: "#f6d52f", note: "Светлый насыщенный жёлтый; учитывай укрывистость конкретной краски." },
  { id: "cadmium-yellow-medium", name: "Кадмий жёлтый средний", colourIndex: "по этикетке производителя", hex: "#eeb51f", note: "Более тёплый и глубокий жёлтый." },
  { id: "cadmium-yellow-dark", name: "Кадмий жёлтый тёмный", colourIndex: "по этикетке производителя", hex: "#d99a18", note: "Глубокий тёплый жёлтый." },
  { id: "cadmium-red-light", name: "Кадмий красный светлый", colourIndex: "по этикетке производителя", hex: "#e94b3c", note: "Светлый яркий красный; соблюдай маркировку безопасности." },
  { id: "cadmium-red-dark", name: "Кадмий красный тёмный", colourIndex: "по этикетке производителя", hex: "#a92f35", note: "Глубокий красный; соблюдай маркировку безопасности." },
  { id: "permanent-rose-madder", name: "Краплак розовый прочный", colourIndex: "по этикетке производителя", hex: "#b94b72", note: "Холодный малиново-розовый; состав и светостойкость сверяй с этикеткой." },
  { id: "phthalo-blue", name: "Голубая ФЦ", colourIndex: "по этикетке производителя", hex: "#087eaa", note: "Интенсивный холодный синий; вводи малыми порциями." },
  { id: "gas-soot", name: "Сажа газовая", colourIndex: "по этикетке производителя", hex: "#292a2b", note: "Глубокий чёрный для затемнения и сложных нейтралей." },
  { id: "phthalo-green", name: "Зелёная ФЦ", colourIndex: "по этикетке производителя", hex: "#087b59", note: "Очень сильная холодная зелёная; добавляй постепенно." },
  { id: "turquoise", name: "Бирюзовая", colourIndex: "по этикетке производителя", hex: "#229e9a", note: "Сине-зелёный цвет для воды и холодных акцентов." },
  { id: "emerald-green", name: "Изумрудная зелёная", colourIndex: "по этикетке производителя", hex: "#16845a", note: "Чистая насыщенная зелёная." },
  { id: "dark-cobalt-violet", name: "Кобальт фиолетовый тёмный", colourIndex: "по этикетке производителя", hex: "#59417d", note: "Глубокий холодный фиолетовый." },
  { id: "indigo", name: "Индиго", colourIndex: "по этикетке производителя", hex: "#343b66", note: "Тёмный сине-фиолетовый для глубоких теней." },
  { id: "dark-transparent-mars-brown", name: "Марс коричневый тёмный прозрачный", colourIndex: "по этикетке производителя", hex: "#654337", note: "Прозрачный тёмный коричневый для лессировок." },
  { id: "grass-green", name: "Травяная зелёная", colourIndex: "по этикетке производителя", hex: "#66833c", note: "Средняя природная зелёная." },
  { id: "transparent-mars-brown", name: "Марс коричневый прозрачный", colourIndex: "по этикетке производителя", hex: "#89604b", note: "Прозрачный красно-коричневый для тонких слоёв." },
  { id: "mars-orange", name: "Марс оранжевый", colourIndex: "по этикетке производителя", hex: "#c75c35", note: "Тёплый землистый оранжево-красный." },
  { id: "light-cobalt-violet", name: "Кобальт фиолетовый светлый", colourIndex: "по этикетке производителя", hex: "#9580a9", note: "Светлый приглушённый фиолетовый." },
  { id: "sky-blue", name: "Небесно-голубой", colourIndex: "по этикетке производителя", hex: "#70a9c6", note: "Светлый голубой для неба и воздушной перспективы." }
];

export const taskOptions: { id: StudyTask; label: string; description: string }[] = [
  { id: "portrait", label: "Портрет", description: "Кожа и полутон · губы и румянец · волосы · тени лица" },
  { id: "landscape", label: "Пейзаж", description: "Небо и воздух · листва · земля и горы · вода" },
  { id: "still-life", label: "Натюрморт", description: "Фрукты и овощи · керамика · ткань · стекло и металл" }
];

export const recipes: Recipe[] = [
  { id: "skin", task: "portrait", label: "Кожа и полутон", description: "Начни с охры и белил; красный оксид можно добавить малыми порциями для тепла.", first: "yellow-ochre", second: "titanium-white", ratio: 38, third: "red-oxide", thirdRatio: 10 },
  { id: "lips", task: "portrait", label: "Губы и румянец", description: "Малиновый и охра дают отправную точку; белила смягчают смесь.", first: "alizarin", second: "yellow-ochre", ratio: 65, third: "titanium-white", thirdRatio: 12 },
  { id: "hair", task: "portrait", label: "Волосы", description: "Сиена и умбра создают тёплую основу; ультрамарин углубляет холодные участки.", first: "burnt-sienna", second: "burnt-umber", ratio: 55, third: "ultramarine", thirdRatio: 8 },
  { id: "face-shadows", task: "portrait", label: "Тени лица", description: "Умбра с ультрамарином — ориентир для приглушённых теней; сверяйся с освещением.", first: "burnt-umber", second: "ultramarine", ratio: 62, third: "red-oxide", thirdRatio: 8 },
  { id: "sky", task: "landscape", label: "Небо и воздух", description: "Голубой с белилами; небольшая охра может приглушить холодный оттенок у горизонта.", first: "cerulean", second: "titanium-white", ratio: 35, third: "yellow-ochre", thirdRatio: 5 },
  { id: "foliage", task: "landscape", label: "Листва", description: "Зелёный и охра дают природную основу; умбра помогает затемнить без простого добавления чёрного.", first: "viridian", second: "yellow-ochre", ratio: 55, third: "raw-umber", thirdRatio: 10 },
  { id: "earth", task: "landscape", label: "Земля и горы", description: "Сиена с умброй — земляная база; ультрамарин помогает охладить дальний план.", first: "raw-sienna", second: "burnt-umber", ratio: 55, third: "ultramarine", thirdRatio: 8 },
  { id: "water", task: "landscape", label: "Вода и отражения", description: "Начни с синего и белил, затем настрой отражение по цвету окружения, а не только воды.", first: "ultramarine", second: "titanium-white", ratio: 40, third: "raw-umber", thirdRatio: 6 },
  { id: "fruit", task: "still-life", label: "Фрукты и овощи", description: "Для красно-оранжевых предметов попробуй красный оксид с охрой; белила меняют светлоту.", first: "red-oxide", second: "yellow-ochre", ratio: 60, third: "titanium-white", thirdRatio: 8 },
  { id: "ceramic", task: "still-life", label: "Керамика", description: "Белила и умбра дают основу для тёплых нейтралей; ультрамарин охлаждает тень.", first: "titanium-white", second: "raw-umber", ratio: 72, third: "ultramarine", thirdRatio: 6 },
  { id: "fabric", task: "still-life", label: "Ткань", description: "Сочетай основной цвет ткани с небольшим количеством дополнительного или земляного пигмента.", first: "ultramarine", second: "alizarin", ratio: 55, third: "titanium-white", thirdRatio: 12 },
  { id: "glass-metal", task: "still-life", label: "Стекло и металл", description: "Для отражений смешивай нейтрали и оттенки окружения; один универсальный серый не подойдёт.", first: "ultramarine", second: "burnt-sienna", ratio: 52, third: "titanium-white", thirdRatio: 10 }
];

export function getPigment(id: string): Pigment {
  return pigments.find((pigment) => pigment.id === id) ?? pigments[0];
}
