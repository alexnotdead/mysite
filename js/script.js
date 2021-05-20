
const imessage = document.querySelector(".imessage__body");


//точки во время печати
const printingDots = (from, remove) =>{
    if(remove != 'remove'){
        let  elem = document.createElement("div");
        elem.classList.add('imessage__message');
        elem.classList.add(`${from}`)
        for(let i= 0; i<3; i++){
            let elemText = document.createElement('p');
            elemText.classList.add('printing-dot'); 
            elem.appendChild(elemText);  
        }
        imessage.appendChild(elem);
        elem.classList.add('printing');
        document.querySelector(".imessage").scrollTo(0, document.body.scrollHeight);  
    }else {
        if(document.querySelectorAll('.printing').length > 0) document.querySelector('.printing').remove();
    }
    
}

//подсветка, указатель пункта меню
const linkPointer = (i, remove) => {
    if(remove != 'remove'){
        document.querySelectorAll('.header__link')[i].classList.add('pointer');
    }else {
        if(document.querySelector('.pointer'))  document.querySelector('.pointer').classList.remove('pointer');
    }
}

const newMessage = (from) =>{
    let  elem = document.createElement("div");
    elem.classList.add('imessage__message');
    elem.classList.add(`${from}`)
    imessage.appendChild(elem);
}

//вывод сообщений пользователя
let countMessage = 0;
let userMessValue = '';
let myMessValue = '';

const printMessage = (from, text) =>{
    if(text == '') return
    if(from[countMessage].classList.contains('from-user')){
        if(from[countMessage].classList.contains('printing'))from[countMessage].classList.remove('printing');
        from[countMessage].classList.add('printed');
        from[countMessage].innerHTML = text;
        inputMess.blur();
        inputMess.value = null;
        printingLength = 0;
        userMessValue = text;
        countMessage++; 
    }else{
        from[countMessage].classList.remove('printing');
        from[countMessage].classList.add('printed');
        from[countMessage].innerHTML = text;
        myMessValue = text
        countMessage++; 
    }
}

//Local Storage
const saveMess = (from, value) => {
    localStorage.setItem(from, value)  
}

const getMessages = () => {
    let keys = Object.keys(localStorage).sort();
    for(let key of keys) {
        if(key == (`${(countMessage+1)}fromMe`).toString()) newMessage('from-me');
        if(key == (`${(countMessage+1)}fromUser`).toString()) newMessage('from-user');
        let message = document.querySelectorAll('.imessage__message');
        if(message.length > 0){
            message[countMessage].classList.add('printed');
            message[countMessage].innerHTML = `${localStorage.getItem(key)}`;
            document.querySelector(".imessage").scrollTo(0, document.body.scrollHeight);  
        }
        countMessage++;
    }
}

getMessages();



//ввод сообщений пользователя
const inputMess = document.querySelector('.input-mess');
let printingLength = 0;

inputMess.onclick = (e) =>{
    inputMess.onkeydown = (e) =>{
        if(e.keyCode == 8) {
            printingLength--;
            if (printingLength == -1) printingLength = 0;
        }
        else printingLength++;  
        let message = document.querySelectorAll('.imessage__message');
        if(printingLength > 0){
            if(document.querySelectorAll('.printing').length == 0) printingDots('from-user', '');
            document.querySelector(".imessage").scrollTo(0, document.body.scrollHeight);  
            if(e.keyCode == 13 && inputMess.value != ''){
                printMessage(message, inputMess.value);
                saveMess(`${(countMessage)}fromUser`, userMessValue);
                hello();
            } 
        }else{
            printingDots('from-user','remove'); 
        } 
    }
}

const darkScreen = (visibility) =>{
    if(visibility == 1){
        document.querySelector('.header').style.zIndex = '15';
        let  elem = document.createElement("div");
        elem.classList.add('dark-screen');
        document.body.style.position = 'relative';
        document.body.append(elem);   
    }else{
        if(document.querySelector('.dark-screen'))document.querySelector('.dark-screen').remove();
    }
     
}
//приветствие
const hello = () =>{
    let userMess = userMessValue.toLowerCase().replace(' ', '');
    const prT = t => new Promise(res => setTimeout(res, t));
    if(document.querySelectorAll('.from-user').length == 0 && document.querySelectorAll('.printed').length == 0){
        prT(1000)
        .then(() => {
            printingDots('from-me','');
            return prT(2000);
        })
        .then(() => {
            let message = document.querySelectorAll('.imessage__message');
            printMessage(message, 'Привет, меня зовут Семён и я начинающий веб-разработчик.'); 
            saveMess(`${(countMessage)}fromMe`, myMessValue);
            printingDots('from-me','remove');
            return prT(2000);
        })
        .then(() => {
            printingDots('from-me','');
            return prT(2000);
        })
        .then(() => {
            message = document.querySelectorAll('.imessage__message');
            printMessage(message, 'Хочу показать и рассказать тебе немного того, что я умею.'); 
            saveMess(`${(countMessage)}fromMe`, myMessValue);
            return prT(1000);
        })
        .then(() => {
            printingDots('from-me','');
            return prT(1900);
        })
        .then(() => {
            message = document.querySelectorAll('.imessage__message');
            printMessage(message, 'Если тебе интересно, то дай знать.'); 
            saveMess(`${(countMessage)}fromMe`, myMessValue);
            
        })
    }
    else if(document.querySelectorAll('.from-user').length == 1 && countMessage < 5){
        prT(1000)
        .then(() => {
            printingDots('from-me','');
            return prT(1500);
        })
        .then(() => {
            message = document.querySelectorAll('.imessage__message');
            printMessage(message, 'Для навигации по сайту используй свайп вправо или влево, либо просто нажми на интересующий пункт.');
            saveMess(`${(countMessage)}fromMe`, myMessValue);
            return prT(2000);
        })
        .then(() => {
            darkScreen(1);
            linkPointer(0,''); 
            return prT(1500);
        })
        .then(() => {
            linkPointer(0,'remove'); 
            linkPointer(1,''); 
            return prT(1500);
        })
        .then(() => {
            linkPointer(1,'remove'); 
            linkPointer(2,''); 
            return prT(1500);
        })
        .then(() => {
            linkPointer(2,'remove'); 
            linkPointer(3,''); 
            return prT(1500);
        })
        .then(() => {
            linkPointer(3,'remove'); 
            printingDots('from-me','');
            darkScreen(0);
            return prT(1500);
        })
        .then(() => {
            message = document.querySelectorAll('.imessage__message');
            printMessage(message, 'А также ты можешь просто "запросить", то что нужно.'); 
            saveMess(`${(countMessage)}fromMe`, myMessValue);
            return prT(1000);
        })
        .then(() => {
            printingDots('from-me','');
            return prT(1500);
        })
        .then(() => {
            message = document.querySelectorAll('.imessage__message');
            printMessage(message, 'Например напиши: "Обо мне"'); 
            saveMess(`${(countMessage)}fromMe`, myMessValue);
            return prT(1000);
        })
    } else if(userMess == 'обомне' || userMess == 'резюме' || userMess == 'расскажиосебе' || userMess == 'осебе'){
        prT(1000)
        .then(() => {
            $('.slider').slick('slickGoTo', 1);
        })
    } else if(userMess == 'портфолио' || userMess == 'работы' || userMess == 'примерыработ' || userMess == 'сайты'){
        prT(1000)
        .then(() => {
            $('.slider').slick('slickGoTo', 2);
        })
    } else if(userMess == 'связь' || userMess == 'контакты' || userMess == 'связаться' || userMess == 'написать'){
        prT(1000)
        .then(() => {
            $('.slider').slick('slickGoTo', 3);
        })
    } 
}
hello();

//меню бургер 
const burger = document.querySelector('.header__burger');

burger.onclick = () =>{
    document.querySelector('.header__menu').classList.toggle('active');
    burger.classList.toggle('active');
}


//slider

if ($('.slider').length){
    $('.slider').slick({
        arrows: false,
        dots : true,
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: false
    });
    $('.slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
        $('.header__link').removeClass('active')
        $('.header__link').eq(nextSlide).addClass('active');
        linkPointer(0,'remove'); 
    });
    $('.header__link').click((e) => {
        e.preventDefault();
        const id = $(e.target).attr("href").replace('#', '')
        $('.slider').slick('slickGoTo', id);
        $('.header__menu').removeClass('active');
        $('.header__burger').removeClass('active');
        $('body,html').animate({
            scrollTop: 0
        }, 400);
        return false;
    });
    $(window).scroll(function () {
        if ($(this).scrollTop() > 0) {
            $('#scroller').fadeIn();
        } else {
            $('#scroller').fadeOut();
        }
    });
} 

//отправка формы
const form = document.getElementById('form');
  
form.addEventListener('submit', formSending); 


async function formSending(e){
    e.preventDefault();
    let error = formValidate(form)
    let formData = new FormData(form); 
    
    if (error == 0){
        form.classList.add('_sending')
        let response = await fetch('sendmail.php', {
            method: 'POST',
            body: formData 
        });
        if (response.ok){
            document.querySelector('.form__button').classList.add('_send');
            document.querySelector('.form__button').innerHTML = 'Отправлено!';   
            setTimeout(function (){
                document.querySelector('.form__button').classList.remove('_send');
                document.querySelector('.form__button').innerHTML = 'Отправить';     
            }, 1000)
            console.log('Готово!'); 
            form.reset();
            form.classList.remove('_sending')
            
        } else{
            document.querySelector('.form__button').classList.add('_notsend');
            document.querySelector('.form__button').innerHTML = 'Ошибка';   
            setTimeout(function (){
                document.querySelector('.form__button').classList.remove('_notsend');
                document.querySelector('.form__button').innerHTML = 'Отправить';     
            }, 1000)
            console.log('Ошибка при отправке формы');
            form.classList.remove('_sending')
            
        }
    } else if (error == 1){
        console.log('Некорректный Email')
    } else {
        console.log('Заполните поля.')
    }
}

const formValidate = (form) =>{
    let error = 0;
    let formReq = document.querySelectorAll('._req');
    
    for (let i = 0; i < formReq.length; i++){
        const input = formReq[i];
        formRemoveError(input);

        if (input.value == ''){
            formAddError(input);
            error++
        }
        if (formReq[i].classList.contains('_email')) {
            if(validateEmail(input)){
                formAddError(input);
                error++;
            }
        }
    }
    return error
}

const formAddError = (input) =>{
    input.parentElement.classList.add('_error');
    input.classList.add('_error');
}
const formRemoveError = (input) =>{
    input.parentElement.classList.remove('_error');
    input.classList.remove('_error');
}

const validateEmail = (input) =>{
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}

