const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API пользователей',
      version: '1.0.0',
      description: 'API для управления пользователями и их любимыми фильмами',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
      },
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            email: { type: 'string' },
            age: { type: 'integer' },
            favoriteFilms: {
              type: 'array',
              items: { $ref: '#/components/schemas/Film' },
            },
          },
        },
        Film: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            title: { type: 'string' },
          },
        },
        NewUser: {
          type: 'object',
          required: ['name', 'email', 'age'],
          properties: {
            name: { type: 'string' },
            email: { type: 'string' },
            age: { type: 'integer' },
          },
        },
        NewFilm: {
          type: 'object',
          required: ['title'],
          properties: {
            title: { type: 'string' },
          },
        },
      },
    },
    paths: {
      '/users': {
        get: {
          summary: 'Получить список всех пользователей',
          responses: {
            '200': {
              description: 'Успешный ответ',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/User' },
                  },
                },
              },
            },
            '500': { description: 'Ошибка сервера' },
          },
        },
        post: {
          summary: 'Создать нового пользователя',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/NewUser' },
              },
            },
          },
          responses: {
            '201': {
              description: 'Полььзователь успешно создан',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/User' },
                },
              },
            },
            '400': { description: 'Неполные данные' },
            '500': { description: 'Ошибка сервера' },
          },
        },
      },
      '/users/sorted': {
        get: {
          summary: 'Получить отсортированный список пользователей',
          responses: {
            '200': {
              description: 'Успешный ответ',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/User' },
                  },
                },
              },
            },
            '500': { description: 'Ошибка сервера' },
          },
        },
      },
      '/users/{userId}': {
        get: {
          summary: 'Получить информацию о пользователе по ID',
          parameters: [
            {
              name: 'userId',
              in: 'path',
              required: true,
              schema: { type: 'string' },
            },
          ],
          responses: {
            '200': {
              description: 'Успешный ответ',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/User' },
                },
              },
            },
            '404': { description: 'Полььзователь не найден' },
            '500': { description: 'Ошибка сервера' },
          },
        },
        put: {
          summary: 'Обновить информацию о пользователе',
          parameters: [
            {
              name: 'userId',
              in: 'path',
              required: true,
              schema: { type: 'string' },
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/User' },
              },
            },
          },
          responses: {
            '201': {
              description: 'Информация успешно обновлена',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/User' },
                },
              },
            },
            '404': { description: 'Полььзователь не найден' },
            '500': { description: 'Ошибка сервера' },
          },
        },
        delete: {
          summary: 'Удалить пользователя',
          parameters: [
            {
              name: 'userId',
              in: 'path',
              required: true,
              schema: { type: 'string' },
            },
          ],
          responses: {
            '200': {
              description: 'Полььзователь успешно удален',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/User' },
                },
              },
            },
            '404': { description: 'Полььзователь не найден' },
            '500': { description: 'Ошибка сервера' },
          },
        },
      },
      '/users/age/{age}': {
        get: {
          summary: 'Получить пользователей старше указанного возраста',
          parameters: [
            {
              name: 'age',
              in: 'path',
              required: true,
              schema: { type: 'integer' },
            },
          ],
          responses: {
            '200': {
              description: 'Успешный ответ',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/User' },
                  },
                },
              },
            },
            '500': { description: 'Ошибка сервера' },
          },
        },
      },
      '/users/domain/{domain}': {
        get: {
          summary: 'Получить пользователей по домену электронной почты',
          parameters: [
            {
              name: 'domain',
              in: 'path',
              required: true,
              schema: { type: 'string' },
            },
          ],
          responses: {
            '200': {
              description: 'Успешный ответ',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/User' },
                  },
                },
              },
            },
            '500': { description: 'Ошибка сервера' },
          },
        },
      },
      '/users/{userId}/favoriteFilms': {
        get: {
          summary: 'Получить любимые фильмы пользователя',
          parameters: [
            {
              name: 'userId',
							in: 'path',
              required: true,
              schema: { type: 'string' },
            },
          ],
          responses: {
            '200': {
              description: 'Успешный ответ',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Film' },
                  },
                },
              },
            },
            '400': { description: 'Полььзователь или фильмы не найдены' },
            '500': { description: 'Ошибка сервера' },
          },
        },
        post: {
          summary: 'Добавить фильм в список любимых пользователя',
          parameters: [
            {
              name: 'userId',
              in: 'path',
              required: true,
              schema: { type: 'string' },
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/NewFilm' },
              },
            },
          },
          responses: {
            '200': {
              description: 'Фильм успешно добавлен',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Film' },
                },
              },
            },
            '400': { description: 'Полььзователь не найден' },
            '500': { description: 'Ошибка сервера' },
          },
        },
      },
      '/users/{userId}/favoriteFilms/{filmId}': {
        get: {
          summary: 'Получить информацию о любимом фильме пользователя по ID',
          parameters: [
            {
              name: 'userId',
              in: 'path',
              required: true,
              schema: { type: 'string' },
            },
            {
              name: 'filmId',
              in: 'path',
              required: true,
              schema: { type: 'string' },
            },
          ],
          responses: {
            '200': {
              description: 'Успешный ответ',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Film' },
                },
              },
            },
            '404': { description: 'Фильм не найден' },
            '500': { description: 'Ошибка сервера' },
          },
        },
        put: {
          summary: 'Обновить информацию о любимом фильме пользователя',
          parameters: [
            {
              name: 'userId',
              in: 'path',
              required: true,
              schema: { type: 'string' },
            },
            {
              name: 'filmId',
              in: 'path',
              required: true,
              schema: { type: 'string' },
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Film' },
              },
            },
          },
          responses: {
            '200': {
              description: 'Информация о фильме успешно обновлена',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Film' },
                },
              },
            },
            '404': { description: 'Фильм не найден' },
            '500': { description: 'Ошибка сервера' },
          },
        },
        delete: {
          summary: 'Удалить фильм из списка любимых пользователя',
          parameters: [
            {
              name: 'userId',
              in: 'path',
              required: true,
              schema: { type: 'string' },
            },
            {
              name: 'filmId',
              in: 'path',
              required: true,
              schema: { type: 'string' },
            },
          ],
          responses: {
            '200': {
              description: 'Фильм успешно удален',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Film' },
                },
              },
            },
            '404': { description: 'Фильм не найден' },
            '500': { description: 'Ошибка сервера' },
          },
        },
      },
    },
  },
  apis: ['./controllers/userController.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};