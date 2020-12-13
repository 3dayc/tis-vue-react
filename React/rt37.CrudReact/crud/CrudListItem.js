import React from 'react'

class CrudListItem extends React.Component {
    state = {
        isEditMode: false,
    }
    constructor(props) {
        super()
        // this 바인딩

        // ref 생성
        this.refUserName = React.createRef()
        this.refUserPower = React.createRef()
    }
    doDel = (event)=>{
        // 이벤트 핸들러는 화살표 함수로 만들면 this를 bind() 생략해도 된다
        console.log(event.target)
        
        // CrudApp.func.doDel() 메서드 호출
        const item = this.props.item; // CrudList.item
        this.props.doDel(item.id); // this.props.doDel = CrudApp.func.doDel
    }
    doUp = (event) => {
        // 이벤트 핸들러는 화살표 함수로 만들면 this를 bind() 생략해도 된다
        console.log(event.target)
        
        // CrudApp.func.doUp() 메서드 호출
        const item = this.props.item; // CrudList.item
        this.props.doUp( item.id ); // this.props.doUp = CrudApp.func.doUp
    }
    doDown = (event) => {
        // 이벤트 핸들러는 화살표 함수로 만들면 this를 bind() 생략해도 된다
        console.log(event.target)
        
        // CrudApp.func.doDown() 메서드 호출
        const item = this.props.item;// CrudList.item
        this.props.doDown(item.id); // this.props.doDown = CrudApp.func.doDown()
    }
    doEdit = (event) => {
        // 이벤트 핸들러는 화살표 함수로 만들면 this를 bind() 생략해도 된다
        console.log(event.target)
        
        //this.state.isEditMode 바꾼다.
        this.setState( (prevState, prop)=>{
            return {
                isEditMode: !prevState.isEditMode
            }
        })
    }
    doSave = (event)=>{
        // 이벤트 핸들러는 화살표 함수로 만들면 this를 bind() 생략해도 된다
        console.log(event.target)
        
        const item = this.props.item // CrudList.item

        // ref 를 사용하여 현재 입력된 값을 가져온다.
        //const name = this.refUserName.current.value
        //const power = Number(this.refUserPower.current.value)
        const newitem = {
            id: item.id,
            name: this.refUserName.current.value,
            power: Number(this.refUserPower.current.value),
        }

        this.props.doEdit(newitem) // CrudApp.func.doEdit() 호출

        //this.state.isEditMode 바꾼다.
        this.setState( (prevState, prop)=>{
            return {
                isEditMode: !prevState.isEditMode
            }
        })
    }
    render() {
        const item = this.props.item

        // power가 300이상인 사람은 글자색을 red로 bold스타일로 출력
        const strong = item && item.power>=300 ? "strong":"";

        // 화면 표시
        const formView = (
            <tr key={item.id} className={strong}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.power}</td>
                <td>
                    <button onClick={this.doDel}>Del</button>
                    <button onClick={this.doUp}>Power Up</button>
                    <button onClick={this.doDown}>Power Down</button>
                    <button onClick={this.doEdit}>Edit</button>
                </td>
            </tr>
        )

        // 화면 수정
        const formEdit = (
            <tr key={item.id} className={strong}>
                <td>{item.id}</td>
                <td>
                    <input type="text" 
                            name="name" 
                            ref={this.refUserName} 
                            defaultValue={item.name}
                    />
                </td>
                <td>
                    <input type="text"
                        name="power"
                        ref={this.refUserPower}
                        defaultValue={item.power}
                    />
                </td>
                <td>
                    <button onClick={this.doUp}>Power Up</button>
                    <button onClick={this.doDown}>Power Down</button>
                    <button onClick={this.doSave}>Save</button>
                </td>
            </tr>
        )

        if( this.state.isEditMode ){
            return formEdit
        }
        else {
            return formView
        }
    }
}

export default CrudListItem