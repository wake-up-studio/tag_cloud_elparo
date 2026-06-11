const body = document.querySelector('.body');
const tagCloud = document.querySelector(".tagCloud");
const words = document.querySelector(".tagCloud_words");

let tags = [
    "Wood", "Upcycling",  "Metal", "Origami",
    "Rorschach",  "Land Art", "Model",  "Featuring", "Ceramic",
    "Wood 2",  "Upcycling 2", "Metal 2",  "Origami 2",
    "Rorschach 2", "Land Art 2",  "Model 2", "Featuring 2", "Ceramic 2",
    "Wood 3",  "Upcycling 3", "Metal 3", "Origami 3",
    "Rorschach 3",  "Land Art 3", "Model 3",  "Featuring 3"
];

function createLi(i, j, g){
    let div = document.createElement("div");
    let newLi = document.createElement("p");
    let a = document.createElement("a");

    div.className = "word_container";
    div.style.gridRow = `${i+1} / ${i+1}`;
    div.style.gridColumn = `${g} / ${g}`;

    newLi.className = `word word_${i}`;
    a.textContent = tags[j];

    a.setAttribute("href", `projets/${tags[j]}`);

    words.appendChild(div);
    div.appendChild(newLi);
    newLi.appendChild(a);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
} //Nombre aléatoire entre deux valeurs incluses

function addWordsRandomly(){

    for(let i = 0; i < 13; i++){
        let j = getRandomInt(0, tags.length - 1);
        let g = getRandomInt(0,20);
        // let numX = Math.floor(Math.random() * (tagCloud.clientWidth - 100) + 50);
        // let numY = Math.floor(Math.random() * (tagCloud.clientHeight - 100) + 50);

        createLi(i, j, g);
        tags.splice(j, 1);
        if(j<tags.length - 4){
            j+= getRandomInt(0, 3);
        }
        else{
            j++;
        }

        if(g<5){
            g += getRandomInt(5, 10);
        }
        else if(g>13){
            g -= getRandomInt(3, 10);
        }
        else if(g<=8){
            g += getRandomInt(3, 7);
        }
        else if(g>=9){
            g -= getRandomInt(3, 8);
        }
        createLi(i, j, g);
        tags.splice(j, 1);

        // let thisWord = document.querySelector(`.word_${i}`);
        // thisWord.style.left = `${numX}px`;
        // thisWord.style.top = `${numY}px`;
        // positions.push([x => numX, y => numY]);



    }

} //Permet de randomiser la génération des mots

addWordsRandomly();

//Créer un grid template, à la création, le li se cale dedans et il est impossible pour les autres de s'y mettre, comme ça on évite les overlappings.