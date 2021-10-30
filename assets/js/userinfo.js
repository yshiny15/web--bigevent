$(function() {
    var form = layui.form
    var layer = layui.layer

    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称必须为1-6个字符'
            }
        }
    })

    getInitUserinfo()

    function getInitUserinfo() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户失败')
                }
                form.val('formUserinfo', res.data)
            }
        })

    }

    $('#btnrest').on('click', function(e) {
        e.preventDefault()
        getInitUserinfo()
    })


    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新失败')
                }
                layer.msg('更新成功')
                window.parent.getUseInfo()
            }
        })
    })


})