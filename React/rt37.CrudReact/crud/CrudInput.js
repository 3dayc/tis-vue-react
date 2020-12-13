import React from 'react'

class CrudInput extends React.Component {

    constructor(props) {
        super()
        // this 바인딩
        
        // ref 만들기
        this.refUserName = React.createRef()
        this.refUserPower = React.createRef()
    }
    doIns = (event)=>{
        // 이벤트 핸들러는 화살표 함수로 만들면 this를 bind() 생략해도 된다
        console.log(event.target)//

        // 유효성 검사: 생략
        if(this.refUserName.current.value.trim() === ''){
            alert('이름을 입력하세요')
            this.refUserName.current.focus()
            event.preventDefault()
            return false
        }
        if(this.refUserName.current.value.trim() === ''){
            alert('파워를 입력하세요')
            this.refUserPower.current.focus()
            event.preventDefault()
            return false
        }
        if( isNaN( Number(this.refUserPower.current.value) ) ){
            alert('파워에 숫자를 입력하세요')
            this.refUserPower.current.value=""
            this.refUserPower.current.focus()
            event.preventDefault()
            return false
        }
        
        // ref 를 사용하여 현재 입력된 값을 가져온다.
        //const name = this.refUserName.current.value
        //const power = Number(this.refUserPower.current.value)
        const newitem = {
            id: null,
            name: this.refUserName.current.value,
            power: Number(this.refUserPower.current.value),
        }

        // 부모(CrudApp)에게 값을 넘긴다.
        this.props.doIns(newitem) // CrudApp.func.doIns(newitem) 호출

        // 초기화 방법1
        this.refUserName.current.value = ""
        this.refUserPower.current.value = 0
    }
    render() {
        return (
            <div>
                <h1>Creat Read Update Delete</h1>
                <div>
                    <label htmlFor="">Name : </label>
                    <input type="text"
                        name="name"
                        ref={this.refUserName}
                        defaultValue={""}
                    />
                </div>
                <div>
                    <label htmlFor="">Power : </label>
                    <input type="text"
                        name="power"
                        ref={this.refUserPower}
                        defaultValue={0}
                    />
                </div>
                <button onClick={this.doIns}>Add</button>
            </div>
        )
    }
}

export default CrudInput