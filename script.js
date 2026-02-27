const wrapperBox = document.getElementById("wrapper");
const inputFieldGroup = document.getElementsByClassName("inputGroup");
const allInputs = document.querySelector("input");
const userNickname = document.getElementById("nickname");
const userEmail = document.getElementById("email");
const userPassword = document.getElementById("userPassword");
const confirmPassword = document.getElementById("confirmPassword");
const userPhone = document.getElementById("phone");
const registrationForm = document.getElementById("registrationForm");

const updateHelperText = (input, message, isValid) => {
    const inputGroup = input.parentElement;
    console.log(userEmail.perentElement);
    // 한 개의 input태그의 부모 태그에 접근하는 것.
    // 예시로, input태그를 userEmail로 접근하였다고 하면, 아래 태그들의 최상위 태그를 의미.
    const helperText = inputGroup.getElementsByClassName("helperText")[0];      // => 알림

    if(isValid == true){
        inputGroup.classList.remove('invalid');
        inputGroup.classList.add('valid');
        helperText.style.visibility = 'hidden';
    }

    if(isValid == false){
        inputGroup.classList.remove('valid');
        inputGroup.classList.add('invalid');
        helperText.style.visibility = 'visible';
        helperText.innerText = message;
    }
};

//알림이 사용되는 것까지 설정 완료, 언제 사용할지 조건 설정할 차례

//입력 필드가 비어있는지 확인하는 함수 작성
const checkEmptyInput = (input) => {
    if(input.value.trim() === ""){
        //.trim() -> 문자열에 띄어쓰기를 제거
        updateHelperText(input, "값을 입력해주세요",false);
        return false;
    }
    else{
        updateHelperText(input,"",true);
        return true;
    }
}

// 이메일 형식이 올바른지 확인하는 함수
const validateEmailFormat = (input) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
    if(emailPattern.test(input.value.trim()) == true){
        updateHelperText(input, "", true);
        return true;
    }
    else{
        updateHelperText(input, "유효한 이메일 주소를 입력부탁드립니다.",false);
        return false;
    }
}

// 비밀번호 강도 설정
const checkPasswordStrength = (password) => {
    const strongPattern = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/
    if(strongPattern.test(password.value) == true){
        updateHelperText(password, "비밀번호 강도 : 강함", true);
        return true;
    }
    else{
        updateHelperText(password, "비밀번호는 8자 이상이어야 하며, 대문자, 소문자, 특수문자를 포함하여야 합니다.",false);
        return false;
    }
}

// 비밀번호 확인이 같은지
const validatedPasswordMatch = (passwordInput, confirmInput) => {
    if(passwordInput.value !== confirmInput.value){
        updateHelperText(confirmInput, "비밀번호가 일치하지 않습니다.", false);
        return false;
    }
    else{
        updateHelperText(confirmInput, "", true);
        return true;
    }
}

// 전화번호 형식 확인
const validatePhoneNumber = (input) => {
    const phonePattern = /^01[016789]-\d{3,4}-\d{4}$/;
    if(phonePattern.test(input.value.trim())){
        updateHelperText(input,"",true);
        return true;
    }
    else{
        updateHelperText(input,"올바른 전화번호 형식이 아닙니다. (예:010-1234-1234)",false);
        return false;
    }
}


// 회원가입버튼 누를 시 입력 필드가 유효한지 확인하는 함수(모든 항목 검토)
const validateForm = () => {
    // bollean값으로 에러 검사 시 문제가 없으면 true, 있으면 false
    const isNicknameValid = checkEmptyInput(userNickname);
    const isEmailValid = validateEmailFormat(userEmail);
    const isPasswordStrong = checkPasswordStrength(userPassword);
    const isPasswordMatch = validatedPasswordMatch(userPassword, confirmPassword);
    const isPhoneValid = validatePhoneNumber(userPhone);

    //모든 검사가 통과해야 회원가입 버튼을 눌렀을 때 회원가입이 진행됨.
    return isNicknameValid&&isEmailValid&&isPasswordStrong&&isPasswordMatch&&isPhoneValid;
}

registrationForm.addEventListener('submit',(e) => {
    // 폼 안의 submit타입의 버튼을 눌렀을 때 이벤트(기능)가 발생.
    // 버튼을 눌렀을 때 발생하는 기능들을 압축해서 객체 {key:value} 형태로 모아놓은 것을 e라고 함.

    e.preventDefault();
    // 기본적으로 폼 태그에서 submit버튼을 누르면 자동으로 수행되는 기능(새로고침)이 있는데, 이 동작을 막아줌.
    // 새로고침이 되면 console에 있던 데이터들이 사라짐. => input 태그의 유효성 검사가 불가능해짐.

    if(validateForm() == true){
        console.log("모든 필드가 유효합니다.");
    }
    else{
        console.log("위 필드 중 일부분이 에러가 터집니다. 유효성 검사 실패");
    }
    console.log(e);
});

// 각 input태그 입력을 눌렀을 때 테두리 색깔이나 알림이 뜨게 하기
document.querySelectorAll("input").forEach(input => {
    // forEach는 배열 안의 데이터를 순차적으로 접근함.
    input.addEventListener("input",() => {
        switch(input.id){
            case 'nickname':
                checkEmptyInput(input);
                break;
            case 'email':
                validateEmailFormat(input);
                break;
            case 'userPassword':
                checkPasswordStrength(input);
                break;
            case 'confirmPassword':
                validatedPasswordMatch(userPassword, confirmPassword);
                break;
            case 'phone':
                validatePhoneNumber(input);
                break;
        }
    })
})
