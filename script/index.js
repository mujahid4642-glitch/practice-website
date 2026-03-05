
const createElement =(arr)=>{
  const htmlelement = arr.map((el)=>`<span class="btn">${el}</span>`)
 return (htmlelement.join(" "));
}

function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

const manageSpins = (status)=>{
  if(status== true){
    document.getElementById("spinner").classList.remove("hidden")
    document.getElementById("word-container").classList.add("hidden")
  }else {

    document.getElementById("word-container").classList.remove("hidden")
    document.getElementById("spinner").classList.add("hidden") 
    

  }

}

const loadlesson =()=>{
    const url ="https://openapi.programming-hero.com/api/levels/all"
    fetch(url)
    .then((res)=>res.json())
    .then(json=> displaylesson(json.data))
}
const removeActive=()=>{
  const lessonButtons = document.querySelectorAll(".lesson-btn")
  // console.log(lessonButtons);
  lessonButtons.forEach((btn)=>btn.classList.remove('active'))
}

const loadLevelWord=(id)=>{
     manageSpins(true)
    const url =`https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
    .then((res)=> res.json())
    .then(date=> {
      removeActive();
      const clickBtn= document.getElementById(`level-btn-${id}`)
      // console.log(clickBtn);
      clickBtn.classList.add('active')
      displayLevelWord(date.data)
    })
}
// {
//     "word": "Quaint",
//     "meaning": "নান্দনিকভাবে পুরোনো ধাঁচের",
//     "pronunciation": "কুয়েন্ট",
//     "level": 3,
//     "sentence": "The village had a quaint charm.",
//     "points": 3,
//     "partsOfSpeech": "adjective",
//     "synonyms": [
//         "old-fashioned",
//         "picturesque",
//         "charming"
//     ],
//     "id": 17
// }




const loadWordDetail =async(id)=> {
  const url =`https://openapi.programming-hero.com/api/word/${id}`
  
  const res =await fetch(url)
  const details = await res.json()
  displayWordDetails(details.data);
}

const displayWordDetails = (word)=>{
  console.log(word);
  const detailsBox = document.getElementById("detail-container")
  detailsBox.innerHTML=`
   <div class="div">
            <h2 class="text-2xl font-bold">${word.word} ( <i class="fa-solid fa-microphone-lines"></i>    :${word.pronunciation})</h2>
          </div>
     
          <div class="div">
            <h2 class="font-bold">Meaning</h2>
            <p>${word.meaning}</p>
          </div>
     
          <div class="div">
            <h2 class="font-bold">Example</h2>
            <p>${word.sentence}</p>
          </div>
          <div class="div">
            <h2 class="font-bold">synonym</h2>
            
          </div>
          <div class="div">${createElement(word.synonyms)} </div>
  
  `
  document.getElementById("modalk").showModal()
}

const displayLevelWord =(words)=>{
    console.log(words);
  const wordContainer= document.getElementById("word-container")
  wordContainer.innerHTML=""

  if(words.length==0){
   wordContainer.innerHTML=`
   <div class="text-center  col-span-full rounded-xl py-10 space-y-5 font-bangla">
       <img mx-auto src="./assets/assets/alert-error.png"/>
      <p class="text-xl font-medium text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
      <h2 class="text-4xl font-bold">নেক্সট Lesson এ যান</h2>
    </div>
   `
    manageSpins(false)
    return
  }
//   {
//     "id": 19,
//     "level": 1,
//     "word": "Sincere",
//     "meaning": "সত্‍ / আন্তরিক",
//     "pronunciation": "সিনসিয়ার"
// }

  words.forEach((word) => {
    // console.log(word);
    const card =document.createElement('div')
    card.innerHTML=`
    <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-3">
        <h2 class="font-bold">${word.word ?word.word:"শব্দ পাওয়া যায়নি"}</h2>
        <p class="font-medium">Meaning /Pronounciation</p>
        <div class=" font-bangla font-semibold">"${word.meaning?word.meaning :"শব্দ পাওয়া যায়নি"} / ${word.pronunciation ?word.pronunciation :"pronunciation পাওয়া যায়নি"}"</div>
        <div class="flex justify-between items-center">

          <button onclick="loadWordDetail(${word.id})" class="btn bg[#1A91FF10] hover:bg[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>

          <button onclick="pronounceWord('${word.word}')" class="btn bg[#1A91FF10] hover:bg[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
          
        </div>
      </div>
    `
wordContainer.append(card)

 })
  manageSpins(false)
}

const displaylesson =(lesson)=>{
//   1.get the container & empty
console.log(lesson);
const levelContainer= document.getElementById("level-container")
levelContainer.innerHTML=""

//   2.get into the everylesson
for(let lessons of lesson){
//   3.create Element

const btnDiv= document.createElement("div")
btnDiv.innerHTML=`
             <button id="level-btn-${lessons.level_no}" onclick="loadLevelWord(${lessons.level_no})" class=" btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i> lesson-${lessons.level_no}</button>
                  
                
`
                 
                


      // //   4.append the container 
levelContainer.append(btnDiv)
}




}
loadlesson()

