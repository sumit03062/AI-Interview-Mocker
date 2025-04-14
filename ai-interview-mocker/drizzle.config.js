/** @type {import ("drizzle-kit" ).config} */
export default {
    schema:"./utils/schema.js",
    dialect:'postgresql',
    dbCredentials:{
        url:'postgresql://neondb_owner:npg_4uNO3BQtYELo@ep-divine-block-a591c4m5.us-east-2.aws.neon.tech/Ai-Interview-Moker?sslmode=require'
    }
}