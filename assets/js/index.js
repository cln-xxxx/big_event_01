//入口函数
$(function () {
    //1，获取用户信息
    getUserInof();

    //2，退出
    var layer=layui.layer;
    $('#btnlogout').on('click',function(){
        //框架提供的询问方式
        layer.confirm('是否确认退出登录？', { icon: 3, title: '提示' }, function (index) {
            //do something
            //1，清空本地token
            localStorage.removeItem('token');
            //2.页面跳转
            location.href='/login.html'
            //关闭询问框
            layer.close(index);
        });
    })
})
//获取用户信息(封装到入口 函数的外面)
//  原因：后面其他的页面要调用
function getUserInof() {
    //发送ajax
    $.ajax({
        url: '/my/userinfo',
        // headers: {
        //     //重新登录，因为token过期事件12小时
        //     Authorization: localStorage.getItem('token') || ""
        // },
        success: function (res) {
            // console.log(res);
            if (res.status != 0) {
                return layui.layui.msg('获取用户信息失败!')
            }
            //调用renderAvatar渲染用户的头像
            renderAvatar(res.data)
        }
    })
}
//渲染用户的头像
function renderAvatar(user) {
    //1，获取用户的名称
    var name = user.nickname || user.username
    //2，设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    //3，按需求渲染用户头像
    if (user.user_pic != null) {
        //3,1 渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        //3,2 渲染文本头像
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}