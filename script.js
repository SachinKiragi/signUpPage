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

// console.log(usernameEl, phoneEl, emailEl, genderEl, ageEl, passwordEl, submitBtnEl);

//Function to get which gender's radio is selected
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
    

     if(!isUserNameUnique(user.userName) || user.userName=="" || user.phone=="" || user.email=="" || user.gender==null || user.age=="" || user.password=="" || phoneValidityEl.innerText=="Invalid" || emailValidityEl.innerText=="Invalid" || ageValidity.innerText=="Invalid"){
        return 0;
    } else{
        return 1;
    }
}


//Function to show error if username alrady exists
function showUserNameError(){
    if(formEl.contains(document.querySelector('#error-msg'))){
        formEl.removeChild(document.querySelector('#error-msg'));
    }
    let spanEl = document.createElement('span')
    spanEl.id = 'error-msg';
    spanEl.innerText = "user name already exists! plz choose other username"
    formEl.insertBefore(spanEl, submitBtnEl);
    
    // setTimeout(()=>{
    //     formEl.removeChild(spanEl);
    // }, 5000);
}

//Function to validate username
function isUserNameUnique(username){
    // console.log(localStorage.length);
    // console.log(localStorage.key(0));
    for(let i=0; i<localStorage.length; i++){
        if(localStorage.key(i)==username){
            showUserNameError();
            return 0;
        } 
    }
    document.querySelector('#error-msg').innerText = "";
    return 1;
}




//Function to validate phone number at run time
phoneEl.addEventListener('keyup', (e) => {
    // console.log(phoneEl.value.length);
    let size = phoneEl.value.length;
    if(size==0){
        phoneValidityEl.innerText = "";
    } else if(size==10){
        phoneValidityEl.style.color = "green";
        phoneValidityEl.innerText = "Valid";
        // console.log(phoneValidityEl);
   } else{  
        phoneValidityEl.style.color = "red";
        phoneValidityEl.innerText = "Invalid";
        // console.log(phoneValidityEl);
   }
});


//Function validate a particular email
function isMailIdValid(emailValue){
    let reg = /[a-z0-9@#_-]+@gmail.com/g

    if(emailValue.match(reg)){
        return 1;
    } else{
        return 0;
    }
}


//Function to validat email at runtime
emailEl.addEventListener('keyup', (e) => {
    let emailValue = emailEl.value;
    // console.log(emailValue);
    if(emailValue==""){
        emailValidityEl.innerText = "";
    } else if(isMailIdValid(emailValue)){
        emailValidityEl.style.color = "green";
        emailValidityEl.innerText = "Valid";
    } else {
        emailValidityEl.style.color = "red";
        emailValidityEl.innerText = "Invalid";
    }
});


//Function to validate age
ageEl.addEventListener('keyup', (e) => {
    e.preventDefault();
    let age = e.target.value;
    // console.log(age);

    if(age == ""){
        ageValidity.innerText = "";
    } else if(age <= 0){
        ageValidity.style.color = "red";
        ageValidity.innerText = "Invalid";
    } else{
        ageValidity.style.color = "green";
        ageValidity.innerText = "Valid";
    }
});


function getStrengthOfPasword(password){
    let weak = /[\@\.\_\$\#\!]|[a-zA-Z0-9]/g
    let normal = /[a-zA-Z0-9]*[\@\.\_\$\#\%!]+[a-zA-Z0-9]+/g;
    let strong = /[a-zA-Z0-9]*[\@\.\_\$\#\!]+[a-zA-Z0-9]*[\@\.\_\$\#\!]+[a-zA-Z0-9]*/g; 

    let strength = "";

    if(password.match(weak)){
        strength = "Weak";
    } 
    if(password.match(normal)){
        strength = "Normal";
    } 
    if(password.match(strong)){
        strength = "Strong";
    }

    return strength;

}

passwordEl.addEventListener('keyup', (e) => {
    e.preventDefault();
    let password = e.target.value;
    // console.log(password);

    let strength = getStrengthOfPasword(password);

    if(password==""){
        passwordEl.innerText = "";
    } else if(strength=="Weak"){
        passwordStrengthEl.style.color = "red";
    } else if(strength=="Normal"){
        passwordStrengthEl.style.color = "orange"
    } else if(strength=="Strong"){
        passwordStrengthEl.style.color = "green"
    }

        passwordStrengthEl.innerText = strength;
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
        // console.log(user, "done");
        formEl.reset();
        location.reload();
        localStorage.setItem(user.userName, JSON.stringify(user))
       temp = localStorage.getItem(user.userName);
       temp =JSON.parse(temp);
       console.log("temp: ", temp);
    } else{
        alert("plz enter all details correctly");
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
    if(e.target.src.includes("images/eye-slash-solid.svg")){

        e.target.src = "images/eye-solid.svg";
        passwordEl.type = "text";

    } else{

        e.target.src = "images/eye-slash-solid.svg";
        passwordEl.type = "password";
        
    }
});

