# Personal Blog and Knowledge-Base

# Development

## DB: Prisma & PlantScale

### Initial Setup

#### 1. Create DB on PlanetScale

#### 2. Automatically copy migration data

- Head ove to `Settings` Tab
- Activate `Automatically copy migration data`
- Pick `Prisma` as Migration Framework

#### 3. Create branches and open locally

```
pscale branch create YOUR_DB_NAME initial-setup
pscale branch create YOUR_DB_NAME shadow
```

```shell
# Terminal 1

pscale connect YOUR_DB_NAME initial-setup --port 3309
```

```shell
# Terminal 2

pscale connect YOUR_DB_NAME shadow --port 3310
```

#### 4. Local `.env`

```
# .env

DATABASE_URL="mysql://root@127.0.0.1:3309/YOUR_DB_NAME"
SHADOW_DATABASE_URL="mysql://root@127.0.0.1:3310/YOUR_DB_NAME"
```

#### 5. Prisma schema adjustments

```
datasource db {
  provider             = "mysql"
  url                  = env("DATABASE_URL")
  shadowDatabaseUrl    = env("SHADOW_DATABASE_URL")
  referentialIntegrity = "prisma"
}

generator client {
  provider        = "prisma-client-js"
  previewFeatures = ["referentialIntegrity"]
}
```

#### 6. Migrate Schema

```bash
npx prisma migrate dev --name init
```

#### 7. Deploy changes

```
pscale deploy-request create YOUR_DB_NAME initial-setup
```
