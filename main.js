import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js'

// Add Firebase products that you want to use
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js'
import { getFirestore, collection, getDocs, addDoc, setDoc, doc, query, where } from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js'

const firebaseConfig = {
  apiKey: "AIzaSyBXhz9n1bwKrhWwXXED2570SyUrIJoT6lI",
  authDomain: "bukkahut-80159.firebaseapp.com",
  projectId: "bukkahut-80159",
  storageBucket: "bukkahut-80159.appspot.com",
  messagingSenderId: "381102566327",
  appId: "1:381102566327:web:5f9131990428befa76d632"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const searchInput = document.querySelector('.input');
const recipeResult = document.querySelector('.search-results');
const form = document.querySelector('.form');
const name = document.querySelector('.recipe-name');
const ingredient = document.querySelector('.ingredients')
const instruction = document.querySelector('.instruction')
const calculator = document.querySelector('.calculator')
const time = document.querySelector('.recipe-time');
// const container = document.querySelector('.container');
const Close = document.querySelector('.close');
const addRecipe = document.querySelector('.recipe-form');
const add = document.querySelector('.add');
const imgContainer = document.querySelector('.media-container');
// const portions = document.querySelector('#por');
// var portionNum;


form.addEventListener('submit', async (e) => {
  e.preventDefault()
  localStorage.removeItem('recipe')
  const value = searchInput.value

   recipeResult.innerHTML = '<p>...Loading</p>'

  const recipesRef = collection(db, 'Recipes')

  // console.log(recipesRef);
  const q = query(recipesRef, where('Name', '==', value))

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const recipeObj = doc.data();
    console.log(recipeObj)
    localStorage.setItem('recipe', JSON.stringify(recipeObj))
    // name.innerHTML = recipeObj.Name
  });

  const recipeSearch = JSON.parse(localStorage.getItem('recipe'))
  console.log(recipeSearch);

  recipeResult.innerHTML = `${recipeSearch.Name} Recipe`
  recipeResult.classList.add('card')
  Close.style.display ='flex';
})
const recipeSearch = JSON.parse(localStorage.getItem('recipe'))

name.innerHTML = `${recipeSearch.Name} Recipe`
// const newEquipment = recipeSearch.Equipment
const newIngredient = recipeSearch.Ingredients
const newInstruction = recipeSearch.Instructions
const cooktime = recipeSearch.CookingTime

let Ingnodes = newIngredient.map(ing => {
  // console.log(ing)
  let ingList = document.createElement('li');
  ingList.textContent = ing;
  return ingList;
});

ingredient.append(...Ingnodes);

let Insnodes = newInstruction.map(ins => {
  let insList = document.createElement('li');
  insList.textContent = ins;
  return insList;
});

let calNodes = newIngredient.map(ing => {
  console.log(ing.split(' '))
  let calList = document.createElement('li');
  let portionNum = document.querySelector('#por').value
  // console.log(portionNum)
   calList.textContent = ing.replace(/\d/g, number =>{
    return number * portionNum
  })
  return calList
})
calculator.append(...calNodes);

const img = document.createElement('img');
const recipeVideo = document.createElement('video');
recipeVideo.src = recipeSearch.vidUrl;
// recipeVideo.poster = recipeSearch.imgUrl;
recipeVideo.autoplay = false;
recipeVideo.controls = true;
recipeVideo.height = '200';
recipeVideo.width = '350';
recipeVideo.classList.add('round')
img.src = recipeSearch.imgUrl;
img.style.height = '200px';
img.style.width = '350px';
img.classList.add('round')
imgContainer.append(img)
imgContainer.append(recipeVideo);
instruction.append(...Insnodes);
time.innerHTML = `Cooking Time: ${cooktime}`;

console.log(add)

Close.addEventListener('click', () => {
  console.log(recipeResult)
  recipeResult.innerHTML = '';
  recipeResult.classList.remove('card')
  Close.style.display ='none';
})



// ADMIN PAGE

// addRecipe.addEventListener('submit', async (e) => {
//   e.preventDefault();
//   const newInput = Array.from(recipeInput);
//   newInput.map(input => console.log(input.value))
// })

