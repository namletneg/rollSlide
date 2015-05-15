# rollSlide
滚动列表插件
    间隔滚动 .rollSlide(obj)方法：
        参数 obj 为对象，
                orientation： string， 滚动方式 'left','right','top','bottom' 4个方向，默认为 'left'
                num： number， 滚动数量  默认为 1
                v：numer， 滚动速度  默认为 0
                space：number， 间隔时间  默认时间为 5000ms， 最小间隔时间为 100ms
                isRoll： boolean，  是否自动播放   必填，没有默认值
    
    不间断滚动 .rollNoInterval()方法：
        无参数， 返回4个方法
            .left()  左方向滚动
            .right()  右方向滚动
            .top()  上方向滚动
            .bottom()  下方向滚动
            
  未完善 插件 的 相同多个class选择器调用
  未完善 .rollNoInterval()方法 暂停滚动 和继续滚动 的事件
