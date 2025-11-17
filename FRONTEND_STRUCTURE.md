# Frontend Structure - ShareUp

## Структура папок

```
frontend/
├── public/                    # Статические файлы
├── src/
│   ├── api/                   # API конфигурация
│   │   └── axios.js           # Настроенный axios instance
│   ├── assets/                # Изображения, иконки
│   ├── components/            # React компоненты
│   │   └── common/            # Общие компоненты
│   │       ├── PrivateRoute.js   # Защищенный роутинг
│   │       └── AdminRoute.js     # Админ роутинг
│   ├── config/                # Конфигурация
│   │   └── api.js             # API endpoints
│   ├── context/               # React Context
│   │   └── AuthContext.js     # Контекст авторизации
│   ├── hooks/                 # Custom hooks
│   │   ├── useForm.js         # Хук для форм
│   │   ├── usePagination.js   # Хук для пагинации
│   │   └── index.js           # Экспорт хуков
│   ├── pages/                 # Страницы приложения (пусто)
│   ├── services/              # API сервисы
│   │   ├── authService.js     # Авторизация
│   │   ├── postService.js     # Посты
│   │   ├── likeService.js     # Лайки
│   │   ├── commentService.js  # Комментарии
│   │   ├── profileService.js  # Профиль
│   │   ├── pointService.js    # Поинты
│   │   ├── adminService.js    # Админка
│   │   └── index.js           # Экспорт сервисов
│   ├── utils/                 # Утилиты
│   │   ├── helpers.js         # Вспомогательные функции
│   │   ├── constants.js       # Константы
│   │   └── index.js           # Экспорт утилит
│   ├── App.js                 # Главный компонент
│   └── index.js               # Точка входа
├── .env.example               # Пример конфигурации
└── package.json               # Зависимости
```

## Установленные зависимости

```json
{
  "axios": "^1.x",
  "react-router-dom": "^6.x"
}
```

## API Сервисы

### authService
- `register(data)` - Регистрация
- `login(email, password)` - Вход
- `logout()` - Выход
- `getCurrentUser()` - Получить текущего пользователя
- `getStoredUser()` - Получить из localStorage
- `getToken()` - Получить токен
- `isAuthenticated()` - Проверка авторизации

### postService
- `getFeed(page)` - Лента постов
- `getPost(id)` - Один пост
- `createPost(formData)` - Создать пост
- `deletePost(id)` - Удалить пост
- `getUserPosts(userId)` - Посты пользователя

### likeService
- `toggleLike(postId)` - Лайк/дизлайк

### commentService
- `getComments(postId)` - Комментарии
- `createComment(postId, content)` - Создать
- `deleteComment(id)` - Удалить

### profileService
- `getProfile(id)` - Профиль
- `updateProfile(data)` - Обновить
- `uploadAvatar(file)` - Загрузить аватар

### pointService
- `getBalance()` - Баланс поинтов
- `getTransactions()` - История транзакций

### adminService
- `getDashboard()` - Статистика
- `getUsers(page)` - Пользователи
- `banUser(userId)` - Забанить
- `unbanUser(userId)` - Разбанить
- `deleteUser(userId)` - Удалить
- `addPoints(userId, amount, description)` - Начислить
- `deductPoints(userId, amount, description)` - Списать
- `getPosts(page)` - Посты
- `deletePost(postId)` - Удалить пост
- `getLogs(page)` - Логи

## Custom Hooks

### useForm
```javascript
const { values, errors, handleChange, handleSubmit, reset } = useForm({
  email: '',
  password: ''
});
```

### usePagination
```javascript
const { data, loading, hasMore, loadMore, refresh } = usePagination(fetchFunction);
```

## Context

### AuthContext
```javascript
const { user, isAuthenticated, loading, login, register, logout, updateUser } = useAuth();
```

## Утилиты

### helpers.js
- `formatDate(dateString)` - Форматирование даты
- `formatPoints(points)` - Форматирование поинтов
- `getImageUrl(path)` - URL изображения
- `truncateText(text, maxLength)` - Обрезка текста
- `validateEmail(email)` - Валидация email
- `validatePhone(phone)` - Валидация телефона
- `handleApiError(error)` - Обработка ошибок API

### constants.js
- `POINT_TYPES` - Типы поинтов
- `POINT_AMOUNTS` - Суммы поинтов
- `USER_ROLES` - Роли пользователей
- `ROUTES` - Маршруты приложения
- `ERROR_MESSAGES` - Сообщения об ошибках

## Роутинг

### Публичные маршруты
- `/` - Главная
- `/login` - Вход
- `/register` - Регистрация

### Защищенные маршруты (требуется авторизация)
- `/feed` - Лента
- `/profile/:id` - Профиль
- `/profile/me` - Мой профиль
- `/post/:id` - Пост
- `/points` - Поинты

### Админ маршруты (требуется роль admin)
- `/admin/dashboard` - Dashboard
- `/admin/users` - Пользователи
- `/admin/posts` - Посты
- `/admin/logs` - Логи

## Axios Instance

Автоматически добавляет:
- Authorization header с токеном
- Обработка 401 ошибки (редирект на login)
- Content-Type headers

## Использование

### Пример авторизации
```javascript
import { useAuth } from './context/AuthContext';

function LoginPage() {
  const { login } = useAuth();
  
  const handleLogin = async () => {
    try {
      await login('email@example.com', 'password');
      // redirect to feed
    } catch (error) {
      console.error(error);
    }
  };
}
```

### Пример загрузки данных
```javascript
import { postService } from './services';

function FeedPage() {
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    const loadPosts = async () => {
      const data = await postService.getFeed(1);
      setPosts(data.data);
    };
    loadPosts();
  }, []);
}
```

### Пример с пагинацией
```javascript
import { usePagination } from './hooks';
import { postService } from './services';

function FeedPage() {
  const { data, loading, hasMore, loadMore } = usePagination(postService.getFeed);
  
  return (
    <div>
      {data.map(post => <PostItem key={post.id} post={post} />)}
      {hasMore && <button onClick={loadMore}>Load More</button>}
    </div>
  );
}
```

## Следующие шаги

1. Создать компоненты для страниц
2. Интегрировать верстку из папки `/verstka/`
3. Реализовать UI компоненты
4. Добавить стили

## Примечания

- Все API запросы идут через настроенный axios instance
- Токен автоматически добавляется в headers
- При 401 ошибке происходит автоматический logout
- Все сервисы готовы к использованию
- Роутинг настроен, страницы показывают заглушки

