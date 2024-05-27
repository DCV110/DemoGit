
function Validator(options){

    function validate(inputElement, rule){
        var errorElement = inputElement.parentElement.querySelector('.form-message');
        var errorMessage = rule.test(inputElement.value);

        if(errorMessage){
            errorElement.innerText = errorMessage;
            inputElement.parentElement.classList.add('.invalid');
        }else{
            errorElement.innerText = '';
            inputElement.parentElement.classList.remove('.invalid');
        }
    }
    
// lấy element của form cần validate
    var formElement = document.querySelector(options.form);
    if(formElement){
        options.rules.forEach(function(rule) {
            var inputElement = formElement.querySelector(rule.Selector);
            if(inputElement){
                //xử lý trường hợp nhấn khỏi input
                inputElement.onblur = function() {
                    validate(inputElement, rule);
                }
                // xử lý mỗi khi người đùng nhập vào input
                inputElement.oninput = function(){
                    var errorElement = inputElement.parentElement.querySelector('.form-message');
                    errorElement.innerText = '';
                    inputElement.parentElement.classList.remove('.invalid');
                }
            }
        });
    }
}

// dinh nghia rules
Validator.isRequired = function(Selector){
    return {
        Selector: Selector,
        test: function(value){// dieu kien bat buoc
            return value.trim()/* loại bỏ dấu cách 2 đầu hoặc spam */ ? undefined: 'không được bỏ trống'
        }
    };
}

Validator.isEmail= function(Selector){
    return {
        Selector: Selector,
        test: function(value){// dieu kien bat buoc
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            return regex.test(value) ? undefined : 'vui lòng nhập email'
        }
    };
}

Validator.minLenght= function(Selector, min){
    return {
        Selector: Selector,
        test: function(value){// dieu kien bat buoc
            return value.lenght >= min ? undefined: `vui lòng nhập tối thiểu ${$min} ký tự`
        }
    };
}

