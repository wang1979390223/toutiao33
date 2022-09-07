export const codeRules = [
  { required: true, message: '请填写密码' },
  { pattern: /[0-9]{6}/, message: '验证码格式错误' }
]
export const mobileRules = [
  { required: true, message: '请填写用户名' },
  {
    pattern:
      /^[1](([3][0-9])|([4][0,1,4-9])|([5][0-3,5-9])|([6][2,5,6,7])|([7][0-8])|([8][0-9])|([9][0-3,5-9]))[0-9]{8}$/,
    message: '手机格式错误'
  }
]
