const formEl = document.querySelector("#login-form")
const usernameEl = document.querySelector('#username');
const phoneEl = document.querySelector('#phone');
const emailEl = document.querySelector('#email');
const genderEl = document.querySelectorAll('.gender');
const ageEl = document.querySelector('#age');
const passwordEl = document.querySelector('#password');
const submitBtnEl =  document.querySelector('#submit-btn');
const iconBtnEl = document.querySelector('#icon-btn');

const phoneValidityEl = document.querySelector('#phone-validity');
const emailValidityEl = document.querySelector('#email-validity');
const ageValidity = document.querySelector('#age-validity');
const passwordStrengthEl = document.querySelector('#password-strength');

// Temprory object to store instance of an user
let user = {
    userName: null,
    phone: null,
    email: null,
    gender: null,
    age: null,
    password: null
}

console.log(usernameEl, phoneEl, emailEl, genderEl, ageEl, passwordEl, submitBtnEl);

function getGender(){
    let gender = null;
    genderEl.forEach((el) => {
        if(el.checked){
            if(el.id=="male-radio"){
                gender = "male";
            } else if(el.id == "female-radio"){
                gender = "female";
            } else if(el.id == "other-radio"){
                gender = "other";
            } 
        }
    });
    return gender;
}


//Function to check whether all details ae valid
function isFormValid(){
    if(user.userName=="" || user.phone=="" || user.email=="" || user.gender==null || user.age=="" || user.password==""){
        return 0;
    } else{
        return 1;
    }
}

//Function to validate phone number at run time
phoneEl.addEventListener('keyup', (e) => {
    console.log(phoneEl.value.length);
    let size = phoneEl.value.length;
    if(size==0){
        phoneValidityEl.innerText = "";
    } else if(size==10){
        phoneValidityEl.style.color = "green";
        phoneValidityEl.innerText = "Valid";
        console.log(phoneValidityEl);
   } else{  
        phoneValidityEl.style.color = "red";
        phoneValidityEl.innerText = "Invalid";
        console.log(phoneValidityEl);
   }
});


//Function validate a particular email
function isMailIdValid(emailValue){

}

//Function to validat email at runtime
emailEl.addEventListener('keyup', (e) => {
    let emailValue = emailEl.value;
    console.log(emailValue);
});


//Function to get user data
function getUserData(){
    // console.log(usernameEl.value);
    user.userName = usernameEl.value;
    // console.log(phoneEl.value);
    user.phone = phoneEl.value;
    // console.log(emailEl.value);
    user.email = emailEl.value;
    // console.log("gender: " , getGender());
    user.gender = getGender();
    // console.log(ageEl.value);
    user.age = ageEl.value;
    // console.log(passwordEl.value);
    user.password = passwordEl.value;


    if(isFormValid()){
        console.log(user);
        formEl.reset();
        localStorage.setItem(user.userName, JSON.stringify(user))
       temp = localStorage.getItem(user.userName);
       temp =JSON.parse(temp);
       console.log("temp: ", temp);
    } else{
        alert("plz enter all details");
    }
    
}

// Event listner on submit button
submitBtnEl.addEventListener('click', (e) => {
    e.preventDefault();
    getUserData();
});

//Function change icon for password hide/show
iconBtnEl.addEventListener('click', (e)=>{
    e.preventDefault();
    if(e.target.src == "http://127.0.0.1:5500/loginPage/images/eye-slash-solid.svg"){

        e.target.src = "images/eye-solid.svg";
        passwordEl.type = "text";

    } else{

        e.target.src = "images/eye-slash-solid.svg";
        passwordEl.type = "password";
        
    }
});

