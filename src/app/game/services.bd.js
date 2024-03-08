import { openDB } from "@/db/services"
import calendar from "@/data/f2f_.categories.json"
import { questionsOjoSeco, questionsLubricantes } from "@/db/preguntas.vision"
import { questionsBiometria, questionsFluidica, questionsLentesIntraoculares, questionsVisualizacion } from "@/db/preguntas.surgical"

export async function createTables() {
    console.log("aqui")
    const db = await openDB()

    const table_results = await db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='results';")
    const table_groups = await db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='groups';")
    const table_users = await db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='users';")
    const table_questions = await db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='questions';")
    const table_questions_game = await db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='questions_game';")
    const table_categories = await db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='categories';")
    const table_calendar = await db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='calendar';")

    !table_results && await db.exec(`
    CREATE TABLE results (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category TEXT,
    winner TEXT ,
    total_points INTEGER,
    total_time INTEGER,
    groups TEXT
        );
    `)
    !table_groups && await db.exec(`
    CREATE TABLE groups (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    users TEXT,
    category TEXT
        );
    `)
    !table_users && await db.exec(`
    CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fullname TEXT,
    movil INTEGER ,
    email TEXT,
    city TEXT,
    gener TEXT,
    partner TEXT,
    category TEXT,
    groups INTEGER
        );
    `)
    !table_categories && await db.exec(`
    CREATE TABLE categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT
        );
    `)
    !table_questions && await db.exec(`
    CREATE TABLE questions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    question_body TEXT,
    answer TEXT,
    options TEXT,
    dificult INTEGER,
    category INTEGER
        );
    `)
    !table_questions_game && await db.exec(`
    CREATE TABLE questions_game (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    question INTEGER,
    winner_group INTEGER,
    left_time INTEGER
        );
    `)
    !table_calendar && await db.exec(`
    CREATE TABLE calendar (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    hour TEXT,
    date TEXT,
    category TEXT,
    available BOOLEAN,
    team TEXT
        );
    `)

    await db.close()
}

export async function initTables() {
    const db = await openDB()

    /* await db.run(
        "INSERT INTO categories (name) values (?)",
        "General"
    ) */

    /* calendar.forEach(async (element) => {
        await db.run(
            "INSERT INTO calendar (hour,date,category,available,team) values (?,?,?,?,?)",
            element.hour,
            element.date,
            element.name,
            element.available,
            element.team.join()
        )
    }) */
    calendar.forEach(async (gameQuestion) =>{
        await db.run(
            "INSERT INTO calendar (hour,date,category,available,team) values (?,?,?,?,?)",
            gameQuestion.hour,
            gameQuestion.date,
            gameQuestion.name,
            1,
            ""
        )
    })
    /* questionsFluidica.forEach(async (gameQuestion) =>{
        await db.run(
            "INSERT INTO questions (question_body,answer,options,dificult,category) values (?,?,?,?,?)",
            gameQuestion[0],
            gameQuestion[1],
            gameQuestion.slice(1).join(),
            1,
            4
        )
    })
    questionsVisualizacion.forEach(async (gameQuestion) =>{
        await db.run(
            "INSERT INTO questions (question_body,answer,options,dificult,category) values (?,?,?,?,?)",
            gameQuestion[0],
            gameQuestion[1],
            gameQuestion.slice(1).join(),
            1,
            1
        )
    })
    questionsLubricantes.forEach(async (gameQuestion) =>{
        await db.run(
            "INSERT INTO questions (question_body,answer,options,dificult,category) values (?,?,?,?,?)",
            gameQuestion[0],
            gameQuestion[1],
            gameQuestion.slice(1).join(),
            1,
            3
        )
    })

    questionsLentesIntraoculares.forEach(async (gameQuestion) =>{
        await db.run(
            "INSERT INTO questions (question_body,answer,options,dificult,category) values (?,?,?,?,?)",
            gameQuestion[0],
            gameQuestion[1],
            gameQuestion.slice(1).join(),
            1,
            6
        )
    })
    questionsBiometria.forEach(async (gameQuestion) =>{
        await db.run(
            "INSERT INTO questions (question_body,answer,options,dificult,category) values (?,?,?,?,?)",
            gameQuestion[0],
            gameQuestion[1],
            gameQuestion.slice(1).join(),
            1,
            5
        )
    })
    questionsOjoSeco.forEach(async (gameQuestion) =>{
        await db.run(
            "INSERT INTO questions (question_body,answer,options,dificult,category) values (?,?,?,?,?)",
            gameQuestion[0],
            gameQuestion[1],
            gameQuestion.slice(1).join(),
            1,
            2
        )
    }) */

    /* const users_init = [
        ["Carlos Trejo",3124567788,"carlostrejo@gmail.com","Cali",1],
        ["Maria Bastidas",3251247788,"mariabastidas@gmail.com","Bogotá",1],
        ["Fabio Mosquera",3012578413,"fabiomosquera@gmail.com","Barranquilla",1],
        ["Victor Mendoza",3057710256,"victormendoza@gmail.com","Medellin",1],
    ]

    users_init.forEach(async (user)=>{
        await db.run(
            "INSERT INTO users (fullname,movil,email,city,category) values (?,?,?,?,?)",
            user[0],
            user[1],
            user[2],
            user[3],
        )
    })

    await db.run(
        "INSERT INTO groups (users,category) values (?,?)",
        "1,2","1"
    )
    await db.run(
        "INSERT INTO groups (users,category) values (?,?)",
        "3,4","1"
    ) */

    await db.close()
    
}
