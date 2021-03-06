$(function(){
    //1，自定义验证规则
    var form =layui.form;
    form.verify({
        nickname:function(value){
            if(value.length>6){
                 '昵称长度在1到6之间'
            }
        }
    });

    //2,用户渲染
    initUserInfo();
    //导出layer
    var layer=layui.layer;
    //封装函数
    function initUserInfo(){
        $.ajax({
        url:'/my/userinfo',
        type:'get',
        success:function(res){
        console.log(res);
        if(res.status!==0){
            return layer.msg(res.message);
        }
        //成功,渲染
            form.val('formUserInfo',res.data);
        }
        })
    }

    //3，表单重置
    $('#btnReset').on('click',function(e){
        //阻止重置
        e.preventDefault();
        //从新用户渲染
        initUserInfo()
    })

    //4,修改用户信息
    $('.layui-form').on('submit',function(e){
        //阻止浏览器默认行为，form表单的提交
        e.preventDefault();
        //发送ajax，修改用户信息
        $.ajax({
        url:'/my/userinfo',
        type:'post',
        data:$(this).serialize(),
        success:function(res){
        // console.log(res);
        if(res.status!==0){
            return layer.msg('用户信息修改失败！')
        }
        layer.msg('恭喜您，用户信息修改成功！')
        //调用父页面中的更新用户信息和头像方法
            window.parent.getUserInfo();
        }
        })
    })
})