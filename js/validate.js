/**
*
* 将单个字符串的首字母大写
*/
var fistLetterUpper = function(str) {
        return str.charAt(0).toUpperCase()+str.slice(1);
};
/**
*
* @descrition:判断是否是合理的IP地址
* @param:str->待验证的IP地址
* @return :true合理的IP地址
* 
*/
var isIP = function (str) {
  var pattern = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
 
  return pattern.test(str);
};

/**
* @descrition:判断输入的参数是否是个合格的URL,由于url的灵活性和多样性，一下代码并不能测试所有的url都是合法的（PS：该正则无法通配所有的URL，请慎用）
* @param:str->待判断的url参数
* @return ：true表示符合改正则。
**/
var isURL = function (str) {
    var strRegex = "^((https|http|ftp|rtsp|mms)?://)"
            + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" //ftp的user@
            + "(([0-9]{1,3}.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184
            + "|" // 允许IP和DOMAIN（域名）
            + "([0-9a-z_!~*'()-]+.)*" // 域名- www.
            + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]." // 二级域名
            + "[a-z]{2,6})" // first level domain- .com or .museum
            + "(:[0-9]{1,4})?" // 端口- :80
            + "((/?)|"
            + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
    var re = new RegExp(strRegex);
 
    return re.test(str);
};

/**
*
* @descrition:判断输入的参数是否是国内合法的邮编地址(ps:国内不包含国外的邮编)
* @link: http://www.youbianku.com/%E9%A6%96%E9%A1%B5
* @param: str为待验证的邮编号码
* @return: true表示为合法的邮编号码
* 
*/
var isPostcode = function(str) {
	//国内邮编以0-8开头的6为数字
    var pattern = /^[0-8]\d{5}$/;
    return pattern.test(str);      
};

/**
*
* @descrition:判断输入的参数是否是个合格的QQ号码
* @param->str:待验证的参数
* @return: true验证成功
*/
var isQQ = function(str) {
        /**
        *@descrition:规则
        * 1-9开头，最少5位。
        */
        var pattern = /^[1-9][0-9]{4,}$/
        return pattern.test(str);
};

/**
*
* @descrition:判断输入的参数是否是个合格的手机号码，不能判断号码的有效性，有效性可以通过运营商确定。
* @param:str ->待判断的手机号码
* @return: true表示合格输入参数
* 
*/
var isCellphone = function(str) {
    /**
    *@descrition:手机号码段规则
    * 13段：130、131、132、133、134、135、136、137、138、139
    * 14段：145、147
    * 15段：150、151、152、153、155、156、157、158、159
    * 17段：170、176、177、178
    * 18段：180、181、182、183、184、185、186、187、188、189
    * 
    */
    var pattern =  /^(13[0-9]|14[57]|15[012356789]|17[0678]|18[0-9])\d{8}$/;
    return pattern.test(str);
};

/**
* @descrition:判断输入的参数是否是个合格的固定电话号码。
* @param:str->待验证的固定电话号码。
* @return : true表示验证合格。
* 
**/
var isfixedphone = function(str) {
        /**
        *
        * @desctition:规则->区号3-4位，号码7-8位,可以有分机号，分机号为3-4为，格式如下："0775-85333333-123"
        * 
        */
        var pattern =  /^\d{3,4}-\d{7,8}(-\d{3,4})?$/;
        return pattern.test(str);
};

/**
*
* @descrition:判断输入的参数是否是个合格标准的邮箱,并不能判断是否有效，有效只能通过邮箱提供商确定。
* @param:str ->待验证的参数。
* @return -> true表示合格的邮箱。
* 
*/
var isEmail = function(str){
    /**
    * @descrition:邮箱规则
    * 1.邮箱以a-z、A-Z、0-9开头，最小长度为1.
    * 2.如果左侧部分包含-、_、.则这些特殊符号的前面必须包一位数字或字母。
    * 3.@符号是必填项
    * 4.右则部分可分为两部分，第一部分为邮件提供商域名地址，第二部分为域名后缀，现已知的最短为2位。最长的为6为。
    * 5.邮件提供商域可以包含特殊字符-、_、.
    */
    var pattern = /^([a-zA-Z0-9]+[-_.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[-_.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,6}$/;
    return pattern.test(str);
};

/**
*
* @description: 判断传入的参数的长度是否在给定的有效范围内
* @param: minL->给定的最小的长度
* @param: maxL->给定的最大的长度
* @param: str->待验证的参数
* @return : true表示合理，验证通过
* 
*/
var isAvaiableLength = function(minL,maxL,str){
    return (str.length >= minL && str.length <= maxL) ? true : false;
};

/**
*
* @Dependence : https://gist.github.com/hehongwei44/3e167cfcda47d4c8051a#file-extendstringprototype-js
* @description : 判断输入的参数是否为空
* @return : true表示为输入参数为空 
* 
*/
var isEmpty = function (str) {
    //空引用  空字符串  空输入
    return str == null || typeof str == "undefined" || str.trim() == "" ? true : false;
};

/**
*
* @descrition: 测试给定的参数是否全部为中文字符，如"中test"不会通过 。
* @param->str : 传入的参数，类型为字符串。
* @return : true表示全部为中文,false为不全是中文，或没有中文。
* 
*/
var isChinese = function (str) {
    var pattern = /^[\u0391-\uFFE5]+$/g;
    return pattern.test(str);
};

/**
*
* @descrition : 该函数的功能是判断转入的参数是否为数字类型。
* @param->o   : 传入的参数，参数可以为任何类型。
* @return:   true表示为数字，false为非数字
* 
*/
var isNumber = function(o) {
    return !isNaN(o);
};

/**
*
* @descrition: 判断输入的参数是否是一个合格的身份证号码。这个函数对输入的参数检查时候是合格的身份证号码，其身份证有效性无法判断。检测的颗粒度可以定制。
* @param->str : 待验证的参数
* @return : true是合格的身份证   false为不合法的身份证
* 
*/
var checkIdCard = function (num) {
    num = num.toUpperCase();

    var cityCode = {11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江 ", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外 "};

    if(!cityCode[num.substr(0,2)]){
        return false;
    }
    //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
    if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num))) {
        //alert('输入的身份证号长度不对，或者号码不符合规定！\n15位号码应全为数字，18位号码末位可以为数字或X。');
        return false;
    }
    //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
    //下面分别分析出生日期和校验位
    var len, re;
    len = num.length;
    if (len == 15) {
        re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
        var arrSplit = num.match(re);

        //检查生日日期是否正确
        var dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]);
        var bGoodDay;
        bGoodDay = (dtmBirth.getYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
        if (!bGoodDay) {
            //alert('输入的身份证号里出生日期不对！');
            return false;
        }
        else {
            //将15位身份证转成18位
            //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
            var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
            var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
            var nTemp = 0, k;
            num = num.substr(0, 6) + '19' + num.substr(6, num.length - 6);
            for (k = 0; k < 17; k++) {
                nTemp += num.substr(k, 1) * arrInt[k];
            }
            num += arrCh[nTemp % 11];
            return true;
        }
    }
    if (len == 18) {
        re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
        var arrSplit = num.match(re);

        //检查生日日期是否正确
        var dtmBirth = new Date(arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]);
        var bGoodDay;
        bGoodDay = (dtmBirth.getFullYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
        if (!bGoodDay) {
            //alert(dtmBirth.getYear());
            //alert(arrSplit[2]);
            //alert('输入的身份证号里出生日期不对！');
            return false;
        }
        else {
            //检验18位身份证的校验码是否正确。
            //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
            var valnum;
            var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
            var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
            var nTemp = 0, k;
            for (k = 0; k < 17; k++) {
                nTemp += num.substr(k, 1) * arrInt[k];
            }
            valnum = arrCh[nTemp % 11];
            if (valnum != num.substr(17, 1)) {
                //alert('18位身份证的校验码不正确！应该为：' + valnum);
                return false;
            }
            return true;
        }
    }
    return false;
};