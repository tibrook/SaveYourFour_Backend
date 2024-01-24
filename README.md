# Easy Cooking Backend

This backend for the Easy Cooking project is implemented using TypeScript and NestJS, chosen to explore these technologies. It manages data interactions for the application, including user accounts, inventory, recipes, weekly menus, and shopping lists.

## Technologies

- **TypeScript:** Ensures type-safe backend development.
- **NestJS:** A progressive framework for building efficient server-side applications.
- **MongoDB:** A NoSQL database used for storing all application data.

- Authentication
- Account creation
- Connect application with receipe API (ex : marmiton)
- Store ingredients in database
- Store personnal receipes notes in database
- Receipes generation
- Store shopping list
- HTTPS conf
- Rate limiter setup 

### Users
- `id`: Unique identifier.
- `name`: User's last name.
- `firstName`: User's first name.
- `email`: User's email.
- `username`: User's username.
- `role`: User's role (admin/user/test).

### Ingredients
- `id`: Unique identifier.
- `name`: Ingredient name.
- `quantity`: Available quantity.
- `location`: Storage location (managed on the frontend).
- `type`: Ingredient type.
- `urgency`: Urgency level (1-10).

### Recipes
- `id`: Unique identifier.
- `name`: Recipe name.
- `description`: Recipe description.
- `note`: User-added notes.
- `quantityPeople`: Number of servings.
- `price`: Estimated cost.
- `favorites`: Favorite status (true/false).

### Weekly Recipes
- `id`: Unique identifier.
- `weekNumber`: Week number for the menu.
- `weekMenu`: Object containing the weekly menu details.

### Shopping List
- `id`: Unique identifier.
- `shoppingList`: Object containing items on the shopping list.

## External API Integration

- **Recipe API:** Recipes are fetched from an external API (e.g., Marmiton).
- **Recipe Saving:** When a user adds notes, the recipe is saved to the database.

## Initial Setup

- **Base Ingredients:** A set of basic ingredients will be pre-loaded.
- **Location Prompt:** Users will be prompted on the frontend to specify locations for these ingredients.

## Weekly Menu Management

- **Saving Menus:** Weekly menus are saved for later viewing on the frontend.

## Security Solutions

- **Password Hashing:** To ensure user password security.
- **Helmet:** For securing HTTP headers.
- **Rate Limiter:** To prevent brute force attacks and abuse.

## Project Setup

### Installation

```bash
$ npm install
```

### Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
