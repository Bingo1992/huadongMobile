//******************控制不同设备字体大小**************//
(function(doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = 20 * (clientWidth / 320) + 'px';
        };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
//******************控制不同设备字体大小******结束**************//

;(function($,win,doc,undefined){
    $.fn.extend({
        // 生成弹窗html
        Tiphtml: function(text){
            var html = '<div class="tip-dialog show">\
            <div class="tip-content">\
                <p>'+text+'</p>\
            </div></div>';
            $('body').append(html);
            setTimeout(function() {
                $('.tip-dialog').remove();
            }, 1000);
        },
        //表单验证提示
        isTip: function(text){
           return this.Tiphtml(text);
        },
        //判断运营商
        isShop: function(self,text){
            self.siblings('.motion-shop').addClass('show').find('span').html(text);
        },
       
        //弹窗
        showTipDialog: function(){
            return this.each(function() {
                $('.tip-dialog').addClass('show');
                setTimeout(function() {
                    $('.tip-dialog').removeClass('show');
                }, 900);
            });
        },
        //垂直居中的遮罩
        showUiDialog: function(option){
            return this.each(function() {
                $(option).addClass('show');
                // $('body').addClass('fixed-body');
                $('.icon-cancel').add('.cancel').click(function() {
                    $(this).parents(option).removeClass('show');
                    // $('body').removeClass('fixed-body');
                });
            });
        },

        hidefixBtmDialog: function(){
            return this.each(function() {
                $('.fixed-bottom').find('.f-dialog-cnt').removeClass('more-top-open').siblings('.ui-dialog').removeClass('show');
            });
        },
        //底部遮罩
        showfixBtmDialog: function(option){
            return this.each(function() {
                $(option).find('.f-dialog-cnt').addClass('more-top-open')
                        .siblings('.ui-dialog').addClass('show');
                $('.ui-dialog').add('.btn-close').click(function(){
                   $(this).hidefixBtmDialog();
                });
            });
        },
        
        //tabs
        switchTabs: function(option1,option2){
            return this.each(function() {
                var index = $(option1).index($(this));
                $(this).addClass('active').siblings().removeClass('active');
                $(option2).eq(index).addClass('show').siblings(option2).removeClass('show');   
            });
        },
        //排序筛选
        // switchSortTabs:function(option1,option2){
        //     return this.each(function(){
        //         var $_this = $(this);
        //         var $_i = $(this).find('i');
        //         if($_i.hasClass('icon-down')){
        //             $_this.switchTabs(option1,option2)
        //                   .find('i').attr('class','icon-up');
        //             $_this.siblings('li').find('i').attr('class','icon-down');
        //             event.stopPropagation();
        //         } 
        //         // 点击排序，筛选的内容
        //         $(option2).find('li').unbind('click').click(function(){
        //             $(this).switchTabs(option1,option2);
        //         });

        //         //点击其他地方隐藏遮罩
        //         $(document).click(function() {
        //             $(option1).find('i').attr('class','icon-down');
        //             $(option2).removeClass('show');
        //         });   
        //     });
        // }
    });

    //选择遮罩
    function SlideDialog(option){
        var self = this;
        var opt = {
            dialogList : $('.dialog-list'),
            slideElm : $('.slideValue')
        };
        opt = $.extend(opt, option||{});

        var $startList = opt.dialogList.find('.dialog-start-list');
        var $endList = opt.dialogList.find('.dialog-end-list');
        var $returnBack = opt.dialogList.find('.return-back');    
        var slideValue = '';
   
        self.opt = opt;
        self.dialogList = self.opt.dialogList;
        self.slideElm = self.opt.slideElm;
        self.startList = $startList;
        self.endList = $endList;
        self.returnBack = $returnBack;     
        self.slideValue = slideValue;

        self.init();
        self.dialogList.find('ul').css('height',document.documentElement.clientHeight -44 + 'px');
    };
    SlideDialog.prototype.init = function(){
        var self = this;
        self.dialogList.addClass('more-wp-open');
        // $('body').addClass('fixed-body');
        //点击左边
        self.startList.delegate('li','click',function(){
            $(this).switchTabs(self.startList.find('li'));
        });
        // 点击右边
        self.endList.delegate('li','click',function(){
            self.startList.find('li').each(function(){
                if($(this).hasClass('active')){
                    self.slideValue += $(this).html();
                }//获取左边选中的值
            });
            if(self.opt.dialogList.hasClass('Procity-list')){
                self.slideValue += ' - ' + $(this).html();
            }else {
                self.slideValue += $(this).html();
            }
            self.slideElm.html(self.slideValue);//span
            if(self.slideElm.html()==""){
               self.slideElm.val(self.slideValue); //input
            }
            self.removeDialog();
        });
        // 返回按钮
        self.returnBack.click(function(){
            self.removeDialog();
        });
    };
    //移除遮罩
    SlideDialog.prototype.removeDialog = function(){
        var self = this;
        self.dialogList.removeClass('more-wp-open');
        // $('body').removeClass('fixed-body');
    };
    window['SlideDialog'] = SlideDialog;

    //全选
    function AllCheck(option){
        var allCheck = $('.all-check');
        var allCheckbox = allCheck.find(':checkbox');
        var checkbox = $(option).find(':checkbox');
        
        var flag = 0;
        this.allCheck = allCheck;
        this.allCheckbox = allCheckbox;
        this.checkbox = checkbox;
        this.option = option;
        this.flag = flag;
        this.init();
    }
    AllCheck.prototype.init = function(){
        var self = this;
        //点击全选
        self.allCheck.click(function(){
            var check = self.allCheckbox.prop("checked");
             if(!check){
                self.checkbox.prop("checked",false);
            }else {
                self.checkbox.prop("checked",true);
            }
        });
           
        //点击各checkbox
        self.checkbox.click(function(){
            self.flag = 0;
            self.checkbox.each(function(i){
                var check2 = self.checkbox.eq(i).prop("checked");
                if(!check2){self.flag++;}
            });
            if(self.flag>=1){
                self.allCheckbox.prop("checked",false);
            }else{
                self.allCheckbox.prop("checked",true);
            }
        });
    }
     window['AllCheck'] = AllCheck;

})(jQuery,window,document);



$(function(){
 
    // --------form表单----------
    //--日期
    $('.date').bind('input propertychange', function (){
        var dateValue = $(this).find('input').val();
        if(dateValue ==''){
           $(this).removeClass('getDate');
           $(this).find('span').html('请输入时间');
        }else {
            $(this).find('span').html(dateValue);
            $(this).addClass('getDate');
        }
    }); 

    //鉴权方式
    $('.js-select-mBox li').click(function(){
        $(this).switchTabs('.js-select-mBox li','.mBox-show');
    });

    //选择套餐
    $('.select-mBox li').click(function(){
        $(this).switchTabs('.select-mBox li');
    });

    //验证手机号运营商
    $('body').delegate('.mobile','input propertychange', function(){
        var value = $(this).val();
        if(isCellphone(value)) {
            // $('.motion-shop').addClass('show').find('span').html('广州移动');
            $(this).isShop($(this),'广州移动');
        }else {
            $('.motion-shop').removeClass('show');
        }
    });

    //日期查询
      $('.btn-date').click(function(){
        $('.date-list').addClass('more-wp-open');
       
        $('.btn-check').click(function(){
          var startVal = $('.startTime').val();
          var endVal = $('.endTime').val();
          if(startVal=="" || endVal==""){
            $(this).isTip('时间不能为空');
          }else if(startVal > endVal) {
            $(this).isTip('结束时间不可小于开始时间');
          }else {
            $('.date-list').removeClass('more-wp-open');
            $('.dateValue').html(startVal+' 至 '+endVal);
          }
        });
      });
      //关闭右部滑出遮罩（日期，品牌'配件筛选）
      $('.return-back').click(function(){
        $('.date-list').add('.proSort-list').removeClass('more-wp-open');
      });
});
//input只能输入整数
function onlynum(){
    if ( ! ((event.keyCode >= 48 && event.keyCode <= 57 ) || (event.keyCode >= 96 && event.keyCode <= 105 ) || (event.keyCode == 8 ))){
        event.returnValue = false ;
    } 
}

//购物车数量加减
function minus_plus(){
    var count = 1;
    $('.minus').on('touchstart',function(){
        var $parent = $(this).parent('.amount');
        var $count = $parent.find('.count');
        count = $count.val(); //每次点击前先获取input的值
        if(count<=1){
            return;
        }
        $count.val(--count);
    });

    $('.plus').on('touchstart',function(){  
        var $parent = $(this).parent('.amount');
        var $count = $parent.find('.count');
        count = $count.val(); //每次点击前先获取input的值
        $count.val(++count);
    });

    $('.count').change(function (){
        if($(this).val()==0){
            alert('数量不能为0');
            $(this).val(1);
        }
    });
} 

//删除li元素
function removeLi(option){
    var $li = option.closest('li');
    $li.remove();
    $('.ui-dialog').removeClass('show');
}