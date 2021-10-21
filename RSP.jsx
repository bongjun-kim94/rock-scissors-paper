import React, { Component } from 'react';

// 클래시의 경우 -> constructor  -> render -> ref -> componentDidMount
// -> (setState/props 바뀔 때 -> shouldComponentUpdate -> render -> componentDidUpdate)
// 부모가 나를 없앴을 때 -> componentWillMount -> 소멸

const rspCoords = {
    바위: '0',
    가위: '-142px',
    보: '-284px',
};

const scores = {
    가위: 1,
    바위: 0,
    보: -1,
}

class RSP extends Component {
    state = {
        result: '',
        imgCoord: 0,
        score: 0,
    };

    interval;

    componentDidMount() { // 컴포넌트가 첫 렌더링 될 때, 여기에 비동기 요청을 많이함
        this.interval = setInterval(() => {
            const { imgCoord } = this.state;
            if (imgCoord === rspCoords.바위) {
                this.setState({
                    imgCoord: rspCoords.가위,
                });
            } else if (imgCoord === rspCoords.가위) {
                this.setState({
                    imgCoord: rspCoords.보,
                });
            } else if (imgCoord === rspCoords.보) {
                this.setState({
                    imgCoord: rspCoords.바위,
                });
            }
        }, 1000);
    }
    
    componentDidUpdate() { // 리렌더링 후

    }

    componentWillUnmount() { // 컴포넌트가 제거되기 직전, 비동기 요청 정리
        clearInterval(this.interval);
    }

    onClickBtn = () => {
        
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
                <div>현재 {score}점</div>
            </>
        );
    }
}

export default RSP;