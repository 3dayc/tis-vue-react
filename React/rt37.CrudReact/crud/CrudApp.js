import React from 'react'
import CrudList from './CrudList'
import CrudInput from './CrudInput'

class CrudApp extends React.Component {
    
    state = {
        list: [
            { id: 1, name: "슈퍼맨", power: 100 },
            { id: 2, name: "아쿠아맨", power: 300 },
            { id: 3, name: "스파이더맨", power: 500 },
            { id: 4, name: "배트맨", power: 30 },
        ],
    }
    func = {
        doUp(id){
            //100씩 증가
            let items = this.state.list.filter( (item,index)=>{
                if( item.id === id ){
                    item.power = Number(item.power) + 100
                }
                
                return item
            })
            this.setState({
                ...this.state,
                list: items
            })
        },
        doDown(id){
            //50씩 감소
            let items = this.state.list.filter( (item,index)=>{
                if( item.id === id ){
                    item.power = Number(item.power) - 50
                }
                return item
            })
            this.setState({
                ...this.state,
                list: items
            })

        },
        doDel(id){
            // 배열에서 삭제 <==> 해당되는 id 값을 제외한 배열 찾기
            let r = window.confirm("정말로 삭제 하시겠습니까?")
            if( r ) {
                let items = this.state.list.filter( (item,index)=>{
                    return item.id !== id
                })
                this.setState({
                    ...this.state,
                    list: items
                })
            }
        },
        doEdit(newitem){
            let items = this.state.list.map( (item,index)=>{
                if (item.id === newitem.id) {
                    return newitem;
                }
                else {
                    return item
                }
            })
            this.setState({
                ...this.state,
                list: items
            })
        },
        doIns(newitem){
            // newitem 를 this.state.list 에 추가하기
            
            /*
            this.state.list에서 id 최대값 찾기
            max(id)를 찾는 방법
            방법 1. reduce() 메서드 사용.
                var maxObj = array.reduce( function(prev, next){
                    return prev.id > next.id ? prev:  next  // 최대값 id가 있는 객체
                    return prev.id < next.id ? prev:  next  // 최소값 id가 있는 객체
                })
                var newId  = maxObj.id + 1
            방법 2. map()과 Math.max()를 사용하는 방법
                var arrIds = array.map( function(el){
                    return el.id
                })
                var newId  = Math.max(...arrIds) + 1
            */
            
            if( this.state.list.length>0) {
                const maxitem = this.state.list.reduce(function (prev, next) {
                    /*
                    최대 id 값을 리턴한다.
                    prev = { id: 1, name: "슈퍼맨", power: 100 };
                    next = { id: 2, name: "아쿠아맨", power: 300 };
                    */
                    return prev.id > next.id ? prev : next;
                });
                newitem.id = maxitem.id + 1;
            }
            else {
                newitem.id = 1;
            }

            // 신규 리스트 생성 :  push() 나 스프레드 연산자 활용해서
            const newlist = [...this.state.list, newitem]
            this.setState({
                ...this.state,
                list: newlist
            })
        }
    }
    constructor(props) {
        super()
        // this 바인딩
        this.func.doUp   = this.func.doUp.bind(this)
        this.func.doDown = this.func.doDown.bind(this)
        this.func.doDel  = this.func.doDel.bind(this)
        this.func.doEdit = this.func.doEdit.bind(this)
        this.func.doIns = this.func.doIns.bind(this)
    }
    render() {
        return (
            <div>
                <CrudInput {...this.state} {...this.func}>
                </CrudInput>
                <hr/>
                <CrudList {...this.state} {...this.func}>
                </CrudList>
            </div>
        )
    }
}

export default CrudApp