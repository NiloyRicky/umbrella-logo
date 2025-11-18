//Naming Variables

let colorButtons=document.querySelector(".color-pallette");
let uploadButton=document.querySelector(".upload-btn")
let currentUmbrellaColor="blue"
let umbrellaImage=document.querySelector("#umbrella-img")
let fileInput=document.querySelector("#fileInput")
let logoOnUmbrella=document.querySelector("#logo")
let toggleSpinner=document.querySelector("#spinner")
let uploadImgIcon=document.querySelector(".upload-img")
let uploadLogoText=document.querySelector(".upload-logo-text")
let deleteButton=document.querySelector(".delete-btn")
let umbrellaWrapper=document.querySelector(".content")
let closeButton=document.querySelector(".close-btn")
let stylePanel=document.getElementById("stylePanel")
let styleLogoBtn=document.querySelector(".style-logo-btn")



//Function controlling thee color change of Umbrella
colorButtons.addEventListener("click",(e)=>{
if(e.target.classList.contains("btn")){
currentUmbrellaColor=e.target.value;
umbrellaImage.style.display="none";  //toggling the umbrella image
logoOnUmbrella.style.display="none"
toggleSpinner.src=`./images/loader_icon.svg` //toggling spinner
if(logoOnUmbrella.src){
    uploadImgIcon.src=`./images/loader_icon.svg`
    uploadImgIcon.classList.add("spin") //adding spinner
}
setTimeout(changeUmbrellaImage,670)
}
})


//Triggering the Upload button to select file
uploadButton.addEventListener("click",()=>{
fileInput.click()
})

//Function of Changing color of umbrella +Spinner change
function changeUmbrellaImage(){
     
        logoOnUmbrella.style.display="block"
     
    toggleSpinner.src=""
    uploadImgIcon.src=`./images/upload_icon.svg`
    uploadImgIcon.classList.remove("spin")
     
umbrellaImage.style.display="block"; 
    umbrellaImage.src=`./images/${currentUmbrellaColor} umbrella.png`
    
    //console.log("image is changing color"+currentUmbrella)
}

fileInput.addEventListener("change",()=>{
    const file=fileInput.files[0];
    const fileName=fileInput.files[0].name
    if(!file) return;
    const reader=new FileReader();

    //An event that triggers when FileReader finishes reading the file you selected
    reader.onload=(e)=> logoOnUmbrella.src=e.target.result;
    reader.readAsDataURL(file) //convert into base64 url
    if(fileInput.files.length>0){
        uploadLogoText.textContent=fileName
    }
    logoOnUmbrella.style.display="block";
    deleteButton.style.display="block"
     stylePanel.style.display="block";
    
    console.log(file)
})


//Deleting funtion to remove logo from umbrella

deleteButton.addEventListener("click",(event)=>{
    event.stopPropagation();
    event.preventDefault();
     stylePanel.style.display="none";
      logoOnUmbrella.src="";
      umbrellaImage.style.display="none";
toggleSpinner.src=`./images/loader_icon.svg`
  uploadImgIcon.src=`./images/loader_icon.svg`
    uploadImgIcon.classList.add("spin")
    setTimeout(()=>{
styleLogoBtn.style.display="none"
        deleteButton.style.display="none";
    uploadLogoText.textContent="Upload Logo";
      uploadImgIcon.src=`./images/upload_icon.svg`
    uploadImgIcon.classList.remove("spin")
    umbrellaImage.style.display="block";  //toggling the umbrella image

toggleSpinner.src=""
    },660)
    
   
    fileInput.value="" //resetting file input
})
    

//Styling Effects on logo

function applyEffects() {
  const opacity = document.getElementById("opacityRange").value;
  const brightness = document.getElementById("brightnessRange").value;
  const contrast = document.getElementById("contrastRange").value;
  const gray = document.getElementById("grayRange").value;

  const shadow = document.getElementById("shadowToggle").checked;
  const border = document.getElementById("borderToggle").checked;

  logoOnUmbrella.style.opacity = opacity;
  logoOnUmbrella.style.filter = `
      brightness(${brightness})
      contrast(${contrast})
      grayscale(${gray})
  `;

  logoOnUmbrella.style.boxShadow = shadow ? "0px 4px 10px rgba(0,0,0,0.4)" : "none";
  logoOnUmbrella.style.border = border ? "1.2px solid black" : "none";
}

["opacityRange","brightnessRange","contrastRange","grayRange"]
.forEach(id => document.getElementById(id).addEventListener("input", applyEffects));

document.getElementById("shadowToggle").addEventListener("change", applyEffects);
document.getElementById("borderToggle").addEventListener("change", applyEffects);


 

// Function : while clicking X button on style Panel

closeButton.addEventListener("click",()=>{
    stylePanel.style.display="none";
    styleLogoBtn.style.display="block";
    styleLogoBtn.classList.remove("add-color")
})

//Toggling of Styling panel and disabling button
styleLogoBtn.addEventListener("click",()=>{
    stylePanel.style.display="block";
    styleLogoBtn.classList.add("add-color")
    
})