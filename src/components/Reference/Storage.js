//test
const user = {
  name: 'hannah',
  age: 9,
  emails : [
    'ahnlook90@gmail.com',
    'ahnlook90@naver.com'
  ]
}
// localStorage에 저장하기 : localStorage.setItem('key', 'value')
localStorage.setItem('user', JSON.stringify(user))

// localStorage에 저장된거 가지고 오기 : localStorage.getItem('key')
JSON.parse(localStorage.getItem('user'))

// localStorage에 저장된 데이터 변경하기 (가져오기 > 변경하기 > 저장하기)
const str = localStorage.getItem('user')
const obj = JSON.parse('str')
obj.age = 22
localStorage.setItem('usr', JSON.stringify(obj))

// localStorage에 저장된 데이터 지우기 : localStorage.removeItem('key)
