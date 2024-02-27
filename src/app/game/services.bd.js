import { openDB } from "@/db/services"

export async function createTables() {
    console.log("aqui")
    const db = await openDB()

    const table_results = await db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='results';")
    const table_groups = await db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='groups';")
    const table_users = await db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='users';")
    const table_questions = await db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='questions';")
    const table_questions_game = await db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='questions_game';")
    const table_categories = await db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='categories';")

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

    await db.close()
}

export async function initTables() {
    const db = await openDB()

    await db.run(
        "INSERT INTO categories (name) values (?)",
        "General"
    )

    const questions = [
        ["El sistema electoral para determinar las personas que ocuparan cargos publicos:", "Sufragio", "Adagio", "Naufragio", "Prestigio"],
        ["Una persona famelica esta:", "Hambrienta", "Furiosa", "Asustada", "Irritable",],
        ["Son las membranas movibles cubiertas de piel que resguardan los ojos:", "Parpados", "Pupilas", "Cejas", "Anteojos"],
        ["El albinismo se presenta por la carencia de:", "Pigmentación", "Vitamina A", "Oxígeno", "Calcio"],
        ["¿Cual de estos instrumentos mide la densidad de los aceites?", "Oleómetro", "Micrómetro", "Dinamómetro", "Holometro"],
        ["Según el refran, ¿quien es ciego?", "El amor", "El odio", "La envidia", "La esperanza", "El amor"],
        ["¿Quien dirigió la película El Padrino en 1972?", "Francis Ford Copolla", "Federico Fellini", "Roman Polanski", "Franco Zeffirelli"],
        ["¿Con que material esculpió Miguel Angel La Piedad ubicada en el Vaticano?", "Marmol", "Madera", "Yeso", "Bronce"],
        ["El timbal es un instrumento de:", "Percusion", "Viento Metal", "Viento madera", "Cuerda"],
        ["En la mitología griega, Eros es considerado el dios del:", "Amor", "Odio", "Miedo", "Trabajo"],
        ["Al periódico que se publica en horas de la tarde, se denomina:", "Vespertino", "Matutino", "Clandestino", "Pristino"],
        ["Las Vegas es una ciudad estadounidense que queda en:", "Nevada", " Oklahoma", "Arizona", "Colorado"],
        ["¿Cual de estos animales es un rumiante?", "La vaca", "La ardilla", "El caracol", "El loro"],
        ["Es el paso del agua del estado líquido al estado gaseoso:", "Evaporación", "Licuefacción", "Sublimación", "Solidificación"],
        ["¿Que parte del cuerpo se examina en una encefalografia?", "Cráneo", "Ovarios", "Pulmones", "Higado"],
    ]
    questions.forEach(async (gameQuestion) =>{
        await db.run(
            "INSERT INTO questions (question_body,answer,options,dificult,category) values (?,?,?,?,?)",
            gameQuestion[0],
            gameQuestion[1],
            gameQuestion.slice(1).join(),
            1,
            1
        )
    })

    const users_init = [
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
    )

    await db.close()
    
}
