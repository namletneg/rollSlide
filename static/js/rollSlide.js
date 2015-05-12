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
            isStart = true,
            roll = function(ori, n, v){
                var $ul = $self.find('.roll__list'),
                    $item = $ul.find('li'),
                    range = 0,
                    i,len = $item.length,
                    sliceItem = [],
                    cloneSliceItem = [],
                    startTime = (new Date()).getTime(),
                    //存放滚动过的 item
                    memory = function(){
                        var arr = [];

                        if(ori === 'left' || ori === 'top'){
                            for(i = 0; i < n; i++){
                                range += ori === 'left' ? $($item[i]).outerWidth(true) : $($item[i]).outerHeight(true); // left 取 width，top 取 height
                                arr.push($item[i]);
                            }
                        } else if(ori === 'right' || ori === 'bottom'){
                            for(i = len - n; n > 0; n--, i++){
                                range += ori === 'right' ? $($item[i]).outerWidth(true) : $($item[i]).outerHeight(true);
                                arr.push($item[i]);
                            }
                        }
                        return arr;
                    };

                isStart = false;         //关闭滚动
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
                            isStart = true;    //开启滚动
                        });
                        break;
                    case 'right':
                        $ul.prepend(cloneSliceItem);
                        $ul.css('margin-left', -range + 'px');
                        $ul.animate({
                            'margin-left': 0
                        },v,function(){
                            $(sliceItem).remove();
                            isStart = true;    //开启滚动
                        });
                        break;
                    case 'top':
                        $ul.append(cloneSliceItem);
                        $ul.animate({
                            'margin-top': -range + 'px'
                        },v,function(){
                            $(this).css({'margin-top': 0});
                            $(sliceItem).remove();
                            isStart = true;    //开启滚动
                        });
                        break;
                    case 'bottom':
                        $ul.prepend(cloneSliceItem);
                        $ul.css('margin-top', -range + 'px');
                        $ul.animate({
                            'margin-top': 0
                        },v, function(){
                            $(sliceItem).remove();
                            isStart = true;    //开启滚动
                        });
                        break;
                }
            },
            init = function(){
                var $ul = $self.find('.roll__list'),
                    $item = $ul.find('li'),
                    len = $item.length,
                    timer;

                num = num <= len ? num : len;   //滚动个数超过列表数，取列表数
                if(len > 1){
                    $self.on('click', '.pre', function(){
                        if(isStart){
                            //横向滚动
                            if(orientation === 'left' || orientation === 'right'){
                                roll('right', num, v);
                            } else{           //纵向滚动
                                roll('bottom', num, v);
                            }
                        }
                    }).
                    on('click', '.next', function(){
                        if(isStart){
                            //横向滚动
                            if(orientation === 'left' || orientation === 'right'){
                                roll('left', num, v);
                            } else{           //纵向滚动
                                roll('top', num, v);
                            }
                        }
                    }).
                    hover(function(){
                        clearInterval(timer);
                    }, function(){
                        if(isRoll){
                            timer = setInterval(function(){
                                roll(orientation, num, v);
                            },space);
                        }
                    }).
                    trigger('mouseout');
                }
            };

        init();
    };
    $.fn.rollNoInterval = function(){
        var $self = this,
            $ul = $self.find('.roll__list'),
            $item = $ul.find('li'),
            move = function(ori){
                var offset, i,
                    range,
                    $sliceItem,
                    $cloneSliceItem;

                if(ori === 'left' || ori === 'top'){
                    $sliceItem = $($item[0]);
                } else if(ori === 'right' || ori === 'bottom'){
                    $sliceItem = $item[$item.length - 1];
                }
                $cloneSliceItem = $sliceItem.clone();
                switch (ori){
                    case 'left':
                        range = $sliceItem.outerWidth(true);
                        $ul.append($cloneSliceItem);
                        offset = $self.scrollLeft;
                        if(offset < range){
                            i = offset + 1;
                            $self.scrollLeft(i);
                        } else{
                            $sliceItem.remove();
                            $self.scrollLeft(0);
                        }


                        break;
                }
            }
    }
})(jQuery);