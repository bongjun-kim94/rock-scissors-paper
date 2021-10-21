import React, { Component } from 'react';

// 클래시의 경우 -> constructor  -> render -> ref -> componentDidMount
// -> (setState/props 바뀔 때 -> shouldComponentUpdate -> render -> componentDidUpdate)
// 부모가 나를 없앴을 때 -> componentWillMount -> 소멸

class RSP extends Component {
    state = {
        result: '',
        imgCoord: 0,
        score: 0,
    };

    componentDidMount() { // 컴포넌트가 첫 렌더링 될 때

    }
    
    componentDidUpdate() { // 리렌더링 후

    }

    componentWillUnmount() { // 컴포넌트가 제거되기 직전

    }

    render() {
        const { result, score, imgCoord } = this.state;
        return(
            <>
                <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}} />
                <div>
                    <button id="rock" className="btn" onClick={() => { onClickBtn('바위')}}>바위</button>
                    <button id="scissors" className="btn" onClick={() => { onClickBtn('가위')}}>가위</button>
                    <button id="paper" className="btn" onClick={() => { onClickBtn('보')}}>보</button>
                </div>
                <div>{result}</div>
                <div>현재 {score}</div>
            </>
        );
    }
}

export default RSP;