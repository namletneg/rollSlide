/**
 * Created by f on 2015/5/8.
 */
(function($){
    $.fn.rollSlide = function(obj){
        var $self = this,
            orientation = obj.orientation || 'left',   //滚动方式
            num = obj.num || 1,      //滚动数量
            v = (typeof obj.v === 'number') ? obj.v : 0,    //滚动速度
            minTime = (typeof obj.space === 'number') ? ((obj.space >= 100) ? obj.space : 100) : 100,    //最小间隔为 100 ms ，
            space = minTime + v || 5000 + v,    //滚动间隔  默认 5000ms
            isRoll = obj.isRoll,   //自动播放
            roll = function(ori, n, v){
                var $ul = $self.find('.roll__list'),
                    $item = $ul.find('li'),
                    range = 0,
                    i,len = $item.length,
                    sliceItem = [],
                    cloneSliceItem = [],
                    //存放滚动过的 item
                    memory = function(){
                        var arr = [];

                        if(ori === 'left' || ori === 'top'){
                            for(i = 0; i < n; i++){
                                range += $($item[i]).outerWidth(true);
                                arr.push($item[i]);
                            }
                        } else if(ori === 'right' || ori === 'bottom'){
                            for(i = len - n; n > 0; n--, i++){
                                range += $($item[i]).outerWidth(true);
                                arr.push($item[i]);
                            }
                        }
                        return arr;
                    };

                sliceItem = memory();
                cloneSliceItem = $(sliceItem).clone();
                //判断往哪个方向移动
                switch (ori){
                    case 'left':
                        $ul.append(cloneSliceItem);
                        $ul.animate({
                            'margin-left': -range + 'px'
                        },v,function(){
                            $(this).css({'margin-left': 0});
                            $(sliceItem).remove();
                        });
                        break;
                    case 'right':
                        $ul.prepend(cloneSliceItem);
                        $ul.css('margin-left', -range + 'px');
                        $ul.animate({
                            'margin-left': 0
                        },v,function(){
                            $(sliceItem).remove();
                        });
                        break;
                    case 'top':
                        $ul.append(cloneSliceItem);
                        $ul.animate({
                            'margin-top': -range + 'px'
                        },v,function(){
                            $(this).css({'margin-top': 0});
                            $(sliceItem).remove();
                        });
                        break;
                    case 'bottom':
                        $ul.prepend(cloneSliceItem);
                        $ul.css('margin-top', -range + 'px');
                        $ul.animate({
                            'margin-top': 0
                        },v, function(){
                            $(sliceItem).remove();
                        });
                        break;
                }
            },
            init = function(){
                var $pre = $self.find('.pre'),
                    $next = $self.find('.next'),
                    $ul = $self.find('.roll__list'),
                    $item = $ul.find('li'),
                    len = $item.length;

                if(len > 1 && num <= len ){
                    if(isRoll){
                        setInterval(function(){
                            roll(orientation, num, v);
                        },space);
                    }
                    $pre.on('click', function(){
                        //横向滚动
                        if(orientation === 'left' || orientation === 'right'){
                            roll('left', num, v);
                        } else{           //纵向滚动
                            roll('top', num, v);
                        }
                    });
                    $next.on('click', function(){
                        //横向滚动
                        if(orientation === 'left' || orientation === 'right'){
                            roll('right', num, v);
                        } else{           //纵向滚动
                            roll('bottom', num, v);
                        }
                    });
                }
            };

        init();
    };
    $('.roll_row').rollSlide({
        orientation: 'right',
        num: 2,
        v: 1500,
        //space: 3000,
        isRoll: false
    });
})(jQuery);