import { openDB } from "@/db/services"
import { questionsOjoSeco, questionsLubricantes } from "@/db/preguntas.vision"
import { questionsVisualizacion } from "@/db/preguntas.surgical"

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

    await db.close()
}

export async function initTables() {
    const db = await openDB()

    /* await db.run(
        "INSERT INTO categories (name) values (?)",
        "General"
    ) */

    /* const questions = [
        ["La fuente de iluminación de LuxOR® Revalia es","LED","Halógena","Xenón","Ninguna de las anteriores"],
        ["¿Hasta cuántas veces es más grande el reflejo rojo con LuxOR® Revalia?","Hasta 6 veces más grande que otros microscopios","Hasta 3 veces más grande que otros microscopios","Hasta 8 veces más grande que otros microscopios","Hasta 10 veces más grande que otros microscopios"],
        ["Si quisiera mejorar el reflejo rojo, debería ajustar","La luz coaxial","La luz oblicua","La luz La luz ultravioleta","La luz fluorescente"],
        ["LuxOR® Revalia se puede integrar a CENTURION® Vision System","Si puede integrarse","Se puede integrar con complementos","No se puede integrar","Ya viene integrado"],
        ["El sistema de visualización 3D NGENUITY® se puede integrar con CENTURION® Vision System","Si se puede","Quizas se pueda","Solo con ciertos modelos de CENTURION®","No se puede"],
        ["Los módulos de iluminación de LuxOR® Revalia son","Todas las anteriores","Blanco cálido","Blanco frío","Blanco mixto"],
        ["Comparado con un microscopio análogo, ¿hasta cuantas veces más de profundidad de campo se puede obtener con el sistema de visualización 3D NGENUITY®?","5 veces más de profundidad de campo","3 veces más de profundidad de campo","7 veces más de profundidad de campo","500 veces más de profundidad de campo"],
        ["El lente del microscopio que está más cerca a los ojos del cirujano se llama","Ocular","Tubo Binocular","Lente Objetivo","Zoom"],
        ["Estas son las distancias de trabajo más utilizadas en los microscopios oftálmicos","175mm y 200mm","125mm y 225mm","100mm y 200mm","150mm y 220mm"],
        ["El espectro de luz visible se encuentra entre los","400nm y 700nm","200nm y 400nm","300nm y 800nm","700nm y 1200nm"],
        ["Para corregir la aberración cromática en un microscopio se requiere","Un lente apocromático","Un lente acromático","Un lente de fluorita","Un lente esférico"],
        ["Con la compensación ametrópica de los oculares del microscopio es posible corregir","La esfera solamente","El cilindro solamente","La esfera y el cilindro","No es posible hacer compensaciones con los oculares"],
        ["El sistema de visualización 3D NGENUITY® puede mostrar los datos de la pantalla del ORA VerifEye","Es verdadero","Totalmente falso","Absolutamente descabellado","Posiblemente falso"],
        ["El lente del microscopio que está más cerca al ojo del paciente se llama","Lente Objetivo","Ocular","Tubo Binocular","Zoom"],
        ["Un microscopio que tenga una amplia profundidad de campo le permitiría","Todas las anteriores","Disminuir el reenfoque con el pedal durante la cirugía","Conseguir mayor cantidad de estructuras enfocadas en el eje axial","No tener que mover el cabezal óptico durante cirugía","Todas las anteriores"],
        ["¿Qué sucede al usar un divisor de haces (beam splitter) en la vía óptica del cirujano?","La cantidad de luz hacia los oculares del cirujano disminuye","La cantidad de luz hacia los oculares del cirujano aumenta","No afecta la cantidad de luz hacia los oculares del cirujano","Se afecta totalmente la visibilidad del cirujano"],
        ["Comparado con un microscopio análogo, el sistema de visualización 3D NGENUITY® incrementa la magnificación hasta en un","48%","12%","24%","30%"],
        ["La tecnología de la pantalla del sistema de visualización 3D NGENUITY® es","OLED","LCD","LED","QLED"],
        ["La cámara del sistema de visualización 3D NGENUITY® se puede adaptar a cualquier microscopio oftálmico","Verdedaro","Falso","Solo se puede integrar con el microscopio LuxOR® Revalia","Los nuevos modelos no se pueden integrar a otras marcas"],
        ["Con el sistema de visualización 3D NGENUITY® es posible utilizar menos intensidad de luz en el microscopio","Verdedaro","Falso","Parcialmente verdadero","Totalmente falso"],
        ["El sistema de visualización 3D NGENUITY® se puede integrar con","CONSTELLATION® Vision System","CRUZE RS"," R15 V4 Ridder","KODIAK 450 · Cygnus"],
        ["¿Qué parámetro es posible ajustar digitalmente con el sistema de visualización 3D NGENUITY®?","La temperatura del color de la imagen","La cantidad de pixeles de la imagen","La durabilidad de la imagen","La vitalidad de la imagen"],
        ["La posibilidad de usar menos iluminación del microscopio y ver bien existe cuando se usa NGENUITY®","Es cierto","Es falso","Te quedas quedar ciego","Es imposible"]
    ] */
    /* questionsLubricantes.forEach(async (gameQuestion) =>{
        await db.run(
            "INSERT INTO questions (question_body,answer,options,dificult,category) values (?,?,?,?,?)",
            gameQuestion[0],
            gameQuestion[1],
            gameQuestion.slice(1).join(),
            1,
            3
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
