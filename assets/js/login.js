$(function(){
    //1，点击去注册账号，隐藏登录区域，显示注册区域
    $('#link_reg').on('click',function(){
        $('.login-box').hide();
        $('.reg-box').show();
    });
    //2，点击去登录，隐藏注册区域区域，显示登录区域
    $('#link_login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    });

    // 3.自定义验证规则
    var form=layui.form;
    form.verify({
        //密码规则
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        //确认密码规则
        repwd:function(value){
            //选择器必须带空格，选择的是后代中的input，name属性值为password的哪一个标签
            var pwd=$(".reg-box input[name=password]").val()
            //比较
            if(value != pwd){
                return "两次密码输入不一致"
            }
        }
    })

    // 4,注册功能
    var layer=layui.layer;
    $('#form_reg').on('submit',function(e){
        //阻止表单提交
        e.preventDefault();
        //发送请求
        $.ajax({
            url:'/api/reguser',
        type:'post',
        data:{
            username: $(".reg-box input[name=username]").val(),
            password: $(".reg-box input[name=password]").val(),
        },
        success:function(res){
        console.log(res);
        //返回状态判断
        if(res.status != 0){
            return layer.msg(res.message, { icon: 5 });
        }
        //提交成功后处理代码
            layer.msg(res.message, { icon: 6 });
        //手动切换到登录表单
        $('#link_login').click();
        //重置表单
        $('#form_reg')[0].reset();
        }
        })
        
    })
    // 5,登录功能(给form标签绑定事件，button按钮触发提交 事件)
    $('#form_login').submit(function(e){
        //阻止表单提交
        e.preventDefault();
        //发送ajax
        $.ajax({
        url:'/api/login',
        type:'post',
        data:$(this).serialize(),
        success:function(res){
        console.log(res);
        //返回状态判断
        if(res.status !== 0){
            return layer.msg(res.message);
        }
        //提交成功后处理代码,跳转页面
        layer.msg('登录成功！')
        //保存token，未来的接口要使用token
        localStorage.setItem('token',res.token);
        //跳转
        location.href="/index.html";
        }
        })

    })
})