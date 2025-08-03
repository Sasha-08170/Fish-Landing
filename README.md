# 🎨 Fish-Landing

Адаптивный лендинг, созданный с использованием методологии БЭМ (Block Element Modifier) 

## ✨ Особенности

- **БЭМ методология** - четкая структура CSS классов
- **Полностью адаптивный дизайн** - работает на всех устройствах
- **Современный UI/UX** - красивые анимации и переходы
- **Интерактивное меню** - плавная навигация по секциям
- **Форма обратной связи** - с валидацией и уведомлениями
- **Черно-белые изображения** - элегантный минималистичный дизайн
- **Рыбный текст** - Lorem ipsum для демонстрации контента

## 🚀 Технологии

- **HTML5** - семантическая разметка
- **CSS3** - современные стили и анимации
- **JavaScript (ES6+)** - интерактивность и функциональность
- **БЭМ методология** - организация CSS классов
- **CSS Grid & Flexbox** - современная верстка
- **Intersection Observer API** - анимации при скролле

## 📱 Секции сайта

### 1. Главная (Hero)
- Привлекательный заголовок
- Описание услуг
- Призыв к действию

### 2. О нас (About)
- Информация о компании
- Черно-белая фотография офиса
- Рыбный текст для демонстрации

### 3. Услуги (Services)
- 4 карточки с услугами
- Иконки и описания
- Hover эффекты

### 4. Портфолио (Portfolio)
- Галерея проектов
- Черно-белые изображения
- Overlay с описанием

### 5. Контакты (Contact)
- Контактная информация
- Форма обратной связи
- Валидация полей

## 🎯 БЭМ структура

```
header/
├── header__container
├── header__logo
│   ├── header__logo-link
│   └── header__logo-text
├── header__burger
│   └── header__burger-line
└── nav/
    ├── nav__list
    ├── nav__item
    └── nav__link

hero/
├── hero__container
├── hero__title
├── hero__description
└── hero__button

about/
├── about__container
├── about__content
├── about__text
│   ├── about__title
│   └── about__description
└── about__image
    └── about__img

services/
├── services__container
├── services__title
├── services__grid
└── service-card/
    ├── service-card__icon
    ├── service-card__title
    └── service-card__description

portfolio/
├── portfolio__container
├── portfolio__title
├── portfolio__grid
└── portfolio-item/
    ├── portfolio-item__image
    ├── portfolio-item__overlay
    ├── portfolio-item__title
    └── portfolio-item__description

contact/
├── contact__container
├── contact__title
├── contact__info
├── contact__item/
│   ├── contact__title
│   ├── contact__text
└── contact__form/
    └── form/
        ├── form__group
        ├── form__input
        ├── form__textarea
        └── form__button
        └── form__map

footer/
├── footer__container
└── footer__text
```

## 🎨 Дизайн

### Цветовая палитра
- **Основной синий**: `#007bff`
- **Градиент**: `linear-gradient(135deg, #007bff, #00d4ff)`
- **Текст**: `#333` (основной), `#666` (вторичный)
- **Фон**: `#f8f9fa` (светлый), `#333` (темный)

### Типографика
- **Шрифт**: Inter (Google Fonts)
- **Заголовки**: 700 weight
- **Текст**: 400 weight
- **Адаптивные размеры**: от 1rem до 3.5rem

### Анимации
- **Fade In Up** - появление элементов
- **Hover эффекты** - интерактивность
- **Ripple эффект** - для кнопок
- **Smooth transitions** - плавные переходы

## 📱 Адаптивность

### Breakpoints
- **Mobile**: до 768px
- **Tablet**: 769px - 1024px
- **Desktop**: от 1025px

### Особенности мобильной версии
- Бургер-меню
- Вертикальная навигация
- Адаптивные размеры шрифтов
- Оптимизированные отступы

## 🔧 Функциональность

### Навигация
- Плавная прокрутка к секциям
- Активная подсветка текущей секции
- Мобильное меню с overlay

### Форма обратной связи
- Валидация полей
- Проверка email
- Уведомления об успехе/ошибке
- Автоматическая очистка формы

## 🚀 Запуск проекта

1. **Клонируйте репозиторий**
   ```bash
   git clone [url-репозитория]
   cd Menu
   ```

2. **Откройте index.html в браузере**
   ```bash
   # Просто откройте файл в браузере
   # Или используйте локальный сервер
   ```

## 📁 Структура файлов

```
Menu/
├── index.html          # Главная страница
├── styles.css          # Стили (БЭМ методология)
├── script.js           # JavaScript функциональность
└── README.md           # Документация
```

## 🎯 Возможности для расширения

- **Аналитика** - Google Analytics
- **Темная тема** - переключение между светлой и темной темой
