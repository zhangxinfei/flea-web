layui.define(['element'], function(exports) {

	var $ = layui.$;
	$('.input-field').on('change', function() {
		var $this = $(this),
			value = $.trim($this.val()),
			$parent = $this.parent();

		if(value !== '' && !$parent.hasClass('field-focus')) {
			$parent.addClass('field-focus');
		} else {
			$parent.removeClass('field-focus');
		}
	})
	exports('login');
});

layui.use(['layer', 'jquery'], function() {
	var layer = layui.layer,
		$ = layui.jquery

	$('.login').click(function() {
		var adminName = $('#adminName').val();
		var adminNumber = $('#adminNumber').val();
		if(adminName.length < 1) {
			layer.tips('请输入用户名', '#adminName');
			return;
		}
		if(adminNumber.length < 1) {
			layer.tips('请输入密码', '#adminNumber');
			return;
		}
		var a = {
			admin_name: adminName,
			admin_number: adminNumber
		}
		var string = JSON.stringify(a);
		//加密
		var encrypt = new JSEncrypt();
		//公钥
		var PUBLIC_KEY = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDCxiQSqD0q1pAUSGqrCLcMzsKRwPBkiFW3WWZ97srAp3oRoupqL1nevJJRVPIZUF3JhTyV47pnjsCqWo4w0NqGVXhkSQnIk4nj7S/w3I0gWUxqFzdP+xcPhA+mJxYq1HSMJ2qVQ6bQVT7/SgPSKWn++OEQWEFz5/uM/5STcJJlvQIDAQAB';
		encrypt.setPublicKey(PUBLIC_KEY);
		var encrypted = encrypt.encrypt(string);
		var url = 'http://localhost:8080/admin/selectByLogin';
		$.post(url, {
			'admin_login': encrypted
		}, function(res) {
			//			console.log(res.data);
//			console.log(res.data.admin_id.admin_id);
			//			console.log(res.data.token);
			//			console.log(res.data.));
			//console.log(res.success);
			//console.log(res.code);
			if(!res.success) {
				$('#code_img').click();
				layer.msg("登录失败");
			} else {
				localStorage.setItem('admin_id', res.data.admin_id.admin_id);
				localStorage.setItem('token', res.data.token);
				layer.msg("登录成功");
				location.href = 'index.html'
			}
		})
	})
});