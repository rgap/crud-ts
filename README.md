## Initialize

```
npm init
```

## Typescript

```
npm install typescript -D
npx tsc

Tipado para node js
npm install @types/node -D
npx tsc index.ts

Esto crea la carpeta del output
npx tsc
```

## Nodemon

```
npm install ts-node nodemon -D
npm i express cors

npm i --save-dev @types/express
npm i --save-dev @types/cors
```

## DB

```
npm install prisma --save-dev
npx prisma init
npx prisma migrate dev --name add_user_product_category_tables

npm install @prisma/client
npx prisma generate
```

## railway

```
npx prisma migrate deploy
npm install --save-dev rimraf
```
