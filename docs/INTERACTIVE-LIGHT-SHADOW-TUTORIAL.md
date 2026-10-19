# Интерактивный урок «Повтори по образцу»

Добавляет в TS·ART Studio пошаговую практику по наблюдению света и тени.

## Состав
- `src/components/RepeatByExample.tsx` — React-компонент с переключением этапов, подсказками, прогрессом и чекбоксами выполнения.
- `src/components/RepeatByExample.css` — адаптивные изолированные стили.
- `public/illustrations/repeat-by-example/*.svg` — пять самостоятельных учебных иллюстраций в лёгком карандашном стиле.
- `src/components/LessonVisualGuide.tsx` — точка подключения интерактивного урока в существующий рендер визуальных материалов.

## Поведение
- Пять шагов: начало, поиск крайних тонов, переход света в тень, три тональные зоны, сравнение с натурой.
- Прогресс по шагам сохраняется в localStorage этого браузера.
- Работает без дополнительных пакетов и сетевых API.
- Есть состояния клавиатурного фокуса, aria-label и live-объявление прогресса.

## Проверки
После применения ветки выполните:
```sh
npm install
npm run check
npm test
npm run build
```

Иллюстрации схематические. Они помогают увидеть принцип, но не заменяют наблюдение реального предмета при освещении.

## Compact lesson layout

- The “Попробуй по шагам” sequence is displayed as plain numbered text with tight line spacing; separators, row borders and list-card framing are removed.
- Lesson headings, materials, objective and self-check spacing are reduced on desktop and mobile.
- The interactive light-and-shadow exercise uses tighter spacing around tabs, illustration, hints, progress and summary while retaining keyboard focus and accessible controls.
