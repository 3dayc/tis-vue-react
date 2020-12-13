import React from 'react'
import CrudListItem from './CrudListItem'

class CrudList extends React.Component {

    render() {
        
        const list = this.props.list // CrudApp.state.list 
        const arrs = list.map( (item, index)=>{
            /* item = {id: 1, name:"슈퍼맨", power: 100 }, */
            return (
                <CrudListItem 
                    key={index} 
                    item={item} 
                    {...this.props}
                >
                </CrudListItem>
            )
        })

        return (
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>POWER</th>
                        <th>CRUD</th>
                    </tr>
                </thead>
                <tbody>
                    {arrs}
                </tbody>
            </table>
        )
    }
}

export default CrudList