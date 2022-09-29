import React, { Component } from 'react';
import './TodoItem.css';

class TodoItem extends Component {
    /**
     * 이 컴포넌트는 총 5가지의 props 를 전달 받음
     * 1.text : todo 내용
     * 2.checked : 체크박스 상태
     * 3.id : todo 의 고유 아이디
     * 4.onToggle : 체크박스를 키고 끄는 함수
     * 5.onRemove : 아이템을 삭제시키는 함수
     *  : 해당 컴포넌트의 최상의 DOM 의 클릭 이벤트 onToggle 을 넣어주고,  X(삭제) 가 있는 부분에선 
     *    onRemove 를 넣음
     */
    render() {
        const { text, checked, id, onToggle, onRemove } = this.props;

        return (
            <div className="todo-item" onClick={() => onToggle(id)}>
                <div className="remove" onClick={(e) => {
                    e.stopPropagation();
                    onRemove(id)}
                }>&times;</div>
                <div className={`todo-text ${checked && 'checked'}`}>
                    <div>{text}</div>
                </div>
                {
                    checked && (<div className="check-mark">✓</div>)
                }
            </div>
        );
    }
}

export default TodoItem;